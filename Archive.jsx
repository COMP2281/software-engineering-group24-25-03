import PropTypes from "prop-types";
import styles from './Archive.module.css';


const Archive = ({ className="" }) => {
  	return (
    		<div className={[styles.archive, className].join(' ')}>
      			<img className={styles.iconarchive} alt="" src="icon/archive.svg" />
      			<div className={styles.archivedLists}>Archived Lists</div>
      			<div className={styles.archivedLists1}>
        				<div className={styles.listItem}>
          					<div className={styles.checklistItemBox} />
          					<div className={styles.checklistItemText}>Durham Swimming Pool</div>
        				</div>
        				<div className={styles.listItem}>
          					<div className={styles.checklistItemBox} />
          					<div className={styles.checklistItemText}>Durham Swimming Pool</div>
        				</div>
        				<div className={styles.listItem}>
          					<div className={styles.checklistItemBox} />
          					<div className={styles.checklistItemText}>Durham Swimming Pool</div>
        				</div>
        				<div className={styles.listItem}>
          					<div className={styles.checklistItemBox} />
          					<div className={styles.checklistItemText}>Durham Swimming Pool</div>
        				</div>
        				<div className={styles.listItem}>
          					<div className={styles.checklistItemBox} />
          					<div className={styles.checklistItemText}>Durham Swimming Pool</div>
        				</div>
      			</div>
      			<div className={styles.closeWindow}>
        				<div className={styles.closeWindowChild} />
        				<div className={styles.close}>Close</div>
        				<img className={styles.xIcon} alt="" src="X.svg" />
      			</div>
    		</div>);
};

Archive.propTypes = {
  	className: PropTypes.string
};

export default Archive;
