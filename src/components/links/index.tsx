import React from 'react'
import { Box, Divider } from '@mui/material'
import {
  pascalToTitle,
  getValueFromKey,
  extractLinksFromObject,
} from 'src/utils/data-table-utils'
import _ from 'lodash'

export function Links({ link, title }: any) {
  return (
    <>
      <a style={{ color: 'blue' }} target="_blank" href={link} rel="noreferrer">
        {title}
      </a>
    </>
  )
}

function CellValue({ data }: any) {
  return (
    <>
      {Object.keys(data).map((key, index) => (
        <div key={index} className="flex flex-col">
          <p className="text-dark-blue-100 text-sm font-rubik">
            {pascalToTitle(key)}
          </p>
          <p className="text-sm text-dark-blue-50 font-rubik break-words">
            {getValueFromKey(data, key)}
          </p>
        </div>
      ))}
    </>
  )
}

const isEmptyLinks = (link: any) => {
  return _.isEmpty(link)
}

export function Details({ data, urlkeys, title }: any) {
  const { links, info } = extractLinksFromObject(data, urlkeys)

  return (
    <>
      <Box sx={{ margin: 1 }} className="ww-full">
        <p className="text-dark-blue-100 font-bold text-base">
          More {title} details
        </p>
        <Divider className="my-2" />
        <div className="grid grid-cols-3 gap-4">
          <CellValue data={info} />
        </div>
        {!isEmptyLinks(links) ? (
          <div className="mt-2">
            <p>Links</p>
            <Divider className="my-2" />
            {Object.keys(links).map((key) => (
              <Links link={links?.[key]} title={key} />
            ))}
          </div>
        ) : null}
      </Box>
    </>
  )
}
