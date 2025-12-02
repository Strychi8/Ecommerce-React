import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext';
import { useCartContext } from '../context/CartContext';
import styled from 'styled-components';
import { FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';

function Navbar() {

  const { isAuthenticated, usuario, cerrarSesion } = useAuthContext();
  const { vaciarCarrito, carrito } = useCartContext();
  const navigate = useNavigate();

  const totalItemsCarrito = carrito.reduce((total, item) => total + item.cantidad, 0);

  const manejarCerrarSesion = () => {
    navigate("/productos");

    // Tiempo 1'' para asegurar la navegación
    setTimeout(() => {
      vaciarCarrito();
      cerrarSesion();
    }, 100);
  };

   return (
    <>
      <NavbarContainer className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container-fluid">
          <Logo to="/" className="navbar-brand">Strychi Tech</Logo>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarContent"
            aria-controls="navbarContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">Inicio</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/productos" className="nav-link">Productos</NavLink>
              </li>
               <li className="nav-item">
                <NavLink to="/contacto" className="nav-link">Contacto</NavLink>
              </li>
            </ul>

            <SeccionUsuario className="d-flex align-items-center gap-3">
              <ContenedorCarrito> 
                <IconoCarrito to="/pagar" className="nav-link d-flex align-items-center">
                  <span className="me-1">Carrito</span>
                  <FaShoppingCart />  
                  {totalItemsCarrito > 0 && (
                    <ContadorCarrito className='bg-primary'>
                      {totalItemsCarrito}
                    </ContadorCarrito>
                  )}
                </IconoCarrito>
              </ContenedorCarrito>

              {isAuthenticated ? (
                <ContenedorUsuario className="d-flex align-items-center gap-3">
                  <Bienvenida>Hola, {usuario.name}</Bienvenida>
                 
                  {usuario.name === "admin" && (
                    <NavLinkAdmin to="/dashboard" className="nav-link">Dashboard</NavLinkAdmin>
                  )}
                 
                  <BotonCerrarSesion onClick={manejarCerrarSesion} className="btn btn-sm">
                    Cerrar Sesión <FaSignOutAlt /> 
                  </BotonCerrarSesion>
                </ContenedorUsuario>
              ) : (
                <BotonIniciarSesion to="/iniciar-sesion" aria-label="Ingresar">Ingresar</BotonIniciarSesion>
              )}
            </SeccionUsuario>
          </div>
        </div>
      </NavbarContainer>
      <NavbarSpacer />
    </>
  )
} 

export default Navbar;

// Styled Components actualizados
const NavbarContainer = styled.nav`
  background-color: #121c2bff !important;
  padding: 0.5rem 1rem;

  /* Asegura que el área colapsable del menú también tenga el fondo oscuro */
  .navbar-collapse {
    background-color: #121c2bff;
  }

  /* Ajustes para el menú colapsado en móviles: centrar enlaces */
  @media (max-width: 991.98px) {
    .navbar-collapse {
      padding: 1rem 0.75rem;
    }

    .navbar-collapse .navbar-nav {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .navbar-collapse .nav-link {
      padding: 0.5rem 0;
      text-align: center;
      width: 100%;
    }
  }

  /* Centrar logo y hamburguesa en pantallas muy pequeñas */
  @media (max-width: 400px) {
    .container-fluid {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      gap: 0.5rem;
    }

  }

  /* Mantener altura fija solo en pantallas grandes; en móvil dejamos que crezca */
  @media (min-width: 992px) {
    height: 80px;
  }
`;

const NavbarSpacer = styled.div`
  height: 80px;

  @media (max-width: 991.98px) {
    height: 76px;
    background-color: #121c2bff;
  }
`;

const Logo = styled(Link)`
  color: #F2F0EC !important;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
 
  &:hover {
    color: #F2F0EC !important;
  }
`;

// NavLink normal (para usuarios)
const NavLink = styled(Link)`
  color: #F2F0EC !important;
  text-decoration: none;
  padding: 0.5rem 1rem;
  font-weight: 600;
 
  &:hover {
    color: #B5C7EB !important;
    transform: translateY(-1px);
  }

  @media (max-width: 991.98px) {
    
  }
`;

// NavLink especial para admin
const NavLinkAdmin = styled(Link)`
  color: #F2F0EC !important;
  text-decoration: none;
  padding: 0.5rem 1rem;
  font-weight: bold;
 
  &:hover {
    color: #B5C7EB !important;
    transform: translateY(-1px);
  }
`;

const Bienvenida = styled.span`
  color: #F2F0EC;
  font-size: 0.9rem;
  margin: 0;
  white-space: nowrap;

  @media (max-width: 991.98px) {
    margin-bottom: 0.5rem;
  }
`;

const BotonCerrarSesion = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  font-weight: 600;
  color: #DC3545;
  border: 1px solid #DC3545;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  white-space: nowrap;
 
  &:hover {
    background: #DC3545;
    color: #F2F0EC;
  }

  @media (max-width: 991.98px) {
    margin-top: 0.5rem;
  }
`;

const BotonIniciarSesion = styled(Link)`
  background: transparent;
  color: #29903B !important;
  border: 1px solid #29903B;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  white-space: nowrap;
  text-decoration: none;

  &:hover {
    background: #29903B;
    color: #F2F0EC !important;
  }

  @media (max-width: 991.98px) {
    width: 50%;
    text-align: center;
    margin-top: 0.5rem;
  }
`;

const ContenedorCarrito = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const IconoCarrito = styled(Link)`
  color: #F2F0EC !important;
  text-decoration: none;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  position: relative;
  font-size: 1rem;
  font-weight: 600;
  gap: 5px;
 
  &:hover {
    color: #B5C7EB !important;
    transform: translateY(-1px);
  }
`;

const ContadorCarrito = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: red;
  color: #F2F0EC;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
`;

const SeccionUsuario = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 991.98px) {
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;
    width: 100%;
  }
`;

const ContenedorUsuario = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 991.98px) {
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }
`;