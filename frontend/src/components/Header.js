import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            Task Manager
          </Link>
          
          {isAuthenticated ? (
            <nav className="nav-links">
              <Link 
                to="/" 
                className={isActive('/') ? 'active' : ''}
              >
                Tasks
              </Link>
              <Link 
                to="/create-task" 
                className={isActive('/create-task') ? 'active' : ''}
              >
                Create Task
              </Link>
              <span>Welcome, {user?.name}</span>
              <button 
                onClick={handleLogout}
                className="btn btn-secondary btn-small"
              >
                Logout
              </button>
            </nav>
          ) : (
            <nav className="nav-links">
              <Link 
                to="/login" 
                className={isActive('/login') ? 'active' : ''}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className={isActive('/register') ? 'active' : ''}
              >
                Register
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;