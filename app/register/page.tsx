'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NotebookPen } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulasi "register" frontend-only
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const existing = users.find((u: any) => u.email === formData.email);

      if (existing) {
        setError('Email already registered.');
        setLoading(false);
        return;
      }

      const newUser = {
        id: Date.now(),
        ...formData,
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('user', JSON.stringify(newUser)); // simpan user login
      router.push('/dashboard');
    } catch (err: any) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
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
          <div className="flex flex-col justify-end space-y-5 px-2 animate-fadeInLeft">
            <h3 className="mt-5 text-4xl lg:text-6xl font-extrabold leading-tight text-white">
              Keep It Noted. <br />
              Create more.
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

          <div className="flex items-center justify-center animate-fadeInRight">
            <div className="w-full max-w-md bg-[#FFFAF2] backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/20">
              <div className="mb-5 text-center">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Create an account</h2>
                <p className="text-xs text-gray-600">
                  Already have an account?{' '}
                  <a href="/login" className="text-[#CD5C5C] font-bold hover:underline font-medium">
                    Sign In
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
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-[#CD5C5C]/40 focus:border-transparent transition-all"
                  required
                />

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

                <p className="text-xs text-gray-500 pt-1 text-center">
                  By signing up, you agree to our{' '}
                  <a href="#" className="text-[#CD5C5C] hover:underline">
                    Terms of Use
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-[#CD5C5C] hover:underline">
                    Privacy Policy
                  </a>.
                </p>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#CD5C5C] hover:bg-[#CD5C5C]/80 text-white font-semibold py-2 text-sm rounded-lg transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating Account...' : 'Sign Up'}
                </button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-3 bg-[#FFFAF2] text-[#CD5C5C]">or sign up with</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="text-xs font-medium text-gray-700">Github</span>
                  </button>

                  <button className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="text-xs font-medium text-gray-700">Google</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
