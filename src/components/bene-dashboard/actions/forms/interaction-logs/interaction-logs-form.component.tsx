/* eslint-disable no-param-reassign */
import React, { useState } from 'react'
import { ErrorMessage, Formik, FormikHelpers } from 'formik'
import { useMutation } from '@apollo/client'
import parse from 'html-react-parser'
import dayjs from 'dayjs'
import Bugsnag from '@bugsnag/js'
import Button from '@mui/material/Button'
import { useMember } from '../../../../../context/member.context'
import { useUser } from '../../../../../context/user-context'
import FormField from '../../../../utils/form-field/form-field.component'
import Toasts from '../../../../../helpers/toast'
import InteractionLogsValidationSchema from './interaction-logs-validation-schema'
import useInteractionFormFields from './interaction-logs.fields'
import { CREATE_INTERACTION } from '../../../../../gql/interactions'
import styles from './interaction-logs-form.component.css'
import analytics from '../../../../../helpers/segment'
import logError from '../../../../utils/Bugsnag/Bugsnag'

type IProps = {
  name: string
  onFormClose: (name: string) => void
}

const InteractionLogsForm = ({ name, onFormClose }: IProps) => {
  const { member } = useMember()
  const memberEmail = member['Email 1'] || 'navigation@antarahealth.com'
  const user = useUser()
  const [startTime, setStartTime] = useState(dayjs())
  const fields = useInteractionFormFields(member, user)
  const [createInteraction] = useMutation(CREATE_INTERACTION)
  const initialValues = {
    ...fields.reduce(
      (acc, field) => ({ ...acc, [field.name]: field.value }),
      {}
    ),
    outcomeMetadata: {
      creator: user && user.email,
    },
  }
  React.useEffect(() => {
    analytics.track('Interaction Log Form Opened', {
      member: member['Antara ID'],
    })
  }, [member])

  const openCalendar = (link: string) => {
    const newWindow = window.open(link, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  const generateCalendlyLink = (label: string, values: any) => {
    let urlString = ''
    const urlName = member['Full Name'].replaceAll(' ', '%20')
    let calendlyComponent = null
    switch (label) {
      case 'Reasons for Consultation':
        if (values.outcomeMetadata.reasonForConsultation) {
          const reasonUrl =
            values.outcomeMetadata.reasonForConsultation.replaceAll(' ', '%20')
          urlString = `https://calendly.com/antara-health/antara-virtual-doctor-consultation?name=${urlName}&email=${memberEmail}&a1=${member['Phone 1']}&a2=${reasonUrl}`
          calendlyComponent = (
            <Button
              variant="outlined"
              className={styles.helperText}
              onClick={() => openCalendar(urlString)}
            >
              Book VC appointment
            </Button>
          )
        }
        break
      case 'Notes for MHC':
        if (values.mhcReferralReasons) {
          const reasonUrl = values.mhcReferralReasons.replaceAll(' ', '%20')
          const mhcNotes =
            values.mhcReferralNotes &&
            values.mhcReferralNotes.replaceAll(' ', '%20')
          urlString = `https://calendly.com/antara-health/mental-health-consultation?name=${urlName}&email=${memberEmail}&a1=${member['Phone 1']}&a2=${reasonUrl}&a3=${mhcNotes}`
          calendlyComponent = (
            <Button
              variant="outlined"
              className={styles.helperText}
              onClick={() => openCalendar(urlString)}
            >
              Book MHC appointment
            </Button>
          )
        }
        break
      case 'Notes for Nutritional Consultation':
        if (values.ncReferralReasons) {
          const reasonUrl = values.ncReferralReasons.replaceAll(' ', '%20')
          const ncReferralNotes =
            values.ncReferralNotes &&
            values.ncReferralNotes.replaceAll(' ', '%20')
          urlString = `https://calendly.com/antara-health/nutrition-consultation?name=${urlName}&email=${memberEmail}&a1=${member['Phone 1']}&a2=${reasonUrl}&a3=${ncReferralNotes}`
          calendlyComponent = (
            <Button
              variant="outlined"
              className={styles.helperText}
              onClick={() => openCalendar(urlString)}
            >
              Book NC appointment
            </Button>
          )
        }
        break
      case 'Notes for Physio Consultation':
        if (values.pcReferralReasons) {
          const reasonUrl = values.pcReferralReasons.replaceAll(' ', '%20')
          const pcReferralNotes =
            values.pcReferralNotes &&
            values.pcReferralNotes.replaceAll(' ', '%20')
          urlString = `https://calendly.com/antara-health/physiotherapy-consultation?name=${urlName}&email=${memberEmail}&a1=${member['Phone 1']}&a2=${reasonUrl}&a3=${pcReferralNotes}`
          calendlyComponent = (
            <Button
              variant="outlined"
              className={styles.helperText}
              onClick={() => openCalendar(urlString)}
            >
              Book PC appointment
            </Button>
          )
        }
        break
      default:
        calendlyComponent = <></>
    }
    return calendlyComponent
  }
  const extractUsername = (email: string) => {
    return email.replace(/@.*$/, '')
  }

  const onSubmit = (values: any, { setSubmitting }: FormikHelpers<any>) => {
    Object.keys(values).forEach((key) => {
      if (key.includes('[')) {
        delete values[key]
      }
    })
    const input = {
      ...values,
      member: member['Antara ID'],
      interactionStartedAt: dayjs(values.interactionStartedAt).toISOString(),
      historyUserIdField: user && user.email,
      healthNavigator:
        values.healthNavigator && extractUsername(values.healthNavigator),
    }
    createInteraction({
      variables: {
        input,
      },
    })
      .catch((e) => {
        Toasts.showErrorNotification()
        logError(e)
      })
      .then((response) => {
        setSubmitting(false)
        if (
          response &&
          response.data &&
          response.data.createInteraction.status === 200
        ) {
          analytics.track('Interaction Log Submitted', {
            ...values,
            member: member['Antara ID'],
            historyUserIdField: user && user.email,
            healthNavigator:
              values.healthNavigator && extractUsername(values.healthNavigator),
          })
          analytics.track('Interaction Log Time To Submit (mins)', {
            timeTaken: dayjs().diff(startTime, 'minute'),
          })
          setStartTime(dayjs())
          Toasts.showSuccessNotification()
          onFormClose(name)
        } else {
          Toasts.showErrorNotification()
          Bugsnag.notify(
            (response &&
              response.errors &&
              new Error(response.errors.join(','))) ||
              new Error('Interaction Log Submit Failure')
          )
        }
      })
  }

  React.useEffect(() => {
    document.title = `Scribe: ${member?.['Full Name']} Interaction Log Form`
  }, [member])

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formName}>Interaction Logs Form</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={InteractionLogsValidationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, values, isSubmitting }) => (
          <form onSubmit={handleSubmit} className={styles.form}>
            {fields.map(
              (field) =>
                (!field.condition || field.condition(values)) && (
                  <div className="margin-bottom-16" key={field.name}>
                    <label htmlFor={field.name} id={`${field.name}Label`}>
                      {field.label} <span className="text-danger">*</span>
                    </label>
                    {field.helperText && (
                      <div className={styles.helperText}>
                        {parse(field.helperText)}
                      </div>
                    )}
                    <FormField
                      {...field}
                      disabled={field.disabled ? field.disabled : false}
                    />
                    <p className="text-small text-danger">
                      <ErrorMessage name={field.name} />
                    </p>
                    {(field.label === 'Notes for MHC' ||
                      field.label === 'Reasons for Consultation' ||
                      field.label === 'Notes for Physio Consultation' ||
                      field.label === 'Notes for Nutritional Consultation') &&
                      generateCalendlyLink(field.label, values)}
                  </div>
                )
            )}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default InteractionLogsForm
