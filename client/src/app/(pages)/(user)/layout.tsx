
import Header from "../_components/Header/Header";
import Footer from "../_components/Footer";
import TrackingScripts from "@/components/TrackingScripts";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <TrackingScripts />
      {children}
      <Footer />
    </div>
  );
};

export default layout;
