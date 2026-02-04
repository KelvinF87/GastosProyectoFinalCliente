import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import api from '../services/api';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      try {
        await api.delete(`/users/${id}`);
        setUsers(users.filter(user => user._id !== id));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Cargando usuarios...</p>
    </div>
  );

  return (
    <div>
      {users.length === 0 ? (
        <div className="empty-state">
          <p>No hay usuarios registrados aún.</p>
        </div>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <strong style={{ fontSize: '1.1rem' }}>{user.name}</strong>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{user.email}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn btn-secondary" onClick={() => navigate(`/users/edit/${user._id}`)}>
                  <FaEdit />
                  <span>Editar</span>
                </button>
                <button className="btn btn-danger" onClick={() => deleteUser(user._id)}>
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

export default UsersList;