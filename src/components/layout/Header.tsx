import Navbar from "./Navbar";
import MobileMenu from "./MobileMenu";
import TopBar from "./TopBar";

export default function Header() {
  return (
    <>
      {/* Topbar
          Normal document flow mein rahega.
          Scroll karne par ye naturally screen se bahar chala jayega.
      */}
      <header className="relative z-50 w-full">
        <TopBar />
      </header>

      {/* Main Navigation
          Topbar ke baad sticky rahega.
      */}
      <div className="sticky top-0 z-[90] w-full">
        <Navbar />
        <MobileMenu />
      </div>
    </>
  );
}