import React from 'react';

import styles from './spinner.module.scss';

const Spinner = () => (
	<div className={styles.spinner}>
		<div className={styles.spinner_overlay}>
			<div className={styles.spinner_loader}  />
		</div>
	</div>
);

export default Spinner;
