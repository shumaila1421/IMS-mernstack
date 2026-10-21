import { createContext, useState } from "react";

export const UserStore = createContext();

export default function UserContext({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  return (
    <UserStore.Provider value={{ user, setUser }}>
      {children}
    </UserStore.Provider>
  );
}
