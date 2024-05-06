import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage.tsx";
import TermsAndConditions from "./TermsAndConditions.tsx";
import NotFoundPage from "./NotFoundPage.tsx";
import ContactUs from "./ContactUs.tsx";
import BoardPage from "./BoardPage.tsx";
import PostPage from "./Post/PostPage.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={LandingPage} />
        <Route path="/TermsAndConditions" Component={TermsAndConditions} />
        <Route path="/ContactUs" Component={ContactUs} />
        <Route path="/board" Component={BoardPage} />
        <Route path="/board/post/:id" Component={PostPage} />
        <Route Component={NotFoundPage} />
      </Routes>
    </Router>
  );
}

export default App;
