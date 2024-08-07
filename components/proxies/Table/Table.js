import ReactTable from "rc-table"
import clsx from "clsx"

import styles from "./table.module.scss"

const Table = ({ className, ...props }) => {
  className = clsx(styles.table, className)

  return <ReactTable className={className} emptyText="Нет данных" {...props} />
}

export default Table
