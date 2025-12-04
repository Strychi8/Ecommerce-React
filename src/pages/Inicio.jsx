import React from 'react'
import ProductosDestacados from '../components/ProductosDestacados'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Inicio() {
  return (
    <>
      <div className="productos-bg">
        <div className="container py-4 text-center">
          <h1 className='my-4'>Strychi Tech</h1>
          <p className='text-muted fw-semibold mb-4'>Lleva tu setup al siguiente nivel con los mejores periféricos y componentes del mercado.</p>
          <div className="text-center mb-3">
            <BotonVerProductos to="/productos">Explorar Productos</BotonVerProductos>
          </div>
        </div>

        <div className="banda-visual my-5">
          {/* Banda visual ancha entre CTA ("Explorar Productos") y Productos Destacados */}
        </div>

        <div className="container mt-4 mb-5">
          <ProductosDestacados />
        </div>
      </div>
    </>
  )
}

export default Inicio

const BotonVerProductos = styled(Link)`
  background: #1c3152ff;
  color: #fff;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  font-weight: 600;
  transition: background 0.3s;
  line-height: 1;
  text-decoration: none;

  &:hover {
    background: #18386dff;
    color: #fff;
  }
`;
