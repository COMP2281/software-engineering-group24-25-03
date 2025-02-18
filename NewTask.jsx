import styles from './NewTask.module.css';


const NewTask = () => {
  	return (
    		<div className={styles.newTask}>
      			<img className={styles.iconpencil} alt="" src="icon/pencil.svg" />
      			<div className={styles.createTask}>Create Task</div>
      			<div className={styles.newTaskFields}>
        				<div className={styles.taskNameField}>
          					<div className={styles.whatDoYou}>What do you want to call your task?</div>
            						<div className={styles.taskNameFieldChild} />
            						<div className={styles.placeholderName}>Install Solar Panels</div>
            						</div>
            						<div className={styles.assigneeField}>
              							<div className={styles.whatDoYou}>Who is responsible for this task?</div>
                								<div className={styles.newAssignee}>
                  									<div className={styles.newAssigneeChild} />
                  									<div className={styles.placeholderUsername}>Christi</div>
                  									<div className={styles.placeholderUsername1}>Suggested</div>
                  									<div className={styles.newAssigneeItem} />
                  									<div className={styles.suggestionBox}>
                    										<div className={styles.suggestionBox1} />
                    										<div className={styles.suggestion}>Christian Valez</div>
                    										<img className={styles.profileChristian} alt="" src="Profile - Christian.png" />
                  									</div>
                								</div>
                								</div>
                								<div className={styles.deadlineField}>
                  									<div className={styles.whatDoYou}>When must this task be finished?</div>
                    										<div className={styles.taskNameFieldChild} />
                    										<div className={styles.placeholderName}>31/03/2025</div>
                    										<img className={styles.iconcalendarDays} alt="" src="icon/calendar-days.svg" />
                    										</div>
                    										<div className={styles.buttonFrame}>
                      											<div className={styles.saveButton}>
                        												<div className={styles.title}>Extend</div>
                      											</div>
                      											<div className={styles.extendButton}>
                        												<div className={styles.title}>Add this task</div>
                      											</div>
                    										</div>
                    										<div className={styles.assigneeFrame}>
                      											<div className={styles.selectedAssignee}>
                        												<div className={styles.suggestionBox2} />
                        												<div className={styles.suggestion}>{`Brooke Harlington `}</div>
                        												<img className={styles.profileChristian} alt="" src="Profile - Brooke.png" />
                      											</div>
                    										</div>
                    										</div>
                    										<div className={styles.statusSelection}>
                      											<div className={styles.statusSelector}>
                        												<div className={styles.statusSelectorChild} />
                      											</div>
                      											<div className={styles.statusSelector}>
                        												<div className={styles.statusSelectorItem} />
                      											</div>
                      											<div className={styles.statusSelector2}>
                        												<div className={styles.statusSelectorInner} />
                        												<div className={styles.notStarted}>Not Started</div>
                      											</div>
                    										</div>
                    										<div className={styles.closeWindow}>
                      											<div className={styles.closeWindowChild} />
                      											<div className={styles.close}>Close</div>
                      											<img className={styles.xIcon} alt="" src="X.svg" />
                    										</div>
                    										</div>);
                  									};
                  									
                  									export default NewTask;
                  									
