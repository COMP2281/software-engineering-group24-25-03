import { useState } from 'react';
import CreateProject from './articles/CreateProject';
import DeleteProject from './articles/DeleteProject';
import EditEmail from './articles/EditEmail';
import EditProject from './articles/EditProject';
import ManageTasks from './articles/ManageTasks';
import TrackProgress from './articles/TrackProgress';
import UpdatePassword from './articles/UpdatePassword';
import ViewPermissions from './articles/ViewPermissions';
import styles from './HelpPage.module.css';
import Home from './Home';

const HelpPage = () => {
  const [activeSection, setActiveSection] = useState('createProject');

  const renderArticle = () => {
    switch (activeSection) {
      case 'createProject':
        return <CreateProject />;
      case 'deleteProject':
        return <DeleteProject />;
      case 'editEmail':
        return <EditEmail />;
      case 'editProject':
        return <EditProject />;
      case 'manageTasks':
        return <ManageTasks />;
      case 'trackProgress':
        return <TrackProgress />;
      case 'updatePassword':
        return <UpdatePassword />;
      case 'viewPermissions':
        return <ViewPermissions />;
      default:
        return <CreateProject />;
    }
  };

  return (
    <Home>
      <div className={styles.helpPage}>
        <aside className={styles.helpSidebar}>
          <nav>
            <h3>Projects</h3>
            <ul>
              <li>
                <button className={styles.helpButton} onClick={() => setActiveSection('createProject')}>
                  Creating a Project
                </button>
              </li>
              <li>
                <button className={styles.helpButton} onClick={() => setActiveSection('editProject')}>
                  Editing a Project
                </button>
              </li>
              <li>
                <button className={styles.helpButton} onClick={() => setActiveSection('deleteProject')}>
                  Deleting a Project
                </button>
              </li>
            </ul>
            <h3>Accounts</h3>
            <ul>
              <li>
                <button className={styles.helpButton} onClick={() => setActiveSection('editEmail')}>
                  Edit your email
                </button>
              </li>
              <li>
                <button className={styles.helpButton} onClick={() => setActiveSection('updatePassword')}>
                  Update your password
                </button>
              </li>
              <li>
                <button className={styles.helpButton} onClick={() => setActiveSection('viewPermissions')}>
                  See your permissions
                </button>
              </li>
            </ul>
            <h3>Tasks</h3>
            <ul>
              <li>
                <button className={styles.helpButton} onClick={() => setActiveSection('manageTasks')}>
                  Manage Tasks
                </button>
              </li>
              <li>
                <button className={styles.helpButton} onClick={() => setActiveSection('trackProgress')}>
                  Tracking Progress
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        <section className={styles.helpContent}>{renderArticle()}</section>
      </div>
    </Home>
  );
};

export default HelpPage;