import axiosInstance from "./axiosInstance";

const chatServices = {
  chatWithAI: async (message, history) => {
    const response = await axiosInstance.post("/chat", { message, history });
    return response.data;
  },
};

export default chatServices;
// const [messages, setMessages] = useState([]); History

// const handleSendMessage = async (userText) => {
//   const newUserMsg = { role: "user", parts: [{ text: userText }] };

//   try {
//     const response = await chatServices.chatWithAI(userText, messages);

//     const aiReply = response.data.reply;
//     const newAiMsg = { role: "model", parts: [{ text: aiReply }] };

//     setMessages((prev) => [...prev, newUserMsg, newAiMsg]);
//   } catch (err) {
//     console.error("Chat Error", err);
//   }
// };
