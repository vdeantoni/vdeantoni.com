import React from "react";
import Footer from "./footer";
import Header from "./header";

const Layout = ({ children, ...props }) => {
  return (
    <div className="max-w-6xl mx-auto flex flex-col min-h-screen px-4 sm:px-6 lg:px-8 ">
      <Header />
      <main className="flex-1 py-8 md:py-12">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
