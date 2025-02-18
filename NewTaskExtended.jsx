import styles from './NewTaskExtended.module.css';


const NewTaskExtended = () => {
  	return (
    		<div className={styles.newTaskExtended}>
      			<img className={styles.iconpencil} alt="" src="icon/pencil.svg" />
      			<div className={styles.addChecklistItem}>
        				<div className={styles.addChecklistItemChild} />
        				<img className={styles.vectorIcon} alt="" src="Vector.svg" />
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
      			<div className={styles.createTask}>Create Task</div>
      			<div className={styles.newTaskFields}>
        				<div className={styles.taskNameField}>
          					<div className={styles.whatDoYou}>What do you want to call your task?</div>
            						<div className={styles.taskNameFieldChild} />
            						<div className={styles.placeholderName}>Install Solar Panels</div>
            						</div>
            						<div className={styles.taskNameField}>
              							<div className={styles.whatDoYou}>When must this task be finished?</div>
                								<div className={styles.taskNameFieldChild} />
                								<div className={styles.placeholderName}>31/03/2025</div>
                								<img className={styles.iconcalendarDays} alt="" src="icon/calendar-days.svg" />
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
                    										<div className={styles.assigneeFrame}>
                      											<div className={styles.selectedAssignee}>
                        												<div className={styles.file1Box} />
                        												<div className={styles.suggestion}>{`Brooke Harlington `}</div>
                        												<img className={styles.profileChristian} alt="" src="Profile - Brooke.png" />
                      											</div>
                    										</div>
                    										</div>
                    										<div className={styles.notesField}>
                      											<div className={styles.whatDoYou}>Notes</div>
                      											<div className={styles.rectangleParent}>
                        												<div className={styles.groupChild} />
                        												<div className={styles.placeholderName1}>
                          													<ul className={styles.speakToKatyAtHartlepoolBu}>
                            														<li className={styles.speakToKaty}>Speak to Katy at Hartlepool</li>
                            														<li className={styles.speakToKaty}>Business as Usual</li>
                            														<li>Should be attempted before starting heat pump planning and installation</li>
                          													</ul>
                        												</div>
                      											</div>
                    										</div>
                    										<div className={styles.checklist}>
                      											<div className={styles.reminders}>Checklist</div>
                      											<div className={styles.checklistChild} />
                      											<div className={styles.checklistItem}>
                        												<div className={styles.checklistItemBox} />
                        												<div className={styles.checklistItemText}>Write Report for DCC Board Presentation</div>
                        												<div className={styles.checkbox}>
                          													<div className={styles.addChecklistItemChild} />
                        												</div>
                      											</div>
                      											<div className={styles.checklistItem1}>
                        												<div className={styles.checklistItemBox} />
                        												<div className={styles.checklistItemText}>Verify that sun measurement forecast accurate</div>
                        												<div className={styles.checkbox}>
                          													<div className={styles.addChecklistItemChild} />
                        												</div>
                      											</div>
                      											<div className={styles.addChecklistItem1}>
                        												<div className={styles.addChecklistItemChild} />
                        												<img className={styles.vectorIcon} alt="" src="Vector.svg" />
                      											</div>
                    										</div>
                    										<div className={styles.filesField}>
                      											<div className={styles.files}>Files</div>
                      											<div className={styles.uploadedFileFrame}>
                        												<div className={styles.selectedAssignee}>
                          													<div className={styles.file1Box} />
                          													<div className={styles.suggestion}>Report_from_Katy.docx</div>
                          													<img className={styles.iconfile} alt="" src="icon/file.svg" />
                        												</div>
                        												<div className={styles.binPlaceholder} />
                      											</div>
                      											<div className={styles.uploadedFileFrame1}>
                        												<div className={styles.selectedAssignee}>
                          													<div className={styles.file1Box} />
                          													<div className={styles.suggestion}>Solar_panel_sun_data.xlsx</div>
                          													<img className={styles.iconfile} alt="" src="icon/file.svg" />
                        												</div>
                        												<div className={styles.binPlaceholder} />
                      											</div>
                      											<div className={styles.newFile}>
                        												<div className={styles.newFileChild} />
                        												<div className={styles.placeholderName2}>Search for a file...</div>
                        												<div className={styles.selectedFile3}>
                          													<div className={styles.file2Box} />
                          													<div className={styles.file2Name}>Upload new file</div>
                        												</div>
                        												<img className={styles.iconfilePlus} alt="" src="icon/file-plus.svg" />
                      											</div>
                    										</div>
                    										<div className={styles.remindersField}>
                      											<div className={styles.reminders}>Reminders</div>
                      											<div className={styles.newAlertFrame}>
                        												<div className={styles.reminder}>
                          													<div className={styles.alertFrame}>
                            														<img className={styles.vectorIcon2} alt="" src="Vector.svg" />
                          													</div>
                        												</div>
                      											</div>
                      											<div className={styles.remindersFrame}>
                        												<div className={styles.selectedAssignee}>
                          													<div className={styles.file1Box} />
                          													<div className={styles.alertFrame1}>
                            														<img className={styles.vectorIcon2} alt="" src="Vector.svg" />
                          													</div>
                          													<div className={styles.reminderNameFrame}>
                            														<div className={styles.reminderName}>View Amanda’s updates (if any) and prepare</div>
                          													</div>
                          													<div className={styles.remindOnDate}>
                            														<img className={styles.iconcalendarDays1} alt="" src="icon/calendar-days.svg" />
                            														<div className={styles.notStarted}>23/04/2025</div>
                          													</div>
                          													<div className={styles.remindOnTime}>
                            														<img className={styles.clockIcon} alt="" src="Clock.svg" />
                            														<div className={styles.notStarted}>14:00</div>
                          													</div>
                        												</div>
                        												<div className={styles.binFrame} />
                      											</div>
                      											<div className={styles.remindersFrame1}>
                        												<div className={styles.selectedAssignee}>
                          													<div className={styles.file1Box} />
                          													<div className={styles.alertFrame1}>
                            														<img className={styles.vectorIcon2} alt="" src="Vector.svg" />
                          													</div>
                          													<div className={styles.reminderNameFrame}>
                            														<div className={styles.reminderName}>Chase Bertie for update</div>
                          													</div>
                          													<div className={styles.remindOnDate}>
                            														<img className={styles.iconcalendarDays1} alt="" src="icon/calendar-days.svg" />
                            														<div className={styles.notStarted}>01/02/2025</div>
                          													</div>
                          													<div className={styles.remindOnTime}>
                            														<img className={styles.clockIcon} alt="" src="Clock.svg" />
                            														<div className={styles.notStarted}>09:00</div>
                          													</div>
                        												</div>
                        												<div className={styles.binFrame} />
                      											</div>
                    										</div>
                    										<div className={styles.buttonFrame}>
                      											<div className={styles.saveButton}>
                        												<div className={styles.title}>Un-extend</div>
                      											</div>
                      											<div className={styles.extendButton}>
                        												<div className={styles.title}>Add this task</div>
                      											</div>
                    										</div>
                    										</div>
                    										</div>);
                  									};
                  									
                  									export default NewTaskExtended;
                  									
