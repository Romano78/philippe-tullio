import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export default function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <DesktopNav />
      <MobileNav />
    </header>
  );
}
