import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Phone, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export default function Login() {
  const { t } = useLanguage();
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
      navigate('/app/dashboard');
    } catch (err) {
      const detail = err.response?.data?.detail;
      let msg = t('authPage.errors.invalidCredentials', 'Incorrect mobile/email or password.');
      if (typeof detail === 'string') {
        msg = detail;
      } else if (Array.isArray(detail)) {
        msg = detail.map(d => d.msg).join(', ');
      } else if (err.message && err.message.includes('Network Error')) {
        msg = 'Connecting to server... Server may be waking up, please try once more in a few seconds.';
      } else if (err.message) {
        msg = err.message;
      }
      setError(msg);
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
          <h2 className="text-2xl font-extrabold text-gray-900">{t('authPage.login.title')}</h2>
          <p className="text-xs text-gray-500">{t('authPage.login.subtitle')}</p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">{t('authPage.login.mobileOrEmail')}</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={mobileOrEmail}
                onChange={(e) => setMobileOrEmail(e.target.value)}
                placeholder={t('authPage.login.placeholderMobile')}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-800 focus:outline-none focus:border-forest-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">{t('authPage.login.password')}</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('authPage.login.placeholderPassword')}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-800 focus:outline-none focus:border-forest-700"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-xs font-bold shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            {loading ? t('status.loading') : t('authPage.login.btnSubmit')}
          </button>
        </form>

        <div className="pt-2 border-t border-gray-100 text-center space-y-3">
          <button
            type="button"
            onClick={handleFillDemo}
            className="text-xs text-forest-800 hover:underline font-semibold block mx-auto"
          >
            {t('authPage.login.btnDemo')}
          </button>

          <p className="text-xs text-gray-500">
            {t('authPage.login.noAccount')}{' '}
            <Link to="/register" className="text-forest-800 font-bold hover:underline">
              {t('authPage.login.linkRegister')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
