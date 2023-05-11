import React from 'react'
import styles from './skeleton-loader.component.css'

type ListSkeletonLoaderProps = {
  count?: number
}

function Loading() {
  return (
    <div className={styles.card}>
      <div className={`${styles.cardTitle} ${styles.loading}`} />
      <div className={`${styles.cardDescription} ${styles.loading}`} />
    </div>
  )
}

function ListSkeletonLoader({ count = 2 }: ListSkeletonLoaderProps) {
  return (
    <div className="full-width">
      {[...Array(count).keys()].map((comp) => (
        <Loading key={comp} />
      ))}
    </div>
  )
}

export default ListSkeletonLoader
