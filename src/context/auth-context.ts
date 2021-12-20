import React, { useState } from "react";
import { User } from "screens/project-list/search-panel";
import * as auth from "utils/auth-provider";
const AuthContext = React.createContext(undefined);
interface AuthForm {
  username: string;
  password: string;
}
AuthContext.displayName = "AuthContext";
export const AuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);

  const logout = () => auth.logout().then(() => setUser(null));
  return { login, register, logout };
};
