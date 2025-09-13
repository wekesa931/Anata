import React from 'react'
import { DbValueTypes } from 'src/modules/member/types'
import {
  SectionItem,
  Item,
  GridItems,
} from 'src/components/layouts/display-items.component'
import { BlockSekeleton } from 'src/modules/member/components/skeleton-loaders'
import { Button } from '@mui/material'
import { PortalForm } from 'src/modules/member/components/update-forms'
import { AddressesForm } from 'src/modules/member/components/forms/addresses-form'
import { useNotifications } from 'src/context/notifications'
import type { Member } from 'src/modules/member/db/models'
import { useMemberAnalytics } from 'src/modules/member/hooks/analytics'

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
    <SectionItem editable={false}>
      <GridItems single>
        <Item title={label || 'Home'} child={'Home Address'} />
      </GridItems>
      <GridItems single>
        <Item
          title="Geolocation"
          child={
            <MapLink
              placeId={'456'}
              residentialAddress={'Home Address'}
            />
          }
        />
      </GridItems>
      <GridItems>
        <Item title="County" child={'Nairobi'} />
        <Item title="Town" child={'Kasarani'} />
      </GridItems>
      <GridItems single>
        <Item title="Delivery instructions" child={''} />
      </GridItems>
    </SectionItem>
  )
}

type Props = {
  member: Member | null
}

function AddressesSection({ member }: Props) {
  const [showEditForm, setShowEditForm] = React.useState<boolean>(false)
  const [isEdited, setIsEdited] = React.useState<boolean>(false)

  const homeAddress = member?.homeAddress || null
  const restAddress = member?.otherAddresses || []
  const { notify } = useNotifications()
  const analytics = useMemberAnalytics()

  const toggleEditForm = (open: boolean) => {
    setShowEditForm(open)

    analytics.trackEditProfile(`Edit addresses ${open ? 'opened' : 'closed'}`)
  }

  return true ? (
    <>
      {showEditForm && (
        <PortalForm
          modalTitle="Edit addresses"
          handleClose={() => toggleEditForm(false)}
          handleOpen={() => toggleEditForm(true)}
          isEdited={isEdited}
          setIsEdited={setIsEdited}
        >
          {({ handleClose }) => (
            <AddressesForm
              member={member}
              showWizardControls={false}
              onPrev={handleClose}
              onNext={() => {
                notify('Addresses updated successfully')
                handleClose()
              }}
            />
          )}
        </PortalForm>
      )}
      {true && (
        <div className="flex justify-between items-center mr-1 font-rubik mb-2">
          <h3 className="text-dark-blue-50 text-base">Addresses</h3>
          <Button
            variant="text"
            onClick={() => toggleEditForm(true)}
            className="text-blue-100 text-sm font-medium normal-case"
          >
            Edit
          </Button>
        </div>
      )}
      {false ? (
        <SectionItem>
          <div className="h-16 bg-red-20 mx-1 py-2 rounded-lg font-rubik text-dark-blue-100 w-full">
            <h3 className="text-sm text-center">No addresses available</h3>
            <p className="text-xs text-center">
              Please collect information from member
            </p>
          </div>
        </SectionItem>
      ) : (
        <>
          {true && (
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
