import { Children, cloneElement, useEffect, useRef, useState } from "react"
import clsx from "clsx"
import PropTypes from "prop-types"

import styles from "./overlapping-cards.module.scss"

const OverlappingCards = ({
  className,
  threshold = 0.5,
  scale = 0.9,
  children,
  ...props
}) => {
  const [breakpoints, _setBreakpoints] = useState([])
  const thresholdWindow = useRef()
  const containerRef = useRef()

  // Make current breakpoints accessible in event listener
  const breakpointsRef = useRef(breakpoints)
  const setBreakpoints = (data) => {
    breakpointsRef.current = data
    _setBreakpoints(data)
  }

  /**
   * Change the value of `breakpoints[index]`
   * @param {boolean} value - value to change to
   * @param {number} index - index of `breakpoints` array
   */
  const toggleBreakpoint = (value, index) => {
    const newBreakpoints = [...breakpointsRef.current]
    newBreakpoints[index] = value
    setBreakpoints(newBreakpoints)
  }

  useEffect(() => {
    // React.StrictMode renders components twice in dev mode which causes adding extra elements to the breakpoints array.
    // Reset the array to get rid of this effect
    setBreakpoints([])

    const container = containerRef.current
    const cards = [...container.children]

    // Set opened cards and cards scrolled by (true - opened/scrolled by).
    for (let i = 0; i < cards.length; i++) {
      // First card is always opened. If the card is scrolled by, it is also opened
      const isCardOpen = i === 0 || window.scrollY >= cards[i].offsetTop
      setBreakpoints([...breakpointsRef.current, isCardOpen])
    }

    const getCardOffsetTop = (card) =>
      card.offsetTop + (card.offsetHeight - card.offsetHeight * scale) / 2

    const handleScroll = () => {
      // Window is not accessible on server side in Next.js so the component needs to know what part of viewport is threshold only
      // Recalculate the value of ref in case if window height changes (landscape or portrait mode on mobile devices)
      thresholdWindow.current = window.innerHeight * threshold

      cards.forEach((card, i) => {
        if (i + 1 < cards.length) {
          const hasScrolledBelow =
            window.scrollY >= getCardOffsetTop(cards[i + 1]) - thresholdWindow.current &&
            !breakpointsRef.current[i + 1]
          const hasScrolledAbove =
            window.scrollY < getCardOffsetTop(cards[i + 1]) - thresholdWindow.current &&
            breakpointsRef.current[i + 1]
          const hasCompletedScroll =
            card.offsetTop + card.offsetHeight <= window.scrollY + window.innerHeight

          if (hasScrolledBelow) {
            toggleBreakpoint(true, i + 1)
          } else if (hasScrolledAbove) {
            toggleBreakpoint(false, i + 1)
          }

          if (hasCompletedScroll) {
            card.style.position = "sticky"
            card.style.top = `${window.innerHeight - card.offsetHeight}px`
          } else {
            card.style.position = undefined
            card.style.top = undefined
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  className = clsx(className, styles.container)

  return (
    <div className={className} ref={containerRef} {...props}>
      {Children.map(children, (child, i) =>
        cloneElement(child, {
          style: {
            zIndex: i || undefined,
            transform: i !== 0 ? `scale(${!breakpoints[i] ? scale : 1})` : undefined,
          },
        })
      )}
    </div>
  )
}

const Card = ({ className, children, ...props }) => {
  className = clsx(className, styles.card)

  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

OverlappingCards.Card = Card

OverlappingCards.propTypes = {
  /**
   * Amount of pixels required for the card to be scrolled before it is opened.
   * Calculated in window.innerHeight's (`window.innerHeight * threshold`).
   */
  threshold: PropTypes.number,
  /**
   * Amount of times closed cards are scaled to.
   */
  scale: PropTypes.number,
}

export default OverlappingCards
