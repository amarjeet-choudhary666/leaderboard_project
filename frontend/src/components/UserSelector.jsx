import React, { useEffect, useState } from 'react';
import { PlusIcon, UserCircleIcon, ArrowPathIcon, SparklesIcon } from '@heroicons/react/24/outline';
import socket from '../lib/socket';

export default function UserSelector({ selectedUser, setSelectedUser }) {
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    setIsRefreshing(true);
    setError('');
    try {
      const response = await fetch('http://localhost:3000/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users. Please try again.');
    } finally {
      setIsRefreshing(false);
    }
  };

  const addUser = async () => {
    if (!newUserName.trim()) {
      setError('Please enter a name');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newUserName.trim() }),
      });

      if (!response.ok) {
        throw new Error('Failed to add user');
      }

      setNewUserName('');
    } catch (err) {
      console.error('Error adding user:', err);
      setError('Failed to add user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();

    const handleNewUser = (user) => {
      setUsers(prevUsers => {
        if (prevUsers.some(u => u._id === user._id)) {
          return prevUsers;
        }
        return [...prevUsers, user];
      });
      
      if (!selectedUser) {
        setSelectedUser(user._id);
      }
    };

    socket.on('userCreated', handleNewUser);
    return () => {
      socket.off('userCreated', handleNewUser);
    };
  }, [selectedUser, setSelectedUser]);

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-2xl space-y-4 p-4 bg-white rounded-xl shadow-md font-poppins">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <UserCircleIcon className="h-6 w-6 text-blue-600" />
          User Selection
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchUsers}
            disabled={isRefreshing}
            className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
            title="Refresh users"
          >
            <ArrowPathIcon className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm flex items-center gap-2">
          <ExclamationCircleIcon className="h-5 w-5" />
          {error}
        </div>
      )}

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Select User</label>
        <div className="relative">
          <select
            className="block w-full pl-3 pr-10 py-2.5 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-xl bg-white appearance-none"
            value={selectedUser || ''}
            onChange={(e) => setSelectedUser(e.target.value)}
            disabled={isRefreshing}
          >
            <option value="">Select a user...</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} • {user.totalPoints} pts
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <SparklesIcon className="h-5 w-5 text-blue-600" />
          Add New User
        </h3>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter user name"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addUser()}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={addUser}
            disabled={loading}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'} text-white font-medium`}
          >
            {loading ? (
              <>
                <ArrowPathIcon className="h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <PlusIcon className="h-4 w-4" />
                Add
              </>
            )}
          </button>
        </div>
      </div>

      {users.length > 0 && (
        <div className="mt-4 text-sm text-gray-500 text-center">
          {users.length} user{users.length !== 1 ? 's' : ''} available
        </div>
      )}
    </div>
  );
}