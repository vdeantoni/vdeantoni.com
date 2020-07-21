import React from "react";
import Footer from "./footer";
import Header from "./header";
import Background from "./background";
import * as $ from "classnames";

const Layout = ({ children, ...props }) => {
  return (
    <div className={$("flex", "flex-col", "max-w-6xl", "min-h-screen", "px-4", "mx-auto", "sm:px-6", "lg:px-8")}>
      <Background className={$("fixed", "top-0", "left-0", "w-full", "h-full", "-z-1")}></Background>
      <Header />
      <main className={$("flex-1", "py-8", "md:py-12")}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
