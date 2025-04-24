
import { Link, useLocation } from "react-router-dom";
import { FileAudio, Home, List, Upload } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navItems = [
    { path: "/", label: "Home", icon: <Home size={20} /> },
    { path: "/library", label: "Library", icon: <List size={20} /> },
    { path: "/upload", label: "Upload", icon: <Upload size={20} /> },
  ];

  return (
    <nav className="w-full bg-white shadow-sm py-3 px-4 md:px-8">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <FileAudio className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">AudioAce</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                isActive(item.path)
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
        
        <div className="md:hidden flex items-center gap-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`p-2 rounded-full ${
                isActive(item.path)
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-accent"
              }`}
            >
              {item.icon}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
