import React from 'react'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer'
import { Divider } from 'src/modules/udm/components/pdf-components/divider'
import type { Member } from 'src/modules/member/db/models'
import logoImage from '../../../../assets/img/logo/doc-logo.png'

type Props = {
  member: Member | null
  title: string
  children: React.ReactElement<any>
  extendedHeader?: boolean
  customHeader?: boolean
}

const headerStyles = StyleSheet.create({
  header: {
    width: '100%',
    marginBottom: 10,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 5,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: 700,
    textAlign: 'left',
    width: '100pt',
    paddingLeft: 10,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 500,
  },
})

const footerStyles = StyleSheet.create({
  footer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginTop: 50,
  },
  header: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: 'normal',
    textAlign: 'center',
  },
})

function CustomDocument({
  member,
  title,
  children,
  extendedHeader = true,
  customHeader = false,
}: Props) {
  return (
    <Document
      pageMode="fullScreen"
      creator="Scribe"
      producer="Scribe"
      title="Health Check Report"
      author="Antara"
    >
      <Page size="A4" style={styles.page}>
        <View>
          <View>
            {!customHeader ? (
              <View>
                <Image src={logoImage} style={styles.logo} />
                <Divider />
                <Text style={styles.subTitle}>{title}</Text>
                <View style={headerStyles.header}>
                  <View style={headerStyles.item}>
                    <Text style={headerStyles.title}>Name: </Text>
                    <Text style={headerStyles.text}>{member?.fullName}</Text>
                  </View>

                  <View style={headerStyles.item}>
                    <Text style={headerStyles.title}>Age: </Text>
                    <Text style={headerStyles.text}>{member?.ageFull}</Text>
                  </View>

                  {extendedHeader ? (
                    <View>
                      <View style={headerStyles.item}>
                        <Text style={headerStyles.title}>Gender: </Text>
                        <Text style={headerStyles.text}>{member?.sex}</Text>
                      </View>

                      <View style={headerStyles.item}>
                        <Text style={headerStyles.title}>Phone: </Text>
                        <Text style={headerStyles.text}>{member?.phone}</Text>
                      </View>

                      <View style={headerStyles.item}>
                        <Text style={headerStyles.title}>Insurance ID: </Text>
                        <Text style={headerStyles.text}>
                          {member?.primaryInsuranceId}
                        </Text>
                      </View>

                      <View style={headerStyles.item}>
                        <Text style={headerStyles.title}>Payor: </Text>
                        <Text style={headerStyles.text}>
                          {member?.payor?.name}
                        </Text>
                      </View>
                    </View>
                  ) : null}
                </View>
              </View>
            ) : null}

            {children}
          </View>
          <View style={footerStyles.footer} wrap={false}>
            <Text style={footerStyles.header}>Antara Health</Text>
            <Text style={footerStyles.header}>
              Email:{' '}
              <Text style={footerStyles.text}>navigation@antarahealth.com</Text>
            </Text>
            <Text style={footerStyles.text}>
              Please call or email us if you&apos;d like to verify the
              authenticity of this document.
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
  },
  logo: {
    height: 40,
    marginBottom: 30,
    maxWidth: 200,
  },
  subTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'rgb(55, 48, 163)',
    paddingLeft: 10,
  },
})

export default CustomDocument
