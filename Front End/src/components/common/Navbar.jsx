import { useDispatch, useSelector } from "react-redux";
import Button from "../ui/Button";
import { logoutUser } from "../../features/auth/authSlice";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
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
      <Link to="/services">Services</Link>
      <Link to="/doctors">Doctors</Link>
      <Link to="/branch">Branch</Link>
      <Link to="/reviews">Reviews</Link>
      <Link to="/chat">chat with AI</Link>
    </div>
  );
};

export default Navbar;
