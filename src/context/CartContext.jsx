import React, { createContext, useContext, useState, useEffect } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { parsePrice } from '../utils/formatters';

// Crear el contexto
// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

// Proveedor del contexto
export function CartProvider({ children }) {
  // Estado del carrito
  const [carrito, setCarrito] = useState([]);
  const [cargaCompleta, setCargaCompleta] = useState(false); // Flag o bandera

  // Cargar el carrito desde localStorage al iniciar la aplicación
  useEffect(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado)); // Lo parseamos de string a array de objetos
    }
    setCargaCompleta(true); // Marca que la carga inicial ha terminado
  }, []);

  // Guardar el carrito en localStorage cada vez que cambie
  useEffect(() => {
    if (cargaCompleta) { // Solo guarda si la carga inicial ya se completó
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }
  }, [carrito, cargaCompleta]);

  // Funciones para el carrito
const agregarAlCarrito = (producto) => {
    setCarrito(prevCarrito => {
      const productoExistente = prevCarrito.find(item => item.id === producto.id);
     
      if (productoExistente) {
        return prevCarrito.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: (item.cantidad || 1) + 1 }
            : item
        );
      } else {
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });
    toast.success("Producto agregado al carrito!");
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const eliminarDelCarrito = (productoId) => {
    setCarrito(carrito.filter(item => item.id !== productoId));
  };

   const quitarCantidad = (idProducto) => {
    const carritoActualizado = carrito.map(producto => {
      if (producto.id === idProducto) {
        const cantidadActual = producto.cantidad || 1;
        if (cantidadActual === 1) {
          return null;
        }
        return { ...producto, cantidad: cantidadActual - 1 };
      }
      return producto;
    }).filter(producto => producto !== null);


    setCarrito(carritoActualizado);
  };

    const agregarCantidad = (idProducto) => {
    const nuevoCarrito = carrito.map(producto => {
      if (producto.id === idProducto) {
        return {
          ...producto,
          cantidad: (producto.cantidad || 1) + 1
        };
      }
      return producto;
    });
    setCarrito(nuevoCarrito);
  };

  // Calcular total usando parsePrice para interpretar correctamente formatos como "67.499"
  const total = carrito.reduce((sum, item) => {
    const cantidad = item.cantidad || 1;
    const precioNum = parsePrice(item.precio);
    return sum + (precioNum * cantidad);
  }, 0);
 
  // Valor que se provee a todos los componentes
  const value = {  
    // Carrito
    carrito,
    agregarAlCarrito,
    vaciarCarrito,
    eliminarDelCarrito,

    // f(x) de Cantidad
    agregarCantidad,
    quitarCantidad,

    // f(x) total
    total
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext debe usarse dentro de CartProvider");
  }
  return context;
}