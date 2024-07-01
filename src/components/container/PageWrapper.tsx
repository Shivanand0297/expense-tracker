const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="container mx-auto max-w-7xl p-2 sm:p-4 md:px-10 lg:px-12 lg:py-8">{children}</div>;
};

export default PageWrapper;
