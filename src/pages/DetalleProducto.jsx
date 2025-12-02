import { useLocation, useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { formatMoney } from "../utils/formatters";
import { useCartContext } from "../context/CartContext";
import { FaShoppingCart, FaArrowLeft } from "react-icons/fa";

const ProductoDetalle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { agregarAlCarrito } = useCartContext();
  const producto = location.state?.producto;
  const nombreProducto = producto?.nombre || "Producto";

  // Si no hay "producto", mostrar aviso y evitar errores. 
  // Protege contra productos undefined al recargar la página directamente.
  if (!producto) {
    return (
      <div className="container-md py-3 mt-4">
        <div className="border border-danger text-center mb-4 p-4 rounded">
          <h2 className="fw-bold text-danger">Producto no encontrado.</h2>
          <p className="fw-semibold fst-italic">No se pudo cargar la información del producto.</p>
          <BotonVolverAProductos to="/productos" className="btn btn-primary">
            <FaArrowLeft /> Volver a Productos
          </BotonVolverAProductos>
        </div>
      </div>
    );
  }

  return (
    <div className="detalle-producto-bg">
      <div className="container-md py-3">
        {/* Breadcrumbs */}
        <nav
          style={{ "--bs-breadcrumb-divider": '"/"' }}
          aria-label="breadcrumb"
        >
          <ol className="breadcrumb bg-transparent p-0 mb-2">
            <li className="breadcrumb-item">
              <BreadcrumbLink to="/">Home</BreadcrumbLink>
            </li>
            <li className="breadcrumb-item">
              <BreadcrumbLink to="/productos">Productos</BreadcrumbLink>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {nombreProducto}
            </li>
          </ol>
        </nav>

        {/* Tarjeta principal que contiene imagen e información */}
        <div className="card shadow-sm bg-white mb-4">
          <div className="card-body">
            {/* Fila Superior: para separar en 2 columnas */}
            <div className="row align-items-start g-0">
              {/* Columna para la imagen - IZQUIERDA (md-6) */}
              <div className="col-md-6">
                <div className="card border-0">
                  <div className="card-body text-center p-2">
                    <img
                      src={producto.avatar}
                      alt={producto.nombre}
                      className="img-fluid rounded w-75"
                    />
                  </div>
                </div>
              </div>

              {/* Columna para la informacion - DERECHA (md-6) */}
              <div className="col-md-6">
                <div className="card border-0">
                  <div className="card-body p-1">
                    <h4 className="text-primary mb-2">{producto.nombre}</h4>

                    <div className="mb-2">
                      <strong>Descripcion:</strong>
                      <p className="card-text mb-1">{producto.descripcion}</p>
                    </div>

                    <div className="mb-2">
                      <strong>Marca:</strong>
                      <span className="badge bg-secondary ms-1">
                        {producto.marca}
                      </span>
                    </div>

                    <div className="mb-3">
                      <strong>Precio:</strong>
                      <h5 className="text-primary d-inline ms-1 fs-5">
                        {formatMoney(producto?.precio)}
                      </h5>

                      <div className="mt-3 d-flex align-items-center">
                        <BotonAgregar
                          type="button"
                          aria-label="Agregar al carrito"
                          onClick={() => agregarAlCarrito(producto)}
                        >
                          <FaShoppingCart /> Agregar al Carrito
                        </BotonAgregar>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <BotonVolver
                onClick={() =>
                  window.history.length > 1
                    ? navigate(-1)
                    : navigate("/productos")
                }
              >
                <FaArrowLeft /> Volver
              </BotonVolver>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; export default ProductoDetalle;

const BotonVolver = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #1c3152ff;
  border: 1px solid #1c3152ff;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background 0.3s;
  background: transparent;
  line-height: 1;
  width: auto;

  &:hover {
    background: #1c3152ff;
    color: #fff;
  }
`;

const BotonVolverAProductos = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #1c3152ff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background 0.3s;
  line-height: 1;
  width: auto;

  &:hover {
    background: #18386dff;
    color: #fff;
  }
`;

const BotonAgregar = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #198754;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background 0.3s;
  line-height: 1;
  width: auto;

  &:hover {
    background: #157347;
  }
`;

const BreadcrumbLink = styled(Link)`
  color: #0b8793;
  text-decoration: none;
  font-weight: 600;
  &:hover {
    color: #075f64;
    text-decoration: underline;
  }
  @media (max-width: 576px) {
    display: inline-block;
    max-width: 140px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: middle;
  }
`;
