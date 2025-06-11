require("dotenv").config();
const Hapi = require("@hapi/hapi");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const moduleRoutes = require("./routes/moduleRoutes");
const progressRoutes = require("./routes/progressRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");

const validate = async (decoded, request, h) => {
  return { isValid: true };
};

const init = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    dbName: "antitertipu",
  });

  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0",
    routes: {
      cors: {
        origin: ["'https://sadar.site'"], // asal frontend
        credentials: true,
        additionalHeaders: ["Content-Type", "Authorization"],
      },
    },
  });

  await server.register(require("hapi-auth-jwt2"));

  server.auth.strategy("jwt", "jwt", {
    key: process.env.JWT_SECRET,
    validate,
    verifyOptions: { algorithms: ["HS256"] },
  });

  server.auth.default("jwt");

  // Allow unauthenticated access to auth routes
  server.route(authRoutes.map((route) => ({ ...route, options: { ...route.options, auth: false } })));
  server.route(moduleRoutes);
  server.route(progressRoutes);
  server.route(leaderboardRoutes.map((route) => ({ ...route, options: { ...route.options, auth: false } })));

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

init();
