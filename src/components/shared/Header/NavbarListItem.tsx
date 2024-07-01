import React from "react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

type NavbarListItemProps = { children: React.ReactNode; to: string };

const NavbarListItem = ({ children, to }: NavbarListItemProps) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) => cn("transition ease-in-out font-semibold", isActive && "text-primary")}
      >
        {children}
      </NavLink>
    </li>
  );
};

export default NavbarListItem;
