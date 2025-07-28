import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function ProtectedRoute({ children, role }) {
  const { user } = useSelector(s => s.auth); // grabs exactly the `user` field from authSlice's state
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/unauthorized" />;
  return children; //user exists (and has correct role, if required)
}
