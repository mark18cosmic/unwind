import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Waves } from "lucide-react";
import { AuthContext } from "@/auth/AuthContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { signOut } from "firebase/auth";
import { auth } from "@/services/firebase";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);   // logs out the user
      navigate("/login");    // redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
          <img src="/src/assets/unwind.jpeg" alt="logo" className="w-10 h-10" />
            <span className="font-bold text-lg">Unwind</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </Link>
            <Link
              to="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              For Employers
            </Link>
            <Link
              to="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              For Guesthouses
            </Link>
            <Link
              to="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Destinations
            </Link>
          </div>

          {/* Desktop CTA / PFP */}
          <div className="hidden md:flex items-center gap-3">
            {!user ? (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            ) : (
              <div className="relative">
                <div>
                  <p>{user.username}</p>
                  <Avatar onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <AvatarImage
                      src={user.photoURL || "https://github.com/shadcn.png"}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg flex flex-col">
                    <button
                      onClick={() => navigate("/dashboard")}
                      className="px-4 py-2 text-sm hover:bg-gray-100 text-left"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 text-sm text-red-500 hover:bg-red-100 text-left"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                How It Works
              </Link>
              <Link
                to="/"
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                For Employers
              </Link>
              <Link
                to="/"
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                For Guesthouses
              </Link>
              <Link
                to="/"
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                Destinations
              </Link>
              <div className="flex gap-2 mt-4 px-4">
                {!user ? (
                  <>
                    <Link to="/login" className="flex-1">
                      <Button variant="outline" size="sm">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/signup" className="flex-1">
                      <Button size="sm">Get Started</Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => navigate("/dashboard")}
                      className="flex-1 border p-2 rounded"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex-1 border p-2 rounded"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
