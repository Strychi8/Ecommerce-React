import React, { createContext, useContext, useState, useEffect } from "react";

// Crear el contexto de autenticación
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

// Proveedor de autenticación
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Verificar token al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const emailGuardado = localStorage.getItem("authEmail");
    const passwordGuardado = localStorage.getItem("authPassword");
    if (token) {
      const username = token.replace("fake-token-", "");
      setUsuario({
        name: username,
        password: passwordGuardado || "",
        email: emailGuardado || "",
      });
    }

    setCargando(false);
  }, []);

  // Función para iniciar sesión
  // Ahora acepta opcionalmente la contraseña y la guarda en localStorage
  const iniciarSesion = (username, passwordIngresado, emailIngresado) => {

    const token = `fake-token-${username}`;
    localStorage.setItem("authToken", token);
    localStorage.setItem("authPassword", passwordIngresado);
    localStorage.setItem("authEmail", emailIngresado);
    
    setUsuario({
      name: username,
      password: passwordIngresado || "",
      email: emailIngresado || "",
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
    cargando,
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