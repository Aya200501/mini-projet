import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const [formData, setFormData] = useState({
    nom: '',
    age: '',
    admin: false,
    MotDePasse: '',
    pseudo: '',
    prenom: '',
    couleur: '',
    Devise: '',
    Pays: '',
    avatar: '',
    email: '',
    photo: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire', formData);
      navigate('/users');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div>
      <h2>Ajouter un Utilisateur</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map(key => (
          <div key={key}>
            <label>{key}</label>
            {key === 'admin' ? (
              <input
                type="checkbox"
                name={key}
                checked={formData[key]}
                onChange={handleChange}
              />
            ) : (
              <input
                type={key === 'MotDePasse' ? 'password' : 'text'}
                name={key}
                value={formData[key]}
                onChange={handleChange}
              />
            )}
          </div>
        ))}
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AddUser;