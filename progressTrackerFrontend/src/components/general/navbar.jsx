import { useState } from "react";
import "./nav.css"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav id="navbar">
        <a href="/">Home</a>
        <a href="/">Tasks</a>
        <a href="/">Reminders</a>
        <a href="/">Settings</a>
    </nav>
  );
}