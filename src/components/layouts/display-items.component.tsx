import { Button, Divider } from '@mui/material'
import React from 'react'

export function ItemTitle({ title }: { title: string }) {
  return (
    <h3 className="text-dark-blue-50 font-rubik text-xs font-medium uppercase ">
      {title}
    </h3>
  )
}

export function ItemChild({
  child,
  className,
}: {
  child?: string | React.ReactNode
  className?: string
}) {
  return (
    <p
      className={`text-dark-blue-100 font-rubik text-base font-normal ${className}`}
    >
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
  className?: string
}

export function GridItems({
  children,
  fullCols = false,
  single = false,
  className,
}: GridItemsProps) {
  return (
    <div
      className={`grid mb-3 ${
        fullCols ? 'grid-cols-3' : single ? 'grid-cols-1' : 'grid-cols-2'
      } ${className || ''}`}
    >
      {children}
    </div>
  )
}

type SectionProps = {
  children: React.ReactNode
  editable?: boolean
  handleEdit?: () => void
  title?: string
}

export function SectionItem({
  children,
  editable = false,
  handleEdit,
  title,
}: SectionProps) {
  return (
    <div className="w-full py-2">
      {editable && (
        <div className="flex justify-between items-center mr-1 font-rubik mb-2">
          <h3 className="text-dark-blue-50 text-base">{title}</h3>
          <Button
            variant="text"
            onClick={handleEdit}
            className="text-blue-100 text-sm font-medium normal-case"
          >
            Edit
          </Button>
        </div>
      )}
      {children}
      <Divider className="my-2" />
    </div>
  )
}
