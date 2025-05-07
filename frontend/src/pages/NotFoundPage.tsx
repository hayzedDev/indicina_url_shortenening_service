import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - URL Not Found</h1>
      <p>The short URL you are trying to access does not exist.</p>
      <Link to="/" style={{ color: '#007bff', textDecoration: 'none' }}>
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
