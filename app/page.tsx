'use client';

import { useRouter } from 'next/navigation';
import { CheckSquare, FileText, Lock, RefreshCw } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#FFFAF2] relative overflow-hidden">
      {/* Blur Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-[500px] h-[500px] rounded-full bg-[#134686] opacity-80 blur-[70px]" />
        <div className="absolute top-20 right-20 w-[600px] h-[600px] rounded-full bg-[#CD5C5C] opacity-80 blur-[100px]" />
        <div className="absolute bottom-10 left-1/4 w-[450px] h-[450px] rounded-full bg-[#FFFACD] opacity-80 blur-[170px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-[#134686] via-[#FFFACD] to-[#CD5C5C] opacity-20 blur-[180px]" />
      </div>

      {/* Navbar */}
      {/* Navbar */}
      <nav className="relative z-10 px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-md rounded-full shadow-lg px-6 py-3 grid grid-cols-3 items-center border border-white/20">
            {/* Left: Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#CD5C5C] flex items-center justify-center text-white">
                <span className="text-xl font-bold">𔓘</span>
              </div>
              <span className="text-lg font-bold text-gray-900">Keio</span>
            </div>

            {/* Center: Navigation Links */}
            <div className="hidden md:flex justify-center items-center gap-8">
              <a href="#features" className="text-gray-700 hover:text-[#CD5C5C] transition text-sm font-medium">
                Features
              </a>
              <a href="#contact" className="text-gray-700 hover:text-[#CD5C5C] transition text-sm font-medium">
                Contact
              </a>
            </div>

            {/* Right: Empty or future button */}
            <div className="flex justify-end"></div>
          </div>
        </div>
      </nav>



      {/* Hero Section */}
      <section className="relative z-10 py-20 px-8">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Stay organized, focused, and ahead with Keio.{' '}
          </h1>

          {/* Sub-headline */}
          <p className="text-lg md:text-xl text-white max-w-3xl mx-auto mb-10">
            Perfect for creators, students, and professionals who never stop growing.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <button
              onClick={() => router.push('/register')}
              className="px-8 py-3 bg-white/80 backdrop-blur-sm text-[#CD5C5C] rounded-full hover:bg-white transition font-medium "
            >Get Started Now</button>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="relative z-10 py-16 bg-transparent">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-white hover:bg-[#CD5C5C] rounded-2xl p-8 transition-all duration-300 group text-center shadow-sm">
              <div className="w-16 h-16 bg-[#CD5C5C] group-hover:bg-white rounded-full flex items-center justify-center mb-6 mx-auto transition-colors">
                <FileText className="w-8 h-8 text-white group-hover:text-[#CD5C5C]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-4 transition-colors">Project Cards</h3>
              <p className="text-sm text-gray-900 group-hover:text-white leading-relaxed transition-colors">
                Organize your tasks into project cards to keep related tasks together and manage multiple projects efficiently with ease and clarity.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white hover:bg-[#CD5C5C] rounded-2xl p-8 transition-all duration-300 group text-center shadow-sm">
              <div className="w-16 h-16 bg-[#CD5C5C] group-hover:bg-white rounded-full flex items-center justify-center mb-6 mx-auto transition-colors">
                <CheckSquare className="w-8 h-8 text-white group-hover:text-[#CD5C5C]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-4 transition-colors">Simple Task Management</h3>
              <p className="text-sm text-gray-900 group-hover:text-white leading-relaxed transition-colors">
                Create, edit, and complete tasks with ease. Our intuitive interface makes task management a breeze for everyone.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white hover:bg-[#CD5C5C] rounded-2xl p-8 transition-all duration-300 group text-center shadow-sm">
              <div className="w-16 h-16 bg-[#CD5C5C] group-hover:bg-white rounded-full flex items-center justify-center mb-6 mx-auto transition-colors">
                <Lock className="w-8 h-8 text-white group-hover:text-[#CD5C5C]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-4 transition-colors">Secure Access</h3>
              <p className="text-sm text-gray-900 group-hover:text-white leading-relaxed transition-colors">
                Your tasks are private and secure. Access them from anywhere with your personal account and keep your data protected.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white hover:bg-[#CD5C5C] rounded-2xl p-8 transition-all duration-300 group text-center shadow-sm">
              <div className="w-16 h-16 bg-[#CD5C5C] group-hover:bg-white rounded-full flex items-center justify-center mb-6 mx-auto transition-colors">
                <RefreshCw className="w-8 h-8 text-white group-hover:text-[#CD5C5C]" />
              </div>    
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-4 transition-colors">Real-time Sync</h3>
              <p className="text-sm text-gray-900 group-hover:text-white leading-relaxed transition-colors">
                Keep your tasks synchronized across all devices. Changes update instantly wherever you are working.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-16 bg-transparent">
        <div className="max-w-7xl mx-auto px-8">
          <div className="rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left: Contact Information */}
              <div className="space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-3">
                    WE&apos;RE HERE TO HELP YOU
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                    Discuss Your Task Management Needs
                  </h2>
                  <p className="text-gray-600">
                    Are you looking for a top-quality task management solution tailored to your needs? Reach out to us.
                  </p>
                </div>

                {/* Contact Details */}
                <div className="space-y-4 pt-4">
                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#CD5C5C] flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">E-mail</p>
                      <p className="text-gray-900">keio@gmail.com</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#CD5C5C] flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">Phone number</p>
                      <p className="text-gray-900">+123-456-7890</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Contact Form */}
              <div className="bg-white rounded-xl p-6 md:p-8 border border-white/20">
                <form className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Jane Smith"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CD5C5C]/40 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="jane@name.com"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CD5C5C]/40 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="Type your message"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CD5C5C]/40 focus:border-transparent resize-none transition-all"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#CD5C5C] text-white px-6 py-3 rounded-lg hover:bg-[#CD5C5C]/90 transition font-medium shadow-lg"
                  >
                    Get a Solution
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#CD5C5C] text-white py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                <span className="text-2xl font-bold text-[#CD5C5C]">𔓘</span>
              </div>
              <div>
                <span className="text-xl font-bold block">Keio</span>
                <span className="text-xs text-white/80">Your productivity companion</span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="text-sm text-white/80">
                © {new Date().getFullYear()} Keio. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
