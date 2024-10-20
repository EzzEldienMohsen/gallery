import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { FaMoon, FaSun } from 'react-icons/fa';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useGlobalContext();
  return (
    <div className="w-full flex justify-between items-center py-4 md:py-6 px-4 md:px-8">
      <div className="w-12 h-12 md:w-16 md:h-16 flex justify-center items-center rounded-full bg-secondary border-accent border-[1px] text-primary text-xl md:text-2xl capitalize">
        e d
      </div>
      <button
        className="btn rounded-full w-12 h-12 md:w-16 md:h-16"
        onClick={toggleTheme}
      >
        {theme ? <FaMoon className="text-xl" /> : <FaSun className="text-xl" />}
      </button>
    </div>
  );
};

export default Header;
