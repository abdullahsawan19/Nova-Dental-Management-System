const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const app = require("./app");
const connectDB = require("./config/db.config");

connectDB();

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(
    `🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`,
  );
});
