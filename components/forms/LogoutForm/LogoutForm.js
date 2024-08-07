import Button from "components/ui/Button"

import styles from "./logout-form.module.scss"

const LogoutForm = ({ onSubmit, ...props }) => {
  return (
    <Button className={styles.submit} onClick={onSubmit} {...props}>
      Выйти
    </Button>
  )
}

export default LogoutForm
