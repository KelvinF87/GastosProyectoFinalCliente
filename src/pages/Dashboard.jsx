import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { FaChartLine, FaUsers, FaTags, FaList } from 'react-icons/fa';
import api from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState({
    usersCount: 0,
    typesCount: 0,
    recordsCount: 0,
    balance: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const [usersTitle, typesRes, recordsRes] = await Promise.all([
        api.get('/users').catch(() => ({ data: [] })),
        api.get('/types'),
        api.get('/records')
      ]);

      // Aquí filtro los registros para obtener solo los míos
      const userRecords = recordsRes.data.filter(r => {
        // Verifico si soy el dueño usando 'user', 'userId' o 'usuario'
        const owner = r.user || r.userId || r.usuario;
        const ownerId = owner && (owner._id || owner);
        return String(ownerId) === String(user._id);
      });

      const income = userRecords
        .filter(r => r.isIncome)
        .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

      const expenses = userRecords
        .filter(r => !r.isIncome)
        .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

      setStats({
        usersCount: usersTitle.data.length,
        typesCount: typesRes.data.length,
        recordsCount: userRecords.length,
        balance: income - expenses
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Total Usuarios', value: stats.usersCount, icon: FaUsers },
    { title: 'Tipos de Gastos', value: stats.typesCount, icon: FaTags },
    { title: 'Mis Registros', value: stats.recordsCount, icon: FaList },
    {
      title: 'Balance Total',
      value: new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(stats.balance),
      icon: FaChartLine
    },
  ];

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
    </div>
  );

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p className="dashboard-subtitle">Bienvenido, {user?.name || user?.email || 'Usuario'}</p>



      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">
              <stat.icon />
            </div>
            <div className="stat-content">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-actions">
        <h2>Acciones Rápidas</h2>
        <div className="action-buttons">
          <button className="btn btn-primary" onClick={() => navigate('/records/new')}>
            Nuevo Registro
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/records')}>
            Ver Reportes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;