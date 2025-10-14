'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { NotebookPen } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Auto redirect kalau sudah login
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) router.push('/dashboard');
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulasi login frontend-only
    setTimeout(() => {
      const savedUser = localStorage.getItem('user');
      const parsedUser = savedUser ? JSON.parse(savedUser) : null;

      // Kalau belum ada user, otomatis bikin akun baru
      if (!parsedUser) {
        const newUser = {
          email: formData.email,
          password: formData.password,
          name: formData.email.split('@')[0],
        };
        localStorage.setItem('user', JSON.stringify(newUser));
        router.push('/dashboard');
        setLoading(false);
        return;
      }

      // Kalau sudah ada user → validasi login
      if (
        parsedUser.email === formData.email &&
        parsedUser.password === formData.password
      ) {
        router.push('/dashboard');
      } else {
        setError('Invalid email or password');
      }

      setLoading(false);
    }, 800);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden bg-[#FFFAF2]">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-[500px] h-[500px] rounded-full bg-[#134686] opacity-80 blur-[70px]" />
        <div className="absolute top-20 right-20 w-[600px] h-[600px] rounded-full bg-[#CD5C5C] opacity-80 blur-[100px]" />
        <div className="absolute bottom-10 left-1/4 w-[450px] h-[450px] rounded-full bg-[#FFFACD] opacity-80 blur-[170px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-[#134686] via-[#FFFACD] to-[#CD5C5C] opacity-20 blur-[180px]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="flex items-center justify-center animate-fadeInLeft">
            <div className="w-full max-w-md bg-[#FFFAF2] backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/20">
              <div className="mb-5 text-center">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Login to your account</h2>
                <p className="text-xs text-gray-600">
                  Don’t have an account?{' '}
                  <a href="/register" className="text-[#CD5C5C] font-bold hover:underline font-medium">
                    Sign Up
                  </a>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-xs text-red-600">{error}</p>
                  </div>
                )}
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-[#CD5C5C]/40 focus:border-transparent transition-all"
                  required
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-[#CD5C5C]/40 focus:border-transparent transition-all"
                  required
                />

                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center text-gray-600">
                    <input type="checkbox" className="mr-2 rounded border-gray-300 accent-[#CD5C5C]" />
                    Remember me
                  </label>
                  <a href="#" className="text-[#CD5C5C] hover:underline">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#CD5C5C] hover:bg-[#CD5C5C]/80 text-white font-semibold py-2 text-sm rounded-lg transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>
              </form>
            </div>
          </div>

          <div className="flex flex-col justify-end space-y-5 px-1 animate-fadeInRight">
            <h3 className="mt-5 text-4xl lg:text-6xl font-extrabold leading-tight text-white">
              You’re back.<br />
              Keep it noted.
            </h3>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#CD5C5C] shadow-md">
                <NotebookPen className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-bold text-white/90 tracking-wide">
                Keio
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
