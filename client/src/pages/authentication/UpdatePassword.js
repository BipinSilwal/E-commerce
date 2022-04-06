import React, { useState, useEffect } from 'react';
import { clearErrors, passwordUpdate } from '../../Redux/Action/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { USER_PASSWORD_RESET } from '../../Redux/constant/userConstant';
import Metadata from '../../components/Layouts/Metadata';

const UpdatePassword = () => {
  const [authPassword, setAuthPassword] = useState({
    oldPassword: '',
    newPassword: '',
  });

  const { error, isUpdated, isLoading } = useSelector(
    (state) => state.profileDetails
  );
  const alert = useAlert();
  const history = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success('password was updated successfully!!');

      history('/me');

      dispatch({
        type: USER_PASSWORD_RESET,
      });
    }
  }, [dispatch, alert, error, history, isUpdated]);

  const { oldPassword, newPassword } = authPassword;

  const handleChange = (e) => {
    setAuthPassword({ ...authPassword, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const currentData = { oldPassword, newPassword };

    dispatch(passwordUpdate(currentData));
  };

  return (
    <>
      <Metadata title={'Change Password'} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mt-2 mb-5">Update Password</h1>
            <div className="form-group">
              <label for="old_password_field">Old Password</label>
              <input
                type="password"
                name="oldPassword"
                className="form-control"
                value={oldPassword}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label for="new_password_field">New Password</label>
              <input
                type="password"
                name="newPassword"
                className="form-control"
                value={newPassword}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
              disabled={isLoading ? true : false}
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
