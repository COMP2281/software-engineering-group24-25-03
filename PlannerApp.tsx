import { FunctionComponent, useCallback } from 'react';
import styles from './PlannerApp.module.css';


const PlannerApp:FunctionComponent = () => {
  	
  	const onSidebarContainerClick = useCallback(() => {
    		const anchor = document.querySelector("[data-scroll-to='orderSeedsText']");
    		if(anchor) {
      			anchor.scrollIntoView({"block":"start","behavior":"smooth"})
    		}
  	}, []);
  	
  	return (
    		<div className={styles.plannerApp}>
      			<div className={styles.sidebar} onClick={onSidebarContainerClick}>
        				<div className={styles.profile}>
          					<div className={styles.ayoOgunseinde}>Ayo Ogunseinde</div>
          					<img className={styles.profilePictureIcon} alt="" src="Profile picture.png" />
        				</div>
        				<div className={styles.quickActionButtons}>
          					<div className={styles.actionButtons}>
            						<div className={styles.actionButtonsChild} />
            						<div className={styles.menuItem}>
              							<div className={styles.title}>Settings</div>
              							<img className={styles.iconsettings} alt="" src="icon/settings.svg" />
            						</div>
          					</div>
          					<div className={styles.actionButtons1}>
            						<div className={styles.actionButtonsChild} />
            						<div className={styles.menuItem1}>
              							<div className={styles.title}>Personal</div>
              							<img className={styles.iconsettings} alt="" src="icon/user-check.svg" />
            						</div>
          					</div>
          					<div className={styles.actionButtons2}>
            						<div className={styles.actionButtonsInner} />
            						<div className={styles.menuItem2}>
              							<div className={styles.title}>Help</div>
              							<img className={styles.iconlightbulb} alt="" src="icon/lightbulb.svg" />
            						</div>
          					</div>
          					<div className={styles.actionButtons3}>
            						<div className={styles.actionButtonsInner} />
            						<div className={styles.menuItem3}>
              							<div className={styles.title}>Reports</div>
              							<img className={styles.iconsettings} alt="" src="icon/pie-chart.svg" />
            						</div>
          					</div>
        				</div>
        				<div className={styles.separator} />
        				<div className={styles.listSection}>
          					<div className={styles.allMyLists}>All my lists</div>
          					<div className={styles.folderClosed}>
            						<div className={styles.heating}>Heating</div>
            						<img className={styles.iconfolder} alt="" src="icon/folder.svg" />
            						<img className={styles.iconchevronDown} alt="" src="icon/chevron-down.png" />
          					</div>
          					<div className={styles.folderClosed1}>
            						<div className={styles.heating}>Forests</div>
            						<img className={styles.iconfolder} alt="" src="icon/folder.svg" />
            						<img className={styles.iconchevronDown1} alt="" src="icon/chevron-down.svg" />
          					</div>
          					<img className={styles.iconplus} alt="" src="icon/plus.svg" />
          					<div className={styles.listName}>
            						<div className={styles.heating}>Agency Tours</div>
            						<img className={styles.iconclipboardList} alt="" src="icon/clipboard-list.svg" />
          					</div>
          					<div className={styles.listName1}>
            						<div className={styles.buildingDecarbonisation}>Building Decarbonisation</div>
            						<img className={styles.iconarchive} alt="" src="icon/clipboard-list.svg" />
          					</div>
          					<div className={styles.listName2}>
            						<div className={styles.buildingDecarbonisation}>Electrical Replacement</div>
            						<img className={styles.iconarchive} alt="" src="icon/clipboard-list.svg" />
          					</div>
          					<div className={styles.listName3}>
            						<div className={styles.heating}>Tree Planting</div>
            						<img className={styles.iconclipboardList} alt="" src="icon/clipboard-list.svg" />
          					</div>
        				</div>
        				<div className={styles.listName4}>
          					<div className={styles.archive}>Archive</div>
          					<img className={styles.iconarchive} alt="" src="icon/archive.svg" />
        				</div>
        				<div className={styles.listName5}>
          					<div className={styles.recentlyDeleted}>Recently Deleted</div>
          					<img className={styles.icontrash2} alt="" src="icon/trash-2.svg" />
        				</div>
      			</div>
      			<div className={styles.pageTitle}>
        				<b className={styles.title4}>Tree Planting</b>
        				<img className={styles.iconclipboardList4} alt="" src="icon/clipboard-list.svg" />
      			</div>
      			<div className={styles.listsByStatus}>
        				<div className={styles.toDoItemsMemode}>
          					<div className={styles.background} />
          					<div className={styles.listItem}>
            						<div className={styles.listItemName}>
              							<div className={styles.treehouseDesign}>Treehouse design</div>
              							<div className={styles.listItemNameChild} />
            						</div>
            						<div className={styles.listItemDueDate}>
              							<div className={styles.monday23February}>Monday 23 February 2026</div>
              							<img className={styles.iconcalendarDays} alt="" src="icon/calendar-days.svg" />
            						</div>
            						<img className={styles.listItemAssignees} alt="" src="List item assignees.png" />
          					</div>
          					<div className={styles.listItem1}>
            						<div className={styles.listItemName}>
              							<div className={styles.treehouseDesign}>Board Presentation</div>
              							<div className={styles.listItemNameChild} />
            						</div>
            						<div className={styles.listItemDueDate}>
              							<div className={styles.monday23February}>Friday 23 May 2026</div>
              							<img className={styles.iconcalendarDays} alt="" src="icon/calendar-days.svg" />
            						</div>
            						<img className={styles.listItemAssignees} alt="" src="List item assignees.png" />
          					</div>
          					<div className={styles.clip}>
            						<div className={styles.folderClip} />
            						<div className={styles.notStarted}>NOT STARTED</div>
          					</div>
        				</div>
        				<div className={styles.toDoItems}>
          					<div className={styles.background1} />
          					<div className={styles.listItem2}>
            						<div className={styles.listItemName}>
              							<div className={styles.treehouseDesign}>Marketing Report</div>
              							<div className={styles.listItemNameChild} />
            						</div>
            						<div className={styles.listItemDueDate}>
              							<div className={styles.monday23February}>Thursday 23 February 2026</div>
              							<img className={styles.iconcalendarDays} alt="" src="icon/calendar-days.svg" />
            						</div>
            						<img className={styles.listItemAssignees} alt="" src="List item assignees.png" />
          					</div>
          					<div className={styles.listItem3}>
            						<div className={styles.listItemName}>
              							<div className={styles.treehouseDesign}>Treehouse design</div>
              							<div className={styles.listItemNameChild} />
            						</div>
            						<div className={styles.listItemDueDate}>
              							<div className={styles.monday23February}>Monday 23 February 2026</div>
              							<img className={styles.iconcalendarDays} alt="" src="icon/calendar-days.svg" />
            						</div>
            						<img className={styles.listItemAssignees} alt="" src="List item assignees.png" />
          					</div>
          					<div className={styles.listItem4}>
            						<div className={styles.listItemName}>
              							<div className={styles.treehouseDesign}>Board Presentation</div>
              							<div className={styles.listItemNameChild} />
            						</div>
            						<div className={styles.listItemDueDate}>
              							<div className={styles.monday23February}>Friday 23 May 2026</div>
              							<img className={styles.iconcalendarDays} alt="" src="icon/calendar-days.svg" />
            						</div>
            						<img className={styles.listItemAssignees} alt="" src="List item assignees.png" />
          					</div>
          					<div className={styles.listItem5}>
            						<div className={styles.listItemName}>
              							<div className={styles.treehouseDesign}>Lighting for Christmas</div>
              							<div className={styles.listItemNameChild} />
            						</div>
            						<div className={styles.listItemDueDate}>
              							<div className={styles.monday23February}>Friday 13 December 2024</div>
              							<img className={styles.iconcalendarDays} alt="" src="icon/calendar-days.svg" />
            						</div>
            						<img className={styles.listItemAssignees} alt="" src="List item assignees.png" />
          					</div>
          					<div className={styles.clip}>
            						<div className={styles.folderClip} />
            						<div className={styles.notStarted}>NOT STARTED</div>
          					</div>
        				</div>
        				<div className={styles.inProgressMemode}>
          					<div className={styles.background2} />
          					<div className={styles.listItem2}>
            						<div className={styles.listItemName}>
              							<div className={styles.treehouseDesign}>Order seeds</div>
              							<div className={styles.listItemNameChild} />
            						</div>
            						<div className={styles.listItemDueDate}>
              							<div className={styles.monday23February}>Tuesday 31 December 2024</div>
              							<img className={styles.iconcalendarDays} alt="" src="icon/calendar-days.svg" />
            						</div>
            						<img className={styles.listItemAssignees} alt="" src="List item assignees.png" />
          					</div>
          					<div className={styles.listItem4}>
            						<div className={styles.listItemName}>
              							<div className={styles.treehouseDesign}>Organise terraces</div>
              							<div className={styles.listItemNameChild} />
            						</div>
            						<div className={styles.listItemDueDate}>
              							<div className={styles.monday23February}>Thursday 02 January 2025</div>
              							<img className={styles.iconcalendarDays} alt="" src="icon/calendar-days.svg" />
            						</div>
            						<img className={styles.listItemAssignees} alt="" src="List item assignees.png" />
          					</div>
          					<div className={styles.clip2}>
            						<div className={styles.folderClip2} />
            						<div className={styles.notStarted}>IN PROGRESS</div>
          					</div>
        				</div>
        				<div className={styles.inProgress1}>
          					<div className={styles.background3} />
          					<div className={styles.listItem2}>
            						<div className={styles.listItemName}>
              							<div className={styles.treehouseDesign} data-scroll-to="orderSeedsText">Order seeds</div>
              							<div className={styles.listItemNameChild} />
            						</div>
            						<div className={styles.listItemDueDate}>
              							<div className={styles.monday23February}>Tuesday 31 December 2024</div>
              							<img className={styles.iconcalendarDays} alt="" src="icon/calendar-days.svg" />
            						</div>
            						<img className={styles.listItemAssignees} alt="" src="List item assignees.png" />
          					</div>
          					<div className={styles.listItem3}>
            						<div className={styles.listItemName}>
              							<div className={styles.treehouseDesign}>Clear dead brush</div>
              							<div className={styles.listItemNameChild} />
            						</div>
            						<div className={styles.listItemDueDate}>
              							<div className={styles.monday23February}>Wednesday 14 April 2025</div>
              							<img className={styles.iconcalendarDays} alt="" src="icon/calendar-days.svg" />
            						</div>
            						<img className={styles.listItemAssignees} alt="" src="List item assignees.png" />
          					</div>
          					<div className={styles.listItem4}>
            						<div className={styles.listItemName}>
              							<div className={styles.treehouseDesign}>Organise terraces</div>
              							<div className={styles.listItemNameChild} />
            						</div>
            						<div className={styles.listItemDueDate}>
              							<div className={styles.monday23February}>Thursday 02 January 2025</div>
              							<img className={styles.iconcalendarDays} alt="" src="icon/calendar-days.svg" />
            						</div>
            						<img className={styles.listItemAssignees} alt="" src="List item assignees.png" />
          					</div>
          					<div className={styles.listItem5}>
            						<div className={styles.listItemName}>
              							<div className={styles.treehouseDesign}>Controlled burning</div>
              							<div className={styles.listItemNameChild} />
            						</div>
            						<div className={styles.listItemDueDate}>
              							<div className={styles.monday23February}>Tuesday 30 March 2025</div>
              							<img className={styles.iconcalendarDays} alt="" src="icon/calendar-days.svg" />
            						</div>
            						<img className={styles.listItemAssignees} alt="" src="List item assignees.png" />
          					</div>
          					<div className={styles.clip2}>
            						<div className={styles.folderClip2} />
            						<div className={styles.notStarted}>IN PROGRESS</div>
          					</div>
          					<img className={styles.profileBrooke} alt="" src="Profile - Brooke.png" />
        				</div>
        				<div className={styles.done}>
          					<div className={styles.background4} />
          					<div className={styles.listItem2}>
            						<div className={styles.listItemName12}>
              							<div className={styles.findCriticallyEndangered}>Find critically endangered location</div>
              							<div className={styles.listItemNameChild} />
            						</div>
            						<div className={styles.listItemDueDate}>
              							<div className={styles.monday23February}>Monday 25 November 2024</div>
              							<img className={styles.iconcalendarDays} alt="" src="icon/calendar-days.svg" />
            						</div>
            						<img className={styles.listItemAssignees} alt="" src="List item assignees.png" />
          					</div>
          					<div className={styles.listItem4}>
            						<div className={styles.listItemName}>
              							<div className={styles.treehouseDesign}>Choose project lead</div>
              							<div className={styles.listItemNameChild} />
            						</div>
            						<div className={styles.listItemDueDate}>
              							<div className={styles.monday23February}>Friday 29 November 2024</div>
              							<img className={styles.iconcalendarDays} alt="" src="icon/calendar-days.svg" />
            						</div>
            						<img className={styles.listItemAssignees} alt="" src="List item assignees.png" />
          					</div>
          					<div className={styles.clip2}>
            						<div className={styles.folderClip4} />
            						<div className={styles.notStarted}>COMPLETED</div>
          					</div>
        				</div>
      			</div>
      			<img className={styles.newListItemButton} alt="" src="New List Item button.svg" />
    		</div>);
};

export default PlannerApp;
