import React from 'react'
import useHmpData from 'src/modules/hmp/hook/hmp-data'
import { GridItems, Item } from 'src/components/layouts/display-items.component'
import { BlockSekeleton } from 'src/modules/member/components/skeleton-loaders'
import { HMP } from '../db/models'

function HMPItem({ hmp }: { hmp: HMP }) {
  return (
    <div className="block border rounded-lg border-solid border-dark-blue-10 my-1 p-1">
      <div className="flex justify-between items-center">
        <h4 className="font-medium uppercase text-dark-blue-100 font-rubik">
          HMP {hmp.hmpNumber}{' '}
        </h4>
        {hmp.hmpLink && (
          <a
            href={hmp.hmpLink}
            target="_blank"
            className="text-blue-100 mr-2 font-rubik normal-case justify-end"
            rel="noreferrer"
          >
            Read
          </a>
        )}
      </div>
      <div>
        <GridItems>
          <Item title="Days In" child={hmp.hmpDay} />
          <Item title="State" child={hmp.hmpState} />
        </GridItems>
      </div>
      <div>
        <GridItems>
          <Item title="Sent Date" child={hmp.hmpSendDate} />
          <Item title="Last Review Date" child={hmp.hmpLastReviewDate} />
        </GridItems>
      </div>
    </div>
  )
}
function HMPListItem() {
  const { loading, memberHmps } = useHmpData()
  return (
    <>
      {loading ? (
        <BlockSekeleton height={300} />
      ) : (
        <div className="mt-2">
          {memberHmps?.length > 0 ? (
            <>
              {memberHmps.map((hmp: HMP, index: number) => (
                <HMPItem hmp={hmp} key={index} />
              ))}
            </>
          ) : (
            <p className="font-rubik text-base text-grey-main font-medium">
              No HMP available
            </p>
          )}
        </div>
      )}
    </>
  )
}

export default HMPListItem
