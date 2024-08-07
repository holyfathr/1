import { useEffect } from "react"
import { disablePageScroll, enablePageScroll } from "scroll-lock"

/**
 * Locks and unlocks body scroll based
 * on the provided condition.
 *
 * @param {boolean} locked - Whether body scroll is locked
 */
const useScrollLock = (locked = false) => {
  useEffect(() => {
    if (locked) disablePageScroll()
    else enablePageScroll()
  }, [locked])
}

export default useScrollLock
