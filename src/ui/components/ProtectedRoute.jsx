import { Navigate } from 'react-router-dom';
import { authController } from '@/controller/authController';

export function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setIsAuth(!!data.session);
    });
  }, []);

  if (isAuth === null) return null;

  return isAuth ? children : <Navigate to="/login" replace />;
}

