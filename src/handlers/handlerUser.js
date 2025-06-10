const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const SECRET_KEY = process.env.JWT_SECRET;
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const Mailjet = require("node-mailjet");

const mailjet = Mailjet.apiConnect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);

const registerHandler = async (request, h) => {
  const { email, password } = request.payload;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return h.response({ message: "Email already exists" }).code(400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();

  return h.response({ message: "User registered successfully" }).code(201);
};

const loginHandler = async (request, h) => {
  const { email, password } = request.payload;

  const user = await User.findOne({ email });
  if (!user) {
    return h.response({ message: "Invalid credentials" }).code(401);
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return h.response({ message: "Invalid credentials" }).code(401);
  }

  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return h.response({ token }).code(200);
};

const googleAuthHandler = async (request, h) => {
  const { id_token } = request.payload;

  try {
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload.email;

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        email,
        isGoogleAccount: true,
      });
      await user.save();
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return h.response({ token }).code(200);
  } catch (error) {
    console.error("Google Auth Error:", error);
    return h.response({ message: "Google authentication failed" }).code(500);
  }
};

const generateJwtToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const forgotPasswordHandler = async (request, h) => {
  const { email } = request.payload;
  const user = await User.findOne({ email });

  if (!user) {
    return h.response({ message: "Pastikan email Anda telah terdaftar" }).code(404);
  }

  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
  const resetLink = `${process.env.CLIENT_BASE_URL}/#/reset-password?token=${token}`;

  try {
    const requestEmail = await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "no-reply@sadar.site",
            Name: "Sadar: Saring, Amankan, Deteksi, Anti-Rugi",
          },
          To: [
            {
              Email: email,
            },
          ],
          Subject: "Tindakan Diperlukan: Reset Kata Sandi Anda",
          TextPart: `Kami menerima permintaan untuk mereset kata sandi akun Anda. Untuk melanjutkan, silakan klik tautan di bawah ini:\n\n${resetLink}\n\nDemi keamanan, tautan ini hanya berlaku selama 24 jam dan hanya bisa digunakan sekali.\n\nJika Anda tidak meminta reset kata sandi, abaikan email ini—tidak ada perubahan yang akan dilakukan.\n\nButuh bantuan? Tim kami siap membantu kapan saja.\n\nHormat kami,\nSadar: Saring, Amankan, Deteksi, Anti-Rugi`,
          HTMLPart: `
            <p>Kami menerima permintaan untuk mereset kata sandi akun Anda. Untuk melanjutkan, silakan klik tombol di bawah ini:</p>
            <p><a href="${resetLink}" style="display:inline-block;padding:10px 20px;background-color:#42A7C3;color:#ffffff;text-decoration:none;border-radius:5px;">Reset Kata Sandi</a></p>
            <p>Demi keamanan, tautan ini hanya berlaku selama 24 jam dan hanya bisa digunakan sekali.</p>
            <p>Jika Anda tidak meminta reset kata sandi, abaikan email ini—tidak ada perubahan yang akan dilakukan.</p>
            <p>Butuh bantuan? Tim kami siap membantu kapan saja.</p>
            <p>Hormat kami,<br/><strong>Sadar: Saring, Amankan, Deteksi, Anti-Rugi</strong></p>
          `,
        },
      ],
    });

    console.log("email terkirim");
    return h.response({ message: "Email reset password telah dikirim." }).code(200);
  } catch (error) {
    console.error("Error saat mengirim email:", error);
    return h.response({ message: "Terjadi kesalahan saat mengirim email." }).code(500);
  }
};

const resetPasswordHandler = async (request, h) => {
  const { token, newPassword } = request.payload;

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return h.response({ message: "User tidak ditemukan" }).code(404);
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return h.response({ message: "Password berhasil diperbarui." }).code(200);
  } catch (err) {
    return h.response({ message: "Token tidak valid atau kadaluarsa." }).code(400);
  }
};

module.exports = { registerHandler, loginHandler, forgotPasswordHandler, resetPasswordHandler, googleAuthHandler };
