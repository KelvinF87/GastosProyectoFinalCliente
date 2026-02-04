import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import api from '../services/api';

const TypesList = () => {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTypes();
  }, []);

  const fetchTypes = async () => {
    try {
      const response = await api.get('/types');
      setTypes(response.data);
    } catch (error) {
      console.error('Error fetching types:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteType = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este tipo?')) {
      try {
        await api.delete(`/types/${id}`);
        setTypes(types.filter(type => type._id !== id));
      } catch (error) {
        console.error('Error deleting type:', error);
      }
    }
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Cargando tipos...</p>
    </div>
  );

  return (
    <div>
      {types.length === 0 ? (
        <div className="empty-state">
          <p>No hay tipos de gastos registrados aún.</p>
        </div>
      ) : (
        <ul>
          {types.map(type => (
            <li key={type._id}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <strong style={{ fontSize: '1.1rem' }}>{type.name}</strong>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{type.description}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn btn-secondary" onClick={() => navigate(`/types/edit/${type._id}`)}>
                  <FaEdit />
                  <span>Editar</span>
                </button>
                <button className="btn btn-danger" onClick={() => deleteType(type._id)}>
                  <FaTrash />
                  <span>Eliminar</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TypesList;