import { useLocation, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { formatMoney } from '../utils/formatters';


const ProductoDetalle = () => {
 
    //const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const producto = location.state?.producto;
 
 // if (!producto) {
    //     return (
    //         <div className="container-md py-3">
    //             <div className="alert alert-warning">
    //                 <h4>Producto no encontrado</h4>
    //                 <p>No se pudo cargar la información del producto</p>
    //                 <Link to="/carrito" className="btn btn-primary">
    //                     Volver a Productos
    //                 </Link>
    //             </div>
    //         </div>
    //     );
    // }
 
  return(
    <>
    <div className="container-md py-3">
      <h2 className="mb-3">Detalles del Producto</h2>
    
      {/* Fila Superior: para separar en 2 columnas */}
      <div className="row align-items-start g-0 mb-4">

        {/* Columna para la imagen - IZQUIERDA (md-6) */}
         <div className="col-md-6">
            <div className="card border-0">
               <div className="card-body text-center p-2">
           
                <img src={producto.avatar} alt={producto.nombre} className="img-fluid rounded w-75" />
              
               </div>
            </div>
         </div>

        {/* Columna para la informacion - DERECHA (md-6) */}
         <div className="col-md-6">
            <div className="card border-0">
               <div className="card-body p-1">
           
                <h4 className="text-primary mb-2">{producto.nombre}</h4>
                
                <div className="mb-2">
                  <strong>Descripcion:</strong>
                  <p className="card-text mb-1">{producto.descripcion}</p>
                </div>

                <div className="mb-2">
                  <strong>Marca:</strong>
                  <span className="badge bg-secondary ms-1">{producto.marca}</span>
                </div>
                
                <div className="mb-3">
                  <strong>Precio:</strong>
                  <h5 className="text-success d-inline ms-1">{formatMoney(producto?.precio)}</h5>
                </div>

                       
               </div>
            </div>
         </div>

        <BotonEstilizado onClick={() => window.history.length > 1 ? navigate(-1) : navigate('/productos')}>Volver</BotonEstilizado>

      </div>
    </div>
    </>
  );
}; export default ProductoDetalle;

const BotonEstilizado = styled.button`
  background: white;
  color: black;
  border: 1px solid black;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;

  &:hover {
    background: #31312eff;
    color: white;

  }
`;
