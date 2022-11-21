import { createContext, useContext, ReactNode, useState } from "react";
type authContextType = {};
const authContextDefaultValues: authContextType = {};
const AuthContext = createContext(authContextDefaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const value = {};
  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
}
