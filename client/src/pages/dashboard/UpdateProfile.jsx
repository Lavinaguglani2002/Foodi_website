import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../contexts/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
    const { updateUserProfile } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const onSubmit = (data) => {
        const name = data.name;
        const photoURL = data.photoURL;
        updateUserProfile(name, photoURL)
            .then(() => {
                // Profile updated
                navigate(from, { replace: true });
            })
            .catch((error) => {
                // Error handling
                console.error("Profile update failed: ", error);
                alert("Failed to update profile. Please try again.");
            });
    };

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                    <h3 className='font-bold'>Update Your Profile</h3>

                    {/* Name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input 
                          {...register("name", { required: "Name is required" })} 
                          type="text" 
                          placeholder="Your name" 
                          className="input input-bordered" 
                        />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    </div>

                    {/* Photo URL */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Upload Photo</span>
                        </label>
                        <input 
                          type="text" 
                          {...register("photoURL", { 
                            required: "Photo URL is required", 
                            pattern: {
                              value: /^(ftp|http|https):\/\/[^ "]+$/,
                              message: "Invalid URL format"
                            }
                          })} 
                          placeholder="Photo URL" 
                          className="input input-bordered" 
                        />
                        {errors.photoURL && <p className="text-red-500">{errors.photoURL.message}</p>}
                        
                        {/* File input for later use */}
                        {/* <input type="file" className="file-input w-full max-w-xs" /> */}
                    </div>

                    {/* Submit Button */}
                    <div className="form-control mt-6">
                        <button className="btn bg-green text-white">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;
