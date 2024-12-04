import React,{createContext, useContext, useState, useEffect} from 'react'

interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
  }

  const AuthContext = createContext<AuthContextType | undefined>(undefined);
const AuthProvider:React.FC<{children: React.ReactNode}> = ({children}) => {
    const[isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);
    
    useEffect(()=>{
        const token = localStorage.getItem('jwt');
        setIsAuthenticated(!!token);
        setLoading(false);
    },[]);

    const login = (token: string)=>{
        localStorage.setItem('jwt', token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('jwt');
        setIsAuthenticated(false);
      };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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