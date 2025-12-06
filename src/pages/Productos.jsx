import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { useProducts } from "../context/ProductsContext";
import { useEffect, useState } from "react";
import { formatMoney } from '../utils/formatters';
import styled from "styled-components";
import { FaShoppingCart } from 'react-icons/fa';


export default function Productos() {
  const { productos, cargando, error } = useProducts();
  const { agregarAlCarrito } = useCartContext();

  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);

   useEffect(() => {
    // Función para actualizar meta tags
    const updateMetaTag = (name, content, attribute = 'name') => {
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);

      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };
    
    // Meta tags básicos
    updateMetaTag('description', 'Explora el catálogo de Strychi Tech. Encuentra los mejores perifericos y componentes del mercado.');
    updateMetaTag('keywords', 'perifericos, componentes, tecnología, hardware, gamer, Strychi Tech');
    updateMetaTag('author', '@webmaster');
    updateMetaTag('robots', 'index, follow');

    // Open Graph
    updateMetaTag('og:title', 'Tienda de Strychi Tech', 'property');
    updateMetaTag('og:description', 'Explora el catálogo de Strychi Tech.', 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:image', 'https://tudominio.com/logo.jpg', 'property');
    updateMetaTag('og:url', window.location.href, 'property');
  }, []);

  const productosPorPagina = 8;

   const productosFiltrados = productos.filter(
    (producto) =>
      producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      (producto.marca &&
        producto.marca.toLowerCase().includes(busqueda.toLowerCase()))
  );

  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosActuales = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto);
  const etiquetaActual = productosActuales.length === 1 ? 'producto' : 'productos';
  const etiquetaFiltrados = productosFiltrados.length === 1 ? 'producto' : 'productos';
 
  // Cambiar de página
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
  const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);


  // Resetear a página 1 con búsquedas
  const manejarBusqueda = (e) => {
    setBusqueda(e.target.value);
    setPaginaActual(1);
  };

  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="productos-bg">
      <div className="container py-4 mt-2">
        <div className="text-center mb-4">
          <h2 className="mb-2">Nuestros Productos</h2>
          <p className="text-muted fw-semibold">Explora nuestra variedad de productos disponibles.</p>
        </div>

         {/* Barra de búsqueda */}
         <div className="row mb-4">
          <div className="col-12 col-md-6">
            <label className="form-label fw-bold">Buscar productos</label>
            <input
              type="text"
              placeholder="Buscar por nombre o marca..."
              className="form-control"
              value={busqueda}
              onChange={manejarBusqueda}
            />
            {busqueda && (
              <small className="text-muted">
                Mostrando {productosFiltrados.length} de {productos.length} {etiquetaFiltrados}
              </small>
            )}
          </div>
        </div>

        {/* Grid de productos */}
        <div className="row g-3 mt-4">
          {productosActuales.map((producto) => (
            <div key={producto.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100 shadow-sm producto-card">
                {producto.avatar ? (
                  <img
                    src={producto.avatar}
                    alt={producto.nombre}
                    className="card-img-top producto-img"
                  />
                ) : (
                  <div className="bg-light d-flex align-items-center justify-content-center" style={{ height: 200 }}>
                    <span className="text-muted">Sin imagen</span>
                  </div>
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{producto.nombre}</h5>
                  <p className="card-text flex-grow-1">{producto.descripcion}</p>
                  <p className="card-text fw-bold text-primary">{formatMoney(producto.precio)}</p>
                  <div className="mt-auto">
                    <div className="d-grid gap-2">
                      <BotonVerMas to={`/productos/${producto.id}`} state={{ producto }}>Ver más</BotonVerMas>
                      <BotonAgregar onClick={() => agregarAlCarrito(producto)}><FaShoppingCart /> Agregar al carrito</BotonAgregar>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Paginador - Estilo simplificado */}
        {productosFiltrados.length > productosPorPagina && (
          <div className="d-flex justify-content-center my-4">
            {Array.from({ length: totalPaginas }, (_, index) => (
              <PaginadorBtn
                key={index + 1}
                active={paginaActual === index + 1}
                onClick={() => cambiarPagina(index + 1)}
                aria-current={paginaActual === index + 1 ? 'page' : undefined}
              >
                {index + 1}
              </PaginadorBtn>
            ))}
          </div>
        )}

        {/* Información de la página actual */}
        {productosFiltrados.length > 0 && (
          <div className="text-center text-muted mt-2">
            <small>
              Mostrando {productosActuales.length} {etiquetaActual} (página {paginaActual} de {totalPaginas})
            </small>
          </div>
        )}

      </div>
    </div>
  );
}

const BotonVerMas = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
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
  transition: background 0.3s;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: #157347;
    color: #fff;
  }
`;

const PaginadorBtn = styled.button`
  min-width: 40px;
  padding: 6px 10px;
  border-radius: 8px;
  font-weight: 700;
  border: 1px solid #0b8793;
  background: ${props => (props.active ? 'linear-gradient(180deg,#1b4d7a,#153856)' : 'transparent')};
  color: ${props => (props.active ? '#fff' : '#0b8793')};
  transition: transform .12s ease, background .12s ease;
  display: inline-block;
  margin: 0 4px;

  &:hover { transform: translateY(-1px); }
`;
