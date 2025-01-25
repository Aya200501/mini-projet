import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserRow = ({ user, onUpdate }) => {
  const handleDelete = async () => {
    try {
      await axios.delete('https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire/${user.id}');
      onUpdate();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <tr>
      <td>{user.nom}</td>
      <td>{user.prenom}</td>
      <td>{user.email}</td>
      <td>
        <Link to={'/user/${user.id}'}>Détails</Link>
        <Link to={'/edit-user/${user.id}'}>Modifier</Link>
        <button onClick={handleDelete}>Supprimer</button>
      </td>
    </tr>
  );
};

export default UserRow;