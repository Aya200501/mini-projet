import React from 'react';

const Footer = () => {
  return (
    <footer>
      <p>123 Main Street, City, Country</p>
      <div>
        <a href="https://facebook.com" style={{ marginRight: '30px'}}><i className="fab fa-facebook fa-4x"></i></a>
        <a href="https://instagram.com" style={{ marginRight: '30px'}}><i className="fab fa-instagram fa-4x"></i></a>
        <a href="https://twitter.com" style={{ marginRight: '30px'}}><i className="fab fa-twitter fa-4x"></i></a>
        <a href="https://linkedin.com"><i className="fab fa-linkedin fa-4x"></i></a>
      </div>
    </footer>
  );
};

export default Footer;