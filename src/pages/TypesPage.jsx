import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import TypesList from '../components/TypesList';

const TypesPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="page-header">
        <h1>Tipos de Gastos</h1>
        <button className="primary" onClick={() => navigate('/types/new')}>
          <FaPlus />
          Nuevo Tipo
        </button>
      </div>
      <TypesList />
    </div>
  );
};

export default TypesPage;