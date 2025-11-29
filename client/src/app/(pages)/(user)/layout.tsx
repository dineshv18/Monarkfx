import Header from "../_components/Header/Header";
import Footer from "../_components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import RawSEO from "@/components/Tag";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="overflow-x-hidden">
      <RawSEO />
      <Header />
      {children}
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default layout;
