import { useDispatch, useSelector } from 'react-redux';
import "./landing.css";
import { fetchUserDetails } from "../../redux/slices/userDetailsSlice";

export default function Home() {
  const dispatch = useDispatch()
  const user_details = useSelector((state) => state.userDetails);
  if(user_details.status ==="idle"){
     dispatch(fetchUserDetails())
  }
  return (
    <div className="dashboard-container">
      {/* LEFT SIDEBAR */}
      <aside className="sidebar">
        {/* User Profile */}
        <div className="user-profile">
          {/* Avatar (placeholder image) */}
          <div className="avatar">
              <img src={user_details.profile_picture}  alt="User Avatar" />
          </div>
          <h2 className="username">{user_details.status === 'loading' ? 'Loading...' : user_details.user.username}</h2>
        </div>

        {/* Big Buttons */}
        <div className="big-buttons">
          <button className="big-btn">Settings</button>
          <button className="big-btn">Personal</button>
          <button className="big-btn">Reports</button>
          <button className="big-btn">Help</button>
        </div>

        {/* All My Lists */}
        <div className="all-lists">
          <h3>All my lists</h3>
          <ul>
            <li>Building Decarbonisation</li>
            <li>Electrical Replacement</li>
            <li>Heating</li>
            <li>
              <span className="folder-icon">▾</span> Forests
              <ul className="sub-list">
                <li className="active">Tree Planting</li>
              </ul>
            </li>
            <li>Agency Tours</li>
          </ul>
          {/* Add List Icon */}
          <button className="add-list-btn">+</button>
        </div>

        {/* Footer Actions */}
        <div className="sidebar-footer">
          <button className="footer-btn">Archive</button>
          <button className="footer-btn">Recently Deleted</button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        {/* Page Title */}
        <header className="page-header">
          <div className="title-icon" />
          <h1>Tree Planting</h1>
        </header>

        {/* TASK LISTS */}
        <div className="task-columns">
          {/* NOT STARTED */}
          <section className="task-section not-started">
            <h2>Not Started</h2>
            <ul>
              <li>
                <span className="task-name">Marketing Report</span>
                <div className="task-info">
                  <span className="task-date">Thursday 23 February 2026</span>
                  <div className="avatars">
                    <div className="avatar small"></div>
                    <div className="avatar small"></div>
                    <div className="avatar small"></div>
                  </div>
                </div>
              </li>
              <li>
                <span className="task-name">Board Presentation</span>
                <div className="task-info">
                  <span className="task-date">Friday 23 May 2026</span>
                  <div className="avatars">
                    <div className="avatar small"></div>
                  </div>
                </div>
              </li>
              <li>
                <span className="task-name">Treehouse design</span>
                <div className="task-info">
                  <span className="task-date">Monday 23 February 2026</span>
                  <div className="avatars">
                    <div className="avatar small"></div>
                    <div className="avatar small"></div>
                    <div className="avatar small"></div>
                  </div>
                </div>
              </li>
              <li>
                <span className="task-name">Lighting for Christmas</span>
                <div className="task-info">
                  <span className="task-date">Friday 13 December 2024</span>
                  <div className="avatars">
                    <div className="avatar small"></div>
                    <div className="avatar small"></div>
                  </div>
                </div>
              </li>
            </ul>
          </section>

          {/* IN PROGRESS */}
          <section className="task-section in-progress">
            <h2>In Progress</h2>
            <ul>
              <li>
                <span className="task-name">Order seeds</span>
                <div className="task-info">
                  <span className="task-date">Tuesday 31 December 2024</span>
                  <div className="avatars">
                    <div className="avatar small"></div>
                  </div>
                </div>
              </li>
              <li>
                <span className="task-name">Organise terraces</span>
                <div className="task-info">
                  <span className="task-date">Thursday 02 January 2025</span>
                  <div className="avatars">
                    <div className="avatar small"></div>
                  </div>
                </div>
              </li>
              <li>
                <span className="task-name">Clear dead brush</span>
                <div className="task-info">
                  <span className="task-date">Wednesday 14 April 2025</span>
                  <div className="avatars">
                    <div className="avatar small"></div>
                    <div className="avatar small"></div>
                    <div className="avatar small"></div>
                  </div>
                </div>
              </li>
              <li>
                <span className="task-name">Controlled burning</span>
                <div className="task-info">
                  <span className="task-date">Tuesday 30 March 2025</span>
                  <div className="avatars">
                    <div className="avatar small"></div>
                    <div className="avatar small"></div>
                  </div>
                </div>
              </li>
            </ul>
          </section>

          {/* COMPLETED */}
          <section className="task-section completed">
            <h2>Completed</h2>
            <ul>
              <li>
                <span className="task-name">
                  Find critically endangered location
                </span>
                <div className="task-info">
                  <span className="task-date">Monday 25 November 2024</span>
                  <div className="avatars">
                    <div className="avatar small"></div>
                    <div className="avatar small"></div>
                  </div>
                </div>
              </li>
              <li>
                <span className="task-name">Choose project lead</span>
                <div className="task-info">
                  <span className="task-date">Friday 29 November 2024</span>
                  <div className="avatars">
                    <div className="avatar small"></div>
                    <div className="avatar small"></div>
                  </div>
                </div>
              </li>
            </ul>
          </section>
        </div>

        {/* Floating + Button */}
        <button className="floating-add">+</button>
      </main>
    </div>
  );
}
