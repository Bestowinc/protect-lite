import TopNav from '../../components/TopNav/TopNav';
import LoginBar from '../../components/LoginBar/LoginBar';
import Footer from '../../components/Footer/Footer';

const Home = () => (
  <div id="home-wrapper" className="min-h-screen">
    <div
      id="home-top"
      className="min-h-700 md:px-4 flex justify-center items-center relative bg-[url('https://images.unsplash.com/photo-1484627147104-f5197bcd6651?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=1500')] bg-center	bg-no-repeat md:bg-cover"
    >
      <section>
        <TopNav />
        <LoginBar />
        <div
          id="hero-main-content"
          style={{ minHeight: '500px' }}
          className="flex items-center"
        >
          <div id="hero-text-content" className="text-left space-y-2">
            <h3 className="text-5xl font-bold">Achieve more</h3>
            <p className="text-2xl">When you pay less</p>
            <button
              class="px-6 font-semibold rounded-full bg-[#370511] text-white h-8"
              type="submit"
            >
              Open an Account
            </button>
          </div>
        </div>
      </section>
    </div>
    <div
      id="main-container"
      className=" w-full pt-20 flex justify-center flex-col lg:flex-row px-4"
    >
      <section className="flex flex-col lg:flex-row justify-center gap-12 lg:gap-4 text-center md:text-left">
        <div
          id="main-left-column"
          className="flex flex-col md:flex-row justify-center w-full lg:w-2/5 gap-12 lg:border-r border-slate-200 "
        >
          <div id="experts-section" className="md:w-30 lg:w-60 space-y-14">
            <h4 className="text-2xl font-bold mb-10">From Our Experts</h4>
            <section className="space-y-2">
              <a href="/">
                {' '}
                <h5 className="text-lg text-sky-700 font-semibold">
                  2022 Sector Outlook
                </h5>
              </a>
              <p className="font-medium">
                See our sector-by-sector analysis and investing ideas from
                Tomito pros.
              </p>
            </section>
            <section className="space-y-2">
              <a href="/">
                {' '}
                <h5 className="text-lg text-sky-700 font-semibold">
                  2022 Economic Outlook
                </h5>
              </a>
              <p className="font-medium">
                Investors should keep an eye on these "post-peak" themes.
              </p>
            </section>
            <section className="space-y-2">
              <a href="/">
                {' '}
                <h5 className="text-lg text-sky-700 font-semibold">
                  Starting a New Job?
                </h5>
              </a>
              <p className="font-medium">
                Make smart money moves along the way.
              </p>
            </section>
          </div>
          <div className="lg:w-60 space-y-4">
            <h4 className="text-2xl font-bold mb-10">Top News</h4>
            <section>
              <a href="/">
                {' '}
                <h5 className="text-lg text-sky-700 font-semibold">
                  Analysis-After U.S. bank stock surge, options traders brace
                  for earnings-fueled volatility
                </h5>
              </a>
              <p className="font-light text-slate-700">
                Reuters - 1:00 PM ET 1/11/2022
              </p>
            </section>
            <section>
              <a href="/">
                {' '}
                <h5 className="text-lg text-sky-700 font-semibold">
                  Boeing wins annual jet order race on adjusted basis
                </h5>
              </a>
              <p className="font-light text-slate-700">
                Reuters - 1:00 PM ET 1/11/2022
              </p>
            </section>
            <section>
              <a href="/">
                {' '}
                <h5 className="text-lg text-sky-700 font-semibold">
                  Bank of America to reduce overdraft fees as regulatory
                  scrutiny grows
                </h5>
              </a>
              <p className="font-light text-slate-700">
                Reuters - 1:00 PM ET 1/11/2022
              </p>
            </section>
          </div>
        </div>
        <div
          id="main-right-column"
          className="text-lg w-full lg:w-1/4 lg:ml-10"
        >
          <h4 className="text-2xl mb-10 font-bold">Today's Markets</h4>
          <section className="flex items-center lg:justify-between space-y-2 flex-col md:flex-row ">
            <svg viewBox="0 0 1024 1024" className="w-10 md:w-20">
              <path d="M512 96c-111.118 0-215.584 43.272-294.156 121.844s-121.844 183.038-121.844 294.156c0 111.118 43.272 215.584 121.844 294.156s183.038 121.844 294.156 121.844c111.118 0 215.584-43.272 294.156-121.844s121.844-183.038 121.844-294.156c0-111.118-43.272-215.584-121.844-294.156s-183.038-121.844-294.156-121.844zM512 0v0c282.77 0 512 229.23 512 512s-229.23 512-512 512c-282.77 0-512-229.23-512-512s229.23-512 512-512zM448 704h128v128h-128zM448 192h128v384h-128z"></path>
            </svg>
            <div className="md:ml-4">
              <h5 className="font-semibold ml-2rem ">
                Please see perspective from the Securities and Exchange
                Comission (SEC) on the risks of day trading.
              </h5>
              <a href="/">
                {' '}
                <p className="text-sky-700 font-semibold">Learn More</p>{' '}
              </a>
            </div>
          </section>
          <section className="flex flex-col">
            <h5 className="font-bold mt-10 mb-2">Market Movers</h5>
            <table>
              <thead>
                <tr>
                  <th className="border-r border-t border-slate-300 font-semibold text-sm pr-4">
                    Symbol
                  </th>
                  <th className="border-r border-t border-slate-300 font-semibold text-sm text-center px-4">
                    Volume
                  </th>
                  <th className="border-r border-t border-slate-300 font-semibold text-sm text-center px-4">
                    90-Day Avg.
                  </th>
                  <th className="border-t border-slate-300 font-semibold text-sm text-center px-4">
                    Today's Gain/Loss
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-300">
                  <td className="py-2 text-sm	font-bold">ALOR</td>
                  <td className="py-2 text-sm text-right">3.3k</td>
                  <td className="py-2 text-sm text-right">0k</td>
                  <td className="py-2 text-sm text-center text-green-600">
                    890%
                  </td>
                </tr>
                <tr className="border-t border-slate-300">
                  <td className="py-2 text-sm	font-bold">GMVD</td>
                  <td className="py-2 text-sm text-right">22,082.9k</td>
                  <td className="py-2 text-sm text-right">748k</td>
                  <td className="py-2 text-sm text-center text-green-600">
                    35.32%
                  </td>
                </tr>
                <tr className="border-t border-slate-300">
                  <td className="py-2 text-sm	font-bold">DAVE</td>
                  <td className="py-2 text-sm text-right">11681.2k</td>
                  <td className="py-2 text-sm text-right">151.4k</td>
                  <td className="py-2 text-sm text-center text-green-600">
                    19.49%
                  </td>
                </tr>
                <tr className="border-t border-slate-300">
                  <td className="py-2 text-sm	font-bold">BTCS</td>
                  <td className="py-2 text-sm text-right">37,803.4k</td>
                  <td className="py-2 text-sm text-right">1,133.6k</td>
                  <td className="py-2 text-sm text-center text-green-600">
                    17.16%
                  </td>
                </tr>
                <tr className="border-t border-slate-300">
                  <td className="py-2 text-sm	font-bold">BBLN</td>
                  <td className="py-2 text-sm text-right">534k</td>
                  <td className="py-2 text-sm text-right">321.3k</td>
                  <td className="py-2 text-sm text-center text-green-600">
                    16.83%
                  </td>
                </tr>
                <tr className="border-t border-slate-300">
                  <td className="py-2 text-sm	font-bold">CSM</td>
                  <td className="py-2 text-sm text-right">4.9k</td>
                  <td className="py-2 text-sm text-right">15.9k</td>
                  <td className="py-2 text-sm text-center text-red-600">
                    -50.35%
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </section>
    </div>
    <div
      id="bottom-container"
      className="bg-[#370511] mt-10 flex justify-center"
    >
      <section
        id="bottom-content"
        className="p-10 lg:p-20 space-y-10 text-center"
      >
        <h3 className="text-2xl md:text-5xl font-bold text-white ">
          Customer Service and Security
        </h3>
        <p className="max-w-2xl lg:max-w-5xl md:text-1xl lg:text-2xl font-medium text-white">
          Get in touch with us 24/7 for customer service needs. To learn about
          our security practices, see our Online Security Policy.
        </p>
        <section
          id="icon-group"
          className="flex justify-between text-white gap-8 md:gap-4 flex-col md:flex-row"
        >
          <span className="space-y-2 flex flex-col items-center">
            <svg viewBox="0 0 1024 1024" className="w-16 fill-white">
              <path d="M282 460q96 186 282 282l94-94q20-20 44-10 72 24 152 24 18 0 30 12t12 30v150q0 18-12 30t-30 12q-300 0-513-213t-213-513q0-18 12-30t30-12h150q18 0 30 12t12 30q0 80 24 152 8 26-10 44z"></path>
            </svg>
            <h4 className="text-3xl font-semibold">
              Questions?
              <br /> 833-300-0603
            </h4>
          </span>
          <span className="space-y-2 flex flex-col items-center">
            <svg viewBox="0 0 1024 1024" className="w-16 fill-white">
              <path d="M810 640v-86h-84v86h84zM810 810v-84h-84v84h84zM554 298v-84h-84v84h84zM554 470v-86h-84v86h84zM554 640v-86h-84v86h84zM554 810v-84h-84v84h84zM298 470v-86h-84v86h84zM298 640v-86h-84v86h84zM298 810v-84h-84v84h84zM640 470h256v426h-768v-598h256v-84l128-128 128 128v256z"></path>
            </svg>
            <h4 className="text-3xl font-semibold">
              Find an Investor <br />
              Center
            </h4>
          </span>
          <span className="space-y-2 flex flex-col items-center">
            <svg viewBox="0 0 1024 1024" className="w-16 fill-white">
              <path d="M512 42l384 172v256q0 178-110 325t-274 187q-164-40-274-187t-110-325v-256z"></path>
            </svg>
            <h4 className="text-3xl font-semibold">
              Learn about our <br /> Online Security
            </h4>
          </span>
        </section>
      </section>
    </div>
    <Footer />
  </div>
);

export default Home;
