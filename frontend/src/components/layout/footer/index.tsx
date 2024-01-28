import { Link } from "react-router-dom";

const footerMenu = [
  {
    name: "Help",
    href: "/"
  },
  {
    name: "Privacy",
    href: "/"
  },
  {
    name: "Terms",
    href: "/"
  }
];

export default function Footer() {
  return (
    <footer className="flex flex-col-reverse items-center justify-between px-4 py-5 lg:flex-row lg:px-16 lg:py-6 2xl:px-24 2xl:py-10">
      <div className="text-center leading-relaxed text-gray-500 lg:text-start">© Copyright {new Date().getFullYear()}</div>
      <div className="-mx-2.5 flex items-center justify-end pb-3 font-medium text-gray-700 lg:w-1/2 lg:pb-0">
        {footerMenu.map((item) => (
          <Link key={item.name} to={item.href} className="px-2.5 py-1.5 transition-colors hover:text-primary">
            {item.name}
          </Link>
        ))}
      </div>
    </footer>
  );
}
