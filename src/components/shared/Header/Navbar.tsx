import { NavLink } from "react-router-dom";
import NavbarListItem from "@/components/shared/Header/NavbarListItem";
import NavbarList from "@/components/shared/Header/NavbarList";
import { LayoutDashboard } from "lucide-react";
import { ModeToggle } from "@/components/ui/themeToggle";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 dark:bg-background dark:text-foreground shadow">
      <div className="container mx-auto max-w-7xl p-2 sm:p-4 md:px-10 lg:px-12">
        <div className="flex items-center justify-between py-2">
          <nav className="flex items-center gap-4">
            <NavLink to="/">
              <LayoutDashboard size={20} className="text-primary" />
            </NavLink>
            <NavbarList>
              <NavbarListItem to="/transaction-init">Make Transaction</NavbarListItem>
              <NavbarListItem to="/transactions">Transactions</NavbarListItem>
            </NavbarList>
          </nav>
          <ModeToggle/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
