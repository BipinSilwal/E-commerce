import React, { Fragment, useState, useEffect } from 'react';
import MetaData from '../../components/Layouts/Metadata';
import { clearErrors, passwordReset } from '../../Redux/Action/userAction';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const [user, setUser] = useState({
    password: '',
    confirmPassword: '',
  });

  const history = useNavigate();
  const { token } = useParams();

  console.log(token);

  const { password, confirmPassword } = user;
  const { error, isLoading, success } = useSelector((state) => state.forgot);

  const alert = useAlert();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success('Password updated successfully!!');
      history('/login');
    }
  }, [dispatch, alert, error, success, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    const currentPassword = { password, confirmPassword };
    dispatch(passwordReset(currentPassword, token));
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <>
      <MetaData title={'Reset password'} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mt-2 mb-5">Reset Password</h1>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={password}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">confirmPassword</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                value={confirmPassword}
                onChange={handleChange}
              />
            </div>

            <button
              id="forgot_password_button"
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
              disabled={isLoading ? true : false}
            >
              Set Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
