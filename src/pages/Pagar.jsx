import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useCartContext } from "../context/CartContext";
import styled from 'styled-components';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Pagar() {
  const { usuario } = useAuthContext();
  const { carrito, total, vaciarCarrito, agregarCantidad, quitarCantidad } = useCartContext();
  const navigate = useNavigate();

  // Función para finalizar compra
  const comprar = () => {
    toast.success("¡Compra realizada con éxito!");
    vaciarCarrito();
    navigate("/productos");
  };

  return (
    <div className="container my-5">
      <div className="row mb-3">
        <div className="col-12">
          <h2 className="h4">Resumen de la compra</h2>
          <p className="mb-0">Usuario: <strong>{usuario?.name}</strong></p>
          <p>Email: <strong>{usuario?.email}</strong></p>
          <hr />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Tu carrito</h5>

              {carrito.length === 0 && (
                <p className="text-muted">No hay productos en el carrito.</p>
              )}

              {carrito.map((producto) => {
                const cantidad = Number(producto.cantidad || 1);
                const precioUnitario = Number(producto.precio || 0);
                const subtotal = cantidad * precioUnitario;
                return (
                  <div key={producto.id} className="d-flex align-items-center mb-3">
                    {producto.avatar ? (
                      <img src={producto.avatar} alt={producto.nombre} className="rounded me-3" style={{ width: 90, height: 70, objectFit: 'cover' }} />
                    ) : (
                      <div className="bg-light rounded me-3 d-flex align-items-center justify-content-center" style={{ width: 90, height: 70 }}>
                        <small className="text-muted">Sin imagen</small>
                      </div>
                    )}

                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="mb-1">{producto.nombre}</h6>
                              <div className="text-muted small">Precio unidad: ${precioUnitario.toFixed(3)}</div>
                        </div>
                            <div className="text-end">
                              <div className="d-flex align-items-center justify-content-end gap-2">
                                <BotonCantidad
                                  aria-label={`Quitar una unidad de ${producto.nombre}`}
                                  onClick={() => quitarCantidad(producto.id)}
                                  disabled={cantidad <= 1}
                                >
                                  -
                                </BotonCantidad>
                                <div className="small px-2">{cantidad}</div>
                                <BotonCantidad
                                  aria-label={`Agregar una unidad de ${producto.nombre}`}
                                  onClick={() => agregarCantidad(producto.id)}
                                >
                                  +
                                </BotonCantidad>
                              </div>
                              <div className="fw-bold mt-2">Subtotal: ${subtotal.toFixed(3)}</div>
                            </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Total a pagar</h5>
              <p className="display-6 fw-bold mb-3">${Number(total).toFixed(3)}</p>

              <div className="d-grid gap-2">
                <button className="btn btn-success" onClick={comprar} disabled={carrito.length === 0}>
                  Confirmar y Pagar
                </button>
                <button className="btn btn-danger" onClick={vaciarCarrito} disabled={carrito.length === 0}>
                  Vaciar carrito
                </button>
                <button className="btn btn-warning" onClick={() => navigate('/productos')}>
                  {carrito.length > 0 ? "Seguir Comprando" : "Volver a Productos"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const BotonCantidad = styled.button`
  background-color: #121C2B;
  color: #fff;
  border: 1px solid rgba(255,255,255,0.06);
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  line-height: 1;

  &:hover {
    background-color: #192e46ff;
  }

  &:disabled {
    opacity: 0.6;
    pointer-events: none;
  }
`;