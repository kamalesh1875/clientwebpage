import "./Navbar.css";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  return (
    <header className="nav-shell">
      <nav className="navbar" aria-label="Main navigation">
        <a className="navbar-logo" href="#home" aria-label="StackLite home">
          <span className="navbar-logo-mark">S</span>
          <span>StackLite</span>
        </a>

        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>

        <a className="nav-button" href="#contact">
          Get Quote
        </a>
      </nav>
    </header>
  );
}

export default Navbar;
