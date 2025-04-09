import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';  // Adjust the path if needed

const useAuth = () => {
  return useContext(AuthContext);  // This will give you access to authentication context
};

export default useAuth;
