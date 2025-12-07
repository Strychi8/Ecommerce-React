import React, { createContext, useState, useContext, useEffect } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Función de validación en el contexto
  const validarProducto = (producto) => {
    const errores = {};

    // nombre
    if (!producto.nombre?.trim()) {
      errores.nombre = 'El nombre es obligatorio.';
    }

    // precio
    if (!producto.precio?.toString().trim()) {
      errores.precio = 'El precio es obligatorio.';
    } else {
      const precioLimpio = producto.precio.toString().replace(/\./g, '').replace(',', '.');
      const precioNumerico = parseFloat(precioLimpio);
     
      if (!/^[\d.,]+$/.test(producto.precio.toString().replace(/\./g, ''))) {
        errores.precio = 'Solo números, puntos o comas.';
      } else if (isNaN(precioNumerico)) {
        errores.precio = 'Precio no válido.';
      } else if (precioNumerico <= 0) {
        errores.precio = 'Debe ser mayor a 0.';
      }
    }

    // descripción
    if (!producto.descripcion?.trim()) {
      errores.descripcion = 'La descripción es obligatoria.';
    } else if (producto.descripcion.length < 10) {
      errores.descripcion = 'Mínimo 10 caracteres.';
    } else if (producto.descripcion.length > 1000) {
      errores.descripcion = 'Máximo 1000 caracteres.';
    }

    return errores;
  };

  // Función para validar si el formulario es válido - nombre simplificado
  const validar = (producto) => {
    const errores = validarProducto(producto);
    return {
      esValido: Object.keys(errores).length === 0,
      errores
    };
  };

  useEffect(() => {
    // cargarProductos se define fuera para poder reutilizarlo (refetch)
    cargarProductos();
  }, []);

  // Definir la función de carga pública para poder reusar (refresh) desde componentes
  async function cargarProductos() {
    setCargando(true);
    try {
      const respuesta = await fetch('https://68e41ae78e116898997b02d9.mockapi.io/api/v1/productos');
      if (!respuesta.ok) throw new Error('Error al cargar productos');
      const datos = await respuesta.json();
      setProductos(datos);
      setError(null);
      return datos;
    } catch (error) {
      console.error('Error al cargar productos:', error);
      setError("Hubo un problema al cargar los productos.");
      throw error;
    } finally {
      setCargando(false);
    }
  }

  const agregarProducto = async (nuevoProducto) => {
    try {
      // Asegurar createdAt si no lo proporciona el formulario
      const payload = { ...nuevoProducto, createdAt: nuevoProducto.createdAt || new Date().toISOString() };
      const respuesta = await fetch('https://68e41ae78e116898997b02d9.mockapi.io/api/v1/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!respuesta.ok) throw new Error('Error al agregar el producto');

      const data = await respuesta.json();
      setProductos(prev => [...prev, data]);
      return data;
    } catch (error) {
      console.error('Error al agregar producto:', error);
      throw error;
    }
  };

  const editarProducto = async (productoActualizado) => {
    try {
      // asegurarse de registrar la fecha de modificación
      const payload = { ...productoActualizado, modifiedAt: new Date().toISOString() };
      const respuesta = await fetch(`https://68e41ae78e116898997b02d9.mockapi.io/api/v1/productos/${productoActualizado.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!respuesta.ok) throw new Error('Error al editar el producto');

      const data = await respuesta.json();
      setProductos(prev =>
        prev.map(producto =>
          producto.id === productoActualizado.id ? data : producto
        )
      );
      return data;
    } catch (error) {
      console.error('Error al editar producto:', error);
      throw error;
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        productos,
        cargando,
        error,
        agregarProducto,
        editarProducto,
        validarProducto,
        validar,
        // Exponer la función para recargar productos sin recargar la página
        refetchProductos: cargarProductos
      }}>
      {children}
    </ProductsContext.Provider>
  );
};

// Hook personalizado para el contexto
// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts debe ser usado dentro de un ProductsProvider');
  }
  return context;
};