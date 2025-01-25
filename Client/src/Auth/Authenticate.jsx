import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
// import { signInWithPopup } from "firebase/auth";
// import { auth, googleProvider } from "./firebase-config";

const Authenticate = () => {
    const [isSignup, setIsSignup] = useState(true); // Track whether it's login or signup
    const [showPassword, setShowPassword] = useState(false); // Track password visibility
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm();
    const [rememberMe, setRememberMe] = useState(false);


    const onSubmit = async (data) => {
        console.log("Form submitted:", data);
        try {
            const url = isSignup ? `${process.env.REACT_APP_API_BASE_URL}/signup` : `${process.env.REACT_APP_API_BASE_URL}/login`;
            const response = await axios.post(url, data);
            console.log(response.data);
            alert(`${isSignup ? "Signup" : "Login"} successful!`);
            reset(); // Clear form after successful submission
            localStorage.setItem("token", response.data.token);
            if (rememberMe) {
                localStorage.setItem("rememberMe", "true");
            }
        } catch (error) {
            console.error(`${isSignup ? "Signup" : "Login"} failed:`, error.response?.data || error.message);
            alert(error.response?.data.message || "An error occurred. Please try again.");
        }
    };
    

    return (
        <div className="h-full flex justify-center items-center ">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <div className="flex justify-center mb-6 mt-3">
                    <button
                        className={`w-1/2 py-2 px-4 font-semibold rounded-l-md ${isSignup ? "bg-indigo-600 text-white" : "bg-gray-300 text-gray-700"
                            }`}
                        onClick={() => setIsSignup(true)}
                    >

                        
                        Sign Up
                    </button>
                    <button
                        className={`w-1/2 py-2 px-4 font-semibold rounded-r-md ${isSignup ? "bg-gray-300 text-gray-700" : "bg-indigo-600 text-white"
                            }`}
                        onClick={() => setIsSignup(false)}
                    >
                        Log In
                    </button>
                </div>

                {/* Google Login Button */}
                <button
  onClick={handleGoogleLogin}
  className="flex items-center justify-center w-full py-3 mb-6 text-gray-700 bg-white border border-gray-300 rounded-lg hover:shadow-md hover:bg-gray-100 transition duration-200"
>
  <FcGoogle className="text-2xl mr-2" />
  <span className="text-sm font-medium">Sign in / login with Google</span>
</button>


                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                            Email
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                {...register("Email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Enter a valid email address",
                                    },
                                })}
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                            />
                            {errors.Email && <p className="text-red-500 text-sm mt-1">{errors.Email.message}</p>}
                        </div>
                    </div>

                    {isSignup && (
                        <div>
                            <label htmlFor="full-name" className="block text-sm font-medium text-gray-900">
                                Full Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="full-name"
                                    type="text"
                                    placeholder="John Doe"
                                    {...register("FullName", { required: "Full Name is required" })}
                                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                                />
                                {errors.FullName && <p className="text-red-500 text-sm mt-1">{errors.FullName.message}</p>}
                            </div>
                        </div>
                    )}

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                            Password
                        </label>
                        <div className="mt-2 relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder=""
                                {...register("Password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters",
                                    },
                                })}
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-indigo-600"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                            {errors.Password && <p className="text-red-500 text-sm mt-1">{errors.Password.message}</p>}
                        </div>
                    </div>
                      {/* Remember Me Option */}
                      <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                            Remember Me
                        </label>
                    </div>
                    <div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full rounded-md py-2 px-4 text-white font-semibold ${isSubmitting
                                    ? "opacity-50 cursor-not-allowed bg-gray-400"
                                    : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                }`}
                        >
                            {isSubmitting ? "Submitting..." : isSignup ? "Sign Up" : "Log In"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Authenticate;