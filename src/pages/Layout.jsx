import Navbar from '../components/Navbar';

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <Navbar />
      <main className="pt-20 max-w-6xl mx-auto">{children}</main>
    </div>
  );
}

export default Layout;
