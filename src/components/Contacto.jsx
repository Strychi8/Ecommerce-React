import React from 'react'

function FormularioContacto() {
  return (
    <>  
    <h1>Contactenos</h1>
    <form action="https://formspree.io/f/xkgjlnkl" method="POST">
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" required />
        <br />
        <label htmlFor="apellido">Apellido:</label>
        <input type="text" id="apellido" name="apellido" required />
        <br />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
        <br />
        <label htmlFor="mensaje">Mensaje:</label>
        <textarea id="mensaje" name="mensaje" required></textarea>
        <br />
        <button className="btn-enviar" type="submit">Enviar</button>
    </form>
    </>
  )
}

export default FormularioContacto