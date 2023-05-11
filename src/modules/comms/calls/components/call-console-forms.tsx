import * as React from 'react'
import Icon from 'src/components/icon/svg-icon'
import FORMS from 'src/modules/workflows/components/forms/form-inputs-definitions'
import Notification from 'src/components/notification'
import { formNames } from 'src/modules/workflows/utils'
import { useFormsRouting } from 'src/modules/workflows/hooks/routing/forms'

function CallConsoleForms({ height }: { height: string }) {
  const [filteredForms, setfilteredForms] = React.useState(FORMS)
  const [showError, setshowError] = React.useState(false)
  const [focused, setFocused] = React.useState(false)
  const [formName, setformName] = React.useState('')
  const { openForm } = useFormsRouting()

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
              onClick={() => openForm(form.name)}
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
