export default function OrSeparation({ title, className, isCenter = false }: { title: string; className?: string; isCenter?: boolean }) {
  return (
    <div
      className={`before:content-[' '] relative  mt-0.5 flex items-center  before:absolute before:left-0 before:top-1/2 before:h-px before:w-full before:bg-gray-100 ${className} ${
        isCenter ? "justify-center" : "justify-start"
      }`}
    >
      <span
        className={`relative z-10 inline-block bg-white text-sm font-medium text-gray-500 dark:bg-gray-50 2xl:text-base ${
          isCenter ? "p-2.5" : "pe-2.5"
        }`}
      >
        {title}
      </span>
    </div>
  );
}

// import React from "react";

// interface OrSeparationProps {
//   title: string;
//   className?: string;
//   isCenter?: boolean;
// }

// const OrSeparation: React.FC<OrSeparationProps> = ({ title, className = "", isCenter = false }) => {
//   const centerClass = isCenter ? "justify-center" : "justify-start";

//   return (
//     <div className={`relative mt-0.5 flex items-center ${centerClass}`}>
//       <span
//         className={`relative z-10 inline-block bg-white text-sm font-medium text-gray-500 dark:bg-gray-50 2xl:text-base ${
//           isCenter ? "p-2.5" : "pe-2.5"
//         }`}
//       >
//         {title}
//       </span>
//     </div>
//   );
// };

// export default OrSeparation;
