import React from 'react'
import { always } from 'kremling'

import { useRouteMatch } from 'react-router-dom'
import forms from './forms'
import styles from './forms.component.css'
import AirtableIframe from '../utils/airtableIframe/airtableIframe.component'
import VectorIcon from '../../assets/img/vector/telemedicine.png'

type FormProps = {
  name: string
  url: string
  setFormActive: (formUrl: string) => void
  formActive: string
}

const Form = ({ name, url, formActive, setFormActive }: FormProps) => {
  return (
    <div className={styles.formBlock}>
      <button
        className={always(styles.formName).toggle(
          styles.formActive,
          styles.formInactive,
          url === formActive
        )}
        onClick={() => setFormActive(url)}
        type="button"
      >
        {name}
      </button>
      <p className={styles.formDescription}>
        This form&apos;s helpful description falls here. Kindly fill it in.
      </p>
      <div className={styles.divider} />
    </div>
  )
}

const Forms = () => {
  const [formActive, setFormActive] = React.useState<string>('')
  const [recId, setRecId] = React.useState<string>()

  const { params } = useRouteMatch<any>()
  if (params.recId && !recId) {
    setRecId(params.recId)
  }

  const prefillRecId = (_recId: string) => {
    return `&prefill_Member=${_recId}`
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.card} ${styles.utilityView}`}>
        <h1 className={styles.utilityViewTitle}>Forms</h1>
        {forms.map(({ name, url }) => (
          <Form
            url={`${url}${recId ? prefillRecId(recId) : null}`}
            name={name}
            key={url}
            setFormActive={setFormActive}
            formActive={formActive}
          />
        ))}
      </div>
      <div className={`${styles.card} ${styles.primaryView}`}>
        {formActive ? (
          <AirtableIframe src={formActive} />
        ) : (
          <FormsDefaultView />
        )}
      </div>
    </div>
  )
}

const FormsDefaultView = () => {
  return (
    <div className={styles.defaultViewContainer}>
      <img src={VectorIcon} alt="Health Navigator" width="291px" />
      <p className={styles.defaultViewPrimaryText}>
        Choose a form to get started.
      </p>
      <p className={styles.defaultViewSecondaryText}>
        There are so many to choose from.
      </p>
    </div>
  )
}

export default Forms
