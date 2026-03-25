import { formateDate } from '../../helpers/formatDate'
import styles from './styles.module.css'

export const Header = () => {
	return (
		<header className={styles.header}>
			<h1 className={styles.title}>NEWS REACTIFY</h1>
			<p className={styles.date}>{formateDate(new Date())}</p>
		</header>
	)
}
