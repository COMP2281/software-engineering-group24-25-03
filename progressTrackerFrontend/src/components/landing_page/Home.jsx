import { useState } from "react";
import Navbar from "../general/navbar"
import Dashboard from "./Dashboard"

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div>
      <Navbar/>
      <Dashboard/>
    </div>
  );
}
