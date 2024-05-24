export const defaultUserDetail = {
  id: "",
  name: "",
  email: "",
  image: "",
  cart: [],
  emailVerified: null,
  watchlist: [],
  purchase: [],
  address: null,
  role: "customer",
  createdAt: new Date(),
};

export const BASE_URL = "http://localhost:3000";

export const NAV_MANU = [
  {
    name: "All",
    path: "/board?category=all",
    value: "all",
  },
  {
    name: "Capsule",
    path: "/board?category=capsule",
    value: "capsule",
  },
  {
    name: "Crypto",
    path: "/board?category=crypto",
    value: "crypto",
  },
  {
    name: "News",
    path: "/board?category=news",
    value: "news",
  },
];
