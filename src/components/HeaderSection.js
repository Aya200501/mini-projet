import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HeaderSection = () => {
  const { nom, prenom } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <header>
      <img src="/logo.png" alt="Logo" />
      <p>{prenom} {nom}</p>
      <button onClick={handleLogout}>Se Déconnecter</button>
    </header>
  );
};

export default HeaderSection;