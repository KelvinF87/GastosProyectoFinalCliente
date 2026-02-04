import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import RecordsList from '../components/RecordsList';

const RecordsPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="page-header">
        <h1>Registros de Gastos</h1>
        <button className="primary" onClick={() => navigate('/records/new')}>
          <FaPlus />
          Nuevo Registro
        </button>
      </div>
      <RecordsList />
    </div>
  );
};

export default RecordsPage;