import { useDispatch, useSelector } from "react-redux";
import Button from "../ui/Button";
import { logoutUser } from "../../features/auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
    console.log("Logout");
  };
  const selector = useSelector((state) => state.auth);
  const token = selector.token;
  return (
    <div>
      Navbar
      {token ? (
        <Button onClick={handleLogout}>Logout</Button>
      ) : (
        <Button onClick={() => (window.location.href = "/login")}>Login</Button>
      )}
    </div>
  );
};

export default Navbar;
