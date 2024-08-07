import clsx from "clsx"
import ReactPaginate from "react-paginate"
import PropTypes from "prop-types"
import { useMediaQuery } from "react-responsive"

import Icon from "components/ui/Icon"

import styles from "./pagination.module.scss"

const Pagination = ({ count, value = 1, onChange, className, ...props }) => {
  const isDesktop = useMediaQuery({ minWidth: 750 })

  const preChange = (event) => {
    window.scrollTo(0, 0)
    onChange && onChange(event.selected + 1)
  }

  if (count <= 1) return null

  className = clsx(styles.container, className)

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={<Icon slug="arrow-right" className={styles.icon} />}
      onPageChange={preChange}
      pageRangeDisplayed={isDesktop ? 5 : 1}
      marginPagesDisplayed={1}
      pageCount={count}
      previousLabel={<Icon slug="arrow-right" className={styles.icon} />}
      containerClassName={className}
      forcePage={value - 1}
      pageClassName={styles.page}
      pageLinkClassName={styles.link}
      activeLinkClassName={styles.active}
      nextLinkClassName={styles.next}
      previousLinkClassName={styles.prev}
      disabledLinkClassName={styles.disabled}
      {...props}
    />
  )
}

Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  value: PropTypes.number,
  onChange: PropTypes.func,
  className: PropTypes.string,
}

export default Pagination
