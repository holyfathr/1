import styles from "./count-label.module.scss"

const CountLabel = ({ count, children, ...props }) => (
  <p {...props}>
    <mark className={styles.mark}>{count}</mark> {children}
  </p>
)

export default CountLabel
