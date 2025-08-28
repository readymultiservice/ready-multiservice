import React, { useState } from 'react';

interface AuthModalProps {
  mode: 'login' | 'register';
  onClose: () => void;
  onLogin: (role: 'user' | 'admin') => void;
  setMode: (mode: 'login' | 'register') => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ mode, onClose, onLogin, setMode }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const adminEmail = "shubhamgbagde@gmail.com";
  const adminPassword = "Mani@440013";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isAdmin) {
      if (email === adminEmail && password === adminPassword) {
        onLogin('admin');
      } else {
        setError('Invalid admin credentials.');
      }
    } else {
      // For regular users, login is simulated
      onLogin('user');
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        
        <div className="p-8">
          <div className="flex border-b mb-6">
            <button 
              onClick={() => { setMode('login'); setError(''); }}
              className={`w-1/2 py-3 text-lg font-semibold transition-colors ${mode === 'login' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500'}`}
            >
              Login
            </button>
            <button 
              onClick={() => { setMode('register'); setError(''); }}
              className={`w-1/2 py-3 text-lg font-semibold transition-colors ${mode === 'register' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500'}`}
            >
              Register
            </button>
          </div>

          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
            {mode === 'login' ? 'Welcome Back!' : 'Create Your Account'}
          </h2>
          <p className="text-center text-gray-500 mb-6">
            {mode === 'login' ? 'Sign in to continue.' : 'Get started with us today.'}
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
             {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500"/>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500"/>
            </div>
             {mode === 'login' && (
                <div className="flex items-center justify-between">
                    <label className="flex items-center text-sm text-gray-600">
                        <input type="checkbox" className="h-4 w-4 rounded text-red-600 focus:ring-offset-0 focus:ring-1 focus:ring-red-500" onChange={(e) => setIsAdmin(e.target.checked)} />
                        <span className="ml-2">Log in as Admin</span>
                    </label>
                    <a href="#" className="text-sm font-medium text-red-600 hover:underline">Forgot password?</a>
                </div>
            )}

            {error && <p className="text-sm text-red-600 text-center">{error}</p>}

            <button type="submit" className="w-full py-3 px-4 rounded-md text-white font-semibold bg-red-600 hover:bg-red-700 transition-colors">
              {mode === 'login' ? 'Login' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3">
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.418 2.865 8.165 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.942.359.308.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0020 10c0-5.523-4.477-10-10-10z" clip-rule="evenodd"></path></svg>
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;