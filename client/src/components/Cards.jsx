import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { AuthContext } from '../contexts/AuthProvider';
import Swal from "sweetalert2";

const Cards = ({ item }) => {
    const { name, image, price, recipe, _id } = item;
    const [isHeartFilled, setIsHeartFilled] = useState(false);
    const { user } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();

    // Add to cart
    const handleAddtoCart = (item) => {
        if (user && user?.email) {
            const cartItem = { menuItemId: _id, name, quantity: 1, image, price, email: user.email };

            fetch("http://localhost:3000/carts", {
                method: "POST",
                headers: {
                    'content-type': "application/json"
                },
                body: JSON.stringify(cartItem)
            })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Item added to cart!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "Failed to add item to cart!",
                        showConfirmButton: true,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate("/signup", { state: { from: location } });
                        }
                    });
                }
            })
            .catch(error => {
                console.error("Error:", error);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Error adding item to cart!",
                    text: error.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            });
        } else {
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: "Please log in to add items to the cart",
                showConfirmButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/signup", { state: { from: location } });
                }
            });
        }
    };

    const handleHeartClick = () => {
        setIsHeartFilled(!isHeartFilled);
    };

    return (
        <div className='card w-full max-w-sm bg-white shadow-xl relative rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105'>
            <div
                className={`absolute right-2 top-2 p-2 rounded-full bg-green-600 ${isHeartFilled ? "text-rose-500" : "text-white"}`}
                onClick={handleHeartClick}
            >
                <FaHeart className="h-5 w-5 cursor-pointer" />
            </div>
            <Link to={`/menu/${item._id}`}>
                <figure className='relative'>
                    <img src={item.image} className='w-full h-72 object-cover' alt={item.name} />
                </figure>
            </Link>
            <div className='card-body p-4'>
                <Link to={`/menu/${item._id}`}>
                    <h2 className='card-title text-xl font-bold mb-2'>{item.name}</h2>
                </Link>
                <p className='text-gray-600'>{recipe}</p>
                <div className='card-actions flex justify-between items-center mt-4'>
                    <h5 className='font-semibold text-lg'>
                        <span className='text-sm text-red-600'>$</span>{item.price}
                    </h5>
                    <button className='btn bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors'
                        onClick={() => handleAddtoCart(item)}>
                        Add to CART
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cards;
