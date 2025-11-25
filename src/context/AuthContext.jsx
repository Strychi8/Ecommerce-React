import React, { createContext, useContext, useState } from "react";

// Crear el contexto de autenticación
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

// Proveedor de autenticación
export function AuthProvider({ children }) {
  // Inicializar el usuario a partir de localStorage de forma sincrónica
  // para evitar redirecciones tempranas por guards que lean isAuthenticated
  const [usuario, setUsuario] = useState(() => {
    const token = localStorage.getItem("authToken");
    if (!token) return null;
    const username = token.replace("fake-token-", "");
    const emailGuardado = localStorage.getItem("authEmail") || "";
    const passwordGuardado = localStorage.getItem("authPassword") || "";
    return {
      name: username,
      password: passwordGuardado,
      email: emailGuardado,
    };
  });

  // Función para iniciar sesión
  // Ahora acepta opcionalmente la contraseña y la guarda en localStorage
  const iniciarSesion = (username, password) => {
    const token = `fake-token-${username}`;
    localStorage.setItem("authToken", token);
    if (password !== undefined) {
      localStorage.setItem("authPassword", password);
    }

    const emailGuardado = localStorage.getItem("authEmail");
    const passwordGuardado = localStorage.getItem("authPassword");
    setUsuario({
      name: username,
      password: passwordGuardado || "",
      email: emailGuardado || "",
    });
  };

  // Función para cerrar sesión
  const cerrarSesion = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authEmail");
    localStorage.removeItem("authPassword");
    setUsuario(null);
  };

  const value = {
    usuario,
    iniciarSesion,
    cerrarSesion,
    isAuthenticated: !!usuario, // ← Propiedad computada
    // Determina si el usuario es administrador. Se marca admin cuando
    // el password es "admin" y el email coincide con las credenciales de prueba.
    esAdmin: usuario?.name === "admin" && usuario?.password === "admin" && usuario?.email === "1234@admin",
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado
// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext debe usarse dentro de AuthProvider");
  }
  return context;
}