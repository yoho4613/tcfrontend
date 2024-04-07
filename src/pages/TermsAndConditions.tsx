import React, { useState, useEffect } from "react";
import "../styles/App.css";
import Footer from "../Components/Footer.tsx";

function TermsAndConditions() {
  const [tcContent, setTcContent] = useState("");

  useEffect(() => {
    fetch("termsAndConditionsText.txt")
      .then((response) => response.text())
      .then((text) => setTcContent(text))
      .catch((error) => console.error("Error fetching terms: ", error));
  });

  return (
    <div className="Site-background">
      <div className="Site-ScrollContainer">
        <div className="Site-title">Terms and Conditions</div>

        <div className="Site-TermsAndConditions">
          {tcContent.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TermsAndConditions;
