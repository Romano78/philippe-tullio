import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import NavScroll from "./NavScroll";

export default function Nav() {
  return (
    <NavScroll>
      <DesktopNav />
      <MobileNav />
    </NavScroll>
  );
}
