import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { formatMoney } from '../utils/formatters';


export default function CarritoCompras() {
  const { carrito, vaciarCarrito, agregarCantidad, quitarCantidad, total } = useCartContext();

  const navigate = useNavigate();

  const irAPagar = () => {
    navigate("/pagar", { state: { carrito } });
  };

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
                {item.nombre} - {formatMoney(item.precio)}
                (Cantidad: {item.cantidad || 1})
                <button onClick={() => quitarCantidad(item.id)}>-</button>
                 <button onClick={() => agregarCantidad(item.id)}>+</button>
            </div>
          ))}
          <div>
            <hr />
            Total: {formatMoney(total)}
          </div>
          <button onClick={vaciarCarrito}>Vaciar Carrito</button>
          <button onClick={irAPagar}>Pagar</button>
        </>
      )}
    </div>
  );
}