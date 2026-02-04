import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import api from '../services/api';

const RecordForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState({ typeId: '', amount: '', description: '', date: '', isIncome: false });
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTypes();
    if (id) {
      fetchRecord();
    }
  }, [id]);

  const fetchTypes = async () => {
    try {
      const response = await api.get('/types');
      setTypes(response.data);
    } catch (error) {
      console.error('Error fetching types:', error);
    }
  };

  const fetchRecord = async () => {
    try {
      const response = await api.get(`/records/${id}`);
      // Me aseguro de que la fecha tenga el formato correcto para el input (aaaa-mm-dd)
      const record = response.data;
      if (record.date) {
        record.date = new Date(record.date).toISOString().split('T')[0];
      }
      setForm(record);
    } catch (error) {
      console.error('Error fetching record:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Me asigno automáticamente mi ID de usuario si estoy creando un registro nuevo
    const payload = { ...form };
    if (!id && user && user._id) {
      payload.userId = user._id;
    }

    try {
      if (id) {
        await api.put(`/records/${id}`, payload);
      } else {
        await api.post('/records', payload);
      }
      navigate('/records');
    } catch (error) {
      console.error('Error saving record:', error);
      alert('Error al guardar el registro');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  return (
    <div>
      <h2>{id ? 'Editar Registro' : 'Nuevo Registro'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tipo:</label>
          <select name="typeId" value={form.typeId} onChange={handleChange} required>
            <option value="">Seleccionar tipo</option>
            {types.map(type => (
              <option key={type._id} value={type._id}>{type.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Monto:</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            required
            step="0.01"
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
        <div className="form-group">
          <label>Fecha:</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group checkbox-group">
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              name="isIncome"
              checked={form.isIncome}
              onChange={handleChange}
              style={{ width: 'auto', margin: 0 }}
            />
            <span>Es ingreso</span>
          </label>
        </div>
        <div className="form-actions" style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/records')}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default RecordForm;