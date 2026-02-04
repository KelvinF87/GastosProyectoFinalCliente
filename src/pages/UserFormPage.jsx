import { useParams } from 'react-router-dom';
import UserForm from '../components/UserForm';

const UserFormPage = () => {
  const { id } = useParams();
  const isEditing = !!id;

  return (
    <div>
      <div className="page-header">
        <h1>{isEditing ? 'Editar Usuario' : 'Nuevo Usuario'}</h1>
      </div>
      <UserForm />
    </div>
  );
};

export default UserFormPage;