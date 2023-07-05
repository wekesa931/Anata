import React from 'react'
import { Skeleton, Stack } from '@mui/material'

function RowSkeleton({ count = 1 }: { count: number }) {
  return (
    <Stack direction="row" spacing={1}>
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <div key={i}>
            <Skeleton variant="text" width={60} height={30} />
            <Skeleton variant="text" width={100} height={30} />
          </div>
        ))}
    </Stack>
  )
}

function SingleSkeleton() {
  return (
    <>
      <Skeleton variant="text" width={100} height={30} />
      <Skeleton variant="text" width="100%" height={30} />
    </>
  )
}

export function TitleSkeleton() {
  return (
    <Stack direction="row" spacing={1}>
      <Skeleton variant="text" width={200} height={40} />
      <Skeleton variant="circular" width={40} height={40} />
    </Stack>
  )
}

export function SummarySkeleton() {
  return (
    <Stack spacing={1}>
      <RowSkeleton count={3} />
      <RowSkeleton count={2} />
    </Stack>
  )
}

export function ContactsSkeleton() {
  return (
    <Stack spacing={1}>
      <RowSkeleton count={2} />
      <SingleSkeleton />
      <SingleSkeleton />
      <SingleSkeleton />
    </Stack>
  )
}

export function StatusSkeleon() {
  return (
    <Stack spacing={1}>
      <RowSkeleton count={2} />
      <RowSkeleton count={2} />
      <SingleSkeleton />
      <RowSkeleton count={3} />
    </Stack>
  )
}

export function BlockSekeleton({ height = 100 }: { height?: number }) {
  return <Skeleton variant="text" width="100%" height={height} />
}

export function BiodataSkeleton() {
  return (
    <div>
      <TitleSkeleton />
      <SummarySkeleton />
      <ContactsSkeleton />
      <StatusSkeleon />
      <BlockSekeleton height={300} />
      <BlockSekeleton height={300} />
    </div>
  )
}
