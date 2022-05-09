import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../Context/UserContext';

const AccountWindow = ({ dropDownOpen, toggleDropDown, handleSave }) => {
  const { register, handleSubmit, reset } = useForm();
  const { setUser } = useContext(UserContext);

  const defaultValues = {
    gender: 'gender',
    date_of_birth: '',
    height: 'height',
    weight: '',
    zip: '',
    tobacco: '',
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
            <option value="48">4'0"</option>
            <option value="49">4'1"</option>
            <option value="50">4'2"</option>
            <option value="51">4'3"</option>
            <option value="52">4'4"</option>
            <option value="53">4'5"</option>
            <option value="54">4'6"</option>
            <option value="55">4'7"</option>
            <option value="56">4'8"</option>
            <option value="57">4'9"</option>
            <option value="58">4'10"</option>
            <option value="59">4'11"</option>
            <option value="60">5'0"</option>
            <option value="61">5'1"</option>
            <option value="62">5'2"</option>
            <option value="63">5'3"</option>
            <option value="64">5'4"</option>
            <option value="65">5'5"</option>
            <option value="66">5'6"</option>
            <option value="67">5'7"</option>
            <option value="68">5'8"</option>
            <option value="69">5'9"</option>
            <option value="70">5'10"</option>
            <option value="71">5'11"</option>
            <option value="72">6'0"</option>
            <option value="73">6'1"</option>
            <option value="74">6'2"</option>
            <option value="75">6'3"</option>
            <option value="76">6'4"</option>
            <option value="77">6'5"</option>
            <option value="78">6'6"</option>
            <option value="79">6'7"</option>
            <option value="80">6'8"</option>
            <option value="81">6'9"</option>
            <option value="82">6'10"</option>
            <option value="83">6'11"</option>
            <option value="84">7'0"</option>
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
          <button
            onClick={handleSave}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full lg:w-30 px-5 py-2.5 text-center"
          >
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
    </div>
  );
};

export default AccountWindow;
