import { useState, useContext } from 'react';
import AccountWindow from '../AccountWindow/AccountWindow';
import { UserContext } from '../Context/UserContext';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const TopNav = () => {
  const { loggedIn } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);

  useEffect(() => {
    if (bannerOpen) {
      setTimeout(() => {
        setBannerOpen(false);
      }, 3000);
    }
  }, [bannerOpen]);

  const toggleDropDown = () => {
    setDropDownOpen(!dropDownOpen);
    setIsOpen(false);
  };
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setDropDownOpen(false);
  };

  const handleSave = () => {
    setDropDownOpen(false);
    setBannerOpen(true);
  };

  return (
    <div id="nav-container">
      {bannerOpen && (
        <div
          className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
          id="sucess-banner"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="py-1">
                <svg
                  className="fill-current h-6 w-6 text-teal-500 mr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                </svg>
              </div>
              <div>
                <p className="font-bold">Account information updated</p>
              </div>
            </div>
            <button
              onClick={() => {
                setBannerOpen(false);
              }}
            >
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
            </button>
          </div>
        </div>
      )}
      <nav>
        <div className="max-w-7xl mx-auto border-none w-full">
          <div className="flex justify-between md:justify-center h-28 md:pt-8">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link
                  to="/"
                  className="px-3 py-2 rounded-md text-3xl font-black"
                >
                  Tomito
                </Link>
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
                    onClick={() => {
                      if (loggedIn) {
                        setDropDownOpen(!dropDownOpen);
                      }
                    }}
                    type="button"
                  >
                    {loggedIn ? (
                      <img
                        className="border-2 border-black border-black inline object-cover w-16 h-16 rounded-full"
                        src="/profile.jpeg"
                        alt="Profile avatar"
                      />
                    ) : (
                      <img
                        className="border border-black inline object-cover w-16 h-16 rounded-full"
                        src="/placeholder.svg"
                        alt="Profile avatar"
                      />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex md:hidden">
              <button
                onClick={() => {
                  if (loggedIn) {
                    toggleDropDown();
                  }
                }}
                type="button"
              >
                {loggedIn ? (
                  <img
                    className="border-2 border-black border-black inline object-cover w-16 h-16 rounded-full"
                    src="/profile.jpeg"
                    alt="Profile avatar"
                  />
                ) : (
                  <img
                    className="border border-black inline object-cover w-16 h-16 rounded-full"
                    src="/placeholder.svg"
                    alt="Profile avatar"
                  />
                )}
              </button>
              <button
                onClick={toggleMenu}
                type="button"
                className="inline-flex items-center p-2 rounded-md text-gray-400"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-8 w-8"
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
                    className="block h-8 w-8"
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
          <div
            id="dropdown-container"
            className="flex justify-center md:justify-end"
          >
            <AccountWindow
              dropDownOpen={dropDownOpen}
              toggleDropDown={toggleDropDown}
              handleSave={handleSave}
            />
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
