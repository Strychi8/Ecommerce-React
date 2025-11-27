import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import ConfirmModal from './ConfirmModal';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function EliminarProducto() {
  const location = useLocation();
  const navigate = useNavigate();
  const producto = location.state?.producto;
 
  const [cargando, setCargando] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { refetchProductos } = useProducts();

  // Función para eliminar producto
  const eliminarProducto = async () => {
    if (!producto) return;
   
    setCargando(true);
    try {
      // Usar la misma base que ProductsContext
      const respuesta = await fetch(`https://68e41ae78e116898997b02d9.mockapi.io/api/v1/productos/${producto.id}`, {
        method: 'DELETE',
      });

      if (!respuesta.ok) {
        throw new Error('Error al eliminar el producto.');
      }

      toast.success('Producto eliminado correctamente.');

      // Cerrar modal (si estaba abierto) y refrescar lista global
      setShowModal(false);
      try {
        await refetchProductos();
      } catch (e) {
        // si falla el refetch, loguear pero seguir adelante
        console.error('No se pudo refrescar la lista tras eliminar:', e);
      }

      // Volver al dashboard (o a la lista de productos)
      navigate('/dashboard');
     
    } catch (error) {
      console.error(error.message);
      toast.error('Hubo un problema al eliminar el producto.');
    } finally {
      setCargando(false);
    }
  };

  const cancelarEdicion = () => {
    // Navega al dashboard cuando el usuario cancela la acción de eliminación
    navigate('/dashboard');
  };
  
  // Mostrar modal personalizado en lugar de window.confirm
  const manejarEliminar = () => {
    setShowModal(true);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px', textAlign: 'center' }}>
      <h2 style={{ color: '#dc3545', marginBottom: '20px' }}>Eliminar Producto</h2>
     
      <div style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '30px',
        backgroundColor: '#f8f9fa'
      }}>
        <h3 style={{ color: '#dc3545' }}>¿Estás seguro de que deseas eliminar este producto?</h3>
       
        <div style={{ textAlign: 'left', margin: '20px 0' }}>
          <p><strong>Nombre:</strong> {producto.nombre}</p>
          <p><strong>Precio:</strong> ${producto.precio}</p>
          <p><strong>Marca:</strong> {producto.marca || 'Sin marca'}</p>
          <p><strong>Descripción:</strong> {producto.descripcion}</p>
          {producto.avatar && (
            <img
              src={producto.avatar}
              alt="Producto a eliminar"
              style={{ maxWidth: '200px', marginTop: '10px' }}
            />
          )}
        </div>


        <p style={{ color: '#666', fontStyle: 'italic' }}>
          Esta acción no se puede deshacer. El producto será eliminado permanentemente.
        </p>
      </div>


      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
        <button
          onClick={manejarEliminar}
          disabled={cargando}
          style={{
            padding: '12px 24px',
            backgroundColor: cargando ? '#ccc' : '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: cargando ? 'not-allowed' : 'pointer',
            fontSize: '16px'
          }}
        >
          {cargando ? 'Eliminando...' : 'Sí, Eliminar'}
        </button>
       
        <button
          onClick={cancelarEdicion}
          disabled={cargando}
          style={{
            padding: '12px 24px',
            backgroundColor: cargando ? '#ccc' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: cargando ? 'not-allowed' : 'pointer',
            fontSize: '16px'
          }}
        >
          Cancelar
        </button>
      </div>
      
      <ConfirmModal
        show={showModal}
        title="Confirmar eliminación"
        message={
          <>
            ¿Estás seguro de que deseas eliminar el producto <strong>"{producto?.nombre}"</strong>?<br/>
            <span style={{ color: '#666', fontSize: 13 }}>Esta acción no se puede deshacer.</span>
          </>
        }
        onCancel={() => setShowModal(false)}
        onConfirm={eliminarProducto}
        confirmText="Sí, eliminar"
        cancelText="Cancelar"
        loading={cargando}
      />
    
    </div>
  );
} export default EliminarProducto;