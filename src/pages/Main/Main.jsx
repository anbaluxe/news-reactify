import { useEffect, useState } from 'react'
import { getCategories, getNews } from '../../api/apiNews'
import { Categories } from '../../components/Categories/Categories'
import { NewsBanner } from '../../components/NewsBanner/NewsBanner'
import { NewsList } from '../../components/NewsList/NewsList'
import { Pagination } from '../../components/Pagination/Pagination'
import { Skeleton } from '../../components/Skeleton/Skeleton'
import styles from './styles.module.css'

export const Main = () => {
	const [news, setNews] = useState([])
	const [categories, setCategories] = useState([])
	const [selectedCategory, setSelectedCategory] = useState('All')
	const [isLoading, setIsLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const totalPage = 10
	const pageSize = 10

	useEffect(() => {
		const fetchNews = async currentPage => {
			try {
				setIsLoading(true)
				const response = await getNews({
					page_number: currentPage,
					page_size: pageSize,
					category: selectedCategory === 'All' ? null : selectedCategory,
				})
				setNews(response.news)
				setIsLoading(false)
			} catch (error) {
				console.log(error)
			}
		}
		fetchNews(currentPage)
	}, [currentPage, selectedCategory])

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await getCategories()
				setCategories(['All', ...response.categories])
			} catch (error) {
				console.log(error)
			}
		}
		fetchCategories()
	}, [currentPage])

	const handleNextPage = () => {
		if (currentPage < totalPage) {
			setCurrentPage(prev => prev + 1)
		}
	}
	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(prev => prev - 1)
		}
	}
	const handlePageClick = pageNumber => {
		setCurrentPage(pageNumber)
	}

	return (
		<main className={styles.main}>
			<Categories
				categories={categories}
				setSelectedCategory={setSelectedCategory}
				selectedCategory={selectedCategory}
			/>
			{news.length > 0 && !isLoading ? (
				<NewsBanner item={news[0]} />
			) : (
				<Skeleton count={1} type={'banner'} />
			)}
			<Pagination
				handleNextPage={handleNextPage}
				handlePrevPage={handlePrevPage}
				handlePageClick={handlePageClick}
				totalPages={totalPage}
				currentPage={currentPage}
			/>
			{!isLoading ? (
				<NewsList news={news} />
			) : (
				<Skeleton count={news.length} type={'item'} />
			)}
			<Pagination
				handleNextPage={handleNextPage}
				handlePrevPage={handlePrevPage}
				handlePageClick={handlePageClick}
				totalPages={totalPage}
				currentPage={currentPage}
			/>
		</main>
	)
}
