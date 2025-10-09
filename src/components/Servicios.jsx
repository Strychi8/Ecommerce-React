import React from 'react'
import { Link } from 'react-router-dom'

function Servicios() {
  return (
    <div>
        <h1>Servicios</h1>
        <hr />
        <p>Soporte tecnico, instalacion de productos, reparaciones, garantias extendidas y mucho mas.</p>
        <Link to="/"><button className='btn-volver'>Volver al Inicio</button></Link>
    </div>
  )
}

export default Servicios