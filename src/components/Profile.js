import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector(state => state);

  return (
    <div>
      <h2>Mon Profile</h2>
      {Object.entries(user).map(([key, value]) => (
        <p key={key}>{key}: {value}</p>
      ))}
    </div>
  );
};

export default Profile;