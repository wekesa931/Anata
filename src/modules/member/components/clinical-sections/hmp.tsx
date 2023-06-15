import React from 'react'
import useHmpData from 'src/modules/member/hooks/hmp-data'
import {
  SectionItem,
  GridItems,
  Item,
} from 'src/modules/member/components/display-items.component'
import { HMPType } from 'src/modules/member/types'
import { BlockSekeleton } from 'src/modules/member/components/skeleton-loaders'

function HMPItem({ hmp }: { hmp: HMPType }) {
  return (
    <div className="block border rounded-lg border-solid border-dark-blue-10 my-1 p-1">
      <div className="flex justify-between items-center">
        <h4 className="font-medium uppercase text-dark-blue-100 font-rubik">
          HMP {hmp.hmpNumber}{' '}
        </h4>
        {hmp.hmpLink && (
          <a
            href={hmp.hmpLink}
            className="text-blue-100 mr-2 font-rubik normal-case justify-end"
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
  const { hmpInfo, loading } = useHmpData()
  return !loading ? (
    <SectionItem>
      <div>
        {hmpInfo?.length > 0 ? (
          <>
            {hmpInfo.map((info, index) => (
              <>
                <HMPItem hmp={info} key={index} />
              </>
            ))}
          </>
        ) : (
          <p className="font-rubik text-base text-grey-main font-medium">
            No HMP available
          </p>
        )}
      </div>
    </SectionItem>
  ) : (
    <BlockSekeleton />
  )
}

export default HMPListItem
