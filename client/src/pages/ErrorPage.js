import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <>
      <div className="container container-fluid">
        <section id="products" className="container mt-5">
          <img src="images/not-found.svg" alt="errorPage" />
          <div className="text-center mt-4">
            <h3>Ohh! page Not Found</h3>
            <p>We can't seem tot find the page you're looking for</p>
            <Link to="/">back home</Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default ErrorPage;
