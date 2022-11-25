import { createContext, useContext, ReactNode, useState } from "react";
type authContextType = {
  smShow: boolean;
  setSmShow: (showModal: boolean) => void;
  setUser: (user: any) => void;
  user: {
    accounts: {
      id: number;
      balance: number;
    };
    id: number;
    username: string;
  };
};
const authContextDefaultValues: authContextType = {
  smShow: false,
  setSmShow: (showModal: boolean) => {},
  setUser: () => {},
  user: {
    accounts: {
      id: 0,
      balance: 0,
    },
    id: 0,
    username: "",
  },
};
const AuthContext = createContext(authContextDefaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [smShow, setSmShow] = useState<authContextType["smShow"]>(false);
  const [user, setUser] = useState<authContextType["user"]>({
    accounts: {
      id: 0,
      balance: 0,
    },
    id: 0,
    username: "",
  });
  const value = {
    setUser,
    user,
    setSmShow,
    smShow,
  };
  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
}
