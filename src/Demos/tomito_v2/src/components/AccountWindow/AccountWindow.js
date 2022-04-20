import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../Context/UserContext';

const AccountWindow = ({ dropDownOpen, toggleDropDown }) => {
  const { register, handleSubmit, reset } = useForm();
  const { currentUser, setUser } = useContext(UserContext);
  console.log(currentUser);

  const defaultValues = {
    gender: 'gender',
    date_of_birth: '',
    height: 'height',
    weight: '',
    zip: '',
    tobacco: '',
  };

  const openBestowSlideout = params => {
    window.BestowSlideout.setup(
      'get-quote-slideout',
      process.env.REACT_APP_AGENT_URL,
      params,
      true,
    );
  };

  return (
    <div
      id="dropdown-content"
      className={`${
        dropDownOpen ? 'visible' : 'hidden'
      } absolute bg-white z-10 w-full md:w-80 p-4 space-y-6 drop-shadow min-h-[600px]`}
    >
      <div id="dropDown-header" className="flex justify-end">
        <button onClick={toggleDropDown}>
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
        </button>
      </div>
      <form
        className="space-y-4"
        onSubmit={handleSubmit(data => setUser(data))}
      >
        <div>
          <label className="block mb-2 text-sm font-medium">Gender</label>
          <select
            {...register('gender')}
            id="gender"
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:border-blue-500 block w-full p-2.5"
          >
            <option value="gender" disabled selected>
              Gender
            </option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Birth Date</label>
          <input
            {...register('date_of_birth')}
            id="date_of_birth"
            type="date"
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:border-blue-500 block w-full p-2.5"
            placeholder="1/1/1990"
            min="1990-01-01"
            max="2022-04-13"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Height</label>
          <select
            {...register('height')}
            id="height"
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:border-blue-500 block w-full p-2.5"
          >
            <option value="height" disabled selected>
              Height
            </option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Weight (lbs)</label>
          <input
            {...register('weight')}
            id="weight"
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:border-blue-500 block w-full p-2.5"
            placeholder="Weight (lbs)"
            maxLength="3"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Zip Code</label>
          <input
            {...register('zip')}
            id="zip"
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:border-blue-500 block w-full p-2.5"
            placeholder="Zip Code"
            maxLength="5"
          />
        </div>
        <div className="flex items-center gap-4">
          <input
            {...register('tobacco')}
            value="yes"
            type="checkbox"
            id="tobacco"
          />
          <label className="text-sm font-light">
            I currently use nicotine products
          </label>
        </div>
        <div className="flex justify-between gap-4 flex-col md:flex-row">
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full lg:w-30 px-5 py-2.5 text-center">
            Save
          </button>
          <button
            onClick={() => {
              reset(defaultValues);
            }}
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full lg:w-30 px-5 py-2.5 text-center"
          >
            clear
          </button>
        </div>
      </form>
      <button
        onClick={() => {
          toggleDropDown();
          openBestowSlideout(currentUser);
        }}
        className="text-white bg-purple-800 hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
      >
        Get Life Insurance?
      </button>
    </div>
  );
};

export default AccountWindow;
