const redis = require("redis");
const dotenv = require("dotenv"); //

dotenv.config();

const redisClient = redis.createClient({
  url: process.env.REDIS_URL || "redis://127.0.0.1:6379",
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

redisClient
  .connect()
  .then(() => console.log("✅ Redis Connected Successfully"))
  .catch((err) => console.log("❌ Redis Connection Error:", err));

module.exports = redisClient;
