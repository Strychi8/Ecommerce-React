import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from 'styled-components';
import { FaAsterisk } from 'react-icons/fa';


function FormularioProducto() {
  const navigate = useNavigate();
  const location = useLocation();
  const { agregarProducto, editarProducto, validar } = useProducts();

  const productoRecibido = location.state?.producto;
  const modo = productoRecibido ? 'editar' : 'agregar';

  const [producto, setProducto] = useState({
    id: '',
    nombre: '',
    precio: '',
    descripcion: '',
    marca: '',
    avatar: ''
  });

  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (modo === 'editar' && productoRecibido) {
      setProducto({
        id: productoRecibido.id || '',
        nombre: productoRecibido.nombre || '',
        precio: productoRecibido.precio || '',
        descripcion: productoRecibido.descripcion || '',
        marca: productoRecibido.marca || '',
        avatar: productoRecibido.avatar || ''
      });
    }
  }, [modo, productoRecibido]);

  // f(x) manejarCambios | inputs
  const manejarCambio = (e) => {
    const { name, value } = e.target;
   
    // Valida longitud max. descripción
    if (name === 'descripcion' && value.length > 200) return;
   
    setProducto(prev => ({ ...prev, [name]: value }));
   
    // Limpiar error del campo si existe
    if (errores[name]) {
      setErrores(prev => ({ ...prev, [name]: '' }));
    }
  };

  // f(x) validarFormulario - ahora usa la validación del contexto
  const validarFormulario = () => {
    const resultado = validar(producto);
    setErrores(resultado.errores);
    return resultado.esValido;
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    
    if (!validarFormulario()) return;

    setCargando(true);
    try {
      const productoEnviar = {
        ...producto,
        precio: producto.precio.toString().replace(',', '.')
      };

      if (modo === 'agregar') {
        const nuevoProducto = await agregarProducto(productoEnviar);
        toast.success(`Producto "${nuevoProducto.nombre}" agregado correctamente con ID: ${nuevoProducto.id}`);
        
        setProducto({ id: '', nombre: '', precio: '', descripcion: '', marca: '', avatar: '' });
       
        setTimeout(() => navigate('/dashboard'), 100);
      } else {
        await editarProducto(productoEnviar);
        toast.success('Producto actualizado correctamente');
        setTimeout(() => navigate('/dashboard'), 100);
      }

      setErrores({});
    } catch (error) {
      toast.error(`Hubo un problema al ${modo === 'editar' ? 'actualizar' : 'agregar'} el producto`);
      console.error('Error:', error);
    } finally {
      setCargando(false);
    }
  };

  const cancelarEdicion = () => {
    navigate('/dashboard');
  };


  return (
    <div className="login-bg d-flex align-items-center justify-content-center">
      <div className="login-card shadow-sm" style={{ maxWidth: 600, width: '100%' }}>
        <div className="text-center mb-2 p-3">
          <h2 className="mt-1">{modo === 'editar' ? 'Editar' : 'Agregar'} Producto</h2>
          {modo === 'editar' && productoRecibido && (
            <p style={{ marginBottom: 0 }}>Editando: {productoRecibido.nombre} (ID: {productoRecibido.id})</p>
          )}
        </div>

        <form onSubmit={manejarEnvio} className="p-4">
          <div className="mb-3">
            <label className="form-label">Nombre <FaAsterisk className='icono-asterisco'/></label>
            <input
              className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
              type="text"
              name="nombre"
              value={producto.nombre}
              onChange={manejarCambio}
              disabled={cargando}
              placeholder="Ingrese el nombre del producto"
            />
            {errores.nombre && <div>{errores.nombre}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Precio <FaAsterisk className='icono-asterisco'/></label>
            <input
              className={`form-control ${errores.precio ? 'is-invalid' : ''}`}
              type="text"
              name="precio"
              value={producto.precio}
              onChange={manejarCambio}
              disabled={cargando}
              placeholder="Ej: 40.000"
              inputMode="decimal"
            />
            <div className="campos-vacios">Formato argentino: punto para miles, sin decimales.</div>
            {errores.precio && <div>{errores.precio}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Marca</label>
            <input
              className="form-control"
              type="text"
              name="marca"
              value={producto.marca}
              onChange={manejarCambio}
              disabled={cargando}
              placeholder="Ej: Redragon, Logitech, Sentey, etc."
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Imagen (URL)</label>
            <input
              className="form-control"
              type="text"
              name="avatar"
              value={producto.avatar}
              onChange={manejarCambio}
              disabled={cargando}
              placeholder="https://ejemplo.com/avatar.jpg"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Descripción <FaAsterisk className='icono-asterisco'/></label>
            <textarea
              className={`form-control ${errores.descripcion ? 'is-invalid' : ''}`}
              name="descripcion"
              value={producto.descripcion}
              onChange={manejarCambio}
              rows="4"
              disabled={cargando}
              maxLength="200"
              placeholder="Mínimo 10 caracteres, máximo 200 caracteres"
            />
            <div className='campos-vacios'>{producto.descripcion.length}/200 caracteres</div>
            {errores.descripcion && <div>{errores.descripcion}</div>}
          </div>

          <div className="d-flex gap-2 mb-3">
            <BotonGuardar type="submit" disabled={cargando}>
              {cargando ? (modo === 'editar' ? 'Actualizando...' : 'Agregando...') : (modo === 'editar' ? 'Confirmar Cambios' : 'Agregar Producto')}
            </BotonGuardar>

            <BotonCancelar type="button" onClick={cancelarEdicion} disabled={cargando}>
              Cancelar
            </BotonCancelar>
          </div>

          <p>(<FaAsterisk className='icono-asterisco'/>) Campos obligatorios</p>
        </form>
      </div>
    </div>
  );
  
} export default FormularioProducto;

const BotonGuardar = styled.button`
  flex: 1;
  background: linear-gradient(180deg,#2fa84a,#1f7a33);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 0.55rem 1rem;
  font-weight: 600;
  box-shadow: 0 6px 18px rgba(0,0,0,0.45);
  transition: background 0.2s;

  &:hover {
    background: linear-gradient(180deg,#27a03f,#19692c);
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
