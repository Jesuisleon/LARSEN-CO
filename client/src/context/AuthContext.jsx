import { createContext, useReducer, useEffect, useMemo } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    case "SET_ADMIN":
      return { ...state, admin: action.payload };
    default:
      return state;
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });
  
  useEffect(() => {
    const json = JSON.parse(localStorage.getItem("user"));
    if (json) {
      dispatch({ type: "LOGIN", payload: json });
      if (json.isAdmin) {
        dispatch({ type: "SET_ADMIN", payload: true });
      }
    } else {
      dispatch({ type: "LOGOUT" });
    }
  }, []);

  const value = useMemo(() => ({...state, dispatch }), [state]);
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
