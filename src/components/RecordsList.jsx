import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { FaEdit, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import api from '../services/api';

const RecordsList = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchRecords();
    }
  }, [user]);

  const fetchRecords = async () => {
    try {
      const response = await api.get('/records');
      const allRecords = response.data;
      const userRecords = allRecords.filter(r => {
        // Primero busco el campo 'user', luego 'userId', y finalmente 'usuario' para identificarme
        const owner = r.user || r.userId || r.usuario;
        const ownerId = owner && (owner._id || owner);
        return String(ownerId) === String(user._id);
      });
      setRecords(userRecords);
    } catch (error) {
      console.error('Error fetching records:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteRecord = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este registro?')) {
      try {
        await api.delete(`/records/${id}`);
        setRecords(records.filter(record => record._id !== id));
      } catch (error) {
        console.error('Error deleting record:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  const formatAmount = (amount, isIncome) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Cargando registros...</p>
    </div>
  );

  return (
    <div>
      {records.length === 0 ? (
        <div className="empty-state">
          <p>No hay registros de gastos/ingresos aún.</p>
        </div>
      ) : (
        <ul>
          {records.map(record => (
            <li key={record._id}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                <div style={{
                  background: record.isIncome ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  padding: '12px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {record.isIncome ? (
                    <FaArrowUp style={{ color: 'var(--success)' }} />
                  ) : (
                    <FaArrowDown style={{ color: 'var(--danger)' }} />
                  )}
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '1.1rem', marginBottom: '4px' }}>
                    {record.description}
                  </strong>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    {record.isIncome ? 'Ingreso' : 'Gasto'} • {formatDate(record.date)}
                  </span>
                </div>
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '8px'
              }}>
                <div style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: record.isIncome ? 'var(--success)' : 'var(--danger)',
                  marginBottom: '4px'
                }}>
                  {record.isIncome ? '+' : '-'}{formatAmount(record.amount)}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn btn-secondary" style={{ padding: '8px' }} onClick={() => navigate(`/records/edit/${record._id}`)}>
                    <FaEdit />
                  </button>
                  <button className="btn btn-danger" style={{ padding: '8px' }} onClick={() => deleteRecord(record._id)}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecordsList;