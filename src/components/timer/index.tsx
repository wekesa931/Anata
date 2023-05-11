import * as React from 'react'

interface IProps {
  initialTime: number
}
function Timer({ initialTime }: IProps) {
  const [seconds, setSeconds] = React.useState(Math.abs(initialTime))

  const secondsToTime = (secs: number) => {
    const hours = Math.floor(secs / (60 * 60))

    const divisor_for_minutes = secs % (60 * 60)
    const minutes = Math.floor(divisor_for_minutes / 60)

    const divisor_for_seconds = divisor_for_minutes % 60
    const tmeSeconds = Math.ceil(divisor_for_seconds)

    const obj = {
      h: hours,
      m: minutes,
      s: tmeSeconds,
    }
    return obj
  }

  React.useEffect(() => {
    const timer = window.setInterval(() => {
      setSeconds((prevTime) => prevTime + 1)
    }, 1000)
    return () => {
      window.clearInterval(timer)
    }
  }, [])

  return (
    <div className="count-up-timer">
      {secondsToTime(seconds).h < 10 && 0}
      {secondsToTime(seconds).h} : {secondsToTime(seconds).m < 10 && 0}
      {secondsToTime(seconds).m} : {secondsToTime(seconds).s < 10 && 0}
      {secondsToTime(seconds).s}
    </div>
  )
}

export default Timer
