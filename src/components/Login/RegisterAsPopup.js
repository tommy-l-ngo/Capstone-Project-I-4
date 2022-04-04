import React, { useEffect } from "react";
import RegisterAs from "./RegisterAs";
import { fadeIn, setFade } from "../Dashboard/Navbar";
export const RegisterAsPopup = () => {
  useEffect(() => {
    setFade(false);
  });
  return (
    <div className={fadeIn ? "loginFormContainerFirst" : "loginFormContainer"}>
      <RegisterAs />
      {/* {pageContent} */}
    </div>
  );
};
