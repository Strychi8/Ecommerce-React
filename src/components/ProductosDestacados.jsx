import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import { formatMoney } from '../utils/formatters';
import styled from 'styled-components';

// Muestra hasta 4 productos destacados en formato de tarjetas (no carrusel)
export default function ProductosDestacados({ title = 'Productos Destacados' }) {
  const { productos = [], cargando } = useProducts();

  if (cargando) return null;

  const destacados = productos.slice(2, 6);

  return (
    <div className="container mt-5 productos-destacados">
      <h3 className="mb-4 text-center">{title}</h3>
      <div className="row g-3">
        {destacados.map(producto => (
          <div key={producto.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 shadow-sm producto-card">
              {producto.avatar ? (
                <img 
                  src={producto.avatar} 
                  alt={producto.nombre} 
                  className="card-img-top producto-img" 
                />
              ) : (
                <div className="bg-light d-flex align-items-center justify-content-center" style={{ height: 140 }}>
                  <span className="text-muted">Sin imagen</span>
                </div>
              )}
              <div className="card-body p-2 d-flex flex-column">
                <h4 className="card-title text-center fs-5">{producto.nombre}</h4>
                <div className="mt-auto">
                  <p className="card-text fs-5 fw-bold text-primary text-center mb-2">{formatMoney(producto.precio)}</p>
                  <div className="d-grid gap-2">
                    <BotonVerMas to={`/productos/${producto.id}`} state={{ producto }}>Ver más</BotonVerMas>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
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
