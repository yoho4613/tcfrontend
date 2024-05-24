import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineStar } from "react-icons/ai";
import { PiShoppingBagOpenLight } from "react-icons/pi";
import { BsPerson } from "react-icons/bs";
import { RiMenu2Fill } from "react-icons/ri";
import { RxAvatar } from "react-icons/rx";
import Searchbar from "../Search/Searchbar";
import { UserContext } from "../../context/UserContext";
import LoginButton from "../Buttons/LoginButton";
import LogoutButton from "../Buttons/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { NAV_MANU } from "../../constant/config";

const Navbar = () => {
  const [mobileMenuOpened, setMobileMenuOpened] = useState(false);
  const [profileOpened, setProfileOpened] = useState(false);
  const [category, setCategory] = useState("all");
  const popupRef = useRef<HTMLUListElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const { userDetail, login } = useContext(UserContext);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [searchParam, setSearchParam] = useSearchParams();

  useEffect(() => {
    getUserDetail();
    setCategory(searchParam.get("category") || "all");
  }, [searchParam]);

  const getUserDetail = async () => {
    const auth = await fetch(`${process.env.REACT_APP_API_URL}/auth/profile`)
      .then((res) => {
        res.json();
      })
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => console.log(err));
    console.log(auth);
  };

  return (
    <nav className="relative flex w-full items-center justify-between sm:px-4 text-gray-700 ">
      <div className="order-4 md:order-2 md:w-1/3 ">
        <button
          className="flex items-center md:hidden"
          onClick={() => setMobileMenuOpened((prev) => !prev)}
        >
          <RiMenu2Fill className="text-xl sm:text-3xl" />
        </button>

        <ul
          ref={popupRef}
          className={`absolute left-0 top-16 z-50 flex h-screen w-full flex-col bg-[rgba(0,0,0,0.6)] text-lg transition md:relative md:top-0  md:h-auto md:translate-x-0 md:flex-row md:justify-between md:bg-transparent md:transition-none ${
            mobileMenuOpened ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {NAV_MANU.map((menu) => (
            <li
              key={menu.path}
              className="hover-underline-animation bg-slate-200 p-2.5 md:bg-transparent md:p-0"
            >
              <Link
                onClick={() => setMobileMenuOpened(false)}
                className="inline-block w-full"
                to={menu.path}
              >
                {menu.name}
              </Link>
            </li>
          ))}
          {/* <li className="hover-underline-animation bg-slate-200 p-2.5 md:bg-transparent md:p-0">
            <Link
              onClick={() => setMobileMenuOpened(false)}
              className="inline-block w-full"
              to="/"
            >
              Home
            </Link>
          </li>
          <li className="hover-underline-animation bg-slate-200 p-2.5 md:bg-transparent md:p-0">
            <Link
              onClick={() => setMobileMenuOpened(false)}
              className="inline-block w-full"
              to="/list?category=all&subcategory=all"
            >
              Shop
            </Link>
          </li>
          <li className="hover-underline-animation bg-slate-200 p-2.5 md:bg-transparent md:p-0">
            <Link
              onClick={() => setMobileMenuOpened(false)}
              className="inline-block w-full"
              to="/contact"
            >
              Contact
            </Link>
          </li>
          <li className="hover-underline-animation bg-slate-200 p-2.5 md:bg-transparent md:p-0">
            <Link
              onClick={() => setMobileMenuOpened(false)}
              className="inline-block w-full"
              to="/about"
            >
              About
            </Link>
          </li> */}
          {!user && (
            <li className="hover-underline-animation bg-slate-200 p-2.5 md:bg-transparent md:p-0">
              <Link
                onClick={() => setMobileMenuOpened(false)}
                className="inline-block w-full"
                to="/login"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div className="order-3 flex items-center ">
        <div className="relative mr-2 w-44 text-xs md:mr-6 md:w-64 ">
          <Searchbar category={category} />
        </div>
        <div className="relative flex gap-1 items-center">
          <div className="hidden md:block">
            {isAuthenticated ? (
              <>
                {user && (
                  <button onClick={() => setProfileOpened((prev) => !prev)}>
                    {user.image ? (
                      <img
                        src={user.image || ""}
                        alt="avatar"
                        width={100}
                        height={100}
                        className="w-6 rounded-full sm:w-6"
                      />
                    ) : (
                      <RxAvatar
                        onClick={() => login()}
                        color="#DB4444"
                        className="text-lg sm:text-2xl"
                      />
                    )}
                  </button>
                )}
              </>
            ) : (
              <LoginButton />
            )}
          </div>
          {profileOpened && (
            <div
              ref={profileRef}
              className="absolute right-0 top-6 z-[999] flex w-44 flex-col rounded-sm px-2.5 text-sm text-whitePrimary sm:w-[20rem] sm:text-lg"
              style={{ background: "rgba(0,0,0,0.5)" }}
            >
              <Link
                to="/user/profile"
                className="flex w-full items-center p-2 text-left"
              >
                <BsPerson color="white" className="mr-2 text-xl" />
                Manage My Profile
              </Link>
              <Link
                to="/user/order"
                className="flex w-full items-center p-2 text-left"
              >
                <PiShoppingBagOpenLight
                  color="white"
                  className="mr-2 text-xl"
                />
                My Order
              </Link>
              <Link to="/" className="flex w-full items-center p-2 text-left">
                <AiOutlineStar color="white" className="mr-2 text-xl" />
                My Reviews
              </Link>
              <button
                // onClick={() => void signOut()}
                className="flex w-full items-center p-2 text-left"
              >
                <BiLogOut color="white" className="mr-2 text-xl" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
    // <nav className="bg-white h-16 flex justify-around items-center">
    //   <ul className="flex space-x-10">
    //     <li>
    //       <a href="#" className="text-gray-800 hover:text-blue-500">
    //         Home
    //       </a>
    //     </li>
    //     <li>
    //       <a href="#" className="text-gray-800 hover:text-blue-500">
    //         About
    //       </a>
    //     </li>
    //     <li>
    //       <a href="#" className="text-gray-800 hover:text-blue-500">
    //         Services
    //       </a>
    //     </li>
    //     <li>
    //       <a href="#" className="text-gray-800 hover:text-blue-500">
    //         Contact
    //       </a>
    //     </li>
    //     <li>
    //       <a href="#" className="text-gray-800 hover:text-blue-500">
    //         Login
    //       </a>
    //     </li>
    //   </ul>
    // </nav>
  );
};

export default Navbar;
