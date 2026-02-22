const redis = require("redis");
const dotenv = require("dotenv");

dotenv.config();

let redisClient = null;

if (process.env.REDIS_URL) {
  redisClient = redis.createClient({
    url: process.env.REDIS_URL,
  });

  redisClient.on("error", (err) => console.log("Redis Client Error", err));

  redisClient
    .connect()
    .then(() => console.log("✅ Redis Connected Successfully"))
    .catch(() => console.log("⚠️ Redis not available, caching disabled"));
} else {
  console.log("ℹ️ Redis disabled (no REDIS_URL)");
}

module.exports = redisClient;
