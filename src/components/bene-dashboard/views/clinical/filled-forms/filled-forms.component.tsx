import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { toggle } from 'kremling'
import { Label, Text } from '@airtable/blocks/ui'
import airtableFetch from '../../../../../resources/airtableFetch'
import styles from './filled-forms.component.css'
import ExpandIcon from '../../../../../assets/img/icons/arrows-diagonals-bltr.svg'
import Modal from '../../../../utils/modals/modal.component'

const FilledForms = () => {
  const [filledForms, setFilledForms] = useState<any[]>([])
  const [isHovering, setIsHovering] = useState<number>()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [openForm, setOpenForm] = useState<any>()
  const { recId } = useParams()

  useEffect(() => {
    const hifPromise = airtableFetch(
      `hif/list/0?view=HN Dashboard&filterByFormula=FIND("${recId}", {Member Record ID})`
    ).then((res) => {
      const result = Object.keys(res).map((key) => res[key])[0]
      return result
    })

    const baselinePromise = airtableFetch(
      `baseline/list/0?view=HN Dashboard&filterByFormula=FIND("${recId}", {Member Record ID})`
    ).then((res) => {
      const result = Object.keys(res).map((key) => res[key])[0]
      return result
    })

    Promise.all([baselinePromise, hifPromise]).then((response) => {
      if (response.every((form) => form === undefined)) {
        setFilledForms([])
      } else {
        setFilledForms([
          { name: 'Baseline', form: response[0] },
          { name: 'HIF', form: response[1] },
        ])
      }
    })
  }, [recId])
  return (
    <div>
      <h4>Filled forms</h4>
      {filledForms.length ? (
        filledForms.map((form, i) => {
          return (
            <button
              style={{ margin: '8px 0', width: '100%', textAlign: 'start' }}
              className="btn-unstyled"
              onClick={() => {
                setOpenForm(form)
                setModalOpen(true)
              }}
              key={form.name}
              onMouseEnter={() => setIsHovering(i)}
            >
              <div className={styles.meta}>
                <p className="text-tiny">
                  Last Updated:{' '}
                  {dayjs(form.form.last_updated).format("DD MMM 'YY,h:mmA")}
                </p>
              </div>
              <div className={styles.notes}>
                <div
                  style={{ width: '12px', marginRight: '6px' }}
                  className={toggle(
                    styles.showIcon,
                    styles.hideIcon,
                    isHovering === i
                  )}
                >
                  <ExpandIcon />
                </div>
                <div>
                  <p className="text-normal">{form.name}</p>
                </div>
              </div>
            </button>
          )
        })
      ) : (
        <div className={styles.notes}>
          <p className="text-normal">No HIF/Baseline filled</p>
        </div>
      )}
      {modalOpen && (
        <Modal
          open={modalOpen}
          setModalOpen={setModalOpen}
          heading={`${openForm.name} on ${dayjs(openForm.created_on).format(
            'DD MMM YY'
          )}`}
        >
          {Object.keys(openForm.form).map((info, i) => {
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
                  {openForm.form[info]}
                </Text>
              </div>
            )
          })}
        </Modal>
      )}
    </div>
  )
}

export default FilledForms
