import { useParams } from 'react-router-dom';
import TypeForm from '../components/TypeForm';

const TypeFormPage = () => {
  const { id } = useParams();
  const isEditing = !!id;

  return (
    <div>
      <div className="page-header">
        <h1>{isEditing ? 'Editar Tipo' : 'Nuevo Tipo'}</h1>
      </div>
      <TypeForm />
    </div>
  );
};

export default TypeFormPage;