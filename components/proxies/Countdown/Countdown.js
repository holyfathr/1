import { useCallback } from "react"
import ReactCountdown, { zeroPad } from "react-countdown"

const Countdown = ({ date, children, ...props }) => {
  const renderer = useCallback(
    ({ minutes, seconds, completed }) => {
      const remaining = zeroPad(minutes) + ":" + zeroPad(seconds)
      return children({ completed, remaining })
    },
    [children]
  )

  return <ReactCountdown renderer={renderer} date={date} key={date} {...props} />
}

export default Countdown
