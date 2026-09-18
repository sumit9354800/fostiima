import Navbar from "./Navbar";
import MobileMenu from "./MobileMenu";
import TopBar from "./TopBar";

export default function Header() {
  return (
    <>
      <header
        data-fostiima-topbar
        className="relative z-50 w-full"
      >
        <TopBar />
      </header>

      <div
        data-fostiima-navigation
        className="sticky top-0 z-[90] w-full"
      >
        <Navbar />
        <MobileMenu />
      </div>
    </>
  );
}