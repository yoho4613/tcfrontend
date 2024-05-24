import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./pages/App.tsx";
import reportWebVitals from "./reportWebVitals";
import "./API/emailjsAPI.ts";
import { TheCapsuleProvider } from "./context/TheCapsuleContext.tsx";
import { UserContextProvider } from "./context/UserContext.tsx";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <TheCapsuleProvider>
        <Auth0Provider
          domain={process.env.REACT_APP_AUTH0_BASE_URL!}
          clientId={process.env.REACT_APP_AUTH0_CLIENT_ID!}
          authorizationParams={{
            redirect_uri: window.location.origin + "/board",
          }}
        >
          <App />
        </Auth0Provider>
        ,
      </TheCapsuleProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
