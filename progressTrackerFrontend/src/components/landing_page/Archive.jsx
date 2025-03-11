import PropTypes from "prop-types";
import CloseIcon from '@mui/icons-material/Close';
import RestoreIcon from '@mui/icons-material/Restore';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArchivedLists, restoreArchivedList, mockRestoreList } from "../../redux/slices/archiveSlice";
import styles from "./Archive.module.css";
import archiveIcon from "/src/assets/archive.svg";

const Archive = ({ className = "", onClose }) => {
  const dispatch = useDispatch();
  const { archivedLists, status, error } = useSelector((state) => state.archive);
  const [loading, setLoading] = useState(false);
  const [restoringItems, setRestoringItems] = useState({});

  // Fetch archived lists when component mounts
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchArchivedLists());
    }
  }, [status, dispatch]);

  // Function to handle restoring an archived list
  const handleRestoreList = async (listId) => {
    setRestoringItems(prev => ({ ...prev, [listId]: true }));
    
    try {
      // For development, you might want to use the mock action
      // In production, use the real action
      await dispatch(restoreArchivedList(listId)).unwrap();
      // Alternative for testing without API:
      // await dispatch(mockRestoreList({ listId })).unwrap();
    } catch (err) {
      console.error("Error restoring list:", err);
    } finally {
      setRestoringItems(prev => {
        const newState = { ...prev };
        delete newState[listId];
        return newState;
      });
    }
  };

  // Format the archive date
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className={`${styles.archive} ${className}`}>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <img className={styles.iconarchive} alt="Archive" src={archiveIcon} />
          <h1 className={styles.archivedLists}>Archived Lists</h1>
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          <span>Close</span>
          <CloseIcon fontSize="small" />
        </button>
      </div>
      <div className={styles.content}>
        {status === 'loading' ? (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Loading archived lists...</p>
          </div>
        ) : error ? (
          <div className={styles.errorState}>
            <p>{error}</p>
            <button 
              className={styles.retryButton} 
              onClick={() => dispatch(fetchArchivedLists())}
            >
              <span>Retry</span>
            </button>
          </div>
        ) : archivedLists.length === 0 ? (
          <div className={styles.emptyState}>
            <img src={archiveIcon} alt="Empty archive" className={styles.emptyIcon} />
            <p>No archived lists found</p>
            <span>When you archive lists, they will appear here</span>
          </div>
        ) : (
          <div className={styles.itemsList}>
            {archivedLists.map((list) => (
              <div className={styles.listItem} key={list.listId || list.id}>
                <div className={styles.listItemContent}>
                  <div className={styles.listItemInfo}>
                    <span className={styles.listItemText}>
                      {list.listName || list.name}
                    </span>
                    <span className={styles.archivedDate}>
                      Archived {formatDate(list.archivedAt)}
                    </span>
                  </div>
                  <button
                    className={styles.restoreButton}
                    onClick={() => handleRestoreList(list.listId || list.id)}
                    disabled={restoringItems[list.listId || list.id]}
                    aria-label="Restore list"
                  >
                    {restoringItems[list.listId || list.id] ? (
                      <div className={styles.smallSpinner}></div>
                    ) : (
                      <>
                        <RestoreIcon fontSize="small" />
                        <span>Restore</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

Archive.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func
};

export default Archive;