import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const AuthenticatedContext = createContext();
  

export const AuthenticatedProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  

  return (
    <AuthenticatedContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthenticatedContext.Provider>
  )
}

AuthenticatedProvider.propTypes = {
  children: PropTypes.node,
};
export default AuthenticatedContext