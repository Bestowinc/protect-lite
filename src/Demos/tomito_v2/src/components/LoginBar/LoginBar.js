import { Link } from 'react-router-dom';

const LoginBar = ({ setLoggedStatus }) => (
  <div
    id="login-bar"
    className="flex justify-end space-y-4 md:space-y-0 md:space-x-4 flex-col md:flex-row"
  >
    <input
      className="mt-1 block px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
      placeholder="Login ID"
    />
    <input
      className="mt-1 block px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
      placeholder="Password"
    />
    <Link to="/portfolio">
      <button
        className="px-6 font-semibold rounded-full bg-[#6082b6] text-white h-8"
        onClick={() => {
          setLoggedStatus(true);
        }}
      >
        Log In
      </button>
    </Link>
  </div>
);

export default LoginBar;
