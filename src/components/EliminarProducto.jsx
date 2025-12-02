import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import ConfirmModal from './ConfirmModal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import { formatMoney } from '../utils/formatters';


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
    <div className="login-bg d-flex align-items-center justify-content-center">
      <div className="login-card shadow-sm" style={{ maxWidth: 720, width: '100%' }}>
        <div className="card border-danger">
          <div className="card-header bg-danger text-white">
            <h5 className="mb-0">Eliminar Producto</h5>
          </div>
          <div className="card-body">
            <p className="text-danger h6">¿Estás seguro de que deseas eliminar este producto?</p>

            <ul className="list-group mb-3">
              <li className="list-group-item border-danger"><strong>Nombre:</strong> {producto.nombre}</li>
              <li className="list-group-item border-danger"><strong>Precio:</strong> {formatMoney(producto.precio)}</li>
              <li className="list-group-item border-danger"><strong>Marca:</strong> {producto.marca || 'Sin marca'}</li>
              <li className="list-group-item border-danger"><strong>Descripción:</strong> {producto.descripcion}</li>
            </ul>

            {producto.avatar && (
              <img src={producto.avatar} alt="Producto a eliminar" className="img-fluid mb-3 mx-auto d-block" style={{ maxWidth: 200 }} />
            )}

            <div className="d-flex justify-content-center gap-3 mt-4">
              <BotonEliminar
                onClick={manejarEliminar}
                disabled={cargando}
              >
                {cargando ? 'Eliminando...' : 'Sí, eliminar'}
              </BotonEliminar>

              <BotonCancelar
                onClick={cancelarEdicion}
                disabled={cargando}
              >
                Cancelar
              </BotonCancelar>
            </div>
          </div>
        </div>

        <ConfirmModal
          show={showModal}
          title="Confirmar eliminación"
          message={
            <>
              ¿Estás seguro de que deseas eliminar el producto <strong>"{producto?.nombre}"</strong>?<br />
              <span className="text-muted" style={{ fontSize: 13 }}>Esta acción no se puede deshacer. El producto será eliminado permanentemente.</span>
            </>
          }
          onCancel={() => setShowModal(false)}
          onConfirm={eliminarProducto}
          confirmText="Sí, eliminar"
          cancelText="Cancelar"
          loading={cargando}
        />
      </div>
    </div>
  );
} export default EliminarProducto;

const BotonEliminar = styled.button`
  flex: 1;
  background: #EC3939;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 0.55rem 1rem;
  font-weight: 600;
  box-shadow: 0 6px 18px rgba(0,0,0,0.45);
  transition: background 0.2s;

  &:hover {
    background: #d12d2dff;
  }
`;

const BotonCancelar = styled.button`
  flex: 1;
  background: #8597c5ff;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 0.55rem 1rem;
  font-weight: 600;
  box-shadow: 0 6px 18px rgba(0,0,0,0.45);
  transition: background 0.2s;

  &:hover {
    background: #6d88ceff;
  }
`;