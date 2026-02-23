const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const app = require("./app");
const connectDB = require("./config/db.config");

if (process.env.NODE_ENV !== "production") {
  connectDB();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

module.exports = async (req, res) => {
  await connectDB();
  return app(req, res);
};
