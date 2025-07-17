import React from "react";
import Header from "../_components/Header/Header";
import Footer from "../_components/Footer";
import FuturisticCursor from "@/components/FuturisticCursor";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <FuturisticCursor />
      {children}
      <Footer />
    </div>
  );
};

export default layout;
