import React from 'react';
import { Link } from 'react-router-dom';
import { formatMoney } from '../utils/formatters';

/**
 * DestacadosCarousel
 * Props:
 * - items: array of { id, nombre, avatar, precio }
 * - itemsPerSlide: number (default 4)
 * - title: string
 */
export default function DestacadosCarousel({ items = [], itemsPerSlide = 4, title = 'Productos destacados', linkToProduct }) {
  const slides = [];
  for (let i = 0; i < items.length; i += itemsPerSlide) {
    slides.push(items.slice(i, i + itemsPerSlide));
  }

  return (
    <div className="card shadow-sm bg-white mt-4">
      <div className="card-body">
        <h5 className="mb-3">{title}</h5>

        <div id="destacadosCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {slides.map((group, idx) => (
              <div className={`carousel-item ${idx === 0 ? 'active' : ''}`} key={idx}>
                <div className="row g-3">
                  {group.map(item => (
                    <div className="col-6 col-md-3" key={item.id}>
                      <div className="card h-100">
                        <img src={item.avatar || 'https://via.placeholder.com/300x200'} className="card-img-top" alt={item.nombre} />
                        <div className="card-body p-2">
                          <h6 className="card-title mb-1" style={{ fontSize: '0.95rem' }}>
                            {linkToProduct ? <Link to={linkToProduct(item)}>{item.nombre}</Link> : item.nombre}
                          </h6>
                          <p className="text-success mb-0" style={{ fontWeight: 700 }}>{formatMoney(item.precio)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#destacadosCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Anterior</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#destacadosCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Siguiente</span>
          </button>
        </div>
      </div>
    </div>
  );
}
