import styles from './SettingsPage.module.css';


const SettingsPage = () => {
  	return (
    		<div className={styles.settingsPage}>
      			<div className={styles.pageTitle}>
        				<b className={styles.title}>Settings</b>
        				<img className={styles.iconsettings} alt="" src="icon/settings.svg" />
      			</div>
      			<div className={styles.settingsElements}>
        				<div className={styles.basicOptionCreateTask}>
          					<div className={styles.basicOptionCreateTaskChild} />
          					<img className={styles.iconuser} alt="" src="icon/user.svg" />
          					<div className={styles.manageAccount}>Manage Account</div>
        				</div>
        				<div className={styles.basicOptionCreateTask}>
          					<div className={styles.basicOptionCreateTaskChild} />
          					<img className={styles.iconuser} alt="" src="icon/fingerprint.svg" />
          					<div className={styles.manageAccount}>Security and Privacy</div>
        				</div>
        				<div className={styles.basicOptionCreateTask}>
          					<div className={styles.basicOptionReportChild} />
          					<img className={styles.vectorIcon} alt="" src="Vector.svg" />
          					<div className={styles.manageAccount}>Notifications</div>
        				</div>
        				<div className={styles.basicOptionCreateTask}>
          					<div className={styles.basicOptionReportChild} />
          					<img className={styles.iconusers} alt="" src="icon/users.svg" />
          					<div className={styles.manageAccount}>View Team</div>
        				</div>
      			</div>
    		</div>);
};

export default SettingsPage;
