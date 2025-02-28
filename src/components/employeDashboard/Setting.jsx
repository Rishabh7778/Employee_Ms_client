import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import axios from 'axios';

const Setting = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [error, setError] = useState(null);
    const [setting, setSetting] = useState({
        userId: user._id,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSetting((prevSetting) => ({
            ...prevSetting,
            [name]: value, 
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (setting.newPassword !== setting.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        // const BASE_URL = import.meta.env.VITE_BASE_URL;
        try {
            const response = await axios.put(`https://employee-mg-server.onrender.com/api/setting/change-password`, setting, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.data.success) {
                navigate('/login');
                setError(""); // Clear any errors
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                setError(error.response.data.error);
            }
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-4">Update Password</h2>

                {error && <p className="text-red-500 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Old Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter old password"
                            name="oldPassword"
                            value={setting.oldPassword}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">New Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter new password"
                            name="newPassword"
                            value={setting.newPassword}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Confirm new password"
                            name="confirmPassword"
                            value={setting.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Setting;
