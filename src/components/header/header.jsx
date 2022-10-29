import React from 'react';
import styles from './header.module.scss';
import smallMeliLogo from '../../assets/images/Logo_ML.png';

const Header = () => {
	return (
		<div className={styles.header}>
			<div className={styles.header_content}>
				<img src={smallMeliLogo} alt='search' className={styles.logo}/>
			</div>
		</div>
	)
};

export default Header;
