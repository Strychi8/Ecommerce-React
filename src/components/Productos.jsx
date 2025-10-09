import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CarritoCompras from "./Carrito";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    fetch("https://68e41ae78e116898997b02d9.mockapi.io/api/v1/productos")
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setProductos(datos);
        setCargando(false);
      })
      .catch((error) => {
        {console.error("Error!,", error)}
        setError("Hubo un problema al cargar los productos.");
        setCargando(false);
      });
  }, []);

  const agregarAlCarrito = (producto) => {
    // Si el producto ya está en el carrito, incrementamos su cantidad.
    const existente = carrito.find((p) => p.id === producto.id);
    if (existente) {
      const actualizado = carrito.map((p) =>
        p.id === producto.id ? { ...p, cantidad: (p.cantidad || 1) + 1 } : p
      );
      setCarrito(actualizado);
      alert(`Producto ${producto.nombre} agregado al carrito. Cantidad: ${ (existente.cantidad || 1) + 1 }`);
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
      alert(`Producto ${producto.nombre} agregado al carrito. Cantidad: 1`);
    }
  }

  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
    <ul id="lista-productos">
      {productos.map((producto) => (
        <li key={producto.id}>
        <h2>{producto.nombre}</h2>
          <br />
          Descripción: {producto.descripcion}
          <br />
          Precio: ${producto.precio}
          <br />
          <img src={producto.avatar} alt={producto.nombre} />
          <Link to={`/productos/${producto.id}`} state={{producto}}><button className="btn-detalles">Ver detalles</button></Link>
          <button className="btn-comprar" onClick={() => agregarAlCarrito(producto)}>Comprar</button>
          <hr />
        </li>
      ))}
    </ul>
    <CarritoCompras carrito={carrito} setCarrito={setCarrito} />
    </>
  );
}