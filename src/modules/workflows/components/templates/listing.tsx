import { Button } from '@mui/material'
import React, { useState } from 'react'
import DropDownComponent from 'src/components/dropdown'
import { useTemplatesData } from 'src/modules/workflows/hooks/templates-data'
import { useNotifications } from 'src/context/notifications'
import { Templates as TWorkflowTemplate } from 'src/modules/workflows/db/models'
import Loader from '../loaders'

function WorkflowTemplateList({ openWorkflow }: any) {
  const [open, setOpen] = useState<boolean>(false)
  const { templates, loading, createWorkflow, creatingWorkflow } =
    useTemplatesData()
  const [isCreating, setIsCreating] = useState<boolean>(false)
  const { notify } = useNotifications()

  const handleCreateWorkflow = (template: TWorkflowTemplate) => {
    setIsCreating(true)
    createWorkflow(template)
      .then((workflow) => {
        if (workflow) {
          setOpen(false)
          notify('Workflow created')
          openWorkflow(workflow)
        } else {
          notify('Error creating workflow')
        }
      })
      .catch(() => {
        notify('Error creating workflow')
      })
      .finally(() => {
        setIsCreating(false)
      })
  }

  const toggleOpen = () => {
    setOpen(!open)
  }

  return (
    <div>
      <h1 className="text-sm font-medium text-dark-blue-100">Workflows</h1>
      <p className="mb-2 text-xs text-dark-blue-50">
        Create a new workflow with custom set of forms
      </p>

      <div className="relative">
        <Button
          className="flex grow-0 pl-0 text-left font-rubik text-sm font-medium normal-case text-blue-100"
          onClick={toggleOpen}
        >
          Create new workflow
        </Button>
        <div className="absolute z-2000 min-w-200">
          {open && (
            <>
              <DropDownComponent isVisible={open} setvisibility={setOpen}>
                <div className="flex flex-col items-stretch justify-start overflow-scroll rounded-xl border border-solid border-white bg-white p-0 shadow-template">
                  {isCreating || creatingWorkflow ? (
                    <Loader message="Creating template" />
                  ) : (
                    <>
                      {loading ? (
                        <Loader message="Getting Template Options" />
                      ) : (
                        <>
                          {templates?.length ? (
                            <>
                              {templates.map((d: TWorkflowTemplate) => (
                                <Button
                                  id={d.id}
                                  className="justify-start text-left text-sm normal-case text-dark-blue-100"
                                  variant="text"
                                  onClick={() => {
                                    handleCreateWorkflow(d)
                                  }}
                                >
                                  {d.name}
                                </Button>
                              ))}
                            </>
                          ) : (
                            <>No templates loaded</>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              </DropDownComponent>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default WorkflowTemplateList
