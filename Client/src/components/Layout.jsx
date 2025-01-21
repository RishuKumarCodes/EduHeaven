import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { BarChart2, BookOpen, GamepadIcon, LogOut, User } from "lucide-react";

function Layout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <nav className="w-20 bg-gray-800 p-4 flex flex-col items-center justify-between fixed top-0 left-0 h-screen">
        <div className="space-y-8">
          <div className="p-2">
            <img
              src="https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=48&h=48&fit=crop&crop=faces"
              alt="Logo"
              className="w-12 h-12 rounded-full"
            />
          </div>
          <div className="space-y-6">
            <Link
              to="/"
              className={`block p-3 rounded-lg transition-colors ${
                location.pathname === "/"
                  ? "bg-purple-600"
                  : "hover:bg-gray-700"
              }`}
            >
              <BookOpen className="w-6 h-6" />
            </Link>

            <Link
              to="/dashboard"
              className={`block p-3 rounded-lg transition-colors ${
                location.pathname === "/dashboard"
                  ? "bg-purple-600"
                  : "hover:bg-gray-700"
              }`}
            >
              <BarChart2 className="w-6 h-6" />
            </Link>

            <Link
              to="/games"
              className={`block p-3 rounded-lg transition-colors ${
                location.pathname === "/games"
                  ? "bg-purple-600"
                  : "hover:bg-gray-700"
              }`}
            >
              <GamepadIcon className="w-6 h-6" />
            </Link>

            <Link
              to="/authenticate"
              className={`block p-3 rounded-lg transition-colors ${
                location.pathname === "/authenticate"
                  ? "bg-purple-600"
                  : "hover:bg-gray-700"
              }`}
            >
              <User className="w-6 h-6" />
            </Link>
          </div>
        </div>
        <button className="p-3 hover:bg-gray-700 rounded-lg transition-colors">
          <LogOut className="w-6 h-6" />
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-8 ml-20">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
