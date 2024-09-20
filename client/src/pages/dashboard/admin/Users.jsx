import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaRegUser, FaTrash } from 'react-icons/fa6';
import Modal from '../../../components/Login';

const Users = () => {
  const { refetch, data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/users`);
      return res.json();
    },
  });

  const isAdmin = true; // Change this dynamically based on user role

  return (
    <div>
      {isAdmin ? (
        <>
          <div className='flex items-center justify-between m-4'>
            <h5>All Users</h5>
            <h5>Total users: {users.length}</h5>
          </div>
          <div className='overflow-x-auto'>
            <table className='table table-zebra md:w-[870px]'>
              <thead className='bg-green-700 text-white'>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.role === 'admin' ? 'Admin' : <button><FaRegUser /></button>}
                    </td>
                    <td>
                      <button className='btn btn-xs btn-circle bg-indigo-500 text-white'>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p><Modal/></p>
      )}
    </div>
  );
};

export default Users;
