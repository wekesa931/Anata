import * as React from 'react'
import FORMS from 'src/modules/workflows/components/forms/form-inputs-definitions'
import Notification from 'src/components/notification'
import { formNames } from 'src/modules/workflows/utils'
import { useFormsRouting } from 'src/modules/workflows/hooks/routing/forms'
import { useModuleAnalytics } from 'src/modules/analytics'
import FormSearchIcon from 'src/assets/img/icons/form-search.svg'
import XIcon from 'src/assets/img/icons/x.svg'
import ClockIcon from 'src/assets/img/icons/clock.svg'

function CallConsoleForms({ height }: { height: string }) {
  const [filteredForms, setfilteredForms] = React.useState(FORMS)
  const [showError, setshowError] = React.useState(false)
  const [focused, setFocused] = React.useState(false)
  const [formName, setformName] = React.useState('')
  const { openForm } = useFormsRouting()
  const { trackOpenFormClicked } = useModuleAnalytics()

  React.useEffect(() => {
    if (formName) {
      const relevantForm = (FORMS as any[]).filter((fm) =>
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
            <FormSearchIcon className="w-4 h-4 text-white" />
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
            <XIcon className="w-4 h-4 text-white" />
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
              onClick={() => {
                openForm(form.name)
                trackOpenFormClicked(form.name)
              }}
              key={form.name}
            >
              {!formName && (
                <span>
                  <ClockIcon className="w-4 h-4 text-white" />
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
