import { useState } from 'react';
import { useAuth } from '../utils/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaUsers, FaTags, FaList, FaSignOutAlt, FaWallet, FaBars, FaTimes } from 'react-icons/fa';

const Layout = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const handleNavClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: FaHome },
    { path: '/users', label: 'Usuarios', icon: FaUsers },
    { path: '/types', label: 'Tipos', icon: FaTags },
    { path: '/records', label: 'Registros', icon: FaList },
  ];

  return (
    <div className="app-layout">
      <header className="main-header">
        <div className="header-inner">
          <div className="brand-logo" onClick={() => navigate('/dashboard')}>
            <div className="icon-wrapper">
              <FaWallet />
            </div>
            <span className="brand-name">Gastos Personales</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {navItems.map(({ path, label, icon: Icon }) => (
              <button
                key={path}
                className={`nav-item ${location.pathname.startsWith(path) ? 'active' : ''}`}
                onClick={() => navigate(path)}
              >
                <Icon className="nav-icon" />
                <span>{label}</span>
              </button>
            ))}
            <button className="nav-item logout" onClick={handleLogout}>
              <FaSignOutAlt className="nav-icon" />
              <span>Cerrar Sesión</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-nav-content">
            {navItems.map(({ path, label, icon: Icon }) => (
              <button
                key={path}
                className={`mobile-nav-item ${location.pathname.startsWith(path) ? 'active' : ''}`}
                onClick={() => handleNavClick(path)}
              >
                <Icon className="nav-icon" />
                <span>{label}</span>
              </button>
            ))}
            <button className="mobile-nav-item logout" onClick={handleLogout}>
              <FaSignOutAlt className="nav-icon" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </header>

      <main className="main-container">
        <div className="content-wrapper">
          {children}
        </div>
      </main>
      
      {/* Overlay for mobile menu */}
      {mobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)} />
      )}
    </div>
  );
};

export default Layout;