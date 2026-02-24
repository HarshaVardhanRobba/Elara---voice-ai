interface PageProps {
  children: React.ReactNode;
}

const Layout = ({ children }: PageProps) => {
  return (
    <div className="flex min-h-screen w-full bg-black">
      <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full max-w-md sm:max-w-lg">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;