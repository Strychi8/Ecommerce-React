import React, { useEffect } from 'react';

export default function ConfirmModal({
  show,
  title = 'Confirmar',
  message = '',
  onConfirm,
  onCancel,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  loading = false,
}) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onCancel?.();
    }
    if (show) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [show, onCancel]);

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
      alignItems: 'flex-start', justifyContent: 'center', paddingTop: '13vh', zIndex: 1000
    }} aria-modal="true" role="dialog">
      <div style={{
        width: '90%', maxWidth: '520px', background: '#fff', borderRadius: 8,
        padding: 20, boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
      }}>
        <h3 style={{ marginTop: 0, color: '#dc3545' }}>{title}</h3>
        <div style={{ color: '#333', fontSize: 14 }}>{message}</div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 18 }}>
          <button
            onClick={onCancel}
            style={{ padding: '10px 16px', background: '#8597c5ff', color: '#fff', border: 'none', borderRadius: 6 }}
            disabled={loading}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            style={{ padding: '10px 16px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: 6 }}
            disabled={loading}
          >
            {loading ? 'Procesando...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
