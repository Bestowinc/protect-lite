import TopNav from '../../components/TopNav/TopNav';
import Footer from '../../components/Footer/Footer';
import React, { useEffect, useContext, Suspense } from 'react';
import { UserContext } from '../../components/Context/UserContext';
const AccodionContainer = React.lazy(() =>
  import('../../components/AccordionContainer/AccordionContainer'),
);

const Portfolio = () => {
  const { currentUser, setLoggedStatus } = useContext(UserContext);
  useEffect(() => {
    setLoggedStatus(true);
  }, []);

  const openBestowModal = () => {
    var element = document.querySelector('#bestow-modal');
    if (element) {
      element.parentNode.removeChild(element);
    }
    window.BestowModal.setup(
      'get-quote-modal',
      process.env.REACT_APP_AGENT_URL,
      currentUser,
      true,
    );
  };

  const openBestowSlideout = () => {
    var element = document.querySelector('#bestow-slideout-gutter');
    if (element) {
      element.parentNode.removeChild(element);
    }
    window.BestowSlideout.setup(
      'get-quote-slideout',
      process.env.REACT_APP_AGENT_URL,
      currentUser,
      true,
    );
  };

  return (
    <div id="portfolio-wrapper">
      <section
        id="portfolio-header"
        className="bg-white border-b border-slate-300 drop-shadow w-full"
      >
        <TopNav />
      </section>
      <div
        id="main-container"
        className="w-full p-4 md:p-10 flex justify-center flex-col lg:flex-row bg-[#f5f2f3]"
      >
        <main className="flex flex-col lg:flex-row justify-center gap-4 text-center md:text-left min-h-screen">
          <section
            id="main-left-column"
            className="flex flex-col w-full lg:w-3/5"
          >
            <div id="left-card" className="w-full">
              <div className="border border-slate-300 bg-white p-4 pb-8">
                <h5 className="font-semibold">All Accounts</h5>
                <p className="font-bold text-2xl">$206,546.55</p>
                <p className="font-lighter text-xs">
                  AS OF 01/13/2022 8:44 AM CST
                </p>
              </div>
            </div>
            <div className="px-4 py-2 font-semibold border-x border-slate-300">
              <h5>Retirement Accounts</h5>
            </div>
            <div id="left-card" className="w-full">
              <div className="border border-slate-300 bg-white p-4 py-8 flex justify-between">
                <div>
                  <h5 className="font-bold">ROLLOVER IRA</h5>
                  <p className="font-lighter text-xs">20175800</p>
                </div>
                <div>
                  <h5 className="font-bold">$156,406.35</h5>
                  <p className="font-lighter text-xs text-green-600">
                    $5661.91 (+3.62%)
                  </p>
                </div>
              </div>
            </div>
            <div className="px-4 py-2 font-semibold border-x border-slate-300">
              <h5>Stock Accounts</h5>
            </div>
            <div id="left-card" className="w-full">
              <div className="border border-slate-300 bg-white p-4 py-8 flex justify-between">
                <div>
                  <h5 className="font-bold">FUNTIME STOCKS</h5>
                  <p className="font-lighter text-xs">1016590</p>
                </div>
                <div>
                  <h5 className="font-bold">$50,140.20</h5>
                  <p className="font-lighter text-xs text-green-600">
                    $2025.66 (+4.04%)
                  </p>
                </div>
              </div>
            </div>
            <div id="left-card" className="w-full ">
              <div className="hidden md:block border-x border-b border-slate-300 bg-white p-4 py-8 h-72"></div>
            </div>
          </section>
          <section
            id="main-right-column"
            className="text-lg w-full lg:w-4/6 space-y-6"
          >
            <div id="right-header-card" className="w-full">
              <div className="border border-slate-300 bg-white px-4 py-2 flex justify-center items-center md:justify-between flex-col md:flex-row md:gap-10">
                <div className="self-center">
                  <a
                    href="https://bestow.com"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <h5 className="font-semibold text-xl mb-4 text-sky-700">
                      Affordable Term Life Insurance
                    </h5>
                  </a>

                  <p className="font-medium text-xs md:w-80">
                    Bestow Term life insurance provides guaranteed protection
                    and level premiums during your term length.
                  </p>
                </div>
                <div className="w-52 p-2 flex justify-center flex-col">
                  <img
                    alt="bestow logo"
                    src="/bestow_image-200h.jpg"
                    className="w-full h-[60px]"
                  />
                  <button
                    id="get-quote-slideout"
                    className="font-lighter text-center text-sky-700"
                    onClick={openBestowSlideout}
                  >
                    Get a Quote
                  </button>
                </div>
                <button id="life-insurance-button">
                  <svg viewBox="0 0 1024 1024" className="w-6 fill-gray-400">
                    <path d="M213.333 85.333c-35.328 0-67.413 14.379-90.496 37.504s-37.504 55.168-37.504 90.496v597.333c0 35.328 14.379 67.413 37.504 90.496s55.168 37.504 90.496 37.504h597.333c35.328 0 67.413-14.379 90.496-37.504s37.504-55.168 37.504-90.496v-597.333c0-35.328-14.379-67.413-37.504-90.496s-55.168-37.504-90.496-37.504zM213.333 170.667h597.333c11.776 0 22.4 4.736 30.165 12.501s12.501 18.389 12.501 30.165v597.333c0 11.776-4.736 22.4-12.501 30.165s-18.389 12.501-30.165 12.501h-597.333c-11.776 0-22.4-4.736-30.165-12.501s-12.501-18.389-12.501-30.165v-597.333c0-11.776 4.736-22.4 12.501-30.165s18.389-12.501 30.165-12.501zM341.333 554.667h128v128c0 23.552 19.115 42.667 42.667 42.667s42.667-19.115 42.667-42.667v-128h128c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-128v-128c0-23.552-19.115-42.667-42.667-42.667s-42.667 19.115-42.667 42.667v128h-128c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
                  </svg>
                </button>
              </div>
              {/* {currentUser && ( */}
              <Suspense fallback={<div>Loading...</div>}>
                <AccodionContainer currentUser={currentUser} />
              </Suspense>
              {/* )} */}
            </div>
            <div
              id="right-card"
              className="w-full flex justify-between border border-slate-300 bg-white px-4 py-2"
            >
              <h5 className="font-semibold">Your Balance History</h5>
              <button id="get-quote-modal" onClick={openBestowModal}>
                <svg viewBox="0 0 1024 1024" className="w-6 fill-gray-400">
                  <path d="M213.333 85.333c-35.328 0-67.413 14.379-90.496 37.504s-37.504 55.168-37.504 90.496v597.333c0 35.328 14.379 67.413 37.504 90.496s55.168 37.504 90.496 37.504h597.333c35.328 0 67.413-14.379 90.496-37.504s37.504-55.168 37.504-90.496v-597.333c0-35.328-14.379-67.413-37.504-90.496s-55.168-37.504-90.496-37.504zM213.333 170.667h597.333c11.776 0 22.4 4.736 30.165 12.501s12.501 18.389 12.501 30.165v597.333c0 11.776-4.736 22.4-12.501 30.165s-18.389 12.501-30.165 12.501h-597.333c-11.776 0-22.4-4.736-30.165-12.501s-12.501-18.389-12.501-30.165v-597.333c0-11.776 4.736-22.4 12.501-30.165s18.389-12.501 30.165-12.501zM341.333 554.667h128v128c0 23.552 19.115 42.667 42.667 42.667s42.667-19.115 42.667-42.667v-128h128c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-128v-128c0-23.552-19.115-42.667-42.667-42.667s-42.667 19.115-42.667 42.667v128h-128c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
                </svg>
              </button>
            </div>
            <div className="flex flex-col border bg-white p-4">
              <div className="flex justify-between mb-4">
                <h5 className="font-bold">Your Top & Bottom Movers</h5>
                <svg viewBox="0 0 1024 1024" className="w-6 fill-gray-400">
                  <path d="M213.333 85.333c-35.328 0-67.413 14.379-90.496 37.504s-37.504 55.168-37.504 90.496v597.333c0 35.328 14.379 67.413 37.504 90.496s55.168 37.504 90.496 37.504h597.333c35.328 0 67.413-14.379 90.496-37.504s37.504-55.168 37.504-90.496v-597.333c0-35.328-14.379-67.413-37.504-90.496s-55.168-37.504-90.496-37.504zM213.333 170.667h597.333c11.776 0 22.4 4.736 30.165 12.501s12.501 18.389 12.501 30.165v597.333c0 11.776-4.736 22.4-12.501 30.165s-18.389 12.501-30.165 12.501h-597.333c-11.776 0-22.4-4.736-30.165-12.501s-12.501-18.389-12.501-30.165v-597.333c0-11.776 4.736-22.4 12.501-30.165s18.389-12.501 30.165-12.501zM341.333 554.667h341.333c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-341.333c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
                </svg>
              </div>
              <table>
                <thead>
                  <tr>
                    <th className="border-r border-t border-slate-300 font-semibold text-sm pr-4">
                      Symbol
                    </th>
                    <th className="border-r border-t border-slate-300 font-semibold text-sm text-center px-4">
                      Today's Gain/Loss
                    </th>
                    <th className="border-t border-slate-300 font-semibold text-sm text-right pl-4">
                      Last Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-slate-300">
                    <td className="py-1 flex flex-col">
                      <h5 className="text-sm font-bold">AMAT</h5>
                      <p className="text-xs font-meduim">
                        APPLIED MATERIALS INC COM USD0.01
                      </p>
                    </td>
                    <td className="text-sm text-center align-top text-green-600">
                      $352.50 (2.35%)
                    </td>
                    <td className="text-sm text-right align-top">$163.300</td>
                  </tr>
                  <tr className="border-t border-slate-300">
                    <td className="py-1 flex flex-col">
                      <h5 className="text-sm font-bold">JUESX</h5>
                      <p className="text-xs font-meduim">
                        JPMORGAN US EQUITY FUND CLASS I
                      </p>
                    </td>
                    <td className="text-sm text-center align-top text-green-600">
                      $9.55 (0.32%)
                    </td>
                    <td className="text-sm text-right align-top">$21.87</td>
                  </tr>
                  <tr className="border-t border-slate-300">
                    <td className="py-1 flex flex-col">
                      <h5 className="text-sm font-bold">AMD</h5>
                      <p className="text-xs font-meduim">
                        ADVANCED MICRO DEVICES INC
                      </p>
                    </td>
                    <td className="text-sm text-center align-top text-green-600">
                      $128.76 (0.32%)
                    </td>
                    <td className="text-sm text-right align-top">$137.905</td>
                  </tr>
                  <tr className="border-t border-slate-300">
                    <td className="py-1 flex flex-col">
                      <h5 className="text-sm font-bold">MSFT</h5>
                      <p className="text-xs font-meduim">MICROSOFT CORP</p>
                    </td>
                    <td className="text-sm text-center align-top text-red-600">
                      -$53.70 (-0.28%)
                    </td>
                    <td className="text-sm text-right align-top">$317.375</td>
                  </tr>
                  <tr className="border-t border-slate-300">
                    <td className="py-1 flex flex-col">
                      <h5 className="text-sm font-bold">FSRPX</h5>
                      <p className="text-xs font-meduim">
                        FIDELITY SELECT RETAILING
                      </p>
                    </td>
                    <td className="text-sm text-center align-top text-red-600">
                      -$1.76 (-0.54%)
                    </td>
                    <td className="text-sm text-right align-top">$21.95</td>
                  </tr>
                  <tr className="border-t border-slate-300">
                    <td className="py-1 flex flex-col">
                      <h5 className="text-sm font-bold">NVDA</h5>
                      <p className="text-xs font-meduim">
                        NVIDIA CORPORATION COM
                      </p>
                    </td>
                    <td className="text-sm text-center align-top text-red-600">
                      -$385.92 (-1.44%)
                    </td>
                    <td className="text-sm text-right align-top">$275.970</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              id="right-card"
              className="w-full flex justify-between border border-slate-300 bg-white px-4 py-2"
            >
              <h5 className="font-semibold">MarketMovers</h5>
              <svg viewBox="0 0 1024 1024" className="w-6 fill-gray-400">
                <path d="M213.333 85.333c-35.328 0-67.413 14.379-90.496 37.504s-37.504 55.168-37.504 90.496v597.333c0 35.328 14.379 67.413 37.504 90.496s55.168 37.504 90.496 37.504h597.333c35.328 0 67.413-14.379 90.496-37.504s37.504-55.168 37.504-90.496v-597.333c0-35.328-14.379-67.413-37.504-90.496s-55.168-37.504-90.496-37.504zM213.333 170.667h597.333c11.776 0 22.4 4.736 30.165 12.501s12.501 18.389 12.501 30.165v597.333c0 11.776-4.736 22.4-12.501 30.165s-18.389 12.501-30.165 12.501h-597.333c-11.776 0-22.4-4.736-30.165-12.501s-12.501-18.389-12.501-30.165v-597.333c0-11.776 4.736-22.4 12.501-30.165s18.389-12.501 30.165-12.501zM341.333 554.667h128v128c0 23.552 19.115 42.667 42.667 42.667s42.667-19.115 42.667-42.667v-128h128c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-128v-128c0-23.552-19.115-42.667-42.667-42.667s-42.667 19.115-42.667 42.667v128h-128c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
              </svg>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Portfolio;
