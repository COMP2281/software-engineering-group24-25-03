import { useState } from "react";
import "./task.css"

export default function Task() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="Task">
      <div>Example Task</div>
      <div>2025-04-14</div>
      <div>Project Lead: John Smith</div>
      <div>Category: Solar Panels</div>
    </div>
  );
}