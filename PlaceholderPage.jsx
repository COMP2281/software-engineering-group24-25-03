import styles from './PlaceholderPage.module.css';


const PlaceholderPage = () => {
  	return (
    		<div className={styles.placeholderPage}>
      			<i className={styles.chooseOrCreate}>Choose or create a list on the left to get started</i>
      			<img className={styles.iconhaze} alt="" src="icon/haze.svg" />
    		</div>);
};

export default PlaceholderPage;
