import React, { useState } from 'react'
import { ClickAwayListener, IconButton, Popper } from '@mui/material'
import OpenInFullIcon from '@mui/icons-material/OpenInFull'
import CloseIcon from '@mui/icons-material/Close'
import NotesIcon from '@mui/icons-material/Notes'
import DOMPurify from 'dompurify'
import './style.css'

type Props = {
  value: string
  title: string
  extended?: boolean
  isHtml?: boolean
}

function HtmlStringRenderer({ htmlString }: { htmlString: string }) {
  const cleanHtmlString = DOMPurify.sanitize(htmlString)

  return (
    <div
      className="custom-html-content text-base"
      dangerouslySetInnerHTML={{ __html: cleanHtmlString }}
    />
  )
}

export function ExpandableText({
  value,
  title,
  extended = true,
  isHtml = false,
}: Props) {
  const [selected, setSelected] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const toggleShowDetails = (show: boolean) => () => {
    setShowDetails(show)
  }

  const closeDetails = () => {
    setAnchorEl(null)
    setSelected(false)
    setShowDetails(false)
  }

  const toggleSelectedStatus = (show: boolean) => {
    if (value?.length > 0) {
      setSelected(show)
    }
  }

  return (
    <ClickAwayListener onClickAway={closeDetails}>
      <>
        <div
          className={`${
            value?.length > 0 && 'cursor-pointer'
          } relative box-content p-2 max-h-[4rem] max-w-[200px] ${
            selected && ' outline outline-dark-blue-20 rounded-md '
          }`}
          onClick={(e: any) => {
            toggleSelectedStatus(!selected)
            setAnchorEl(e.currentTarget)
          }}
          role="presentation"
          onMouseEnter={(e: any) => {
            toggleSelectedStatus(true)
            setAnchorEl(e.currentTarget)
          }}
          onMouseLeave={() => setSelected(false)}
        >
          <p
            className={`font-rubik max-w-md max-h-[4rem] ${
              extended ? 'line-clamp-3' : 'line-clamp-1'
            }`}
          >
            {isHtml ? <HtmlStringRenderer htmlString={value} /> : value}
          </p>
          {selected && (
            <div className="absolute top-0 right-0">
              <IconButton
                className="text-dark-blue-50 h-5 w-5"
                onClick={toggleShowDetails(!showDetails)}
              >
                {showDetails ? (
                  <CloseIcon className="h-4 w-4" />
                ) : (
                  <OpenInFullIcon className="h-4 w-4" />
                )}
              </IconButton>
            </div>
          )}
        </div>
        <Popper
          open={showDetails}
          anchorEl={anchorEl}
          className="z-10"
          placement="top"
          onMouseEnter={() => setSelected(true)}
        >
          <ClickAwayListener onClickAway={closeDetails}>
            <div
              className="bg-white rounded-md p-6 max-w-2xl font-rubik shadow-md"
              onMouseEnter={() => toggleSelectedStatus(true)}
            >
              <div className="flex justify-between items-start flex-col gap-3 text-left relative">
                <IconButton className="absolute top-0 right-0 translate-x-full -translate-y-full bg-table-col-grey">
                  <CloseIcon className="h-6 w-6" onClick={closeDetails} />
                </IconButton>
                <p className="flex justify-start items-center gap-2 text-xl text-dark-blue-50">
                  <NotesIcon className="h-6 w-6" />
                  {title}
                </p>
                <p className="text-sm font-rubik break-all">
                  {isHtml ? <HtmlStringRenderer htmlString={value} /> : value}
                </p>
              </div>
            </div>
          </ClickAwayListener>
        </Popper>
      </>
    </ClickAwayListener>
  )
}
