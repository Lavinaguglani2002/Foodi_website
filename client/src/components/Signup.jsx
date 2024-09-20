import React, { useContext, useState } from "react";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Modal from "./Login"; // Assuming Modal is for Login
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";

const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { signUpWithGmail, createUser, updateUserProfile } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const [isModalOpen, setModalOpen] = useState(false); // State for modal

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        createUser(email, password)
            .then((result) => {
                const user = result.user;
                updateUserProfile(data.name, data.photoURL).then(() => {
                    const userInfo = {
                        name: data.name,
                        email: data.email,
                    };
                    axios.post("http://localhost:3000/users", userInfo)
                        .then(() => {
                            alert("Account creation successful!");
                            closeModal();
                            navigate(from, { replace: true });
                        });
                });
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(`Error: ${errorMessage}`);
            });
    };

    const handleRegister = () => {
        signUpWithGmail()
            .then((result) => {
                const user = result.user;
                const userInfo = {
                    name: user?.displayName,
                    email: user?.email,
                };
                axios.post("http://localhost:3000/users", userInfo)
                    .then(() => {
                        alert("Sign in successful");
                    });
                navigate("/");
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8 relative">
                <button
                    onClick={closeModal}
                    className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-gray-500"
                >
                    ✕
                </button>

                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <h3 className="font-bold text-lg text-center mb-4">Create An Account!</h3>

                    {/* Email */}
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="email"
                            className="input input-bordered w-full"
                            {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="password"
                            className="input input-bordered w-full"
                            {...register("password", { 
                                required: "Password is required", 
                                minLength: { value: 6, message: "Password must be at least 6 characters" }
                            })}
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    {/* Signup button */}
                    <div className="form-control mb-6">
                        <input
                            type="submit"
                            value="Signup"
                            className="btn bg-green-600 text-white w-full"
                        />
                    </div>

                    {/* Already have an account */}
                    <p className="text-center mb-4 text-gray-600">
                        Have an account?{" "}
                        <Link to="/login" className="underline text-red-500" onClick={openModal}>
                            Login
                        </Link>
                    </p>

                    {/* Social Sign-in */}
                    <div className="text-center space-x-3">
                        <button onClick={handleRegister} className="btn btn-circle bg-red-500 hover:bg-red-700 text-white">
                            <FaGoogle />
                        </button>
                        <button className="btn btn-circle bg-blue-600 hover:bg-blue-700 text-white">
                            <FaFacebookF />
                        </button>
                        <button className="btn btn-circle bg-gray-800 hover:bg-gray-900 text-white">
                            <FaGithub />
                        </button>
                    </div>
                </form>

                {/* Modal for login */}
                <Modal isOpen={isModalOpen} closeModal={closeModal} />
            </div>
        </div>
    );
};

export default Signup;
