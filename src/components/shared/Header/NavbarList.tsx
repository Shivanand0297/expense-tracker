const NavbarList = ({ children }: { children: React.ReactNode }) => {
  return <ul className="ml-5 flex flex-wrap items-center gap-3">{children}</ul>;
};

export default NavbarList;
