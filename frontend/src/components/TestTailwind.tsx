import React from "react";

export default function TestTailwind() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 max-w-md w-full bg-white rounded-2xl shadow-xl border-2 border-blue-500">
        <h1 className="text-3xl font-bold text-red-600 mb-4 text-center">
          Tailwind Test as component
        </h1>
        <p className="text-green-700 mb-6 text-center">
          This is a simple component to verify that Tailwind CSS is working.
        </p>
        <button className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-300">
          Click Me
        </button>
      </div>
    </div>
  );
}
