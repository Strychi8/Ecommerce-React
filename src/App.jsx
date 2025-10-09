import React from 'react'
import Header from './components/Header'
import Inicio from './components/Inicio'
import Servicios from './components/Servicios'
import Contacto from './components/Contacto'
import Navbar from './components/Nav'
import Productos from './components/Productos'
import DetalleProducto from './components/DetalleProducto'
import Footer from './components/Footer'
import { Routes, Route } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <div>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/productos/:id" element={<DetalleProducto />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
