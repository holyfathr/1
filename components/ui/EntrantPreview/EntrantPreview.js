import clsx from "clsx"
import { useMemo, useState, useEffect, useRef } from "react"

import useLinkIsActive from "hooks/use-link-is-active"

import { formatNameShort } from "helpers/language"

import styles from "./entrant-preview.module.scss"
import Link from "next/link"

const EntrantPreview = ({ entrant, className, ...props }) => {

  const isProfile = useLinkIsActive("/profile/")
  const isPassword = useLinkIsActive("/change-password/")

  const [isListVisible, setListVisible] = useState(false);
  const listRef = useRef(null);

  const toggleListVisibility = () => {
    setListVisible(!isListVisible);
  };

  const handleClickOutside = (event) => {
    if (listRef.current && !listRef.current.contains(event.target)) {
      setListVisible(false);
    }
  };

  useEffect(() => {
    if (isListVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isListVisible]);

  const formattedName = useMemo(() => {
    return formatNameShort(entrant.name, entrant.surname, entrant.middle_name)
  }, [entrant])

  const changeProfile = clsx(styles.link, isProfile && styles.active, className)
  const changePassword = clsx(styles.link, isPassword && styles.active, className)

  return (  
    <span>
      <button className={styles.preview} {...props} onClick={toggleListVisibility}>
          <span className={styles.name}>{formattedName || "Профиль"}</span>
      </button>
      
      { isListVisible  && (
        <span className={styles.list} ref={listRef}>
          <Link href="/profile/" >
            <a className={changeProfile}> Изменить профиль </a>
          </Link>
          <Link href="/change-password/">
            <a className={changePassword}> Изменить пароль </a>
          </Link>
      </span>
      )}
    </span>
  )
}

export default EntrantPreview
