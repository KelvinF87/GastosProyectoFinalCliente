import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await api.get(`/users/${id}`);
      setForm({ ...response.data, password: '' }); // No mostrar password
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await api.put(`/users/${id}`, form);
      } else {
        await api.post('/users', form);
      }
      navigate('/users');
    } catch (error) {
      console.error('Error saving user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>{id ? 'Editar Usuario' : 'Nuevo Usuario'}</h2>
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
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required={!id}
          />
        </div>
        <div className="form-actions" style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/users')}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;