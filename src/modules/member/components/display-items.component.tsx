import { Divider } from '@mui/material'
import React from 'react'

export function ItemTitle({ title }: { title: string }) {
  return (
    <h3 className="text-dark-blue-50 font-rubik text-xs font-medium uppercase ">
      {title}
    </h3>
  )
}

export function ItemChild({ child }: { child?: string | React.ReactNode }) {
  return (
    <p className="text-dark-blue-100 font-rubik text-base font-normal">
      {child || '-'}
    </p>
  )
}

export function Item({
  title,
  child,
}: {
  title: string
  child?: string | React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-0">
      <ItemTitle title={title} />
      <ItemChild child={child} />
    </div>
  )
}

type GridItemsProps = {
  children: React.ReactNode
  fullCols?: boolean
  single?: boolean
}

export function GridItems({
  children,
  fullCols = false,
  single = false,
}: GridItemsProps) {
  return (
    <div
      className={`grid mb-3 ${
        fullCols ? 'grid-cols-3' : single ? 'grid-cols-1' : 'grid-cols-2'
      }`}
    >
      {children}
    </div>
  )
}

export function SectionItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full py-2">
      {children}
      <Divider className="my-2" />
    </div>
  )
}
