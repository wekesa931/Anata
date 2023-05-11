import { Grid } from '@mui/material'
import React, { createContext } from 'react'
import { Alert, TAlertMessage } from 'src/components/alerts'
import { CircularLoader } from './loaders'

type LayoutContextType = {
  modules: any
  forms: any
  actions: any
}

const LayoutContext = createContext<LayoutContextType>({
  modules: null,
  forms: null,
  actions: null,
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ModulesSection({ children }: any) {
  const { modules } = React.useContext(LayoutContext)
  return <div>{modules}</div>
}

type FormsSectionProps = {
  children: any
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function FormsSection({ children }: FormsSectionProps) {
  const { forms } = React.useContext(LayoutContext)

  return <div>{forms}</div>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ActionsSection({ children }: any) {
  const { actions } = React.useContext(LayoutContext)
  return <div>{actions}</div>
}

type WorkflowFormsLayoutProps = {
  children: any
  isWorkflow: boolean
  loading: boolean
  alertMessage?: TAlertMessage | null
  hideAlert?: () => void
}

export function WorkflowFormsLayout({
  children,
  isWorkflow,
  loading,
  alertMessage,
  hideAlert,
}: WorkflowFormsLayoutProps) {
  const sections: LayoutContextType = React.Children.toArray(children).reduce(
    (acc: any, child: any) => {
      if (child.type === ModulesSection) {
        acc.modules = child.props.children
      } else if (child.type === FormsSection) {
        acc.forms = child.props.children
      } else if (child.type === ActionsSection) {
        acc.actions = child.props.children
      }
      return acc
    },
    { modules: null, forms: null, actions: null }
  )

  return (
    <LayoutContext.Provider value={sections}>
      <div className="h-[90%]">
        <Grid
          className="relative h-full overflow-hidden border-b border-solid border-b-dark-blue-10"
          container
          spacing={0}
        >
          {isWorkflow && (
            <Grid
              className="h-full overflow-scroll overflow-x-hidden border-r border-solid border-r-dark-blue-10"
              item
              xs={4}
            >
              {sections.modules}
            </Grid>
          )}

          <Grid
            className={`relative h-full overflow-scroll overflow-x-hidden ${
              isWorkflow ? 'py-0 px-2' : 'py-0 px-[30px]'
            }`}
            item
            xs={isWorkflow ? 8 : 12}
          >
            {loading && <CircularLoader />}

            {sections.forms}
          </Grid>
        </Grid>
        <div>
          {alertMessage && (
            <Alert {...alertMessage} hide={() => hideAlert && hideAlert()} />
          )}
        </div>
        <div
          className={`flex h-[10%]  ${
            isWorkflow ? 'justify-between' : 'justify-end'
          }`}
        >
          {sections.actions}
        </div>
      </div>
    </LayoutContext.Provider>
  )
}
