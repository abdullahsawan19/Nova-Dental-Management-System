import axiosInstance from "./services/axiosInstance";

const Home = () => {
  const testRefresh = async () => {
    console.log("🚀 Testing Token...");
    try {
      const res = await axiosInstance.get("/users/me");
      console.log("✅ Data received:", res.data);
    } catch (err) {
      console.log("❌ Final Error:", err);
    }
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={testRefresh} className="p-2 bg-red-500 text-white">
        Test Refresh Token
      </button>
    </div>
  );
};
export default Home;
