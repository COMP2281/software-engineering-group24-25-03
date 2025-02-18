import PropTypes from "prop-types";
import styles from './RecentlyDeletedContainer.module.css';


const RecentlyDeletedContainer = ({ className="" }) => {
  	return (
    		<div className={[styles.recentlyDeletedContainer, className].join(' ')}>
      			<div className={styles.recentlyDeleted}>
        				<img className={styles.icontrash2} alt="" src="icon/trash-2.svg" />
        				<div className={styles.recentlyDeletedTasks}>Recently Deleted Tasks</div>
        				<div className={styles.archivedLists}>
          					<div className={styles.deletedTasks}>
            						<div className={styles.pageTitle}>
              							<b className={styles.title}>Tree Planting</b>
              							<img className={styles.iconclipboardList} alt="" src="icon/clipboard-list.svg" />
            						</div>
            						<div className={styles.listsByStatus}>
              							<div className={styles.inProgress}>
                								<div className={styles.clip}>
                  									<div className={styles.folderClip} />
                  									<div className={styles.notStarted}>IN PROGRESS</div>
                								</div>
                								<div className={styles.background} />
                								<div className={styles.listItem}>
                  									<div className={styles.listItemName}>
                    										<div className={styles.orderSeeds}>Order seeds</div>
                    										<div className={styles.listItemNameChild} />
                  									</div>
                  									<div className={styles.listItemDueDate}>
                    										<div className={styles.tuesday31December}>Tuesday 31 December 2024</div>
                    										<img className={styles.iconcalendarDays} alt="" src="icon/calendar-days.svg" />
                  									</div>
                  									<img className={styles.listItemAssignees} alt="" src="List item assignees.png" />
                								</div>
                								<div className={styles.listItem1}>
                  									<div className={styles.listItemName}>
                    										<div className={styles.orderSeeds}>Organise terraces</div>
                    										<div className={styles.listItemNameChild} />
                  									</div>
                  									<div className={styles.listItemDueDate1}>
                    										<div className={styles.tuesday31December}>Thursday 02 January 2025</div>
                    										<img className={styles.iconcalendarDays} alt="" src="icon/calendar-days.svg" />
                  									</div>
                  									<img className={styles.listItemAssignees1} alt="" src="List item assignees.png" />
                								</div>
              							</div>
              							<div className={styles.toDoItems}>
                								<div className={styles.clip1}>
                  									<div className={styles.folderClip1} />
                  									<div className={styles.notStarted}>NOT STARTED</div>
                								</div>
                								<div className={styles.background1} />
                								<div className={styles.listItem2}>
                  									<div className={styles.listItemName}>
                    										<div className={styles.orderSeeds}>Lighting for Christmas</div>
                    										<div className={styles.listItemNameChild} />
                  									</div>
                  									<div className={styles.listItemDueDate2}>
                    										<div className={styles.tuesday31December}>Friday 13 December 2024</div>
                    										<img className={styles.iconcalendarDays} alt="" src="icon/calendar-days.svg" />
                  									</div>
                  									<img className={styles.listItemAssignees2} alt="" src="List item assignees.png" />
                								</div>
              							</div>
            						</div>
          					</div>
          					<div className={styles.deletedTasks}>
            						<div className={styles.pageTitle}>
              							<b className={styles.title}>Seedling Nurture</b>
              							<img className={styles.iconclipboardList} alt="" src="icon/clipboard-list.svg" />
            						</div>
            						<div className={styles.listsByStatus}>
              							<div className={styles.inProgress}>
                								<div className={styles.clip}>
                  									<div className={styles.folderClip} />
                  									<div className={styles.notStarted}>IN PROGRESS</div>
                								</div>
                								<div className={styles.background} />
                								<div className={styles.listItem}>
                  									<div className={styles.listItemName}>
                    										<div className={styles.orderSeeds}>Order seeds</div>
                    										<div className={styles.listItemNameChild} />
                  									</div>
                  									<div className={styles.listItemDueDate}>
                    										<div className={styles.tuesday31December}>Tuesday 31 December 2024</div>
                    										<img className={styles.iconcalendarDays} alt="" src="icon/calendar-days.svg" />
                  									</div>
                  									<img className={styles.listItemAssignees} alt="" src="List item assignees.png" />
                								</div>
                								<div className={styles.listItem1}>
                  									<div className={styles.listItemName}>
                    										<div className={styles.orderSeeds}>Organise terraces</div>
                    										<div className={styles.listItemNameChild} />
                  									</div>
                  									<div className={styles.listItemDueDate1}>
                    										<div className={styles.tuesday31December}>Thursday 02 January 2025</div>
                    										<img className={styles.iconcalendarDays} alt="" src="icon/calendar-days.svg" />
                  									</div>
                  									<img className={styles.listItemAssignees1} alt="" src="List item assignees.png" />
                								</div>
              							</div>
              							<div className={styles.toDoItems}>
                								<div className={styles.clip1}>
                  									<div className={styles.folderClip1} />
                  									<div className={styles.notStarted}>NOT STARTED</div>
                								</div>
                								<div className={styles.background1} />
                								<div className={styles.listItem2}>
                  									<div className={styles.listItemName}>
                    										<div className={styles.orderSeeds}>Lighting for Christmas</div>
                    										<div className={styles.listItemNameChild} />
                  									</div>
                  									<div className={styles.listItemDueDate2}>
                    										<div className={styles.tuesday31December}>Friday 13 December 2024</div>
                    										<img className={styles.iconcalendarDays} alt="" src="icon/calendar-days.svg" />
                  									</div>
                  									<img className={styles.listItemAssignees2} alt="" src="List item assignees.png" />
                								</div>
              							</div>
            						</div>
          					</div>
        				</div>
        				<div className={styles.closeWindow}>
          					<div className={styles.closeWindowChild} />
          					<div className={styles.close}>Close</div>
          					<img className={styles.xIcon} alt="" src="X.svg" />
        				</div>
      			</div>
    		</div>);
};

RecentlyDeletedContainer.propTypes = {
  	className: PropTypes.string
};

export default RecentlyDeletedContainer;
