import PropTypes from "prop-types";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RefreshIcon from '@mui/icons-material/Refresh';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchDeletedItems, 
  restoreList, 
  restoreTask, 
  mockRestoreList, 
  mockRestoreTask 
} from "../../redux/slices/trashSlice";
import styles from "./RecentlyDeletedContainer.module.css";

/**
 * RecentlyDeletedContainer - A component that displays recently deleted tasks
 * 
 * @param {Object} props
 * @param {string} props.className - Additional CSS class for styling
 * @param {Function} props.onClose - Function to call when closing the component
 */
const RecentlyDeletedContainer = ({ 
  className = "", 
  onClose
}) => {
  const dispatch = useDispatch();
  const { deletedLists, status, error, retentionDays } = useSelector((state) => state.trash);
  const [isLoading, setIsLoading] = useState(status === 'loading');
  const [localError, setLocalError] = useState(error);
  const [restoringItems, setRestoringItems] = useState({});

  // Load deleted tasks when component mounts - for now, just set loading to false
  useEffect(() => {
    // When ready to load real data, uncomment this
    // if (status === 'idle') {
    //   loadDeletedTasks();
    // }
    
    // For now, just initialize with empty state
    setIsLoading(false);
  }, [status]);

  // Update local state based on Redux state
  useEffect(() => {
    setIsLoading(status === 'loading');
    setLocalError(error);
  }, [status, error]);

  // Function to load deleted tasks
  const loadDeletedTasks = async () => {
    try {
      // When backend API is ready
      await dispatch(fetchDeletedItems()).unwrap();
    } catch (err) {
      console.error("Error fetching deleted items:", err);
      setLocalError("Failed to load deleted tasks. Please try again.");
    }
  };

  // Handle task restoration
  const handleRestoreTask = async (listId, taskId) => {
    setRestoringItems(prev => ({ ...prev, [taskId]: true }));
    
    try {
      // For development, use the mock action
      await dispatch(mockRestoreTask({ listId, taskId })).unwrap();
      
      // When API is ready, use this instead:
      // await dispatch(restoreTask({ listId, taskId })).unwrap();
    } catch (err) {
      console.error("Error restoring task:", err);
      // Show error notification
    } finally {
      setRestoringItems(prev => {
        const newState = { ...prev };
        delete newState[taskId];
        return newState;
      });
    }
  };

  // Handle list restoration
  const handleRestoreList = async (listId) => {
    setRestoringItems(prev => ({ ...prev, [`list-${listId}`]: true }));
    
    try {
      // For development, use the mock action
      await dispatch(mockRestoreList({ listId })).unwrap();
      
      // When API is ready, use this instead:
      // await dispatch(restoreList(listId)).unwrap();
    } catch (err) {
      console.error("Error restoring list:", err);
      // Show error notification
    } finally {
      setRestoringItems(prev => {
        const newState = { ...prev };
        delete newState[`list-${listId}`];
        return newState;
      });
    }
  };

  // Format the deletion date
  const formatDate = (dateString) => {
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
    <div className={`${styles.recentlyDeletedContainer} ${className}`}>
      <div className={styles.recentlyDeleted}>
        <div className={styles.header}>
          <div className={styles.titleContainer}>
            <DeleteOutlineIcon fontSize="large" className={styles.icontrash} />
            <h1 className={styles.recentlyDeletedTasks}>Recently Deleted Tasks</h1>
          </div>
          <button 
            className={styles.closeButton} 
            onClick={onClose}
            aria-label="Close"
          >
            <span>Close</span>
            <CloseIcon fontSize="small" className={styles.closeIcon} />
          </button>
        </div>
        
        <div className={styles.content}>
          {isLoading ? (
            <div className={styles.loadingState}>
              <div className={styles.spinner}></div>
              <p>Loading deleted tasks...</p>
            </div>
          ) : localError ? (
            <div className={styles.errorState}>
              <p>{localError}</p>
              <button className={styles.retryButton} onClick={loadDeletedTasks}>
                <RefreshIcon fontSize="small" />
                <span>Retry</span>
              </button>
            </div>
          ) : deletedLists.length === 0 ? (
            <div className={styles.emptyState}>
              <DeleteOutlineIcon fontSize="large" style={{ color: "#9ca3af" }} />
              <p>No deleted tasks found</p>
              <span>When you delete tasks, they will appear here for {retentionDays} days</span>
            </div>
          ) : (
            <div className={styles.tasksList}>
              {deletedLists.map((list) => (
                <div className={styles.taskContainer} key={list.id}>
                  <div className={styles.taskHeader}>
                    <h2 className={styles.taskName}>{list.name}</h2>
                    <div className={styles.headerActions}>
                      <span className={styles.deletedDate}>Deleted {formatDate(list.deletedAt)}</span>
                      <button 
                        className={styles.restoreButton}
                        onClick={() => handleRestoreList(list.id)}
                        disabled={restoringItems[`list-${list.id}`]}
                        aria-label="Restore list"
                      >
                        {restoringItems[`list-${list.id}`] ? (
                          <>
                            <div className={styles.smallSpinner}></div>
                            <span>Restoring...</span>
                          </>
                        ) : (
                          <span>Restore List</span>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className={styles.taskItems}>
                    {list.tasks && list.tasks.map((task) => (
                      <div className={styles.listItem} key={task.id}>
                        <span className={styles.checklistItemText}>{task.text}</span>
                        <button
                          className={styles.itemRestoreButton}
                          onClick={() => handleRestoreTask(list.id, task.id)}
                          disabled={restoringItems[task.id]}
                          aria-label="Restore task"
                        >
                          {restoringItems[task.id] ? (
                            <div className={styles.tinySpinner}></div>
                          ) : (
                            "Restore"
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

RecentlyDeletedContainer.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func
};

export default RecentlyDeletedContainer;