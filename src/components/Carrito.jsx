import React from 'react';

export default function CarritoCompras({ carrito, setCarrito }) {
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const total = carrito.reduce((sum, item) => sum + Number(item.precio) * (item.cantidad || 1), 0);

  return (
    <div>
      <hr />
      <h2>Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
          {carrito.map((item) => (
            <div key={item.id}>
              <p>
                {item.nombre} - ${Number(item.precio).toFixed(3)} - Cantidad: {item.cantidad}
              </p>
            </div>
          ))}

          <div>
            <hr />
            Total: ${Number(total).toFixed(3)}
          </div>

          <button className='btn-vaciar' onClick={vaciarCarrito}>
            Vaciar Carrito
          </button>
        </>
      )}
    </div>
  );
}