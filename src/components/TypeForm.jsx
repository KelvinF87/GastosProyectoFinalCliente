import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const TypeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchType();
    }
  }, [id]);

  const fetchType = async () => {
    try {
      const response = await api.get(`/types/${id}`);
      setForm(response.data);
    } catch (error) {
      console.error('Error fetching type:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await api.put(`/types/${id}`, form);
      } else {
        await api.post('/types', form);
      }
      navigate('/types');
    } catch (error) {
      console.error('Error saving type:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>{id ? 'Editar Tipo' : 'Nuevo Tipo'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Descripción:</label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-actions" style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/types')}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default TypeForm;