import React, { Fragment, useState, useEffect } from 'react';
import MetaData from '../../components/Layouts/Metadata';
import { clearErrors, passwordForgot } from '../../Redux/Action/userAction';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const { error, isLoading, message } = useSelector((state) => state.forgot);

  const alert = useAlert();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, alert, error, message]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(passwordForgot({ email }));
  };

  console.log(email);

  return (
    <>
      <MetaData title={'Forgot password'} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mt-2 mb-5">ForgotPassword</h1>

            <div className="form-group">
              <label htmlFor="email_field">Enter Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              id="forgot_password_button"
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
              disabled={isLoading ? true : false}
            >
              send Email
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
