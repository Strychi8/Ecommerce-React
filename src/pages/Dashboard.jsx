import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useProducts } from '../context/ProductsContext';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaPlus, FaPen, FaTrashAlt } from 'react-icons/fa';
import { formatMoney, formatDateShort } from '../utils/formatters';


export default function Dashboard() {
  const { productos, cargando, error, refetchProductos } = useProducts();
  const { usuario } = useAuthContext();
  const navigate = useNavigate();
  
  const tokenActual = localStorage.getItem('authToken'); // Obtener el token actual

  // Función para navegar al formulario de agregar producto
  const manejarAgregarProducto = () => navigate('/formulario-producto');

  // Funcion para navegar al formulario de edición
  const manejarEditar = (producto) => navigate('/formulario-producto', { state: { producto } });

  // Navegar a la página de confirmación de eliminación
  const manejarEliminar = async (producto) => navigate('/eliminar-producto', { state: { producto } });

  const manejarRefresh = async () => {
    try {
      await refetchProductos();
    } catch (err) {
      console.error('Error al refrescar productos', err);
    }
  };

  return (
    <div className="dashboard-bg">
      <div className="container my-4">
        <div className="row g-3 mb-3">
          <div className="col-12 col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h1 className="h5 mb-1 fw-bold">Panel de Administración</h1>
                <p className="mb-0 text-muted">Bienvenido, <strong>{usuario?.name}</strong></p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="card h-100">
                <div className="card-body">
                  <strong>Token de autenticación:</strong>
                  <div className="mt-2"><code className="token-code">{tokenActual}</code></div>
                </div>
              </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h2 className="card-title text-center my-3 fw-bold fs-4">
              Productos totales ({productos.length})
            </h2>
              <div className="d-flex gap-2 mb-3">
                <BotonAgregar onClick={manejarAgregarProducto} aria-label="Agregar nuevo producto">
                  <FaPlus />
                  <span>Nuevo Producto</span>
                </BotonAgregar>
                <BotonRefrescar onClick={manejarRefresh} aria-label="Refrescar lista">Refrescar</BotonRefrescar>
              </div>

            {cargando && <p>Cargando productos...</p>}
            {error && <p className="text-danger">{error}</p>}

            {!cargando && !error && (
              <div className="table-responsive mt-2">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Imagen</th>
                      <th>Nombre</th>
                      <th>Marca</th>
                      <th>Precio</th>
                      <th>Creado el</th>
                      <th>Modificado el</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos.map(producto => (
                      <tr key={producto.id}>
                        <td className="align-middle">{producto.id}</td>
                        <td className="align-middle">
                          {producto.avatar ? (
                            <img src={producto.avatar} alt={producto.nombre} className="imagen-dashboard rounded" />
                          ) : (
                            <div className="sin-imagen-dashboard rounded d-flex align-items-center justify-content-center">Sin imagen</div>
                          )}
                        </td>
                        <td>{producto.nombre}</td>
                        <td>{producto.marca || producto.brand || '-'}</td>
                        <td>{formatMoney(producto.precio)}</td>
                        <td>{formatDateShort(producto.createdAt)}</td>
                        <td>{formatDateShort(producto.modifiedAt)}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <VerDetalle to={`/productos/${producto.id}`} state={{producto}}>Ver</VerDetalle>
                            <BotonEditar onClick={() => manejarEditar(producto)}><FaPen /></BotonEditar>
                            <BotonEliminar onClick={() => manejarEliminar(producto)}><FaTrashAlt /></BotonEliminar>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const VerDetalle = styled(Link)`
  display: inline-block;
  padding: .50rem .5rem;
  font-size: .875rem;
  font-weight: 600;
  color: #0b8793;
  border: 1px solid #0b8793;
  border-radius: .25rem;
  text-decoration: none;
  background: transparent;
  line-height: 1;
  transition: background 0.3s, color 0.3s;
  &:hover { background: #0b8793; color: #fff; text-decoration: none; }
`;

const BotonEditar = styled.button`
  padding: .40rem .5rem;
  font-size: .875rem;
  font-weight: 600;
  background: #1c3152ff;
  color: #fff;
  border: none;
  border-radius: .25rem;
  cursor: pointer;
  line-height: 1;
  transition: background 0.3s;
  &:hover { background: #2c4f85ff; }
`;

const BotonEliminar = styled.button`
  padding: .40rem .5rem;
  font-size: .875rem;
  font-weight: 600;
  background: #d41d20ff;
  color: #fff;
  border: none;
  border-radius: .25rem;
  cursor: pointer;
  line-height: 1;
  transition: background 0.3s;
  &:hover { background: #ec2d2def; }
`;

const BotonAgregar = styled.button`
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  padding: .70rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  background: #198754;
  color: #fff;
  border: none;
  border-radius: .375rem;
  cursor: pointer;
  line-height: 1;
  transition: background 0.3s;
  svg { display: block; }
  &:hover { background: #157347; }
`;

const BotonRefrescar = styled.button`
  display: inline-flex;
  align-items: center;
  padding: .70rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  background: transparent;
  color: #0b8793;
  border: 1px solid #0b8793;
  border-radius: .375rem;
  cursor: pointer;
  line-height: 1;
  transition: background 0.3s ,color 0.3s;
  &:hover { background: #0b8793; color: #fff; }
`;
