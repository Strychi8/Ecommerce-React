import React from 'react'
import styled from 'styled-components'

function FormularioContacto() {
  return (
    <div className="login-bg d-flex align-items-center justify-content-center">
      <div className="login-card shadow-sm">
        <div className="text-center mb-3">
          <h3 className="mt-5">Contáctanos</h3>
          <p>Envíanos tu consulta y con gusto te ayudaremos.</p>
        </div>

        <form action="https://formspree.io/f/xkgjlnkl" method="POST" className="p-4">
          <div className="mb-3">
            <label className="form-label" htmlFor="nombre">Nombre:</label>
            <input className="form-control" placeholder="Nombre" type="text" id="nombre" name="nombre" required />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="apellido">Apellido:</label>
            <input className="form-control" placeholder="Apellido" type="text" id="apellido" name="apellido" required />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="email">Email:</label>
            <input className="form-control" placeholder="Email" type="email" id="email" name="email" required />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="mensaje">Mensaje:</label>
            <textarea className="form-control" placeholder="Mensaje" id="mensaje" name="mensaje" required rows={4}></textarea>
          </div>

          <BotonEnviar type="submit">Enviar</BotonEnviar>
        </form>
      </div>
    </div>
  )
}

export default FormularioContacto

const BotonEnviar = styled.button`
  width: 100%;
  background: linear-gradient(180deg,#2fa84a,#1f7a33);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 0.55rem 1rem;
  font-weight: 600;
  box-shadow: 0 6px 18px rgba(0,0,0,0.45);
  transition: background 0.3s;

  &:hover {
    background: linear-gradient(180deg,#27a03f,#19692c);
  }
`;