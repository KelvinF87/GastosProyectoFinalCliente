import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import UsersList from '../components/UsersList';

const UsersPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="page-header">
        <h1>Usuarios</h1>
        <button className="primary" onClick={() => navigate('/users/new')}>
          <FaPlus />
          Nuevo Usuario
        </button>
      </div>
      <UsersList />
    </div>
  );
};

export default UsersPage;