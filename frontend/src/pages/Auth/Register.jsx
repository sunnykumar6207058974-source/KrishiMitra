import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, User, Phone, Mail, Lock, MapPin, Globe, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
  const [formData, setFormData] = useState({
    full_name: '',
    mobile_number: '',
    email: '',
    password: '',
    state: 'Maharashtra',
    district: 'Pune',
    preferred_language: 'en'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed. Please check inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-forest-50 text-forest-800 flex items-center justify-center mx-auto">
            <UserPlus className="w-6 h-6 text-forest-800" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900">Farmer Registration</h2>
          <p className="text-xs text-gray-500">Create your KrishiMitra profile for smart farm management.</p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                name="full_name"
                required
                value={formData.full_name}
                onChange={handleChange}
                placeholder="e.g. Ramesh Chandra Patel"
                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:border-forest-700 focus:ring-1 focus:ring-forest-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Mobile Number *</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  name="mobile_number"
                  required
                  value={formData.mobile_number}
                  onChange={handleChange}
                  placeholder="10-digit number"
                  className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:border-forest-700 focus:ring-1 focus:ring-forest-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Email (Optional)</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:border-forest-700 focus:ring-1 focus:ring-forest-700"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Password *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="password"
                name="password"
                required
                minLength={6}
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:border-forest-700 focus:ring-1 focus:ring-forest-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">State *</label>
              <input
                type="text"
                name="state"
                required
                value={formData.state}
                onChange={handleChange}
                placeholder="State (e.g. Maharashtra)"
                className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:border-forest-700 focus:ring-1 focus:ring-forest-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">District *</label>
              <input
                type="text"
                name="district"
                required
                value={formData.district}
                onChange={handleChange}
                placeholder="District (e.g. Pune)"
                className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:border-forest-700 focus:ring-1 focus:ring-forest-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Preferred Language</label>
            <select
              name="preferred_language"
              value={formData.preferred_language}
              onChange={handleChange}
              className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:border-forest-700 focus:ring-1 focus:ring-forest-700 bg-white"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी (Hindi)</option>
              <option value="as">অসমীয়া (Assamese)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-forest-800 hover:bg-forest-900 text-white font-bold rounded-xl shadow-md transition-colors disabled:opacity-50"
          >
            {loading ? 'Creating Profile...' : 'Complete Registration'}
          </button>
        </form>

        <div className="text-center text-xs text-gray-500">
          Already registered?{' '}
          <Link to="/login" className="font-semibold text-forest-800 hover:underline">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}
