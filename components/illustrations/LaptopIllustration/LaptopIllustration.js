import Image from "next/image"
import clsx from "clsx"
import { MouseParallaxContainer, MouseParallaxChild } from "react-parallax-mouse"

import styles from "./laptop-illustration.module.scss"

const LaptopIllustration = ({ className }) => {
  className = clsx(styles.wrapper, className)

  return (
    <div className={className}>
      <MouseParallaxContainer useWindowMouseEvents>
        <MouseParallaxChild
          factorX={0.03}
          factorY={0.05}
          className={styles.mediumWrapper}
        >
          <Balloon size="medium" />
        </MouseParallaxChild>

        <MouseParallaxChild
          factorX={0.01}
          factorY={0.025}
          className={styles.largeWrapper}
        >
          <Balloon size="large" />
        </MouseParallaxChild>

        <MouseParallaxChild factorX={0.06} factorY={0.1} className={styles.smallWrapper}>
          <Balloon size="small" />
        </MouseParallaxChild>

        <Image
          src="/images/illustrations/laptop.svg"
          width={500}
          height={488}
          alt=""
          priority
        />
      </MouseParallaxContainer>
    </div>
  )
}

const Balloon = ({ size }) => <div className={clsx(styles.balloon, styles[size])} />

export default LaptopIllustration
