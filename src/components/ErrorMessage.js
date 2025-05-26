import React from 'react';

export default function ErrorMessage({ message }) {
  return (
    <div className="bg-red-600 text-white p-4 rounded text-center my-4">
      {message}
    </div>
  );
}
