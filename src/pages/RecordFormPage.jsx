import { useParams } from 'react-router-dom';
import RecordForm from '../components/RecordForm';

const RecordFormPage = () => {
  const { id } = useParams();
  const isEditing = !!id;

  return (
    <div>
      <div className="page-header">
        <h1>{isEditing ? 'Editar Registro' : 'Nuevo Registro'}</h1>
      </div>
      <RecordForm />
    </div>
  );
};

export default RecordFormPage;