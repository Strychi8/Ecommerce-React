import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { FaDesktop } from "react-icons/fa";
import styled from 'styled-components';

export default function IniciarSesion() {
  const { iniciarSesion } = useAuthContext();
  const navigate = useNavigate();
  const ubicacion = useLocation();

  const [formulario, setFormulario] = useState({ name: "", password: "", email: "" });
  const [showPassword, setShowPassword] = useState(false);

  const manejarEnvio = (e) => {
    e.preventDefault();
    
    // Verificar credenciales (admin/1234@admin/admin)
    if (formulario.name === "admin" && formulario.password === "admin" && formulario.email === "1234@admin") {
      // Guarda el email y la contraseña ingresada y pasa ambos a iniciarSesion
      localStorage.setItem("authEmail", formulario.email);
      localStorage.setItem("authPassword", formulario.password);
      iniciarSesion("admin", formulario.password, formulario.email);
      navigate("/dashboard");
    // Lógica para usuarios normales - si NO es admin
    } else if (
      formulario.name &&
      formulario.password &&
      formulario.email &&
      formulario.password !== "admin"
    ) {

    // Guarda el email y la contraseña ingresada y pasa ambos a iniciarSesion
    localStorage.setItem("authEmail", formulario.email);
    localStorage.setItem("authPassword", formulario.password);
    iniciarSesion(formulario.name, formulario.password, formulario.email);

      // Si venía del carrito, redirige a pagar
      if (ubicacion.state?.carrito) {
        navigate("/pagar", { state: { carrito: ubicacion.state.carrito } });
      } else {
        navigate("/productos");
      }
    } else {
      toast.error("Credenciales de administrador incorrectas. Usa: admin / 1234@admin / admin");
    }
  };

  return (
    <div className="login-bg d-flex align-items-center justify-content-center">
      <div className="login-card shadow-sm">
        <div className="text-center mb-2">
          <span className="bg-dark rounded-circle p-2 d-inline-block mt-3">
            <FaDesktop className="text-white fs-4" aria-hidden="true"/>
          </span>
          <h2 className="mt-1">Strychi Tech</h2>
          <h4 className="fs-5 mt-4">Iniciar sesión para continuar</h4>
        </div>

        <form onSubmit={manejarEnvio} className="p-4">
          
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <input
              className="form-control"
              type="text"
              placeholder="Usuario"
              value={formulario.name}
              onChange={(e) => setFormulario({ ...formulario, name: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              type="email"
              placeholder="Email"
              value={formulario.email}
              onChange={(e) => setFormulario({ ...formulario, email: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <div className="input-group">
              <input
                className="form-control"
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={formulario.password}
                onChange={(e) => setFormulario({ ...formulario, password: e.target.value })}
                required
                aria-label="Contraseña"
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword((s) => !s)}
                aria-pressed={showPassword}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <FiEyeOff size={18} aria-hidden="true" /> : <FiEye size={18} aria-hidden="true" />}
              </button>
            </div>
          </div>

          <BotonIngresar type="submit">Ingresar</BotonIngresar>

          <div className="text-center">
            <small>¿No tiene una cuenta? <a href="#">Crear una cuenta</a></small>
          </div>

          <div>
            <p style={{ marginTop: "20px", fontSize: "12px", color: "#666" }}>
              <strong>Credenciales de prueba para Dashboard:</strong>
              <br />
              Usuario: admin
              <br />
              Email: 1234@admin
              <br />
              Contraseña: admin   
            </p>
          </div>

        </form>

      </div>

    </div>
 
  );
}

const BotonIngresar = styled.button`
  width: 100%;
  background: linear-gradient(180deg,#2fa84a,#1f7a33);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 0.55rem 1rem;
  font-weight: 600;
  box-shadow: 0 6px 18px rgba(0,0,0,0.45);
`;