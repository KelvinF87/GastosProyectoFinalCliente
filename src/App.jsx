import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './utils/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UsersPage from './pages/UsersPage';
import UserFormPage from './pages/UserFormPage';
import TypesPage from './pages/TypesPage';
import TypeFormPage from './pages/TypeFormPage';
import RecordsPage from './pages/RecordsPage';
import RecordFormPage from './pages/RecordFormPage';
import Layout from './components/Layout';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Cargando...</p>
    </div>
  );
  return user ? children : <Navigate to="/" />;
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute><Layout><UsersPage /></Layout></ProtectedRoute>} />
        <Route path="/users/new" element={<ProtectedRoute><Layout><UserFormPage /></Layout></ProtectedRoute>} />
        <Route path="/users/edit/:id" element={<ProtectedRoute><Layout><UserFormPage /></Layout></ProtectedRoute>} />
        <Route path="/types" element={<ProtectedRoute><Layout><TypesPage /></Layout></ProtectedRoute>} />
        <Route path="/types/new" element={<ProtectedRoute><Layout><TypeFormPage /></Layout></ProtectedRoute>} />
        <Route path="/types/edit/:id" element={<ProtectedRoute><Layout><TypeFormPage /></Layout></ProtectedRoute>} />
        <Route path="/records" element={<ProtectedRoute><Layout><RecordsPage /></Layout></ProtectedRoute>} />
        <Route path="/records/new" element={<ProtectedRoute><Layout><RecordFormPage /></Layout></ProtectedRoute>} />
        <Route path="/records/edit/:id" element={<ProtectedRoute><Layout><RecordFormPage /></Layout></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
