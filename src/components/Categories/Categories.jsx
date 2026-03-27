import styles from './categories.module.css'

export const Categories = ({
	categories,
	setSelectedCategory,
	selectedCategory,
}) => {
	return (
		<div className={styles.categories}>
			{categories.map(category => {
				return (
					<button
						key={category}
						className={
							selectedCategory === category ? styles.active : styles.item
						}
						onClick={() => setSelectedCategory(category)}
					>
						{category}
					</button>
				)
			})}
		</div>
	)
}
