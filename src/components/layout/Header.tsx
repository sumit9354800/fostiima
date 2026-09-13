import Navbar from "./Navbar";
import MobileMenu from "./MobileMenu";
import TopBar from "./TopBar";

export default function Header() {
  return (
    <header className="relative z-50 w-full">
      <TopBar />
      <Navbar />
      <MobileMenu />
    </header>
  );
}