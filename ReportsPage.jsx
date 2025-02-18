import styles from './ReportsPage.module.css';


const ReportsPage = () => {
  	return (
    		<div className={styles.reportsPage}>
      			<div className={styles.pageTitle}>
        				<b className={styles.title}>Reports</b>
        				<img className={styles.iconfileLineChart} alt="" src="icon/file-line-chart.svg" />
      			</div>
      			<div className={styles.settingsElements}>
        				<div className={styles.settingAreHere}>Setting are HERE!!!!</div>
        				<div className={styles.settingsElementsChild} />
        				<div className={styles.settingsElementsItem} />
        				<div className={styles.settingsElementsInner} />
        				<div className={styles.rectangleDiv} />
        				<div className={styles.settingsElementsChild1} />
        				<div className={styles.settingsElementsChild2} />
        				<div className={styles.settingsElementsChild3} />
        				<div className={styles.settingsElementsChild4} />
        				<div className={styles.div}>60%</div>
        				<div className={styles.div1}>24%</div>
        				<div className={styles.div2}>16%</div>
        				<div className={styles.ofTasksNotContainer}>
          					<span className={styles.ofTasksNotContainer1}>
            						<span>{`of tasks `}</span>
            						<span className={styles.notStarted}>not started</span>
          					</span>
        				</div>
        				<div className={styles.ofTasksInContainer}>
          					<span className={styles.ofTasksNotContainer1}>
            						<span>{`of tasks `}</span>
            						<span className={styles.inProgress}>in progress</span>
          					</span>
        				</div>
        				<div className={styles.ofTasksDoneContainer}>
          					<span>{`of tasks `}</span>
          					<span className={styles.done}>done</span>
        				</div>
      			</div>
    		</div>);
};

export default ReportsPage;
