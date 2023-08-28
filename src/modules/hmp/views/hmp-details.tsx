import React from 'react'
import useHmpData from 'src/modules/hmp/hooks/hmp-data'
import {
  GridItems,
  Item,
  ItemTitle,
} from 'src/components/layouts/display-items.component'
import { BlockSekeleton } from 'src/modules/member/components/skeleton-loaders'
import { useModuleAnalytics } from 'src/modules/analytics'
import { HMP } from '../db/models'

function HMPItem({ hmp }: { hmp: HMP }) {
  const { trackHmpPreviewed } = useModuleAnalytics()
  return (
    <div className="block border rounded-lg border-solid border-dark-blue-10 my-1 p-1">
      <div className="flex justify-between items-center">
        <h4 className="font-medium uppercase text-dark-blue-100 font-rubik">
          HMP {hmp.hmpNumber}{' '}
        </h4>
        {hmp.hmpLink && (
          <a
            target="_blank"
            className="text-blue-100 mr-2 font-rubik normal-case justify-end"
            rel="noreferrer"
            onClick={() => {
              // eslint-disable-next-line no-underscore-dangle
              trackHmpPreviewed(hmp._raw)
            }}
            href={hmp.hmpLink}
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
      <ItemTitle title="HMPs" />
      {loading ? (
        <BlockSekeleton height={100} />
      ) : (
        <div className="mt-2">
          {memberHmps?.length > 0 ? (
            <>
              {memberHmps.map((hmp: HMP, index: number) => (
                <HMPItem hmp={hmp} key={index} />
              ))}
            </>
          ) : (
            <p className="font-rubik text-base text-grey-main font-medium mb-4">
              No HMP available
            </p>
          )}
        </div>
      )}
    </>
  )
}

export default HMPListItem
