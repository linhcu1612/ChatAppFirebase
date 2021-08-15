/** @format */

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase/config";
import { Spin } from "antd";

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const unsubcribed = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       const { displayName, email, uid, photoURL } = user;
  //       setIsLoading(false);
  //       setUser({ displayName, email, uid, photoURL });
  //       history.push("/");
  //     }
  //     setUser({});
  //     setIsLoading(false);
  //     history.push("/login");
  //   });
  //   return () => {
  //     unsubcribed();
  //   };
  // }, [history]);

  return (
    <AuthContext.Provider value={user}>
      {isLoading ? <Spin /> : children}
    </AuthContext.Provider>
  );
}
