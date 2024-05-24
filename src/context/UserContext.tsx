import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { BASE_URL, defaultUserDetail } from "../constant/config";
import { User, useAuth0 } from "@auth0/auth0-react";
// import { useNavigate } from "react-router-dom";
// const navigate = useNavigate();

export const UserContext = createContext({
  userDetail: {},
  setUserDetail: (userDetail: any) => {},
  login: () => {},
});

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userDetail, setUserDetail] = useState<User>({});
  const { user, isAuthenticated, isLoading } = useAuth0();

  const login = async () => {
    // navigate(`${process.env.REACT_APP_API_URL}/login`);
    // window.location.href = `http://localhost:8000/login`;
    await fetch(`${process.env.REACT_APP_API_URL}/auth/login`)
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    // fetch user detail
    if (isAuthenticated && user) {
      setUserDetail(user);
    }
  }, []);

  return (
    <UserContext.Provider value={{ userDetail, setUserDetail, login }}>
      {children}
    </UserContext.Provider>
  );
};
