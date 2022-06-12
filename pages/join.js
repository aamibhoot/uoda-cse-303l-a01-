import Head from "next/head";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Container from "../components/container";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useEffect, useRef, useState } from "react";
const hcaptcha = process.env.NEXT_PUBLIC_HC_KEY;

export default function Home() {
  const [token, setToken] = useState(null);
  const captchaRef = useRef(null);

  const [tcAgree, setTcAgree] = useState(false);
  const [pwdMatch, setPwdMatch] = useState();
  const [pwdConfMatch, setConfPwdMatch] = useState();
  const [isSuccess, setIsSuccess] = useState();

  function getFormValues(event) {
    const data = new FormData(event.currentTarget);
    return Object.fromEntries(data.entries());
  }

  function useSubmit(fn) {
    return (event) => {
      event.preventDefault();

      const values = getFormValues(event);
      return fn(values);
    };
  }
  const onLoad = () => {};
  const handleSubmit = useSubmit((values) => {
    const {
      first_name,
      last_name,
      dob,
      mobile,
      department,
      studentId,
      email,
      password,
      confirm_password,
      toc,
    } = values;
    const data = {
      first_name,
      last_name,
      dob,
      mobile,
      department,
      studentId,
      email,
      password,
      confirm_password,
      toc,
    };

    fetch("/api/new", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        const { success } = data;
        setIsSuccess(success);
        console.log(success);
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    console.table({
      first_name,
      last_name,
      dob,
      mobile,
      department,
      studentId,
      email,
      password,
      confirm_password,
      toc,
    });
  });
  useEffect(() => {
    if (token) console.log(`hCaptcha Token: ${token}`);
  }, [token]);
  return (
    <>
      <Head>
        <title>Join UCS | UODA</title>
        <meta name="description" content="UODA Computer Society" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "svg#freepik_stories-add-user:not(.animated) .animable {opacity: 0;}svg#freepik_stories-add-user.animated #freepik--background-simple--inject-231 {animation: 1s 1 forwards cubic-bezier(.36,-0.01,.5,1.38) slideRight;animation-delay: 0s;}svg#freepik_stories-add-user.animated #freepik--Shadow--inject-231 {animation: 1s 1 forwards cubic-bezier(.36,-0.01,.5,1.38) zoomOut;animation-delay: 0s;}svg#freepik_stories-add-user.animated #freepik--Window--inject-231 {animation: 1s 1 forwards cubic-bezier(.36,-0.01,.5,1.38) slideLeft;animation-delay: 0s;}svg#freepik_stories-add-user.animated #freepik--Character--inject-231 {animation: 1s 1 forwards cubic-bezier(.36,-0.01,.5,1.38) slideDown;animation-delay: 0s;}            @keyframes slideRight {                0% {                    opacity: 0;                    transform: translateX(30px);                }                100% {                    opacity: 1;                    transform: translateX(0);                }            }                    @keyframes zoomOut {                0% {                    opacity: 0;                    transform: scale(1.5);                }                100% {                    opacity: 1;                    transform: scale(1);                }            }                    @keyframes slideLeft {                0% {                    opacity: 0;                    transform: translateX(-30px);                }                100% {                    opacity: 1;                    transform: translateX(0);                }            }                    @keyframes slideDown {                0% {                    opacity: 0;                    transform: translateY(-30px);                }                100% {                    opacity: 1;                    transform: translateY(0);                }            }        ",
        }}
      />
      <Navbar />
      <Container className="flex w-full justify-center flex-wrap lg:gap-10 lg:flex-nowrap pt-20 transition-all ease-in-out delay-150">
        <div className="w-7/12 lg:p-7">
          {isSuccess === true ? <SuccessSVG /> : <AnimatedSVG />}
        </div>
        <div className={`lg:w-7/12 w-full mt-4`}>
          <div className="flex flex-col justify-center items-center w-full h-full px-14 rounded-2xl py-10 bg-trueGray-800">
            <h1 className="text-4xl leading-normal text-center pb-4">
              {isSuccess === true
                ? "✨ Successfully Submitted"
                : "🚀 Complete your application"}
            </h1>
            {isSuccess === true ? (
              <p className="text-center">
                Please contact with your batch advisor for furthermore
              </p>
            ) : (
              ""
            )}
            <form
              className={`w-full ${isSuccess === true ? " hidden" : ""}`}
              onSubmit={handleSubmit}
            >
              <div className="grid gap-6 mb-6 lg:grid-cols-2">
                <div>
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-100"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white"
                    placeholder="First Name"
                    required={true}
                  />
                </div>
                <div>
                  <label
                    htmlFor="last_name"
                    className="block mb-2 text-sm font-medium text-gray-100"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white"
                    placeholder="Last Name"
                    required={true}
                  />
                </div>
                <div>
                  <label
                    htmlFor="dob"
                    className="block mb-2 text-sm font-medium text-gray-100"
                  >
                    Date of Birth
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      required={true}
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white"
                      placeholder="Select date"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="mobile"
                    className="block mb-2 text-sm font-medium text-gray-100"
                  >
                    Mobile number
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    id="mobile"
                    className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white"
                    placeholder="880-1245-678-123"
                    required={true}
                  />
                </div>
                <div>
                  <label
                    htmlFor="department"
                    className="block mb-2 text-sm font-medium"
                  >
                    Department
                  </label>
                  <select
                    name="department"
                    id="department"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white"
                    placeholder="Department"
                    required={true}
                  >
                    <option>CSE</option>
                    <option>ETE</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="studentId"
                    className="block mb-2 text-sm font-medium text-gray-100"
                  >
                    Unique StudentId
                  </label>
                  <input
                    type="number"
                    id="studentId"
                    name="studentId"
                    className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white"
                    placeholder="02 **** **** *** ***"
                    required={true}
                  />
                </div>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-100"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white"
                  placeholder="someone@ucs.uoda.edu.bd"
                  required={true}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-100"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white"
                  placeholder="•••••••••"
                  required={true}
                  onChange={(e) => {
                    setPwdMatch(e.target.value),
                      setConfPwdMatch(e.target.value);
                  }}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="confirm_password"
                  className="block mb-2 text-sm font-medium text-gray-100"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  id="confirm_password"
                  name="confirm_password"
                  className={`border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                    pwdMatch !== pwdConfMatch ? "bg-red-300" : "bg-white"
                  }`}
                  placeholder="•••••••••"
                  required={true}
                  onChange={(e) => {
                    setTimeout(() => {
                      setConfPwdMatch(e.target.value);
                    }, 500);
                  }}
                />
              </div>
              <div className="flex items-start mb-6">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    name="toc"
                    defaultValue=""
                    className="w-4 h-4 border border-gray-300 rounded  focus:ring-3 focus:ring-blue-300 bg-white  dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    required={true}
                    onClick={() => {
                      setTcAgree(!tcAgree);
                    }}
                    onChange={() => {
                      setTcAgree(!tcAgree);
                    }}
                  />
                </div>
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm font-medium text-gray-100 dark:text-gray-400"
                >
                  I agree with the{" "}
                  <a
                    href="#"
                    className="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    terms and conditions
                  </a>
                  .
                </label>
              </div>
              {tcAgree === true ? (
                <div className="mb-10">
                  <HCaptcha
                    sitekey={hcaptcha}
                    onLoad={onLoad}
                    onVerify={setToken}
                    ref={captchaRef}
                    theme={"dark"}
                  />
                </div>
              ) : (
                ""
              )}
              {!token ? (
                ""
              ) : (
                <button
                  type="submit"
                  className={`text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-blue-800 disable `}
                >
                  Submit
                </button>
              )}
            </form>
            {isSuccess === false ? (
              <b className="text-red-300">🤦🏻‍♂️ Already Applied</b>
            ) : isSuccess === true ? (
              ""
            ) : (
              ""
            )}
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}
function AnimatedSVG() {
  return (
    <>
      <svg
        className="animated"
        id="freepik_stories-add-user"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 500"
        version="1.1"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g
          id="freepik--background-simple--inject-231"
          className="animable"
          style={{ transformOrigin: "255.111px 223.766px" }}
        >
          <path
            d="M285,98.07c-38,39.34-57.92,42.18-106.1,64-39.4,17.79-78.4,52.38-91.71,95.48C52.1,371,207.9,385.22,281.47,366.69c51.79-13.05,72.51-43.1,85.63-93,5.1-19.39,6.59-40.36,15-58.81,9-19.83,27.51-29.48,36.72-46.89C463.41,83.67,335.65,45.62,285,98.07Z"
            style={{
              fill: "#4F46E5",
              transformOrigin: "255.111px 223.766px",
            }}
            id="el50c48cfz076"
            className="animable"
          />
          <g id="elbgt1ztl8ns6">
            <path
              d="M285,98.07c-38,39.34-57.92,42.18-106.1,64-39.4,17.79-78.4,52.38-91.71,95.48C52.1,371,207.9,385.22,281.47,366.69c51.79-13.05,72.51-43.1,85.63-93,5.1-19.39,6.59-40.36,15-58.81,9-19.83,27.51-29.48,36.72-46.89C463.41,83.67,335.65,45.62,285,98.07Z"
              style={{
                fill: "rgb(255, 255, 255)",
                opacity: "0.9",
                transformOrigin: "255.111px 223.766px",
              }}
              className="animable"
              id="el57v2ngs8u6k"
            />
          </g>
        </g>
        <g
          id="freepik--Shadow--inject-231"
          className="animable"
          style={{ transformOrigin: "250px 416.24px" }}
        ></g>
        <g
          id="freepik--Window--inject-231"
          className="animable"
          style={{ transformOrigin: "198.69px 216.91px" }}
        >
          <path
            d="M52.3,113.53a6.3,6.3,0,0,1,6.28-6.28H338.8a6.3,6.3,0,0,1,6.28,6.28v20.21H52.3Z"
            style={{
              fill: "rgb(38, 50, 56)",
              transformOrigin: "198.69px 120.495px",
            }}
            id="elh9s93570gqn"
            className="animable"
          />
          <path
            d="M103.07,125.79a5.3,5.3,0,1,1,5.3-5.3A5.3,5.3,0,0,1,103.07,125.79Zm0-9.49a4.19,4.19,0,1,0,4.19,4.19A4.2,4.2,0,0,0,103.07,116.3Z"
            style={{
              fill: "rgb(240, 240, 240)",
              transformOrigin: "103.07px 120.49px",
            }}
            id="elcy0ywbua4qv"
            className="animable"
          />
          <path
            d="M86.24,125.79a5.3,5.3,0,1,1,5.31-5.3A5.3,5.3,0,0,1,86.24,125.79Zm0-9.49a4.19,4.19,0,1,0,4.2,4.19A4.2,4.2,0,0,0,86.24,116.3Z"
            style={{
              fill: "rgb(240, 240, 240)",
              transformOrigin: "86.25px 120.49px",
            }}
            id="el6idrlypvfxa"
            className="animable"
          />
          <path
            d="M69.42,125.79a5.3,5.3,0,1,1,5.31-5.3A5.3,5.3,0,0,1,69.42,125.79Zm0-9.49a4.19,4.19,0,1,0,4.19,4.19A4.2,4.2,0,0,0,69.42,116.3Z"
            style={{
              fill: "rgb(240, 240, 240)",
              transformOrigin: "69.43px 120.49px",
            }}
            id="el43ydk1uklqg"
            className="animable"
          />
          <path
            d="M338.8,326.57H58.58a6.3,6.3,0,0,1-6.28-6.28V133.74H345.08V320.29A6.3,6.3,0,0,1,338.8,326.57Z"
            style={{
              fill: "#4F46E5",
              transformOrigin: "198.69px 230.155px",
            }}
            id="elrnd3qu65r8"
            className="animable"
          />
          <rect
            x="54.08"
            y="139.11"
            width="289.22"
            height="165.33"
            style={{
              fill: "rgb(255, 255, 255)",
              transformOrigin: "198.69px 221.775px",
            }}
            id="els740tx1nhwa"
            className="animable"
          />
          <rect
            x="68.25"
            y="153.28"
            width="117.79"
            height="22.33"
            rx="3.81"
            style={{
              fill: "#4F46E5",
              transformOrigin: "127.145px 164.445px",
            }}
            id="el07l0p21xcluh"
            className="animable"
          />
          <path
            d="M325.32,154.28a2.81,2.81,0,0,1,2.81,2.81V171.8a2.81,2.81,0,0,1-2.81,2.81H215.15a2.81,2.81,0,0,1-2.81-2.81V157.09a2.81,2.81,0,0,1,2.81-2.81H325.32m0-1H215.15a3.82,3.82,0,0,0-3.81,3.81V171.8a3.81,3.81,0,0,0,3.81,3.81H325.32a3.81,3.81,0,0,0,3.81-3.81V157.09a3.82,3.82,0,0,0-3.81-3.81Z"
            style={{
              fill: "#4F46E5",
              transformOrigin: "270.235px 164.445px",
            }}
            id="el0g0d5slf5h49"
            className="animable"
          />
          <path
            d="M87.83,185.61a18.58,18.58,0,1,1-18.58,18.58,18.6,18.6,0,0,1,18.58-18.58m0-1a19.58,19.58,0,1,0,19.58,19.58,19.58,19.58,0,0,0-19.58-19.58Z"
            style={{ fill: "#4F46E5", transformOrigin: "87.83px 204.19px" }}
            id="el00lr3263wrr9t"
            className="animable"
          />
          <g id="elab630898y9q">
            <path
              d="M102,211.89a16.16,16.16,0,0,1-28.41,0,25.56,25.56,0,0,1,28.41,0Z"
              style={{
                fill: "#4F46E5",
                opacity: "0.4",
                transformOrigin: "87.795px 213.962px",
              }}
              className="animable"
              id="el1h5nyshgz"
            />
          </g>
          <g id="el7iwpaifvuxp">
            <circle
              cx="87.83"
              cy="198.66"
              r="7.2"
              style={{
                fill: "#4F46E5",
                opacity: "0.4",
                transformOrigin: "87.83px 198.66px",
              }}
              className="animable"
              id="elnseixn5x26"
            />
          </g>
          <g id="el7bml0av17g4">
            <path
              d="M319.06,214.26H128.48a10.07,10.07,0,0,1-10.07-10.07h0a10.06,10.06,0,0,1,10.07-10.06H319.06a10.06,10.06,0,0,1,10.07,10.06h0A10.07,10.07,0,0,1,319.06,214.26Z"
              style={{
                fill: "#4F46E5",
                opacity: "0.4",
                transformOrigin: "223.77px 204.195px",
              }}
              className="animable"
              id="elzha23z7kuo"
            />
          </g>
          <path
            d="M87.83,239a18.58,18.58,0,1,1-18.58,18.58A18.59,18.59,0,0,1,87.83,239m0-1a19.58,19.58,0,1,0,19.58,19.58A19.58,19.58,0,0,0,87.83,238Z"
            style={{ fill: "#4F46E5", transformOrigin: "87.83px 257.58px" }}
            id="ellqa57d96388"
            className="animable"
          />
          <g id="elnv8n6ixe2p">
            <path
              d="M102,265.22a16.16,16.16,0,0,1-28.41,0,25.61,25.61,0,0,1,28.41,0Z"
              style={{
                fill: "#4F46E5",
                opacity: "0.4",
                transformOrigin: "87.795px 267.297px",
              }}
              className="animable"
              id="el2jjc23e2s3z"
            />
          </g>
          <g id="elvvdapf6036p">
            <circle
              cx="87.83"
              cy={252}
              r="7.2"
              style={{
                fill: "#4F46E5",
                opacity: "0.4",
                transformOrigin: "87.83px 252px",
              }}
              className="animable"
              id="eljrnuqg2aia"
            />
          </g>
          <g id="el6bo39s3xgv8">
            <path
              d="M128.48,247.46H319.06a10.07,10.07,0,0,1,10.07,10.07v0a10.07,10.07,0,0,1-10.07,10.07H128.48a10.07,10.07,0,0,1-10.07-10.07v0a10.06,10.06,0,0,1,10.06-10.06Z"
              style={{
                fill: "#4F46E5",
                opacity: "0.4",
                transformOrigin: "223.77px 257.53px",
              }}
              className="animable"
              id="elryrzpcudlk"
            />
          </g>
          <g id="el5uaoz7vd724">
            <path
              d="M272.12,267.3a93.48,93.48,0,0,0,1.79,18.22,37.58,37.58,0,0,0-18.39,32.23,37.17,37.17,0,0,0,1,8.82H338.8a6.3,6.3,0,0,0,6.28-6.28v-144A93.33,93.33,0,0,0,272.12,267.3Z"
              style={{
                opacity: "0.1",
                transformOrigin: "300.3px 251.43px",
              }}
              className="animable"
              id="elm4abx8kevg"
            />
          </g>
        </g>
        <g
          id="freepik--Character--inject-231"
          className="animable"
          style={{ transformOrigin: "365.31px 271.24px" }}
        >
          <g id="eldqll1rg12xa">
            <circle
              cx="365.31"
              cy="271.24"
              r="83.19"
              style={{
                fill: "#4F46E5",
                transformOrigin: "365.31px 271.24px",
                transform: "rotate(-45deg)",
              }}
              className="animable"
              id="el22yety2017s"
            />
          </g>
          <g id="el7w0k8oq2vjj">
            <circle
              cx="365.7"
              cy="271.13"
              r="75.84"
              style={{
                fill: "rgb(255, 255, 255)",
                transformOrigin: "365.7px 271.13px",
                transform: "rotate(-45deg)",
              }}
              className="animable"
              id="elul7giumz2se"
            />
          </g>
          <path
            d="M340.11,220.25l-4.84,6.2s-4.25,3.22-5.86,6c-1.88,1.86-3.6,3.77-5.3,5.78a79.5,79.5,0,0,0-5.44,7.21,41.84,41.84,0,0,0-4.52,8.59,18.16,18.16,0,0,0-1.21,6,11.13,11.13,0,0,0,.76,4.25,10,10,0,0,0,3.17,4.2l1.06.8,1.59.3a53.59,53.59,0,0,0,9.52.94l1.26-.11L329,257.73c-1.07,0-3.37.21-4.42.19,0-.2.08-.4.13-.6a37.81,37.81,0,0,1,2.6-7c1.12-2.43,2.41-4.86,3.75-7.28,1.18-2.14,2.45-4.29,3.68-6.39l6-3.78,3.51-6.23Zm-15.61,39.5a1.68,1.68,0,0,1,0-.29.76.76,0,0,1,.09.23C324.62,259.93,324.55,259.94,324.5,259.75Z"
            style={{
              fill: "rgb(127, 62, 59)",
              transformOrigin: "328.594px 245.385px",
            }}
            id="el7dn96rqf0b5"
            className="animable"
          />
          <path
            d="M374.19,233.65c.15-.77-5.11-3.41-8.73-1.26-3.13,1.86-3.53,4.4-2.39,7.43,0,.21.08.42.11.63.07.49.13,1,.16,1.46.23,3.19-.61,6.16-4.2,7.85,0,.2-.49.41-.65.55a7.15,7.15,0,0,0-2.38,4.55c0,1.3,1.23,2.33,2.66,3.57l2,1.35,2.74-.26c8.41-2.47,12.34-10.15,12.16-10.72C373.51,245.24,373.54,239,374.19,233.65Z"
            style={{
              fill: "rgb(127, 62, 59)",
              transformOrigin: "365.893px 245.672px",
            }}
            id="eljmunj4clkz"
            className="animable"
          />
          <path
            d="M392.37,251.87l-1.52-.26c-2-.32-10.92-2.34-15.23-2.72h0c-1,2.13-4.28,7.33-12.69,9.8l-2.08.49-2-1a5.3,5.3,0,0,1-2.18-3.84,5.69,5.69,0,0,1,2.18-4,.66.66,0,0,0,.17-.23c0-.24,0-.4,0-.42-.63.08-8.61,1.29-9.28,1.4a130,130,0,0,0-22.07,6.13l.08.72,1.45,12.59.54,4.77s4-.45,9.25-1.37c-1.43,12.74-1.71,31.2,2.66,54.93l17.07-.32,29.66-.55c.12-2-.1-6.14-.31-11.8l-.27-8.74c-.16-7.72-.13-17,.56-26.92.11-1.57.24-3.15.38-4.75h0c6.06,6.55,12.13,12.81,12.13,12.81l2.87-2.76c3.67-1.77,6.56-4.94,9.08-8.75l3.37-3.25S400.57,253.25,392.37,251.87Z"
            style={{
              fill: "#4F46E5",
              transformOrigin: "371.93px 288.875px",
            }}
            id="eldva1s7h2iz"
            className="animable"
          />
          <g id="elw9qk5ko7h9l">
            <path
              d="M384.16,270.64a14.91,14.91,0,0,0,1.95,5.9l2.3,3.94c.11-1.57.24-3.15.38-4.75C387.21,274,385.63,272.29,384.16,270.64Z"
              style={{
                opacity: "0.3",
                transformOrigin: "386.475px 275.56px",
              }}
              className="animable"
              id="elfks21vhzb4e"
            />
          </g>
          <g id="el0plvxmp9l3x">
            <path
              d="M388.8,275.74h0c-.14,1.6-.27,3.18-.38,4.75h0C388.52,278.92,388.66,277.33,388.8,275.74Z"
              style={{
                opacity: "0.3",
                transformOrigin: "388.61px 278.115px",
              }}
              className="animable"
              id="elpgabd50vuyq"
            />
          </g>
          <path
            d="M363.07,239.82c0,.21.07.42.11.63,0-.21-.07-.42-.11-.63Z"
            style={{
              fill: "rgb(127, 62, 59)",
              transformOrigin: "363.125px 240.135px",
            }}
            id="el092z93qsimdi"
            className="animable"
          />
          <g id="elojk521tlyw">
            <path
              d="M363.34,241.91c0-.48-.09-1-.16-1.46C363.25,240.94,363.31,241.43,363.34,241.91Z"
              style={{
                opacity: "0.2",
                transformOrigin: "363.26px 241.18px",
              }}
              className="animable"
              id="el5xdb9y39rak"
            />
          </g>
          <path
            d="M369.56,237.45c-.2.14-.39.29-.6.43a11.54,11.54,0,0,1-5.89,1.94c0,.21.07.42.11.63.07.49.13,1,.16,1.46,0,0,0,.06,0,.09A10.08,10.08,0,0,0,369.56,237.45Z"
            style={{
              fill: "rgb(127, 62, 59)",
              transformOrigin: "366.315px 239.725px",
            }}
            id="el40loiclpqwb"
            className="animable"
          />
          <path
            d="M380.79,250.41a2.23,2.23,0,0,0-1.66-1.7l-2.08-.5a1.24,1.24,0,0,0-1.36.59l-.07.09c-1,2.13-4.28,7.33-12.69,9.8l-.65.15h0l-1.43.34-2-1a5.3,5.3,0,0,1-2.18-3.84,5.69,5.69,0,0,1,2.18-4,2.16,2.16,0,0,0,.29-.37c.09-.23.07-.34-.09-.44-2.21-1.59-7.15.86-7.35,1.28-.21.21-.42.43-.63.68a6.93,6.93,0,0,0-1.6,5.3,10.69,10.69,0,0,0,5.07,7.76.23.23,0,0,0,.14,0,.29.29,0,0,0,.16,0,.33.33,0,0,0,.14-.27,6,6,0,0,1,3.7-5.52l1.75.94c-7.52,30.86-2.42,67.85-2.28,68.85h.58s0,0,0,0c0-.38-5.3-37.69,2.28-68.72l1.83-.44c2.13,2.6,1.12,6.46,1.11,6.5a.3.3,0,0,0,.09.3.31.31,0,0,0,.2.07.2.2,0,0,0,.11,0c.4-.18,9.86-4.32,13.17-8.27a15.8,15.8,0,0,0,3.22-6.5A2.12,2.12,0,0,0,380.79,250.41Z"
            style={{
              fill: "rgb(255, 255, 255)",
              transformOrigin: "365.13px 288.363px",
            }}
            id="eln25agok0it"
            className="animable"
          />
          <g id="elyw8k4tt83d8">
            <path
              d="M369.56,237.45c-.2.14-.39.29-.6.43a11.54,11.54,0,0,1-5.89,1.94c0,.21.07.42.11.63.07.49.13,1,.16,1.46,0,0,0,.06,0,.09A10.08,10.08,0,0,0,369.56,237.45Z"
              style={{
                opacity: "0.2",
                transformOrigin: "366.315px 239.725px",
              }}
              className="animable"
              id="elp76ywmudvd"
            />
          </g>
          <path
            d="M357.21,215.37c3.91-5,1.43-8-.23-7.72-1.57.74-3.06,2.83-3.83,7.51a11.82,11.82,0,0,0-.08,3.34C354.68,218.42,357.21,215.37,357.21,215.37Z"
            style={{
              fill: "rgb(38, 50, 56)",
              transformOrigin: "356.142px 213.066px",
            }}
            id="el8em00dem0or"
            className="animable"
          />
          <path
            d="M373.6,226.4c10.83-19.05-10.56-21.27-14.92-17a18.55,18.55,0,0,0-3.67,4.72l-.91,1.79a27.36,27.36,0,0,0-1,2.59,30.63,30.63,0,0,0-1.7,9.83,11.44,11.44,0,0,0,11.7,11.49h0a11.54,11.54,0,0,0,5.89-1.94c.21-.14.4-.29.6-.43a13.66,13.66,0,0,0,3.59-3.78C375.4,230.08,374.82,228.27,373.6,226.4Z"
            style={{
              fill: "rgb(127, 62, 59)",
              transformOrigin: "364.013px 223.694px",
            }}
            id="eld3g1ulen6da"
            className="animable"
          />
          <path
            d="M353.55,215.32a.42.42,0,0,0,.07.58.43.43,0,0,0,.26.09.37.37,0,0,0,.22-.08.25.25,0,0,0,.1-.08,3.46,3.46,0,0,1,2.73-1.37.42.42,0,0,0,.44-.39.41.41,0,0,0-.38-.44,4.22,4.22,0,0,0-2,.49A4.58,4.58,0,0,0,353.55,215.32Z"
            style={{
              fill: "rgb(38, 50, 56)",
              transformOrigin: "355.418px 214.81px",
            }}
            id="elzeyid6czb"
            className="animable"
          />
          <path
            d="M364.37,227.3a.21.21,0,0,0-.29,0,5.87,5.87,0,0,1-5,1.24.21.21,0,0,0-.24.16.22.22,0,0,0,.16.25,6.85,6.85,0,0,0,1.45.13,6,6,0,0,0,3.89-1.48A.21.21,0,0,0,364.37,227.3Z"
            style={{
              fill: "rgb(38, 50, 56)",
              transformOrigin: "361.628px 228.161px",
            }}
            id="elhbehm9gosyl"
            className="animable"
          />
          <path
            d="M359,220.16a26.31,26.31,0,0,1-4.69,5.21c1,1.38,3.16,1.28,3.16,1.28Z"
            style={{
              fill: "rgb(99, 15, 15)",
              transformOrigin: "356.655px 223.406px",
            }}
            id="elzlj9ydsbwvs"
            className="animable"
          />
          <path
            d="M355.46,220.4c.45.09,1-.39,1.11-1.08s-.07-1.31-.52-1.4-.95.39-1.11,1.08S355,220.31,355.46,220.4Z"
            style={{
              fill: "rgb(38, 50, 56)",
              transformOrigin: "355.745px 219.16px",
            }}
            id="elrcq41yoakf"
            className="animable"
          />
          <path
            d="M363.28,222c.45.09.94-.39,1.11-1.08s-.08-1.31-.53-1.4-.95.39-1.11,1.08S362.82,221.87,363.28,222Z"
            style={{
              fill: "rgb(38, 50, 56)",
              transformOrigin: "363.571px 220.76px",
            }}
            id="elc1ka18und6e"
            className="animable"
          />
          <path
            d="M380.45,211.1c4.23-3.62-5.41-11-5.41-11s1.08,2.64-1.16,3.37-18-5.15-17.77,1.52a5.12,5.12,0,0,0,.87,2.63,7.6,7.6,0,0,0,1.7,1.75C362.34,212.15,369,213,372.6,213a18.54,18.54,0,0,0-1.19,4.34,11.55,11.55,0,0,0,2.19,9c2,3.48,4.67,3.38,6.95.73C384.21,223.61,387.74,216.6,380.45,211.1Z"
            style={{
              fill: "rgb(38, 50, 56)",
              transformOrigin: "370.405px 214.555px",
            }}
            id="elymjndxxkzu"
            className="animable"
          />
          <path
            d="M378.61,225.07c-1.66-.68-3.53.12-5,1.33a9.67,9.67,0,0,0-2.07,2.27c-1.41,2.21-.91,4.78,1.62,5l.44,0,.6,0a8.71,8.71,0,0,0,5.27-2.5,4.05,4.05,0,0,0,1.09-4A3.25,3.25,0,0,0,378.61,225.07Z"
            style={{
              fill: "rgb(127, 62, 59)",
              transformOrigin: "375.737px 229.245px",
            }}
            id="elpl7ye4ie998"
            className="animable"
          />
          <path
            d="M341.7,328.81s-.27,2.34-.69,6.27a75.91,75.91,0,0,0,47.29.44c.1-4.75.17-7.59.17-7.59l-29.7.56h-.58Z"
            style={{
              fill: "rgb(38, 50, 56)",
              transformOrigin: "364.74px 333.505px",
            }}
            id="eljotpgw9dpq"
            className="animable"
          />
          <path
            d="M419,288.54a9.9,9.9,0,0,0-.58-2.49,9.26,9.26,0,0,0-.51-1.16l-.29-.54-.16-.28c-1.43-2.46-3-4.79-4.6-7l-9.08,8.75c1.2,1.5,2.37,3,3.45,4.54a7.17,7.17,0,0,1-.77,1.45,33,33,0,0,1-5,5.51,147.39,147.39,0,0,1-12.29,9.93l-1.39.18-5.58.76-5.49,3.71,3.61,7.34,4.54-2.32a17.43,17.43,0,0,0,3.19-.75,6.82,6.82,0,0,0,3.93-2.78,83.26,83.26,0,0,0,7.79-3.56,77.34,77.34,0,0,0,7.9-4.69q1.93-1.32,3.82-2.89a29.3,29.3,0,0,0,3.7-3.63,16.68,16.68,0,0,0,3.26-5.57A10.72,10.72,0,0,0,419,288.54Zm-11.69,1.58c0-.05,0-.11,0-.15,0-.24.09-.33.09-.19A1.07,1.07,0,0,1,407.33,290.12Z"
            style={{
              fill: "rgb(127, 62, 59)",
              transformOrigin: "397.878px 298.155px",
            }}
            id="el9wfgg9pxvy"
            className="animable"
          />
          <g id="eluhd69k4tala">
            <circle
              cx="292.97"
              cy="313.69"
              r="27.45"
              style={{
                fill: "rgb(38, 50, 56)",
                transformOrigin: "292.97px 313.69px",
                transform: "rotate(-80.78deg)",
              }}
              className="animable"
              id="el826rp8wcxhr"
            />
          </g>
          <path
            d="M308.06,311.12H295.54V298.6a2.57,2.57,0,1,0-5.14,0v12.52H277.88a2.57,2.57,0,0,0,0,5.14H290.4v12.52a2.57,2.57,0,1,0,5.14,0V316.26h12.52a2.57,2.57,0,0,0,0-5.14Z"
            style={{
              fill: "rgb(255, 255, 255)",
              transformOrigin: "292.97px 313.69px",
            }}
            id="el5sof6a7zi9h"
            className="animable"
          />
          <path
            d="M364.77,216.76a3.16,3.16,0,0,1,2.28,1.86.42.42,0,0,0,.38.24.35.35,0,0,0,.17,0,.41.41,0,0,0,.2-.55,4,4,0,0,0-2.92-2.33.41.41,0,0,0-.11.82Z"
            style={{
              fill: "rgb(38, 50, 56)",
              transformOrigin: "366.126px 217.423px",
            }}
            id="el2a0o9k2rcvc"
            className="animable"
          />
        </g>
        <defs>
          {" "}
          <filter id="active" height="200%">
            {" "}
            <feMorphology
              in="SourceAlpha"
              result="DILATED"
              operator="dilate"
              radius={2}
            />{" "}
            <feFlood floodColor="#32DFEC" floodOpacity={1} result="PINK" />{" "}
            <feComposite
              in="PINK"
              in2="DILATED"
              operator="in"
              result="OUTLINE"
            />{" "}
            <feMerge>
              {" "}
              <feMergeNode in="OUTLINE" /> <feMergeNode in="SourceGraphic" />{" "}
            </feMerge>{" "}
          </filter>{" "}
          <filter id="hover" height="200%">
            {" "}
            <feMorphology
              in="SourceAlpha"
              result="DILATED"
              operator="dilate"
              radius={2}
            />{" "}
            <feFlood floodColor="#ff0000" floodOpacity="0.5" result="PINK" />{" "}
            <feComposite
              in="PINK"
              in2="DILATED"
              operator="in"
              result="OUTLINE"
            />{" "}
            <feMerge>
              {" "}
              <feMergeNode in="OUTLINE" /> <feMergeNode in="SourceGraphic" />{" "}
            </feMerge>{" "}
            <feColorMatrix
              type="matrix"
              values="0   0   0   0   0                0   1   0   0   0                0   0   0   0   0                0   0   0   1   0 "
            />{" "}
          </filter>
        </defs>
      </svg>
    </>
  );
}
function SuccessSVG() {
  return (
    <>
      <svg
        className="animated"
        id="freepik_stories-ok"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 500"
        version="1.1"
      >
        <style
          dangerouslySetInnerHTML={{
            __html:
              "svg#freepik_stories-ok:not(.animated) .animable {opacity: 0;}svg#freepik_stories-ok.animated #freepik--Floor--inject-361 {animation: 1s 1 forwards cubic-bezier(.36,-0.01,.5,1.38) fadeIn;animation-delay: 0s;}svg#freepik_stories-ok.animated #freepik--Shadow--inject-361 {animation: 1s 1 forwards cubic-bezier(.36,-0.01,.5,1.38) fadeIn;animation-delay: 0s;}svg#freepik_stories-ok.animated #freepik--Plants--inject-361 {animation: 1s 1 forwards cubic-bezier(.36,-0.01,.5,1.38) slideUp;animation-delay: 0s;}svg#freepik_stories-ok.animated #freepik--check-mark--inject-361 {animation: 1s 1 forwards cubic-bezier(.36,-0.01,.5,1.38) slideUp;animation-delay: 0s;}svg#freepik_stories-ok.animated #freepik--Character--inject-361 {animation: 1s 1 forwards cubic-bezier(.36,-0.01,.5,1.38) zoomIn;animation-delay: 0s;}svg#freepik_stories-ok.animated #freepik--speech-bubble--inject-361 {animation: 1s 1 forwards cubic-bezier(.36,-0.01,.5,1.38) zoomIn;animation-delay: 0s;}svg#freepik_stories-ok.animated #freepik--Icons--inject-361 {animation: 1s 1 forwards cubic-bezier(.36,-0.01,.5,1.38) zoomOut;animation-delay: 0s;}            @keyframes fadeIn {                0% {                    opacity: 0;                }                100% {                    opacity: 1;                }            }                    @keyframes slideUp {                0% {                    opacity: 0;                    transform: translateY(30px);                }                100% {                    opacity: 1;                    transform: inherit;                }            }                    @keyframes zoomIn {                0% {                    opacity: 0;                    transform: scale(0.5);                }                100% {                    opacity: 1;                    transform: scale(1);                }            }                    @keyframes zoomOut {                0% {                    opacity: 0;                    transform: scale(1.5);                }                100% {                    opacity: 1;                    transform: scale(1);                }            }        .animator-hidden { display: none; }",
          }}
        />
        <g
          id="freepik--Floor--inject-361"
          className="animable"
          style={{ transformOrigin: "250.006px 353.102px" }}
        >
          <path
            id="freepik--floor--inject-361"
            d="M86.28,447.6c-90.41-52.2-90.41-136.84,0-189s237-52.2,327.44,0,90.41,136.84,0,189S176.7,499.81,86.28,447.6Z"
            style={{
              fill: "rgb(245, 245, 245)",
              transformOrigin: "250.006px 353.102px",
            }}
            className="animable"
          />
        </g>
        <g
          id="freepik--Shadow--inject-361"
          className="animable"
          style={{ transformOrigin: "249.812px 351.604px" }}
        >
          <ellipse
            id="freepik--shadow--inject-361"
            cx="158.64"
            cy="409.11"
            rx="71.04"
            ry="41.01"
            style={{
              fill: "rgb(224, 224, 224)",
              transformOrigin: "158.64px 409.11px",
            }}
            className="animable"
          />
          <g id="freepik--shadow--inject-361">
            <ellipse
              cx="298.89"
              cy="345.58"
              rx="101.34"
              ry="50.43"
              style={{
                fill: "rgb(224, 224, 224)",
                transformOrigin: "298.89px 345.58px",
                transform: "rotate(-28.34deg)",
              }}
              className="animable"
            />
          </g>
        </g>
        <g
          id="freepik--Plants--inject-361"
          className="animable"
          style={{ transformOrigin: "261.259px 334.164px" }}
        >
          <g
            id="freepik--plants--inject-361"
            className="animable"
            style={{ transformOrigin: "397.998px 312.935px" }}
          >
            <path
              d="M371.85,331.71c9.85-11.74,25.28-19.39,42.63-23.91,17.14-4.45,20.21-15,8.85-18.41-12.87-3.88-28.93,3.24-39.29,13.15C366,319.81,363.73,333,363.73,333Z"
              style={{
                fill: "rgb(79, 70, 229)",
                transformOrigin: "396.895px 310.657px",
              }}
              id="elqchbvwmiqrr"
              className="animable"
            />
            <g id="el0lqxinypv83g">
              <path
                d="M371.85,331.71c9.85-11.74,25.28-19.39,42.63-23.91,17.14-4.45,20.21-15,8.85-18.41-12.87-3.88-28.93,3.24-39.29,13.15C366,319.81,363.73,333,363.73,333Z"
                style={{
                  opacity: "0.15",
                  transformOrigin: "396.895px 310.657px",
                }}
                className="animable"
              />
            </g>
            <path
              d="M366.78,331a.54.54,0,0,1-.22,0,.5.5,0,0,1-.23-.67c14.62-30,47-37.38,54.84-36.82a.5.5,0,0,1,.46.53.51.51,0,0,1-.54.46c-7.68-.58-39.47,6.73-53.86,36.27A.52.52,0,0,1,366.78,331Z"
              style={{
                fill: "rgb(255, 255, 255)",
                transformOrigin: "393.955px 312.246px",
              }}
              id="eli583vwqdn49"
              className="animable"
            />
            <path
              d="M363.73,334.83a2.73,2.73,0,0,0,4.13,2.34c9.16-5.33,22.52-8.28,44.14-2.12,11.5,3.27,17.16,1.08,19.58-3.6,2.7-5.2-3-10.23-9.5-12.6-22.13-8.09-42.1-2.57-58.35,13.57Z"
              style={{
                fill: "rgb(79, 70, 229)",
                transformOrigin: "397.998px 326.359px",
              }}
              id="elpeps3ssdcq"
              className="animable"
            />
            <path
              d="M365,335.26a.51.51,0,0,1-.38-.16.51.51,0,0,1,0-.71c19.11-17.08,48.71-13.75,59.91-7.09a.5.5,0,0,1,.18.68.51.51,0,0,1-.69.18c-11-6.53-40-9.78-58.73,7A.54.54,0,0,1,365,335.26Z"
              style={{
                fill: "rgb(255, 255, 255)",
                transformOrigin: "394.626px 328.573px",
              }}
              id="elwzt0mgrw2w9"
              className="animable"
            />
          </g>
          <g
            id="freepik--plants--inject-361"
            className="animable"
            style={{ transformOrigin: "124.086px 353.096px" }}
          >
            <path
              d="M149.92,374.65c-8.4-12.82-22.82-22.24-39.52-28.77-16.48-6.44-18.29-17.27-6.61-19.33,13.24-2.33,28.35,6.64,37.47,17.7,15.88,19.28,16.57,32.67,16.57,32.67Z"
              style={{
                fill: "rgb(79, 70, 229)",
                transformOrigin: "127.064px 351.549px",
              }}
              id="elrrrei0zs79n"
              className="animable"
            />
            <g id="elgfws30hpmhv">
              <path
                d="M149.92,374.65c-8.4-12.82-22.82-22.24-39.52-28.77-16.48-6.44-18.29-17.27-6.61-19.33,13.24-2.33,28.35,6.64,37.47,17.7,15.88,19.28,16.57,32.67,16.57,32.67Z"
                style={{
                  opacity: "0.15",
                  transformOrigin: "127.064px 351.549px",
                }}
                className="animable"
              />
            </g>
            <path
              d="M155,374.57a.57.57,0,0,0,.22,0,.51.51,0,0,0,.31-.64c-11-31.51-42.24-42.66-50.12-43a.5.5,0,0,0-.52.47.52.52,0,0,0,.48.53c7.7.32,38.4,11.33,49.21,42.36A.5.5,0,0,0,155,374.57Z"
              style={{
                fill: "rgb(255, 255, 255)",
                transformOrigin: "130.223px 352.755px",
              }}
              id="elhqycxubf3w6"
              className="animable"
            />
            <path
              d="M157.9,376.31a4.16,4.16,0,0,1-6.45,3c-8.48-5.68-21.11-9.37-41.8-6-11.8,1.89-17.16-1-19-5.89-2.06-5.48,4.2-9.79,10.93-11.38,22.93-5.42,42.11,2.42,56.34,20.35Z"
              style={{
                fill: "rgb(79, 70, 229)",
                transformOrigin: "124.086px 367.182px",
              }}
              id="elx9sz1mlszlg"
              className="animable"
            />
            <path
              d="M156.32,379a.48.48,0,0,0,.39-.12.51.51,0,0,0,0-.71c-17-19.21-46.75-19.4-58.66-14.11a.5.5,0,0,0,.41.92c11.67-5.19,40.87-5,57.5,13.85A.46.46,0,0,0,156.32,379Z"
              style={{
                fill: "rgb(255, 255, 255)",
                transformOrigin: "127.304px 370.051px",
              }}
              id="elwr62bi3ru6o"
              className="animable"
            />
          </g>
        </g>
        <g
          id="freepik--check-mark--inject-361"
          className="animable"
          style={{ transformOrigin: "316.127px 243.898px" }}
        >
          <g
            id="freepik--check-mark--inject-361"
            className="animable"
            style={{ transformOrigin: "316.127px 243.898px" }}
          >
            <g
              id="freepik--Circle--inject-361"
              className="animable"
              style={{ transformOrigin: "299.815px 255.811px" }}
            >
              <path
                d="M380.82,146.17h0l-.16-.08h0l-38.12-21.94,0,0-.23-.11h0c-17.81-9-41.57-6.29-67.13,10.23-51.34,33.2-90.46,109.62-87.38,170.69,1.53,30.43,13.27,51.3,31,60.48h0l.15.08h0l38.13,21.95h0l.18.1h0c17.81,9,41.59,6.33,67.17-10.21,51.34-33.2,90.46-109.62,87.38-170.69C410.3,176.22,398.56,155.35,380.82,146.17Z"
                style={{
                  fill: "rgb(55, 71, 79)",
                  transformOrigin: "299.805px 255.811px",
                }}
                id="elq0acjmmtmyr"
                className="animable"
              />
              <path
                d="M255.77,386.76,219,365.5h0l-.18-.11c-17.73-9.2-29.46-30.07-31-60.46-1.37-27.24,5.66-57.51,18.4-85.62l.25-.62,37.88,22.56c-12.76,28.11-19.77,58.38-18.4,85.62C227.4,356.66,238.67,377.28,255.77,386.76Z"
                style={{
                  fill: "rgb(38, 50, 56)",
                  transformOrigin: "221.71px 302.725px",
                }}
                id="elmln7ik5ko2"
                className="animable"
              />
              <path
                d="M324.45,377.34c51.34-33.2,90.46-109.62,87.38-170.69S364.63,123,313.29,156.2,222.82,265.82,225.9,326.88,273.11,410.54,324.45,377.34Z"
                style={{
                  fill: "rgb(69, 90, 100)",
                  transformOrigin: "318.865px 266.768px",
                }}
                id="el4ss9t6wu0wp"
                className="animable"
              />
            </g>
            <path
              id="freepik--shadow--inject-361"
              d="M367.93,141.43,303.58,274l-13.85-15a22.77,22.77,0,0,0-33.45,30.89l36.49,39.53a22.65,22.65,0,0,0,15.49,7.28c.42,0,.84,0,1.26,0a23.11,23.11,0,0,0,3.3-.24A22.73,22.73,0,0,0,330,323.88l73.8-152C396.23,155,383.63,144.54,367.93,141.43Z"
              style={{
                fill: "rgb(55, 71, 79)",
                transformOrigin: "327.169px 239.065px",
              }}
              className="animable"
            />
            <path
              d="M420.19,97.77c-.4-.23-.82-.45-1.24-.65a19.79,19.79,0,0,0-26.42,9.14L310.65,274.92l-4.66-5a19.23,19.23,0,0,0-4.64-3.71c-2.44-1.4-12.82-7.41-14.5-8.38a19.77,19.77,0,0,0-24.42,30.53l36.49,39.52a19.65,19.65,0,0,0,4.71,3.75c2.38,1.35,12.72,7.35,14.42,8.33a19.77,19.77,0,0,0,27.69-8.47l96.87-199.53a19.8,19.8,0,0,0-7.89-25.76Z"
              style={{
                fill: "rgb(79, 70, 229)",
                transformOrigin: "350.885px 218.88px",
              }}
              id="elt8k97yqbdn8"
              className="animable"
            />
            <g id="elqd19we4cccd">
              <path
                d="M420.19,97.77c-.4-.23-.82-.45-1.24-.65a19.79,19.79,0,0,0-26.42,9.14L310.65,274.92l-4.66-5a19.23,19.23,0,0,0-4.64-3.71c-2.44-1.4-12.82-7.41-14.5-8.38a19.77,19.77,0,0,0-24.42,30.53l36.49,39.52a19.65,19.65,0,0,0,4.71,3.75c2.38,1.35,12.72,7.35,14.42,8.33a19.77,19.77,0,0,0,27.69-8.47l96.87-199.53a19.8,19.8,0,0,0-7.89-25.76Z"
                style={{
                  opacity: "0.15",
                  transformOrigin: "350.885px 218.88px",
                }}
                className="animable"
              />
            </g>
            <g id="el9oii9qslpl">
              <path
                d="M318,339.92c-1.68-1-12-7-14.41-8.33a19.7,19.7,0,0,1-4.71-3.75l-36.49-39.52a19.7,19.7,0,0,1-3.77-6l14.51,8.37a19.21,19.21,0,0,0,3.79,6l36.48,39.52A20.11,20.11,0,0,0,318,339.92Z"
                style={{
                  opacity: "0.15",
                  transformOrigin: "288.31px 311.12px",
                }}
                className="animable"
              />
            </g>
            <g id="elmzu7y56w08">
              <path
                d="M411.63,108.56a19.76,19.76,0,0,0-4.58,6.08L322.83,288.12l-12.18-13.2,81.88-168.66a19.52,19.52,0,0,1,4.59-6.08Z"
                style={{
                  opacity: "0.15",
                  transformOrigin: "361.14px 194.15px",
                }}
                className="animable"
              />
            </g>
            <path
              id="freepik--Check--inject-361"
              d="M433.47,105.5a19.81,19.81,0,0,0-26.42,9.14L322.83,288.12,306,269.88a19.76,19.76,0,0,0-29,26.82l36.48,39.53a19.77,19.77,0,0,0,32.3-4.78l96.87-199.53A19.79,19.79,0,0,0,433.47,105.5Z"
              style={{
                fill: "rgb(79, 70, 229)",
                transformOrigin: "358.391px 223.053px",
              }}
              className="animable"
            />
          </g>
        </g>
        <g
          id="freepik--Character--inject-361"
          className="animable"
          style={{ transformOrigin: "159.518px 247.613px" }}
        >
          <g
            id="freepik--character--inject-361"
            className="animable"
            style={{ transformOrigin: "159.518px 247.613px" }}
          >
            <path
              d="M157.23,125c-7.63,0-12.85,2-18.27,9.7-5,7.08-18.64,30.68-18.64,30.68s-10-20.52-11-24.61-.94-5.91,0-7.69a16.06,16.06,0,0,0,2.52-7c.39-4.92,1.59-9.13.49-9.27-3.05-.17-3.17,3.75-4.77,6.06a1.92,1.92,0,0,1-3.08-.33c-.67-1.37-.31-3.62-.63-5.24a21.48,21.48,0,0,1,.43-2.68,11.76,11.76,0,0,0,3.5.1c1.32,2.07,2.22,2.94,4.06,2.1.24-.38-.79-3-2-5a1.36,1.36,0,0,0-.82-.62,15.54,15.54,0,0,0-6.78-.19,1.27,1.27,0,0,0-.87.48,16.58,16.58,0,0,0-2,4c-.13.43-.53.42-.63.05-1-4.83-1-11.69-1-14.9,0-2.53-3.69-2.93-3.82.69a117.09,117.09,0,0,0,.25,14.57c0,.44-.44.65-.62.17-.64-1.71-2.21-6.88-2.87-15.8-.18-2.4-4.06-2.79-4,.58A85.57,85.57,0,0,0,89,118.58c.12.42-.27.79-.56.31a57.57,57.57,0,0,1-4.34-11c-.83-2.9-4.7-2.16-4,1.45,1.21,6.47,3.13,14.65,6,20.5,3.06,6.25,5.7,9.38,7.22,14.29s7.81,32.72,14.54,43.56c5.27,8.5,11.3,7.71,17.79,3.23s29.68-36.79,29.68-36.79Z"
              style={{
                fill: "rgb(158, 103, 103)",
                transformOrigin: "118.623px 146.306px",
              }}
              id="el89qo6teuexj"
              className="animable"
            />
            <path
              d="M120.32,165.37s3.25,5.51,3.75,9.92a17.3,17.3,0,0,0-2.3-12.42Z"
              style={{
                fill: "rgb(135, 76, 76)",
                transformOrigin: "122.352px 169.08px",
              }}
              id="el4swavie6ujn"
              className="animable"
            />
            <path
              d="M158.85,125c-3.88-.4-8.71-.53-14.09,2.86s-7.26,8.11-9.87,12.24-11.63,18.76-11.63,18.76,3.31,13.89,16.47,16.75l19.71-26.74Z"
              style={{
                fill: "rgb(69, 90, 100)",
                transformOrigin: "141.35px 150.204px",
              }}
              id="elc3nzor8lsma"
              className="animable"
            />
            <path
              d="M176.52,369.23c1-.13,2.33,3.28,2.35,4.39s-1.1,3.5-2.57,5.74a40.34,40.34,0,0,0-4.85,8.63c-1.13,3.08-2.17,5.1-5.32,9.13-3.5,4.49-11.72,12-24.2,8.74-3.05-.8-4.57-1.76-5.68-2.87a3.71,3.71,0,0,1-.87-3.82Z"
              style={{
                fill: "rgb(38, 50, 56)",
                transformOrigin: "157.024px 387.941px",
              }}
              id="elhedce96hwjd"
              className="animable"
            />
            <path
              d="M152,365.33l0,.11a7.83,7.83,0,0,0,.08,2.81,19.65,19.65,0,0,1-4.73,15.39,29.61,29.61,0,0,1-5.84,4.72c-6.32,4-7,6.73-6.11,10.81,2.12,4.75,16.45,7.64,24.69.57a24.27,24.27,0,0,0,7.85-10.67,75.48,75.48,0,0,1,4.16-8.8c1.59-3,4.61-6.38,4.7-9.47.05-1.7-1.63-4.86-3.26-7.46-1.5-2.39-3.05-4.66-4.4-4.4l.38,1.35c-1.13,1.17-2.76,1.61-3.74,3-1.22,1.69-1.18,4-1.93,5.9a.68.68,0,0,1-.37.45.5.5,0,0,1-.53-.27,1.45,1.45,0,0,1-.11-.62l-.09-2.91a2.45,2.45,0,0,0-.42-1.58c-.78-.88-2.7-.78-3.77-.82a41.2,41.2,0,0,0-4.31.26,2.07,2.07,0,0,0-1.4.37A2.47,2.47,0,0,0,152,365.33Z"
              style={{
                fill: "rgb(55, 71, 79)",
                transformOrigin: "155.943px 381.45px",
              }}
              id="el6fli4rm7otd"
              className="animable"
            />
            <path
              d="M130.82,307.19c3.33,10.95,18.9,48.86,19.83,51.14l3.1,7.52a11.65,11.65,0,0,0,6.32.27c.33,3.63.88,9.32,1.09,12.19.08,3.33.37,7.45-.35,10.74-.61,2.8-1.32,5.74-1.85,8.55-.23,1.24-.46,2.49-.65,3.74a6.26,6.26,0,0,0,.31,3.93,4.87,4.87,0,0,0,1.24,1.4,11,11,0,0,0,7.84,2.3,8.15,8.15,0,0,0,4.16-1.38c2.42-1.73,3.27-4.74,4.5-7.3,1.34-2.77.91-3.08,1-6.05.08-2.08.66-7.36,1.49-12.88s4.41-24.92,6.13-44.25a158.51,158.51,0,0,0,0-25.8c13.66-37.11,19.74-59.18,21.53-71.5,1.81-12.52.94-17,.71-24.19l-66.43,1.6C135.47,251.56,126.35,292.51,130.82,307.19Zm32.45-58.88Z"
              style={{
                fill: "rgb(158, 103, 103)",
                transformOrigin: "168.628px 312.32px",
              }}
              id="elmhiau7g89x"
              className="animable"
            />
            <path
              d="M129.78,279.79c1.37-12.62,10.81-61.13,10.81-61.13h66.92s.43,9.31.31,13.59-1.5,12.09-3.89,22-11.25,37.88-13,42-5,16.07-5,16.07c1.64,22.44-2.63,42.58-5.83,69.35,0,0-.93,3.61-10.41,2.9-9.22-.7-11.08-4.1-11.08-4.1L158,357.38s-5,1.54-8,.84c0,0-19.81-48.91-20.77-51.85S128.41,292.41,129.78,279.79Z"
              style={{
                fill: "rgb(79, 70, 229)",
                transformOrigin: "168.227px 301.661px",
              }}
              id="elmua3d2qwqto"
              className="animable"
            />
            <g id="elpepykwyjimp">
              <path
                d="M129.78,279.79c1.37-12.62,10.81-61.13,10.81-61.13h66.92s.43,9.31.31,13.59-1.5,12.09-3.89,22-11.25,37.88-13,42-5,16.07-5,16.07c1.64,22.44-2.63,42.58-5.83,69.35,0,0-.93,3.61-10.41,2.9-9.22-.7-11.08-4.1-11.08-4.1L158,357.38s-5,1.54-8,.84c0,0-19.81-48.91-20.77-51.85S128.41,292.41,129.78,279.79Z"
                style={{
                  opacity: "0.45",
                  transformOrigin: "168.227px 301.661px",
                }}
                className="animable"
              />
            </g>
            <g id="elyeimjwlg7ps">
              <path
                d="M158.17,250.28c-9.48-8.54-11.59-15.34-11.59-15.34a63.4,63.4,0,0,0,16.69,13.37s-9,47.52-8.34,57.29S158,357.38,158,357.38c0,.4-6.38-44.43-6.57-48C151,299.93,158.17,250.28,158.17,250.28Z"
                style={{
                  opacity: "0.2",
                  transformOrigin: "154.925px 296.161px",
                }}
                className="animable"
              />
            </g>
            <path
              d="M179,405.46c.93.27.81,3.05.39,4.09A12.67,12.67,0,0,1,175.1,414a21,21,0,0,0-6.35,6.83,32.15,32.15,0,0,1-9.95,9.72A24,24,0,0,1,141.3,433c-6.28-1.78-6.86-3.32-6.81-5.69Z"
              style={{
                fill: "rgb(38, 50, 56)",
                transformOrigin: "157.097px 419.568px",
              }}
              id="elfn9hcwf03t7"
              className="animable"
            />
            <path
              d="M159.6,390.92c-1.65,8-4.52,13.88-11.17,18.82-5.3,3.94-9.14,5.94-13.37,9.45-1.79,1.5-1.94,4.69-.57,8.13,2.86,2.29,6.92,3.61,12.37,3.6,6.1,0,8.44-1.09,11.94-3.48a32.11,32.11,0,0,0,4.78-4c2.93-2.94,5-6.57,7.08-8.9s6.69-4.71,8-7.52c.72-1.54.42-5.11-.06-8.15-.44-2.79.41-7.69-.93-8,0,0-.19,2-.19,2-.11.45-.39.68-1.33,1a6.94,6.94,0,0,1-2.57.07,1.54,1.54,0,0,0-1.73.49c-.9,1.06-1.14,2.56-2.3,3.44a.66.66,0,0,1-.26.14A.28.28,0,0,1,169,398a.41.41,0,0,1-.05-.33l.33-3a3.4,3.4,0,0,0,0-.9,2,2,0,0,0-1-1.32,10.75,10.75,0,0,0-2.69-1.11,15.74,15.74,0,0,0-3-.51A9.53,9.53,0,0,0,159.6,390.92Z"
              style={{
                fill: "rgb(69, 90, 100)",
                transformOrigin: "156.332px 410.836px",
              }}
              id="elyw6c6k0bu7"
              className="animable"
            />
            <path
              d="M201.47,127.87s2.75,3.78,5,11.57a189.65,189.65,0,0,1,4.2,38.92c0,17.67-2.38,46.3-2.38,46.3-20.51,10.28-53.59,4.2-68.15-5.83.59-3.18,1.09-19.9,2.24-30.93.77-18.92,1.41-28.83,1.54-37.25.27-16.82,8.64-25.51,15-25.64l16.06.25Z"
              style={{
                fill: "rgb(79, 70, 229)",
                transformOrigin: "175.405px 177.496px",
              }}
              id="elyqvox7sfqlm"
              className="animable"
            />
            <path
              d="M206.53,219.47c-3.05,2.51-9,7.33-10.13,9.76-1.26,2.78-2,7-2.85,8.58s.43,2.38,2.19,1.81,2.81-2.06,4.17-5.7,5.14-6.49,5.14-6.49Z"
              style={{
                fill: "rgb(135, 76, 76)",
                transformOrigin: "199.905px 229.637px",
              }}
              id="elvzcfc6sgxo"
              className="animable"
            />
            <path
              d="M195.39,252.2c.73,1.41,2.43,1.42,4,1.54a12.7,12.7,0,0,0,5.67-.64,10.35,10.35,0,0,0,5.45-3.79c1.54-2.22,1.94-5,2.82-7.55,1.84-5.35,7.32-9.21,8.22-14.88.37-2.34.37-5.1,1-6.55.39-.86,9.4-16.37,12.62-23.09,3.08-6.46,5.39-9.5,2.59-17.26s-12.33-35.07-19.08-44.56c-3.82-5.38-9.89-6.92-17.25-7.55-5.6,14.58.91,29.65.91,29.65L217.2,186.1s-5.76,19.68-9.36,30.62c-1,3-3,4.92-5.29,8.29-1,1.46-3.26,4-4.06,5.59-1,2-1,3.32-1.5,6.15C196.21,241.26,195,251.53,195.39,252.2Z"
              style={{
                fill: "rgb(158, 103, 103)",
                transformOrigin: "217.168px 190.846px",
              }}
              id="eldrf99m07waf"
              className="animable"
            />
            <path
              d="M200.68,127.79c3.87.15,9.43.81,12.75,2.49s5.63,3.75,9.45,11.41,9.41,22.54,9.41,22.54-1.85,11.23-19.61,14.14l-12-22.13S195.33,142.45,200.68,127.79Z"
              style={{
                fill: "rgb(69, 90, 100)",
                transformOrigin: "215.296px 153.08px",
              }}
              id="el58aa5insh77"
              className="animable"
            />
            <path
              d="M154.54,92.05A22.22,22.22,0,0,1,155.9,95a17.33,17.33,0,0,0,2.25,3.71c2.3,2.65,5.53,4.59,8.48,6.47,1.78,1.14,3.82,2.21,6,1.9s4.61.16,6.86.36l7.87.71-.44,8.27s1-2.19,2.31-4.81c1.14-2.25,5.92-13.66,5.94-13.71,2.37-5.65,5.18-13.19,2.35-19.13a7.85,7.85,0,0,0-3.08-3.53,7.14,7.14,0,0,0,.26-2.82,9.06,9.06,0,0,0-4.18-6.62,19.89,19.89,0,0,0-7.42-3.06,46.78,46.78,0,0,0-10.74-1.19,63.38,63.38,0,0,0-10.54,1.21,37.34,37.34,0,0,1-5.87.61,11.31,11.31,0,0,1-2.54-.12,28.89,28.89,0,0,1-3.07-1.11.71.71,0,0,0-.55,0,.66.66,0,0,0-.29.47,8.91,8.91,0,0,0,1.63,7.21,4.57,4.57,0,0,1-1.3-.38,10.51,10.51,0,0,1-1.35-.75,7.63,7.63,0,0,1-1.9-1.82.55.55,0,0,0-.31-.23c-.2,0-.36.14-.48.3a7,7,0,0,0-1,5.53,12,12,0,0,0,2.6,5.11,7,7,0,0,0-.36,6.71,9.35,9.35,0,0,0,1.77,2.54c.9.92,2,1.67,2.91,2.53A17,17,0,0,1,154.54,92.05Z"
              style={{
                fill: "rgb(55, 71, 79)",
                transformOrigin: "171.654px 88.9847px",
              }}
              id="elvozwk2l2q4o"
              className="animable"
            />
            <path
              d="M178.51,78.27a15.14,15.14,0,0,0,.57,4.42A8.63,8.63,0,0,0,181.31,86a25.45,25.45,0,0,1,3.1,3.13,13.2,13.2,0,0,1,1.74,5.76,4,4,0,0,0,1.52,3.1c2.14,1.33,3.42-1.24,4.56-2.5,1.47-1.36,5.84-3,7.86,1.62,2.09,4.8-1.77,11.16-5.28,12.14-6.05,1.69-7.37-2.43-7.37-2.43l-1.16,21.6c-3.41,6.47-11.43,8.53-16.7,7.5-4.55-.89-7.05-4.08-2.77-8.7l.23-6.58s-5.46.65-8.09.15c-4.39-.82-6.56-4.55-7.75-9.36-1.89-7.73-2.76-15.86-.41-33.27,1.07-.59,5.4,2.78,12,3.23A30.45,30.45,0,0,0,178.51,78.27Z"
              style={{
                fill: "rgb(158, 103, 103)",
                transformOrigin: "175.025px 107.131px",
              }}
              id="elx9vpeoy2uun"
              className="animable"
            />
            <path
              d="M167,120.62s9.9-1.66,13.4-3.38a11.33,11.33,0,0,0,4.9-4.55,15.51,15.51,0,0,1-2.88,5.46c-2.62,3.13-15.51,5.09-15.51,5.09Z"
              style={{
                fill: "rgb(135, 76, 76)",
                transformOrigin: "176.105px 117.965px",
              }}
              id="el9686k93n6zp"
              className="animable"
            />
            <path
              d="M172.15,86l4.61,1.41a2.53,2.53,0,0,0-1.66-3.09A2.36,2.36,0,0,0,172.15,86Z"
              style={{
                fill: "rgb(38, 50, 56)",
                transformOrigin: "174.502px 85.8174px",
              }}
              id="el0q4ab6m4jtc"
              className="animable"
            />
            <path
              d="M170.55,107.84l-6.79,2.3a3.53,3.53,0,0,0,4.48,2.37A3.76,3.76,0,0,0,170.55,107.84Z"
              style={{
                fill: "rgb(135, 76, 76)",
                transformOrigin: "167.242px 110.261px",
              }}
              id="el568qwudwaqx"
              className="animable"
            />
            <path
              d="M170,109.5a4,4,0,0,0-3.87,3,3.38,3.38,0,0,0,2.11,0,3.69,3.69,0,0,0,2.42-2.94A3.7,3.7,0,0,0,170,109.5Z"
              style={{
                fill: "rgb(242, 143, 143)",
                transformOrigin: "168.395px 111.084px",
              }}
              id="el7fn48ite16"
              className="animable"
            />
            <path
              d="M151.57,86.73l4.69-.61a2.29,2.29,0,0,0-2.6-2A2.41,2.41,0,0,0,151.57,86.73Z"
              style={{
                fill: "rgb(38, 50, 56)",
                transformOrigin: "153.91px 85.4134px",
              }}
              id="el9rmrgh2sakp"
              className="animable"
            />
            <path
              d="M180.4,88.73,195.87,94a5.66,5.66,0,0,0-4.46,2.26l-10.95-4.16Z"
              style={{
                fill: "rgb(38, 50, 56)",
                transformOrigin: "188.135px 92.495px",
              }}
              id="eloyfw106n877"
              className="animable"
            />
            <path
              d="M153.88,94.77a1.87,1.87,0,0,0,1.78,2,1.89,1.89,0,0,0,1.91-1.87,1.87,1.87,0,0,0-1.78-2A1.89,1.89,0,0,0,153.88,94.77Z"
              style={{
                fill: "rgb(38, 50, 56)",
                transformOrigin: "155.725px 94.835px",
              }}
              id="el8nu3rzhq2qu"
              className="animable"
            />
            <path
              d="M171.55,94.77a1.85,1.85,0,1,0,1.91-1.86A1.89,1.89,0,0,0,171.55,94.77Z"
              style={{
                fill: "rgb(38, 50, 56)",
                transformOrigin: "173.4px 94.7595px",
              }}
              id="eluv5fo3isbk"
              className="animable"
            />
            <path
              d="M144.75,89.85a4.18,4.18,0,0,0,1,2.18,2,2,0,0,1,.39.78c.36,1.49.67,4.31,1.38,5.89a6.48,6.48,0,0,0,6.33,4.18,9,9,0,0,0,2.16-.18l.16,0a6.66,6.66,0,0,0,1.76-.69l.1-.07.15-.09.19-.13.17-.14.19-.15a.93.93,0,0,0,.18-.16,3.73,3.73,0,0,0,.34-.35,8,8,0,0,0,1.41-2.23c.92-2.06.68-4.94,2.18-5.28l.18,0h.2c2,0,1.82,3.17,3,5.41s3,4.43,7.47,4.49h.57a3.44,3.44,0,0,0,.46,0,6.9,6.9,0,0,0,1.07-.15l.33-.08a3,3,0,0,0,.32-.09l.21-.06a6.35,6.35,0,0,0,1.2-.57,3.51,3.51,0,0,0,.4-.27,5,5,0,0,0,.69-.61,7,7,0,0,0,1.35-2.08c.69-1.55.87-4.37,1.21-5.84a2.48,2.48,0,0,1,.34-.85,4,4,0,0,0,1-2.1,1.84,1.84,0,0,0-1.24-1.85l-1.09-.14c-3.5-.43-8.06-.61-10.79.13-3.42.93-4.61,2-6.52,2s-2.94-1.18-6.19-2.24c-2.58-.84-6.85-.81-10.11-.51l-1,.1A1.74,1.74,0,0,0,144.75,89.85ZM167.27,92a2.87,2.87,0,0,1,1-.79,1,1,0,0,1,.17-.1l.1,0c.15-.08.31-.16.48-.23l.45-.18a13.2,13.2,0,0,1,1.46-.46l.58-.14c.5-.1,1-.18,1.5-.23a2.28,2.28,0,0,1,.36,0c3.29-.27,5.35.51,6.1,1.18s.42,3.75.11,5.3l0,.11s0,.08,0,.12c0,.19-.08.4-.14.63s-.07.25-.11.38v0c-.07.21-.14.42-.22.64h0a2.14,2.14,0,0,1-.1.22,1.12,1.12,0,0,1-.05.13l-.07.15-.09.18-.11.21c0,.07-.09.14-.14.21a1.64,1.64,0,0,1-.14.22,5.19,5.19,0,0,1-4.61,2.18,6.38,6.38,0,0,1-4.86-1.86h0a6.9,6.9,0,0,1-1.59-3.12C166.86,95,166.63,92.94,167.27,92Zm-19.38-1.61a3,3,0,0,1,.8-.51l.06,0,.36-.14.22-.07.18,0,.12,0h.05l.18,0c.23,0,.48-.09.76-.13l.41,0h1.33c.48,0,1,.07,1.52.14,2.35.34,4.81,1.43,5.45,2.4s.5,3,.19,4.69a7.12,7.12,0,0,1-.3,1.16.46.46,0,0,0,0,.09s0,.07,0,.11l0,.08-.06.14-.12.28c0,.08-.08.17-.13.25a.59.59,0,0,1,0,.08l-.1.17-.09.14a0,0,0,0,0,0,0,5.19,5.19,0,0,1-4.9,2.24,5.86,5.86,0,0,1-2.46-.6c-2.34-1.18-2.94-3.81-3.21-5C147.65,94.12,147.19,91.05,147.89,90.38Z"
              style={{
                fill: "rgb(38, 50, 56)",
                transformOrigin: "163.795px 95.5627px",
              }}
              id="elr7uki5c9f0f"
              className="animable"
            />
            <path
              d="M163.76,93.46l-.35,12.86-7.17-2.08,6.69-10.89A1.86,1.86,0,0,1,163.76,93.46Z"
              style={{
                fill: "rgb(135, 76, 76)",
                transformOrigin: "160px 99.8308px",
              }}
              id="el5exr6ya6f4e"
              className="animable"
            />
          </g>
        </g>
        <g
          id="freepik--speech-bubble--inject-361"
          className="animable animator-hidden"
          style={{ transformOrigin: "262.35px 63.9719px" }}
        >
          <g
            id="freepik--speech-bubble--inject-361"
            className="animable"
            style={{ transformOrigin: "262.35px 63.9719px" }}
          >
            <g
              id="freepik--speech-bubble--inject-361"
              className="animable"
              style={{ transformOrigin: "262.35px 63.9719px" }}
            >
              <ellipse
                cx="264.02"
                cy="62.64"
                rx="37.05"
                ry="32.45"
                style={{
                  fill: "rgb(79, 70, 229)",
                  transformOrigin: "264.02px 62.64px",
                }}
                id="eljucwoingprm"
                className="animable"
              />
              <path
                d="M234.45,81.41c-.21,4.35-3.89,12.13-10.54,15a.46.46,0,0,0,.07.87,20,20,0,0,0,20.5-7.76Z"
                style={{
                  fill: "rgb(79, 70, 229)",
                  transformOrigin: "234.055px 89.5819px",
                }}
                id="elsva587k8l2c"
                className="animable"
              />
            </g>
            <path
              d="M238.9,60.07a11.88,11.88,0,0,1,1-4.12,9.68,9.68,0,0,1,2.38-3.35A11.35,11.35,0,0,1,246,50.33a15.81,15.81,0,0,1,10.17,0,11.45,11.45,0,0,1,3.76,2.27A9.81,9.81,0,0,1,262.29,56a11.88,11.88,0,0,1,1,4.12c.05,1.12.07,2.29.07,3.51s0,2.37-.07,3.43a11.88,11.88,0,0,1-1,4.12,10,10,0,0,1-2.38,3.37,11,11,0,0,1-3.76,2.27,16.18,16.18,0,0,1-10.17,0,10.87,10.87,0,0,1-3.74-2.27,9.85,9.85,0,0,1-2.38-3.37,11.88,11.88,0,0,1-1-4.12c-.05-1.06-.08-2.21-.08-3.43S238.85,61.19,238.9,60.07ZM256,66.82c0-.47.05-1,.08-1.56s0-1.16,0-1.76,0-1.18,0-1.74-.06-1-.08-1.5a5.94,5.94,0,0,0-.41-1.79,4.34,4.34,0,0,0-.94-1.43,4.24,4.24,0,0,0-1.5-.95,6.51,6.51,0,0,0-4.21,0,4.37,4.37,0,0,0-1.51.95,4.31,4.31,0,0,0-.93,1.43,5.94,5.94,0,0,0-.41,1.79,13.3,13.3,0,0,0-.1,1.5c0,.56,0,1.14,0,1.74s0,1.18,0,1.76a14.45,14.45,0,0,0,.1,1.56,5.23,5.23,0,0,0,1.34,3.24,4.73,4.73,0,0,0,3.61,1.28,4.65,4.65,0,0,0,3.59-1.28A5.5,5.5,0,0,0,256,66.82Z"
              style={{
                fill: "rgb(250, 250, 250)",
                transformOrigin: "251.07px 63.5649px",
              }}
              id="elpxtzlqxhyj"
              className="animable"
            />
            <path
              d="M291,75.91a.69.69,0,0,1,.11.43.82.82,0,0,1-.25.6.83.83,0,0,1-.6.26H284a1.59,1.59,0,0,1-.9-.24,3.83,3.83,0,0,1-.7-.66L275,67v9.13a1.08,1.08,0,0,1-1,1.06h-5.12a1,1,0,0,1-.74-.32,1,1,0,0,1-.31-.74V50.94a1,1,0,0,1,.31-.74,1,1,0,0,1,.74-.32H274a1.08,1.08,0,0,1,1,1.06v8.23l6.87-8.43a7.24,7.24,0,0,1,.5-.54,1.46,1.46,0,0,1,1.06-.32h6.08a.83.83,0,0,1,.61.26.82.82,0,0,1,.25.6.67.67,0,0,1-.12.43L280.65,63Z"
              style={{
                fill: "rgb(250, 250, 250)",
                transformOrigin: "279.471px 63.5372px",
              }}
              id="elkx78cnra71"
              className="animable"
            />
          </g>
        </g>
        <g
          id="freepik--Icons--inject-361"
          className="animable animator-active animator-hidden"
          style={{ transformOrigin: "261.152px 152.675px" }}
        >
          <g
            id="freepik--like-icon--inject-361"
            className="animable"
            style={{ transformOrigin: "363.709px 81.4172px" }}
          >
            <polygon
              points="359.62 93.32 354.01 95.01 349.96 81.48 355.55 79.8 359.62 93.32"
              style={{
                fill: "rgb(224, 224, 224)",
                transformOrigin: "354.79px 87.405px",
              }}
              id="elqa1mdmfwwx"
              className="animable"
            />
            <path
              d="M377.13,81.31a2.6,2.6,0,0,1-1.59,2.62,3.79,3.79,0,0,1,.79,1.43c.32,1-.53,2.45-2.22,3l-12.83,3.86-3.77-12.57h0s2.17-5.55,2.28-6.39-1.17-3.92-1.35-4.5,1.9-1.34,3.54-.68a2.94,2.94,0,0,1,1,.73,8.87,8.87,0,0,1,1.47,2.11,7.53,7.53,0,0,1,.78,3.54L373,72.09a2.44,2.44,0,0,1,1.66,0,2.19,2.19,0,0,1,.62,3.7,2.07,2.07,0,0,1,2.12,1.43,2.28,2.28,0,0,1-1.28,2.59A2.41,2.41,0,0,1,377.13,81.31Z"
              style={{
                fill: "rgb(224, 224, 224)",
                transformOrigin: "367.484px 80.0222px",
              }}
              id="eluo1mekh376e"
              className="animable"
            />
          </g>
          <g
            id="freepik--like-icon--inject-361"
            className="animable"
            style={{ transformOrigin: "451.668px 221.58px" }}
          >
            <polygon
              points="440 233.61 432.81 231.88 437 214.54 444.19 216.27 440 233.61"
              style={{
                fill: "rgb(224, 224, 224)",
                transformOrigin: "438.5px 224.075px",
              }}
              id="elpph8ysdn7m"
              className="animable"
            />
            <path
              d="M466.77,231.66a3.29,3.29,0,0,1-3.4,1.85,4.9,4.9,0,0,1-.05,2.06c-.32,1.35-2.15,2.34-4.31,1.81l-16.46-4,3.88-16.11h0s5.91-4.67,6.56-5.52,1.21-5,1.39-5.77,2.93-.25,4.3,1.52a3.65,3.65,0,0,1,.68,1.46,11.19,11.19,0,0,1,.26,3.23,9.65,9.65,0,0,1-1.4,4.37l9.94,2.4a3.07,3.07,0,0,1,1.78,1.11,2.87,2.87,0,0,1,.53,2.3,2.91,2.91,0,0,1-2.21,2.13,2.61,2.61,0,0,1,1.4,2.91,2.9,2.9,0,0,1-3.05,2A3,3,0,0,1,466.77,231.66Z"
              style={{
                fill: "rgb(224, 224, 224)",
                transformOrigin: "456.538px 221.58px",
              }}
              id="elwjxicqclfon"
              className="animable"
            />
          </g>
          <g
            id="freepik--like-icon--inject-361"
            className="animable"
            style={{ transformOrigin: "71.0639px 206.511px" }}
          >
            <polygon
              points="76.82 223.24 84.67 225.6 90.35 206.66 82.51 204.3 76.82 223.24"
              style={{
                fill: "rgb(224, 224, 224)",
                transformOrigin: "83.585px 214.95px",
              }}
              id="elfy2zz9hlxpd"
              className="animable"
            />
            <path
              d="M52.29,206.41a3.64,3.64,0,0,0,2.23,3.67,5.44,5.44,0,0,0-1.1,2c-.45,1.47.75,3.44,3.1,4.14l18,5.41L79.78,204h0s-3.05-7.78-3.2-9,1.65-5.48,1.89-6.3c.2-.66-2.66-1.87-5-.94a3.93,3.93,0,0,0-1.46,1,12.36,12.36,0,0,0-2.06,3,10.69,10.69,0,0,0-1.1,5L58.05,193.5a3.38,3.38,0,0,0-2.33.08,3.06,3.06,0,0,0-.86,5.18,2.89,2.89,0,0,0-3,2,3.21,3.21,0,0,0,1.79,3.64A3.4,3.4,0,0,0,52.29,206.41Z"
              style={{
                fill: "rgb(224, 224, 224)",
                transformOrigin: "65.7789px 204.526px",
              }}
              id="elw4lhbi8vadm"
              className="animable"
            />
          </g>
        </g>
        <defs>
          {" "}
          <filter id="active" height="200%">
            {" "}
            <feMorphology
              in="SourceAlpha"
              result="DILATED"
              operator="dilate"
              radius={2}
            />{" "}
            <feFlood floodColor="#32DFEC" floodOpacity={1} result="PINK" />{" "}
            <feComposite
              in="PINK"
              in2="DILATED"
              operator="in"
              result="OUTLINE"
            />{" "}
            <feMerge>
              {" "}
              <feMergeNode in="OUTLINE" /> <feMergeNode in="SourceGraphic" />{" "}
            </feMerge>{" "}
          </filter>{" "}
          <filter id="hover" height="200%">
            {" "}
            <feMorphology
              in="SourceAlpha"
              result="DILATED"
              operator="dilate"
              radius={2}
            />{" "}
            <feFlood floodColor="#ff0000" floodOpacity="0.5" result="PINK" />{" "}
            <feComposite
              in="PINK"
              in2="DILATED"
              operator="in"
              result="OUTLINE"
            />{" "}
            <feMerge>
              {" "}
              <feMergeNode in="OUTLINE" /> <feMergeNode in="SourceGraphic" />{" "}
            </feMerge>{" "}
            <feColorMatrix
              type="matrix"
              values="0   0   0   0   0                0   1   0   0   0                0   0   0   0   0                0   0   0   1   0 "
            />{" "}
          </filter>
        </defs>
      </svg>
    </>
  );
}
