import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { toggle } from 'kremling'
import { useParams } from 'react-router-dom'
import { Label, Text } from '@airtable/blocks/ui'
import airtableFetch from '../../../../resources/airtableFetch'
import { useUser } from '../../../../context/user-context'
import ExpandIcon from '../../../../assets/img/icons/arrows-diagonals-bltr.svg'
import Modal from '../../../utils/modals/modal.component'
import styles from './interaction-logs.component.css'

const Interaction = ({ interaction }: any) => {
  const { encounter_datetime } = interaction
  const [isHovering, setIsHovering] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const showInteractionDetails = () => {
    setModalOpen(true)
  }

  return (
    <>
      <button
        style={{ margin: '8px 0', width: '100%', textAlign: 'start' }}
        className="btn-unstyled"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={showInteractionDetails}
      >
        <div className={styles.meta}>
          <p className="text-tiny">
            {dayjs(encounter_datetime).format("DD MMM 'YY, H:mm A")}
          </p>
          <p className="text-tiny">{interaction['HN Name']}</p>
        </div>
        <div className={styles.notes}>
          <div
            style={{ width: '12px', marginRight: '6px' }}
            className={toggle(styles.hideIcon, styles.showIcon, !isHovering)}
          >
            <ExpandIcon />
          </div>
          <div>
            <p className="text-normal">
              {interaction['Interaction Summary Notes']}
            </p>
          </div>
        </div>
      </button>
      <Modal
        open={modalOpen}
        setModalOpen={setModalOpen}
        heading={`Interaction on ${dayjs(encounter_datetime).format(
          'DD MMM YY, HH:mm A'
        )}`}
      >
        {Object.keys(interaction)
          .filter((key) => key !== 'encounter_datetime')
          .map((info, i) => {
            return (
              <div key={info} style={{ margin: '16px 0' }}>
                <Label htmlFor={`input${i}`}>{info}</Label>
                <Text
                  variant="paragraph"
                  id={`input${i}`}
                  border="1px solid whitesmoke"
                  backgroundColor="whitesmoke"
                  padding="8px"
                  borderRadius="4px"
                >
                  {interaction[info]}
                </Text>
              </div>
            )
          })}
      </Modal>
    </>
  )
}

const InteractionLogs = () => {
  const [interactions, setInteractions] = useState<any>()
  const user = useUser()
  const { recId } = useParams()
  useEffect(() => {
    if (user) {
      airtableFetch(
        `interactions/list/0?view=HN Dashboard&filterByFormula=SEARCH("${recId}", {Member Record ID})&fields[]=encounter_datetime&fields[]=Interactor Type&fields[]=Mode of Communication&fields[]=Interaction Summary Notes&fields[]=HN Name&fields[]=Member Name&fields[]=Antara ID&fields[]=Reporting Week`,
        user.tokenId
      ).then((res) => {
        setInteractions(res)
      })
    }
  }, [recId, user])
  return interactions ? (
    <div>
      <h4>Interaction Logs</h4>
      <div className="interactions">
        {Object.keys(interactions).length ? (
          Object.keys(interactions).map((key) => (
            <Interaction key={key} interaction={interactions[key]} />
          ))
        ) : (
          <div>
            <p className="text-normal" style={{ marginTop: '8px' }}>
              No interactions logs found
            </p>
          </div>
        )}
      </div>
    </div>
  ) : null
}

export default InteractionLogs
