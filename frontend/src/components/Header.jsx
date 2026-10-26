import { Link, useNavigate } from "react-router-dom";
import Button from "./ui/Button";
import { useContext } from "react";
import { UserStore } from "../context/UserContext";

export default function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserStore);

  console.log(user);

  function handleLogin() {
    navigate("/login");
  }

  function handleRegister() {
    navigate("/signup");
  }
  return (
    <div className="flex items-center justify-between px-6 py-4">
      <h1 className="font-semibold text-base">Inventory Management System</h1>
      <nav className="flex gap-3 items-center">
        <Link to="/">Home</Link>
        <Link to="/">About</Link>
        <Link to="/">Contact</Link>
        {user.token ? (
          <Button
            text="Dashboard"
            type="button"
            onClick={() => navigate("/dashboard")}
          />
        ) : (
          <div className="flex gap-2">
            <Button text="Login" type="button" onClick={handleLogin} />
            <Button text="Signup" type="button" onClick={handleRegister} />
          </div>
        )}
      </nav>
    </div>
  );
}
