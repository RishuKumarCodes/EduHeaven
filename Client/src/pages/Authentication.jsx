import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // For navigating to another page after login

function Authenticate() {
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    profileImage: '',
    location: '',
    graduationYear: '',
    job: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true); // Toggle between SignUp and SignIn
  const navigate = useNavigate();  // Hook for navigation after successful sign-in or sign-up

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = isSignUp ? 'http://localhost:5000/api/signup' : 'http://localhost:5000/api/signin';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        if (isSignUp) {
          // Sign up was successful
          alert(`Sign-up successful!`);
          setIsSignUp(false); // Switch to sign-in after successful sign-up
        } else {
          // Sign-in was successful
          alert(`Welcome`);
          localStorage.setItem('token', result.token);  // Save token for authentication
          navigate('/dashboard'); // Redirect to dashboard after successful sign-in
        }
      } else {
        setError(result.message || 'An error occurred');
      }
    } catch (error) {
      setError('Network error, please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </h2>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {isSignUp && (
            <>
              <div>
                <label htmlFor="userName" className="sr-only">Full Name</label>
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Full Name"
                  value={formData.userName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {/* Additional fields for sign-up */}
              <div>
                <label htmlFor="profileImage" className="sr-only">Profile Image URL</label>
                <input
                  type="text"
                  name="profileImage"
                  id="profileImage"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Profile Image URL"
                  value={formData.profileImage}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="location" className="sr-only">Location</label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="graduationYear" className="sr-only">Graduation Year</label>
                <input
                  type="number"
                  name="graduationYear"
                  id="graduationYear"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Graduation Year"
                  value={formData.graduationYear}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="job" className="sr-only">Current Job</label>
                <input
                  type="text"
                  name="job"
                  id="job"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Current Job"
                  value={formData.job}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {!isSignUp && (
            <>
              <div>
                <label htmlFor="userName" className="sr-only">Username</label>
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Username"
                  value={formData.userName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
            >
              {loading ? (isSignUp ? 'Signing Up...' : 'Signing In...') : (isSignUp ? 'Sign Up' : 'Sign In')}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-indigo-600 font-medium"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Authenticate;
