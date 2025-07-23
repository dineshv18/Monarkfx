import Header from "../_components/Header/Header";
import Footer from "../_components/Footer";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="overflow-x-hidden">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default layout;
