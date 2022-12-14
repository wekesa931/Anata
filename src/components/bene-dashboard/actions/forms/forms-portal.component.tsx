import React, { useState } from 'react'
import { ArrowRight } from 'react-feather'

import styles from './form.component.css'
import WorkflowPortal from '../workflows/workflow-portal.component'
import { formNames } from '../workflows/Forms/form-fields'
import { WorkflowMeta } from '../workflows/workflow-types'

import PortalWindow from '../../../lib/portal/portal.component'
import { useMember } from '../../../../context/member.context'

type IForm = {
  name: string
  url?: string
  url_sandbox?: string
  airtableUrl?: boolean
  hnField?: string
  workflowId?: string
}

type HN = {
  'Record ID': string
}

type FormProps = {
  openedForms: IForm[]
  form: IForm
  hn?: HN
  onFormClose: (pointer: any, isWorkflow: boolean) => void
  onRefetch: (refetch: boolean) => void
  addOpenForm: (openForm: WorkflowMeta) => void
  airtableMeta: any
  formNum: number
  memberDetails: any
}

function FormPortal({
  form,
  openedForms,
  airtableMeta,
  formNum,
  addOpenForm,
  onFormClose,
  onRefetch,
}: FormProps) {
  const [isFormEdited, setIsFormEdited] = useState(false)
  const isWorkflow = !!form.workflowId
  const { primaryMemberHif } = useMember()
  const handleFormCloseEvent = () => {
    if (isWorkflow) {
      onFormClose(form.workflowId, true)
    } else {
      onFormClose(form.name, false)
    }
  }

  function Title() {
    return (
      <div className={styles.formTitle}>
        {isWorkflow ? (
          <span className="d-flex align-center">
            <span>Workflow</span>
            <ArrowRight width={15} height={15} />
            <span>{form.workflowId}</span>
          </span>
        ) : (
          formNames[form.name] || form.name
        )}
      </div>
    )
  }

  return (
    <PortalWindow
      title={<Title />}
      width={50}
      index={formNum}
      closeWindow={() => handleFormCloseEvent()}
      isEdited={isFormEdited}
      setIsEdited={setIsFormEdited}
    >
      <WorkflowPortal
        primaryMemberHif={primaryMemberHif}
        isFormEdited={isFormEdited}
        setIsFormEdited={setIsFormEdited}
        openedForms={openedForms}
        workflow={form}
        addOpenForm={addOpenForm}
        airtableMeta={airtableMeta}
        onRefetch={onRefetch}
        onFormClose={onFormClose}
      />
    </PortalWindow>
  )
}

export default FormPortal
