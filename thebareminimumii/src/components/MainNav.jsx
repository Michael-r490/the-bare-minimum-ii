import React, { useContext }from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'; 
import { UserContext } from "../../context/userContext";

const MainNav = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); // To handle user logout

  const handleSignOut = () => {
    // Clear the user session (this depends on how you manage user data)
    setUser(null); // If you're using context to manage user state
    toast.success('Successfully signed out!');
    navigate('/login'); // Redirect to login page after signing out
  };

  return (
    <nav className="navbar">
      <button className="home-button" onClick={() => navigate('/tbhHome')}>
        The Bare Minimum
      </button>
      <div className="account-section">
        <button className="account-button" onClick={handleSignOut}>
          <span className="account-icon">👤</span> {/* You can replace this with an actual icon */}
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default MainNav;