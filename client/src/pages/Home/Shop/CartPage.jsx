import React, { useState, useContext, useEffect } from 'react';
import useCart from '../../../hooks/useCart';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../contexts/AuthProvider';

const CartPage = () => {
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  const calculatePrice = (item) => {
    return item.price * item.quantity;
  };

  // Handle Decrease
  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      fetch(`http://localhost:3000/carts/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({ quantity: item.quantity - 1 })
      })
      .then(res => res.json())
      .then(() => {
        const updatedCart = cartItems.map(cartItem =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
        setCartItems(updatedCart);
        refetch();
      });
    }
  };

  // Handle Increase
  const handleIncrease = (item) => {
    fetch(`http://localhost:3000/carts/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({ quantity: item.quantity + 1 })
    })
    .then(res => res.json())
    .then(() => {
      const updatedCart = cartItems.map(cartItem => 
        cartItem._id === item._id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCartItems(updatedCart);
      refetch();
    });
  };

  // Calculate Total Price
  const cartSubTotal = cartItems.reduce((total, item) => {
    return total + calculatePrice(item);
  }, 0);

  // Handle Delete
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/carts/${item._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => res.json())
        .then(data => {
          if (data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted",
              text: "Your item has been deleted.",
              icon: "success"
            });
          }
        })
        .catch(error => {
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the item.",
            icon: "error"
          });
        });
      }
    });
  };

  return (
    <div className='section-container'>
      <div className='section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%'>
        <div className='py-36 flex flex-col items-center justify-center gap-8'>
          <div className='space-y-7 px-4'>
            <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug text-black'>
              Item Added to the <span className='text-green-600'>Cart</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Cart Table */}
      <div className="overflow-x-auto">
        <table className="table">
          <thead className='bg-green-500 text-white rounded-sm'>
            <tr>
              <th>#</th>
              <th>Food</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className='flex items-center gap-3'>
                    <div className='avatar'>
                      <div className='mask mask-squircle w-12 h-12'>
                        <img src={item.image} alt={item.name} />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>
                  <div className='flex items-center'>
                    <button className='btn btn-xs' onClick={() => handleDecrease(item)}>-</button>
                    <input
                      type='number'
                      value={item.quantity}
                      className='w-16 mx-2 text-center'
                      readOnly
                    />
                    <button className='btn btn-xs' onClick={() => handleIncrease(item)}>+</button>
                  </div>
                </td>
                <td>{calculatePrice(item).toFixed(2)}</td>
                <td>
                  <button className="btn btn-ghost text-red-500 btn-xs" onClick={() => handleDelete(item)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cart Summary */}
      <div className='my-12 flex-col md:flex justify-between'>
        <div className='md:w-1/2 space-y-3'>
          <h3 className='font-medium'>Customer Details</h3>
          <p>Name: {user.displayName}</p>
          <p>Email: {user.email}</p>
          <p>User ID: {user.uid}</p>
        </div>
        <div className='md:w-1/2 space-y-3'>
          <h3 className='font-medium'>Shopping Details</h3>
          <p>Total Items: {cartItems.length}</p>
          <p>Total Price: {cartSubTotal.toFixed(2)}</p>
          <button className='btn bg-green-600 text-white'>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
