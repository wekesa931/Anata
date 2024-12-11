import React, { useState } from 'react'
import { DocMeta } from 'src/modules/udm/types'
import ClaimModalView from 'src/modules/claimForms/Components/claim-modal'

type Props = {
  closeModal: () => void
  getDocMeta: (date?: Date | string) => DocMeta
}

function ClaimComponent({ closeModal }: Props) {
  const [modalOpen, setModalOpen] = useState(true)
  const closeClaimModal = () => {
    closeModal()
  }

  return (
    <>
      <ClaimModalView
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        closeClaimModal={closeClaimModal}
      />
    </>
  )
}

export default ClaimComponent
