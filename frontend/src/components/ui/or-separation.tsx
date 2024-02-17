import React from "react";

interface OrSeparationProps {
  title: string;
  className?: string;
  isCenter?: boolean;
}

const OrSeparation: React.FC<OrSeparationProps> = ({ title, className = "", isCenter = false }) => {
  return (
    <div className={`before:content-[' '] flex items-center ${className}`}>
      <hr className="flex-grow border-t border-gray-300 dark:border-gray-700" />

      <div className={`mx-4 text-gray-500 dark:text-gray-400 font-medium ${isCenter ? "self-center" : "self-start"}`}>{title}</div>

      <hr className="flex-grow border-t border-gray-300 dark:border-gray-700" />
    </div>
  );
};

export default OrSeparation;
