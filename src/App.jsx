import Inicio from "./pages/Inicio";
import Contacto from './pages/Contacto'
import Navbar from "./pages/Navbar";
import Productos from "./pages/Productos";
import ProductoDetalle from "./pages/DetalleProducto";
import Pagar from "./pages/Pagar";
import RutaProtegida from "./pages/RutaProtegida";
import IniciarSesion from "./pages/IniciarSesion";
import Footer from "./pages/Footer";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ProductsProvider } from "./context/ProductsContext";
import Dashboard from "./pages/Dashboard";
import FormularioProducto from "./components/FormularioProducto";
import EliminarProducto from "./components/EliminarProducto";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <AuthProvider>
        <CartProvider>
          <ProductsProvider>
            <Navbar />
            {/* ToastContainer global para notificaciones */}
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />

              <Routes>
              {/* RUTAS PÚBLICAS */}
              <Route path="/" element={<Inicio />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/productos/:id" element={<ProductoDetalle />} />
              <Route
                path="/productos/:categoria/:id"
                element={<ProductoDetalle />}
              />
              <Route path="/iniciar-sesion" element={<IniciarSesion />} />

              {/* RUTA PROTEGIDA - Usuarios */}
              <Route
                path="/pagar"
                element={
                  <RutaProtegida>
                    <Pagar />
                  </RutaProtegida>
                }
              />

              {/* RUTA PROTEGIDA - Admin */}
              <Route
                path="/dashboard"
                element={
                  <RutaProtegida soloAdmin={true}>
                    <Dashboard />
                  </RutaProtegida>
                }
              />

              {/* Ruta para formulario Agregar/Editar */}
              <Route
                path="/formulario-producto"
                element={
                  <RutaProtegida soloAdmin={true}>
                    <FormularioProducto />
                  </RutaProtegida>
                }
              />
              {/* Ruta para ELIMINAR producto */}
              <Route
                path="/eliminar-producto"
                element={
                  <RutaProtegida soloAdmin={true}>
                    <EliminarProducto />
                  </RutaProtegida>
                }
              />

              {/* Redirección por defecto */}
              <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>

            <Footer />
          </ProductsProvider>
        </CartProvider>
      </AuthProvider>
    </div>
  );

} export default App;
