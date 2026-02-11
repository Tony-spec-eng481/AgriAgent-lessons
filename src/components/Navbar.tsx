import { Link, useLocation } from "react-router-dom";
import { Menu, X, Leaf } from "lucide-react";
import { useState, useEffect } from "react";
import "../styles/navbar.css"; // External CSS import

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking a link
  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  // Check if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar-agri ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <div className="nav-inner">
          {/* Logo and Brand */}
          <Link to="/" className="nav-brand" onClick={closeMobileMenu}>
            <Leaf className="nav-logo" />
            <span className="nav-brand-name">AgriAgent School</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="nav-desktop">
            <ul className="nav-links">
              <li className="nav-link-item">
                <Link
                  to="/"
                  className={`nav-link ${isActive("/") ? "active" : ""}`}
                >
                  Home
                </Link>
              </li>

              <li className="nav-link-item">
                <Link
                  to="/lessons"
                  className={`nav-link ${isActive("/lessons") ? "active" : ""}`}
                >
                  Lessons
                </Link>
              </li>

              <li className="nav-link-item">
                <Link
                  to="/about"
                  className={`nav-link ${isActive("/about") ? "active" : ""}`}
                >
                  About
                </Link>
              </li>

              <li className="nav-link-item">
                <Link
                  to="/contact"
                  className={`nav-link ${isActive("/contact") ? "active" : ""}`}
                >
                  Contact
                </Link>
              </li>

              <li className="nav-link-item">
                <Link to="/login" className="nav-link nav-login-btn">
                  Login / Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="nav-mobile-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X className="nav-toggle-icon" />
            ) : (
              <Menu className="nav-toggle-icon" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="nav-mobile-menu">
          <ul className="nav-mobile-links">
            <li className="nav-mobile-item">
              <Link
                to="/"
                className={`nav-mobile-link ${isActive("/") ? "active" : ""}`}
                onClick={closeMobileMenu}
              >
                Home
              </Link>
            </li>

            <li className="nav-mobile-item">
              <Link
                to="/lessons"
                className={`nav-mobile-link ${
                  isActive("/lessons") ? "active" : ""
                }`}
                onClick={closeMobileMenu}
              >
                Lessons
              </Link>
            </li>

            <li className="nav-mobile-item">
              <Link
                to="/about"
                className={`nav-mobile-link ${isActive("/about") ? "active" : ""}`}
                onClick={closeMobileMenu}
              >
                About
              </Link>
            </li>

            <li className="nav-mobile-item">
              <Link
                to="/contact"
                className={`nav-mobile-link ${
                  isActive("/contact") ? "active" : ""
                }`}
                onClick={closeMobileMenu}
              >
                Contact
              </Link>
            </li>

            <li className="nav-mobile-item">
              <Link
                to="/login"
                className="nav-mobile-link nav-mobile-login"
                onClick={closeMobileMenu}
              >
                Login / Register
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
