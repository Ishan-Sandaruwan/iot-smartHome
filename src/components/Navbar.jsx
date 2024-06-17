import React from "react";

function Navbar() {
  return (
    <div className="bg-white flex gap-8 justify-between py-4 px-8 items-center fixed z-50 top-0 w-full backdrop-blur-md shadow-md">
      <h2 className="text-4xl font-bold">
        <a href="/#home">
          <span className="bg-gradient-to-tr from-lime-500 via-emerald-500 to-cyan-500 text-transparent bg-clip-text">
            Smart
          </span>
          Home
        </a>
      </h2>
      <ul className="hidden lg:flex gap-4 items-center text-xl ">
        <li>
          <a
            href="/#home"
            className="hover:text-lime-600 transition-all pr-4 border-r-2"
          >
            Home
          </a>{" "}
        </li>
        <li>
          <a
            href="/#light"
            className="hover:text-lime-600 transition-all pr-4 border-r-2"
          >
            Light Controll
          </a>{" "}
        </li>
        <li>
          <a href="/#fish" className="hover:text-lime-600 transition-all pr-4 ">
            Fish
          </a>
        </li>
        <li>
          <a
            href="/#rain"
            className="hover:text-lime-600 transition-all pr-4 border-r-2"
          >
            Rain
          </a>
        </li>
        <li>
          <a
            href="/#tank"
            className="hover:text-lime-600 transition-all pr-4 border-r-2"
          >
            Tank
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
