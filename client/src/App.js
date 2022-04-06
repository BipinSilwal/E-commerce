import React, { useEffect } from 'react';
import Home from './pages/Home';
import SingleProduct from './pages/SingleProduct';
import Footer from './components/Layouts/Footer';
import Header from './components/Layouts/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/authentication/Login';
import SignUp from './pages/authentication/SignUp';
import store from './store';
import { loadUser } from './Redux/Action/userAction';
import Profile from './pages/authentication/Profile';
import ProtectedRoute from './pages/authentication/ProtectedRoute';
import UpdateProfile from './pages/authentication/UpdateProfile';

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/me"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Home />} />
          <Route path="/search/:keyword" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/profile/update" element={<UpdateProfile />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
