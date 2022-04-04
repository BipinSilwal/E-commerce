import React from 'react';
import Home from './pages/Home';
import SingleProduct from './pages/SingleProduct';
import Footer from './components/Layouts/Footer';
import Header from './components/Layouts/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/authentication/Login';
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:keyword" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
