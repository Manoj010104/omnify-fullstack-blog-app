import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { useAuth } from '../contexts/AuthContext';
import confetti from 'canvas-confetti';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      if (isLogin) {
        const { user, accessToken, refreshToken } = await authService.login(email, password);
        authLogin(user, accessToken, refreshToken);
        setMessage('🚀 Login successful! Redirecting...');
        setTimeout(() => navigate('/'), 1000);
      } else {
        const response = await authService.register(email, password);
        setMessage(response.message || '🎉 Registration successful! Please log in.');
        setIsLogin(true);
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } }); // 🎉 Confetti on success
      }
    } catch (err) {
      setError(err || 'Unexpected error. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-secondary to-accent px-4 py-12">
      <div className="backdrop-blur-sm bg-glass border border-white/20 shadow-xl rounded-2xl p-8 w-full max-w-md text-white">
        <h2 className="text-4xl font-bold text-center mb-4 tracking-tight drop-shadow-md">
          {isLogin ? 'Welcome Back 👋' : 'Create an Account'}
        </h2>
        <p className="text-sm text-center text-white/80 mb-6">
          {isLogin ? 'Sign in to continue.' : 'Let’s get you started!'}
        </p>

        {error && (
          <div className="bg-red-500/20 text-red-100 border border-red-300 rounded-md p-3 text-sm mb-4 animate-pulse">
            {error}
          </div>
        )}
        {message && (
          <div className="bg-green-500/20 text-green-100 border border-green-300 rounded-md p-3 text-sm mb-4 animate-fade-in">
            {message}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            autoComplete="email"
            required
            className="w-full px-4 py-3 bg-white/10 text-white placeholder-white/70 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            autoComplete={isLogin ? 'current-password' : 'new-password'}
            required
            className="w-full px-4 py-3 bg-white/10 text-white placeholder-white/70 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg text-white font-semibold text-lg bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary transform hover:scale-105 transition-all shadow-glow"
          >
            {loading ? 'Processing...' : isLogin ? 'Sign In 🚀' : 'Sign Up ✨'}
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setMessage('');
              setEmail('');
              setPassword('');
            }}
            className="text-white/80 hover:underline text-sm"
          >
            {isLogin
              ? "Don't have an account? Sign Up"
              : 'Already registered? Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
