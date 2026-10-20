import { createContext, useState } from "react";

export const UserStore = createContext();

export default function UserContext({ children }) {
  const [user, setUser] = useState(null);
  return (
    <UserStore.Provider value={{ user, setUser }}>
      {children}
    </UserStore.Provider>
  );
}
