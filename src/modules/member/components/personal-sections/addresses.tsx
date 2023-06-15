import React from 'react'
import { DbValueTypes } from 'src/modules/member/types'
import {
  SectionItem,
  Item,
  GridItems,
} from 'src/modules/member/components/display-items.component'
import EmptyBlock from 'src/modules/member/components/empty-block'
import { useMember } from 'src/context/member'
import { BlockSekeleton } from 'src/modules/member/components/skeleton-loaders'

function MapLink({
  placeId,
  residentialAddress,
}: {
  placeId?: string
  residentialAddress?: string
}) {
  if (!placeId || !residentialAddress) return <>-</>

  const encodedTitle = residentialAddress
    ? encodeURIComponent(residentialAddress)
    : ''
  const url = `https://www.google.com/maps/search/?api=1&query=${encodedTitle}&query_place_id=${placeId}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-100 font-medium normal-case "
    >
      Open in Maps
    </a>
  )
}

type ItemProps = {
  addressItem: DbValueTypes.AddressType
  label?: string
  deliveryInstructions?: string
}

function AddressItem({ addressItem, label, deliveryInstructions }: ItemProps) {
  return (
    <SectionItem>
      <GridItems single>
        <Item title={label || 'Home'} child={addressItem?.description} />
      </GridItems>
      <GridItems single>
        <Item
          title="Geolocation"
          child={
            <MapLink
              placeId={addressItem?.place_id}
              residentialAddress={addressItem?.description}
            />
          }
        />
      </GridItems>
      <GridItems>
        <Item title="County" child={addressItem?.residentialCounty} />
        <Item title="Town" child={addressItem?.residentialTown} />
      </GridItems>
      <GridItems single>
        <Item title="Delivery instructions" child={deliveryInstructions} />
      </GridItems>
    </SectionItem>
  )
}

function AddressesSection() {
  const { member } = useMember()

  const homeAddress = member?.homeAddress || null
  const restAddress = member?.otherAddresses || []

  return member ? (
    <>
      {!member.hasAddress ? (
        <SectionItem>
          <EmptyBlock>
            <h3 className="text-sm text-center">No addresses available</h3>
            <p className="text-xs text-center">
              Please collect information from member
            </p>
          </EmptyBlock>
        </SectionItem>
      ) : (
        <>
          {!!homeAddress && homeAddress?.address?.place_id && (
            <AddressItem
              addressItem={homeAddress?.address}
              label={homeAddress?.addressLabel}
              deliveryInstructions={homeAddress?.deliveryInstructions}
            />
          )}
          {restAddress?.map((address, index) => (
            <AddressItem
              key={index}
              addressItem={address?.address}
              label={address?.addressLabel}
              deliveryInstructions={address?.deliveryInstructions}
            />
          ))}
        </>
      )}
    </>
  ) : (
    <BlockSekeleton />
  )
}

export default AddressesSection
