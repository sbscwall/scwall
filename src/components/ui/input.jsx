import "../../css/global.css";

export function Input({ error, className = "", ...props }) {
    return (
      <div className="w-full">
        <input
          {...props}
          className={`border ${error ? "border-red-500" : "border-gray-300"} rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 ${error ? "focus:ring-red-500" : "focus:ring-blue-500"} ${className}`}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
  