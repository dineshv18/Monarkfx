import Header from "../_components/Header/Header";
import Footer from "../_components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="overflow-x-hidden">
      <Header />
      {children}
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default layout;
