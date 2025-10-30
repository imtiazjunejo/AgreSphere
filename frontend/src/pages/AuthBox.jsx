import { useState } from "react";

export default function AuthBox() {
  const [signIn, setSignIn] = useState(true);
  return (
    <div
        className="min-h-screen flex items-center justify-center bg-gray-100 bg-cover bg-center"
        style={{
          backgroundImage: "url('/src/assets/images/1.jpg')"
        }}
      >
        {/* Green login/register box goes here */}
      
          <div className="min-h-screen flex items-center justify-center ">

      <div className="relative w-[678px] max-w-full min-h-[400px] bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-2xl overflow-hidden">
        {/* Sign Up */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full transition-all duration-500 ease-in-out z-[1] bg-gray-300 ${
            !signIn ? 'translate-x-full opacity-100 z-[5]' : 'opacity-0'
          }`}
        >
          <form className="flex flex-col items-center justify-center px-[50px] h-full text-center">
            <h1 className="font-bold text-2xl">Create Account</h1>
            <input type="text" placeholder="Name" className="bg-gray-200 border-none py-3 px-4 my-2 w-full rounded" />
            <input type="email" placeholder="Email" className="bg-gray-200 border-none py-3 px-4 my-2 w-full rounded" />
            <input type="password" placeholder="Password" className="bg-gray-200 border-none py-3 px-4 my-2 w-full rounded" />
            <button className="mt-4 rounded-full border border-green-600 bg-green-600 text-white text-xs font-bold py-3 px-[45px] uppercase tracking-wide hover:scale-[0.98] transition-transform">
              Sign Up
            </button>
          </form>
        </div>

        {/* Sign In */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full transition-all duration-500 ease-in-out z-[2] bg-gray-300 ${
            !signIn ? 'translate-x-full' : ''
          }`}
        >
          <form className="flex flex-col items-center justify-center px-[50px] h-full text-center">
            <h1 className="font-bold text-2xl">Sign In</h1>
            <input type="email" placeholder="Email" className="bg-gray-200 border-none py-3 px-4 my-2 w-full rounded" />
            <input type="password" placeholder="Password" className="bg-gray-200 border-none py-3 px-4 my-2 w-full rounded" />
            <a href="#" className="text-gray-700 text-sm my-4">Forgot your password?</a>
            <button className="rounded-full border border-green-600 bg-green-600 text-white text-xs font-bold py-3 px-[45px] uppercase tracking-wide hover:scale-[0.98] transition-transform">
              Sign In
            </button>
          </form>
        </div>

        {/* Overlay */}
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-500 ease-in-out z-[100] ${
            !signIn ? '-translate-x-full' : ''
          }`}
        >
          <div
            className={`bg-gradient-to-r from-green-600 to-emerald-600 text-white absolute left-[-100%] h-full w-[200%] transition-transform duration-500 ease-in-out ${
              !signIn ? 'translate-x-1/2' : ''
            }`}
          >
            {/* Left Panel */}
            <div
              className={`absolute flex flex-col justify-center items-center px-10 text-center h-full w-1/2 transition-transform duration-500 ease-in-out ${
                !signIn ? 'translate-x-0' : '-translate-x-1/5'
              }`}
            >
              <h1 className="font-bold text-2xl">Welcome Back!</h1>
              <p className="text-sm font-light leading-5 tracking-wide my-6">
                To keep connected with us please login with your personal info
              </p>
              <button
                onClick={() => setSignIn(true)}
                className="rounded-full border border-white bg-transparent text-white text-xs font-bold py-3 px-[45px] uppercase tracking-wide hover:scale-[0.98] transition-transform"
              >
                Sign In
              </button>
            </div>

            {/* Right Panel */}
            <div
              className={`absolute flex flex-col justify-center items-center px-10 text-center h-full w-1/2 right-0 transition-transform duration-500 ease-in-out ${
                !signIn ? 'translate-x-1/5' : 'translate-x-0'
              }`}
            >
              <h1 className="font-bold text-2xl">Hello, Friend!</h1>
              <p className="text-sm font-light leading-5 tracking-wide my-6">
                Enter your personal details and start journey with us
              </p>
              <button
                onClick={() => setSignIn(false)}
                className="rounded-full border border-white bg-transparent text-white text-xs font-bold py-3 px-[45px] uppercase tracking-wide hover:scale-[0.98] transition-transform"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

