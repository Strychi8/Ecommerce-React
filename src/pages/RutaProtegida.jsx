import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function RutaProtegida({ children, soloAdmin = false }) {
  const { usuario, cargando } = useAuthContext();
  const location = useLocation();

  if (cargando) {
    return <div>Cargando...</div>;
  }
 
  if (!usuario) {
    // Pasa el state actual (que contiene el carrito) a /login
    return <Navigate to="/iniciar-sesion" state={location.state} replace />;
  }

  // Comprueba la propiedad `name` del usuario (se guarda como `name` en AuthContext)
  if (soloAdmin && usuario?.name !== "admin") {
    return <Navigate to="/productos" replace />;
  }
  return children;
} export default RutaProtegida;