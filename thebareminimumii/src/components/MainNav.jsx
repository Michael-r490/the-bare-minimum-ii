import React, { useContext }from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'; 
import { UserContext } from "../../context/userContext";

const MainNav = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); // To handle user logout

  const handleSignOut = () => {
    setUser(null);
    toast.success('Successfully signed out!');
    navigate('/login'); // Redirect to login page after signing out
  };

  return (
    <nav className="navbar">
      <button className="home-button" onClick={() => navigate('/tbhHome')}>
        The Bare Minimum
      </button>
      <button className="home-button" onClick={() => navigate('/compiler2')}>
        Editor
      </button>
      <div className="account-section">
        <button className="account-button" onClick={handleSignOut}>
          <span className="account-icon">👤</span> {}
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default MainNav;