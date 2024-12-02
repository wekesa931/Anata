import React, { createContext } from 'react'
import Wizard, { WizardStep } from 'src/components/wizard'

type LayoutContextType = {
  biodata: any
  contacts: any
  address: any
  insurance: any
  billing: any
}

const LayoutContext = createContext<LayoutContextType>({
  biodata: null,
  contacts: null,
  address: null,
  insurance: null,
  billing: null,
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function BiodataSection({ children }: any) {
  const { biodata } = React.useContext(LayoutContext)
  return <div>{biodata}</div>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ContactsSection({ children }: any) {
  const { contacts } = React.useContext(LayoutContext)
  return <div>{contacts}</div>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function AddressSection({ children }: any) {
  const { address } = React.useContext(LayoutContext)
  return <div>{address}</div>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function InsuranceSection({ children }: any) {
  const { insurance } = React.useContext(LayoutContext)
  return <div>{insurance}</div>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function BillingSection({ children }: any) {
  const { billing } = React.useContext(LayoutContext)
  return <div>{billing}</div>
}

type MemberRegistrationLayoutProps = {
  children: any
  title: string
  subtitle?: string
}

export function MemberRegistrationWizardLayout({
  children,
  title,
  subtitle,
}: MemberRegistrationLayoutProps) {
  const sections: LayoutContextType = React.Children.toArray(children).reduce(
    (acc: any, child: any) => {
      if (child.type === BiodataSection) {
        acc.biodata = child.props.children
      } else if (child.type === ContactsSection) {
        acc.contacts = child.props.children
      } else if (child.type === AddressSection) {
        acc.address = child.props.children
      } else if (child.type === InsuranceSection) {
        acc.insurance = child.props.children
      } else if (child.type === BillingSection) {
        acc.billing = child.props.children
      }
      return acc
    },
    {}
  )

  return (
    <LayoutContext.Provider value={sections}>
      <Wizard title={title} subtitle={subtitle}>
        <WizardStep label="Bio data">
          <BiodataSection>{sections.biodata}</BiodataSection>
        </WizardStep>
        <WizardStep label="Contact details">
          <ContactsSection>{sections.contacts}</ContactsSection>
        </WizardStep>
        <WizardStep label="Address">
          <AddressSection>{sections.address}</AddressSection>
        </WizardStep>
        <WizardStep label="Insurance & Employer">
          <InsuranceSection>{sections.insurance}</InsuranceSection>
        </WizardStep>
        <WizardStep label="Billing Scheme">
          <BillingSection>{sections.billing}</BillingSection>
        </WizardStep>
      </Wizard>
    </LayoutContext.Provider>
  )
}
