interface PageProps {
    children: React.ReactNode;
}

const Layout = ({ children }: PageProps) => {
    return (
        <div className="flex min-h-screen bg-black">
            <main className="flex-1 bg-main min-h-screen">{children}</main>
        </div>
    );
};

export default Layout;