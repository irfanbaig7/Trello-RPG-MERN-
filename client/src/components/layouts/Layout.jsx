import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="p-4">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
