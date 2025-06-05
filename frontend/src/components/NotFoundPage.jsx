 
import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="text-center p-16">
      <h1 className="text-5xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-xl text-gray-300 mb-6">Page Not Found</p>
      <Link to="/" className="text-cyan-400 hover:underline">Go back to Home</Link>
    </div>
  );
}

export default NotFoundPage;
