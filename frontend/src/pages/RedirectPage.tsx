import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RedirectPage: React.FC = () => {
  const { shortUrlPath } = useParams<{ shortUrlPath: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLongUrl = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/decode/${shortUrlPath}`
        );
        let longUrl = response.data.data;

        console.log(longUrl);
        if (!longUrl || typeof longUrl !== 'string') {
          throw new Error('Invalid long URL');
        }

        // Prepend "https://" if the URL does not have a protocol
        if (!/^https?:\/\//i.test(longUrl)) {
          longUrl = `https://${longUrl}`;
        }

        // Redirect to the long URL
        window.location.replace(longUrl);
      } catch (error) {
        console.error('Error fetching long URL:', error);

        // Navigate to the "URL Not Found" page
        navigate('/not-found', { replace: true });
      }
    };

    fetchLongUrl();
  }, [shortUrlPath, navigate]);

  return <p>Redirecting...</p>;
};

export default RedirectPage;
