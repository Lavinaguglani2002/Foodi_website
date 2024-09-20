import React from 'react';

const categoryItems = [
  { id: 1, title: "Main Dish", des: "(86 dishes)", image: "/images/home/category/img1.png" },
  { id: 2, title: "Breakfast", des: "(12 breakfast)", image: "/images/home/category/img2.png" },
  { id: 3, title: "Dessert", des: "(48 dessert)", image: "/images/home/category/img3.png" },
  { id: 4, title: "Browse all", des: "(244 items)", image: "/images/home/category/img4.png" },
];

const Categories = () => {
  return (
    <div className='section-container py-16 bg-gray-50'>
      <div className='text-center mb-12'>
        <p className='subtitle text-green-600'>Customer Favourites</p>
        <h2 className='title text-3xl font-bold'>Popular Categories</h2>
      </div>
      
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center items-center'>
        {categoryItems.map((item, i) => (
          <div 
            key={i} 
            className='shadow-lg rounded-md bg-white py-6 px-5 w-full sm:w-72 mx-auto text-center cursor-pointer transform hover:-translate-y-4 transition-transform duration-300'>
            
            <div className='flex items-center justify-center'>
              <img 
                src={item.image} 
                className='bg-[#C1F1C6] p-5 rounded-full w-28 h-28' 
                alt={item.title} 
              />
            </div>
            
            <div className='mt-5 space-y-1'>
              <h5 className='text-black font-semibold text-lg'>{item.title}</h5>
              <p className='text-gray-500'>{item.des}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
