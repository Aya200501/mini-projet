import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Index = () => {
  const admin = useSelector(state => state.admin);

  return (
    <nav style={{ display: 'flex', flexDirection: 'column' }}>
      <Link to="/">Accueil</Link>
      <Link to="/profile">Voir Mon Profile</Link>
      <Link to="/change-color">Modifier Couleur</Link>
      {admin && (
        <>
          <Link to="/users">Liste Utilisateurs</Link>
          <Link to="/add-user">Ajouter Utilisateur</Link>
        </>
      )}
    </nav>
  );
};

export default Index;