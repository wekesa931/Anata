import * as React from 'react'
import Icon from '../../../utils/icon/icon.component'
import { useAuth } from '../../../../context/auth-context'
import FORMS from '../forms/forms'
import airtableFetch from '../../../../resources/airtable-fetch'
import Notification from '../../../utils/notification/notification.component'
import { useFormPortal } from '../../../../context/forms-context'
import { useCall } from '../../../../context/calls-context'
import { formNames } from '../workflows/Forms/form-fields'

const CallConsoleForms = ({ height }: { height: string }) => {
  const { memberData } = useCall()
  const { addOpenForm, openedForms } = useFormPortal()
  const [hn, setHN] = React.useState<any>({})
  const { user } = useAuth()
  const [filteredForms, setfilteredForms] = React.useState(FORMS)
  const [showError, setshowError] = React.useState(false)
  const [focused, setFocused] = React.useState(false)
  const [formName, setformName] = React.useState('')

  React.useEffect(() => {
    if (user && user.email) {
      airtableFetch(
        `team/list?filterByFormula=FIND("${user.email}", {Email})`
      ).then((res) => {
        const currentHN = Object.keys(res).map((key: any) => res[key])
        if (currentHN.length) {
          setHN(currentHN[0])
        }
      })
    }
  }, [user])

  React.useEffect(() => {
    if (formName) {
      const relevantForm = FORMS.filter((fm) =>
        fm.name.toLocaleLowerCase().includes(formName.toLocaleLowerCase())
      )
      if (relevantForm && relevantForm.length > 0) {
        setfilteredForms(relevantForm)
        setshowError(false)
      } else {
        setshowError(true)
      }
    } else {
      setfilteredForms(FORMS)
      setshowError(false)
    }
  }, [formName])

  const closeFilter = () => {
    setFocused(false)
    setfilteredForms(FORMS)
    setshowError(false)
    setformName('')
  }

  return (
    <div className={height}>
      <div
        style={{ borderBottom: focused ? '2px solid #e8eaed' : 'none' }}
        className="d-flex flex-between align-center call-forms"
      >
        <div className="d-flex align-center full-width">
          <span className="task-form-list">
            <Icon name="form-search" fill="#ffffff" width={18} height={19} />
          </span>

          <input
            placeholder="Search form..."
            type="text"
            value={formName}
            onChange={(e) => setformName(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={closeFilter}
          />
        </div>
        {focused && (
          <span
            role="button"
            tabIndex={0}
            className="pointer"
            onClick={closeFilter}
            onKeyDown={closeFilter}
          >
            <Icon name="x" fill="#ffffff" width={18} height={19} />
          </span>
        )}
      </div>
      {showError ? (
        <Notification title="Warning" message="No form with that name exists" />
      ) : (
        <div className="scroll call-forms-list">
          {filteredForms.map((form) => (
            <button
              // @ts-ignore
              onClick={() =>
                addOpenForm(
                  [...openedForms, { ...form, member: memberData }],
                  hn
                )
              }
              key={form.name}
            >
              {!formName && (
                <span>
                  <Icon name="clock" fill="#ffffff" width={16} height={16} />
                </span>
              )}
              <p>{formNames[form.name]}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default CallConsoleForms
