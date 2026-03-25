import styles from './image.module.css'

export const Image = ({ image }) => {
	return (
		<div className={styles.wrapper}>
			{image !== 'None' ? (
				<img src={image} alt='news' className={styles.image} />
			) : null}
		</div>
	)
}
