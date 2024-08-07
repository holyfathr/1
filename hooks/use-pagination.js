import { useState } from "react"

import PaginationComponent from "components/ui/Pagination"

/**
 * Simplifies pagination logic.
 *
 * @returns Object with methods to work with pagination
 */
const usePagination = () => {
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)

  const Pagination = (props) => (
    <PaginationComponent value={page} onChange={setPage} count={count} {...props} />
  )

  return { page, setPage, count, setCount, Pagination }
}

export default usePagination
