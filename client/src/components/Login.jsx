import React, { useContext, useState } from "react";
import { FaFacebookF, FaGithub } from "react-icons/fa"; // Removed Google Icon
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";

const Modal = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useContext(AuthContext); // Removed signUpWithGmail
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setModalOpen] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const { email, password } = data;
    login(email, password)
      .then(({ user }) => {
        const userInfo = { name: data.name, email: data.email };
        axios.post("http://localhost:3000/users", userInfo)
          .then(() => {
            alert("Login successful");
            closeModal();
            navigate(from, { replace: true });
          });
      })
      .catch((error) => setErrorMessage(error.message));
  };

  // Modal close function
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <dialog open={isModalOpen} className="modal modal-middle sm:modal-middle bg-gray-700">
      <div className="modal-box">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body ">
          <h3 className="font-bold text-lg text-white">Please Login!</h3>

          {/* Email */}
          <div className="form-control">
            <label className="label"><span className="label-text text-white">Email</span></label>
            <input
              type="email"
              className="input input-bordered"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label"><span className="label-text text-white">Password</span></label>
            <input
              type="password"
              className="input input-bordered"
              {...register("password", { 
                required: "Password is required", 
                minLength: { value: 6, message: "Password must be at least 6 characters" }
              })}
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            <label className="label mt-1">
              <a href="#" className="label-text-alt link link-hover text-white">Forgot password?</a>
            </label>
          </div>

          {/* Error Message */}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          {/* Login Button */}
          <input type="submit" value="Login" className="btn bg-green text-white mt-4" />

          <p className="text-center my-2 text-white">
            Don't have an account? <Link to="/signup" className="underline text-red ml-1">Signup Now</Link>
          </p>
        </form>

        <button
          onClick={() => setModalOpen(false)}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >✕</button>

        {/* Social Sign-in */}
        <div className="text-center space-x-3 mb-5">
          {/* Removed Google login button */}
          <button className="btn btn-circle hover:bg-green hover:text-white text-white">
            <FaFacebookF />
          </button>
          <button className="btn btn-circle hover:bg-green hover:text-white text-white">
            <FaGithub />
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
