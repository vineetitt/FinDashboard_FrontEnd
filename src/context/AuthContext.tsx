import React,{createContext, useContext, useState, useEffect} from 'react'
import { IUser } from '../utils/interface/ILogin';

interface AuthContextType {
    isAuthenticated: boolean;
    user: IUser | null;
    login: (token: string, user:IUser) => void;
    logout: () => void;
  }

  const AuthContext = createContext<AuthContextType | undefined>(undefined);
const AuthProvider:React.FC<{children: React.ReactNode}> = ({children}) => {
    const[isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<IUser | null>(null);
    const[loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
      const token = localStorage.getItem("jwt");
      const storedUser = localStorage.getItem("user");
      if (token && storedUser) {
        setIsAuthenticated(true);
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    }, []);

    const login = (token: string,user:IUser)=>{
      localStorage.setItem('jwt', token);
      localStorage.setItem("user", JSON.stringify(user));
      setIsAuthenticated(true);
      setUser(user);
    };

    const logout = () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
      };

  return (
    <AuthContext.Provider value={{ isAuthenticated,user, login, logout }}>
      {!loading ? children : <div>Loading...</div>} 
    </AuthContext.Provider>
  )
};
export default AuthProvider;

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
   return context;
  };