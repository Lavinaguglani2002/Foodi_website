import React, { useContext, useEffect, useState } from "react";
import logo from "/logo.png";
import { FaRegUser } from "react-icons/fa";
import Modal from "./Login";
import { AuthContext } from "../contexts/AuthProvider";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";
const Navbar = () => {
    const [isSticky,setSticky]=useState(false)
const {user}=useContext(AuthContext);

const [cart,refetch]=useCart()
console.log(cart)
useEffect(()=>{
      const handleScroll=()=>{
        const offset = window.scrollY;
        if(offset > 0){
            setSticky(true)
        }else{
            setSticky(false)
        }
      } 
      window.addEventListener("scroll",handleScroll);
      return ()=>{
        window.addEventListener("scroll",handleScroll)
      } 
    },
    [])
  const navItems = (
    <>
      <li>
        <a href="/" className="text-white hover:text-green-700 font-serif font-bold">HOME</a>
      </li>
      <li tabIndex={0}>
        <details className="dropdown">
          <summary className="cursor-pointer font-serif font-bold text-white">MENU</summary>
          <ul className="p-2 bg-white shadow-lg rounded-lg">
            <li>
              <a href="/menu" className="block px-4 py-2 hover:bg-white text-black">All</a>
            </li>
            <li>
              <a className="block px-4 py-2 hover:bg-white text-black">Salad</a>
            </li>
            <li>
              <a className="block px-4 py-2 hover:bg-white text-black">Pizza</a>
            </li>
          </ul>
        </details>
      </li>
      <li tabIndex={0}>
        <details className="dropdown">
          <summary className="cursor-pointer font-serif font-bold text-white">SERVICES</summary>
          <ul className="p-2 bg-white shadow-lg rounded-lg">
            <li>
              <a className="block px-4 py-2 hover:bg-white text-black">Online Order</a>
            </li>
            <li>
              <a className="block px-4 py-2 hover:bg-white text-black">Table Booking</a>
            </li>
            <li>
              <a className="block px-4 py-2 hover:bg-white text-black">Order Tracking</a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <a href="#offers" className="text-white hover:text-green-700 font-serif font-bold">OFFERS</a>
      </li>
    </>
  );

  return (
    <header className=" shadow-md fixed top-0 left-0 right-0 z-50 bg-gray-800">
      <div className={`navbar xl:px-24 ${isSticky ? "shadow-md bg-gray-800 transition-all duration-300 ease-in-out" :""} `}>
        {/* Left Side - Logo and Mobile Menu */}
        <div className="navbar-start flex items-center">
          {/* Mobile Menu Button */}
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-64 space-y-3">
              {navItems}
            </ul>
          </div>
          <a href="/">
            <img style={{color:"white",background:"white",width:"100px"}}  src={logo} alt="Logo" className="h-10" />
          </a>
        </div>

        {/* Center - Navigation Links */}
        <div className="navbar-center hidden lg:flex space-x-6">
          <ul className="menu menu-horizontal px-1">
            {navItems}
          </ul>
        </div>

        {/* Right Side - Search, Cart, Login */}
        <div className="navbar-end flex items-center space-x-4">
          {/* Search Icon */}
          <button className="btn btn-ghost btn-circle text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          {
          < Link to="/cart-page">

          {/* Cart Icon */}
          <button className="btn btn-ghost btn-circle relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="badge badge-sm indicator-item text-white">{cart.length}</span>
            
          </button>

  </Link>
}

          {
          user? <Profile user={user}/> :  <Link tp="/login"
          onClick={() => document.getElementById("my_modal_5").showModal()}
          className="btn flex items-center gap-2 rounded-full px-6 bg-green text-white"
        >
          <FaRegUser /> Login
        </Link>
         }


          <Modal/>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
