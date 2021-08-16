/** @format */

import React, { useMemo, useContext } from "react";
import useFirestore from "hooks/useFirestore";
import { AuthContext } from "./AuthProvider";

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
  const { uid } = useContext(AuthContext);

  const roomsCondition = useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: uid,
    };
  }, [uid]);

  const rooms = useFirestore("rooms", roomsCondition);
  return (
    <AppContext.Provider value={{ rooms }}>{children}</AppContext.Provider>
  );
}
