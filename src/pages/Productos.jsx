import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { useProducts } from "../context/ProductsContext";

export default function Productos() {
  const { productos, cargando, error } = useProducts();
  const { agregarAlCarrito } = useCartContext();

  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
     <div>
       <h2 className="text-center my-4">Nuestros Productos</h2>
       <p className="text-center">Explora nuestra variedad de productos disponibles.</p>
     </div>
      <ul id="lista-productos">
        {productos.map((producto) => (
          <ProductoItem
            key={producto.id}
            producto={producto}
            onAgregarCarrito={() => agregarAlCarrito(producto)}
          />
        ))}
      </ul>
    </>
  );
}

const ProductoItem = ({ producto, onAgregarCarrito }) => (
  <li>
    <h2>{producto.nombre}</h2>
    <p>{producto.descripcion}</p>
    {producto.avatar ? (
      <img src={producto.avatar} alt={producto.nombre} width="80%" />
    ) : (
      <div style={{ width: '80%', height: 120, background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', borderRadius: 6 }}>
        Sin imagen
      </div>
    )}
    <p><strong>${producto.precio}</strong></p>
   
    <Link to={`/productos/${producto.id}`} state={{producto}}>
      <button>Ver más</button>
    </Link>
   
    <button onClick={onAgregarCarrito}>Agregar al carrito</button>

  </li>
);
