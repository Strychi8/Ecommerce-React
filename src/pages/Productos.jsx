import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { useProducts } from "../context/ProductsContext";
import { formatMoney } from '../utils/formatters';
import styled from "styled-components";


export default function Productos() {
  const { productos, cargando, error } = useProducts();
  const { agregarAlCarrito } = useCartContext();

  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="productos-bg">
      <div className="container py-4 mt-2">
        <div className="text-center mb-4">
          <h2 className="mb-2">Nuestros Productos</h2>
          <p className="text-muted fw-semibold">Explora nuestra variedad de productos disponibles.</p>
        </div>

        <div className="row g-3 mt-4">
          {productos.map((producto) => (
            <div key={producto.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <ProductoItem
                producto={producto}
                onAgregarCarrito={() => agregarAlCarrito(producto)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const ProductoItem = ({ producto, onAgregarCarrito }) => (
  <div className="card h-100 shadow-sm producto-card">
    {producto.avatar ? (
      <img src={producto.avatar} alt={producto.nombre} className="card-img-top producto-img" />
    ) : (
      <div className="bg-light d-flex align-items-center justify-content-center" style={{ height: 160 }}>
        <span className="text-muted">Sin imagen</span>
      </div>
    )}

    <div className="card-body d-flex flex-column">
      <h6 className="card-title">{producto.nombre}</h6>
      <p className="card-text text-truncate" style={{ maxHeight: '3rem' }}>{producto.descripcion}</p>
      <div className="mt-auto">
        <p className="mb-2"><strong className="text-primary">{formatMoney(producto.precio)}</strong></p>
        <div className="d-flex">
          <BotonVerMas to={`/productos/${producto.id}`} state={{ producto }}>Ver más</BotonVerMas>
          <BotonAgregar onClick={onAgregarCarrito}>Agregar al Carrito</BotonAgregar>
        </div>
      </div>
    </div>
  </div>
);

const BotonVerMas = styled(Link)`
  background: #1c3152ff;
  color: #fff;
  border: none;
  padding: 8px 13px;
  border-radius: 5px;
  font-weight: 600;
  font-size: 0.85rem;
  transition: background 0.3s;
  line-height: 1;
  text-decoration: none;

  &:hover {
    background: #18386dff;
    color: #fff;
  }
`;

const BotonAgregar = styled.button`
  background: #198754;
  color: #fff;
  border: none;
  padding: 8px 13px;
  border-radius: 5px;
  font-weight: 600;
  font-size: 0.85rem;
  margin-left: 8px;
  transition: background 0.3s;
  line-height: 1;

  &:hover {
    background: #157347;
    color: #fff;
  }
`;
