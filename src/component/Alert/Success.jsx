import React from "react";

function Success() {
  return (
    <div
      role="alert"
      className="fixed top-6 right-6 z-50 alert alert-success shadow-lg w-fit max-w-sm"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>✅ Libro registrado correctamente</span>
    </div>
  );
}

export default Success;
