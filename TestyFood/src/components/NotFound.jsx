import React from 'react';
import { Link } from 'react-router-dom';
import Container from './Container';

const NotFound = () => {
  return (
    <section className="error-404-section flex items-center justify-center">
      <Container>
        <div className="flex flex-col items-center text-center w-full">
          <img src="/error-404.png" className="light-mode-image mx-auto mb-4" alt="404 Error" width="531" height="298" />
          <h2 className="section-title">Oops! I think we just lost something.</h2>
          <p className="content-pera max-w-xl">Much as we would love to serve it up to you, we’d suggest you go back and try a different link.</p>
          <Link to="/" className="btn btn-primary red-button btn-hover-1 mt-4 inline-block">
            <span>Go Back To Home Page</span>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default NotFound;