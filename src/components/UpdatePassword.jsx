
import { useState } from 'react';
import { FaEye, FaRegEyeSlash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { clearAllUpdateProfileErrors, updatePassword } from '../stores/Slice/updateProfileSlice';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { getUser } from '../stores/Slice/userSlice';

const UpdatePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
  
    const { loading, error, isUpdated } = useSelector(
      (state) => state.updateProfile
    );
  
    const dispatch = useDispatch();
  
    const handleUpdatePassword = () => {
      const formData = new FormData();
      formData.append("oldPassword", oldPassword);
      formData.append("newPassword", newPassword);
      formData.append("confirmPassword", confirmPassword);
      dispatch(updatePassword(formData));
    };
  
    useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch(clearAllUpdateProfileErrors());
        if (isUpdated) {
          toast.success("Password Updated");
          dispatch(getUser());
          dispatch(clearAllUpdateProfileErrors());
        }
      }
    }, [dispatch, loading, error, isUpdated]);
  
    return (
      <div className="account_components update_password_component">
        <h3>Update Password</h3>
        <div>
          <label>Current Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          {showPassword ? (
            <FaRegEyeSlash
              className="eye_icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <FaEye
              className="eye_icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
        <div>
          <label>New Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {showPassword ? (
            <FaRegEyeSlash
              className="eye_icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <FaEye
              className="eye_icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {showPassword ? (
            <FaRegEyeSlash
              className="eye_icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <FaEye
              className="eye_icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
        <div className="save_change_btn_wrapper">
          <button
            className="btn"
            onClick={handleUpdatePassword}
            disabled={loading}
          >
            Update Password
          </button>
        </div>
      </div>
    );
  };

export default UpdatePassword
