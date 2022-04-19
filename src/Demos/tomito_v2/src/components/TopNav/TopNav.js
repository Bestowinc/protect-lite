import { useState } from 'react';

const TopNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div id="nav-container">
      <nav>
        <div className="max-w-7xl mx-auto border-none w-full">
          <div className="flex justify-between md:justify-center h-28 md:pt-8">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a
                  href="/"
                  className="px-3 py-2 rounded-md text-3xl font-black"
                >
                  Tomito
                </a>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-center space-x-4">
                  <a href="/" className="px-3 py-2 rounded-md font-medium">
                    Accounts & Trade
                  </a>

                  <a href="/" className="px-3 py-2 rounded-md font-medium">
                    Planning & Advice
                  </a>

                  <a href="/" className="px-3 py-2 rounded-md font-medium">
                    Investment Products
                  </a>

                  <a href="/" className="px-3 py-2 rounded-md font-medium">
                    Why Tomito?
                  </a>
                  <button
                    className="px-8 py-1 font-semibold rounded-full bg-[#370511] text-white"
                    type="submit"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className="flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex items-center p-2 rounded-md text-gray-400"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="black"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="black"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
              <a href="/" className="block px-3 py-2 rounded-md font-medium">
                Tomito
              </a>

              <a href="/" className="block px-3 py-2 rounded-md font-medium">
                Accounts & Trade
              </a>

              <a href="/" className="block px-3 py-2 rounded-md font-medium">
                Planning & Advice
              </a>

              <a href="/" className="block px-3 py-2 rounded-md font-medium">
                Investment Products
              </a>

              <a href="/" className="block px-3 py-2 rounded-md font-medium">
                Why Tomito?
              </a>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};
export default TopNav;
