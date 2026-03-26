import styles from './pagination.module.css'

export const Pagination = ({
	totalPages,
	handleNextPage,
	handlePrevPage,
	handlePageClick,
	currentPage,
}) => {
	return (
		<div className={styles.pagination}>
			<button
				className={styles.arrow}
				onClick={handlePrevPage}
				disabled={currentPage <= 1}
			>
				{'<'}
			</button>
			<div className={styles.list}>
				{[...Array(totalPages)].map((_, index) => {
					return (
						<button
							key={index}
							className={styles.pageNumber}
							disabled={index + 1 === currentPage}
							onClick={() => handlePageClick(index + 1)}
						>
							{index + 1}
						</button>
					)
				})}
			</div>
			<button
				className={styles.arrow}
				onClick={handleNextPage}
				disabled={currentPage >= totalPages}
			>
				{'>'}
			</button>
		</div>
	)
}
