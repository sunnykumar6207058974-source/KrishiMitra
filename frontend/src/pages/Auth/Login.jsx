import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Phone, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [mobileOrEmail, setMobileOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(mobileOrEmail, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setMobileOrEmail('9876543210');
    setPassword('Kisan@2026');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-forest-50 text-forest-800 flex items-center justify-center mx-auto">
            <LogIn className="w-6 h-6 text-forest-800" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900">Farmer Sign In</h2>
          <p className="text-xs text-gray-500">Access your personalized dashboard, soil tests, and calendar.</p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Mobile Number or Email
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={mobileOrEmail}
                onChange={(e) => setMobileOrEmail(e.target.value)}
                placeholder="e.g. 9876543210"
                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:border-forest-700 focus:ring-1 focus:ring-forest-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:border-forest-700 focus:ring-1 focus:ring-forest-700"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-forest-800 hover:bg-forest-900 text-white font-bold rounded-xl shadow-md transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Demo Account Quick Autofill */}
        <div className="p-4 bg-forest-50/70 border border-forest-100 rounded-xl text-center space-y-2">
          <span className="text-xs font-bold text-forest-900 block">Want to test the platform quickly?</span>
          <button
            type="button"
            onClick={handleFillDemo}
            className="text-xs font-semibold text-forest-800 hover:text-forest-900 bg-white border border-forest-200 px-3 py-1.5 rounded-lg shadow-sm hover:shadow transition-all inline-flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-forest-700" />
            <span>Load Demo Farmer Credentials (Patel Agro)</span>
          </button>
        </div>

        <div className="text-center text-xs text-gray-500">
          Don't have an account yet?{' '}
          <Link to="/register" className="font-semibold text-forest-800 hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
