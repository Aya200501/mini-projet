import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (attempts >= 3) {
      setIsButtonDisabled(true);
    }
  }, [attempts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    if (!username || !password) {
      setErrors(['Username and password are required']);
      return;
    }

    try {
      const response = await axios.get('https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire');
      const user = response.data.find(u => u.pseudo === username && u.MotDePasse === password);

      if (user) {
        dispatch({ type: 'SET_USER', payload: user });
        navigate('/');
      } else {
        setErrors(['Invalid username or password']);
        setAttempts(attempts + 1);
      }
    } catch (error) {
      setErrors(['An error occurred. Please try again.']);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={isButtonDisabled}>LOGIN</button>
      </form>
      {errors.length > 0 && (
        <ul style={{ color: 'red' }}>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
      <Link to="/create-account">Create an account</Link>
    </div>
  );
};

export default Login;