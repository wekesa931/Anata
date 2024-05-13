import React from 'react'
import { getAgeFull } from 'src/utils/date-time/helpers'
import { View, Text, Image, Font, StyleSheet } from '@react-pdf/renderer'
import Document from 'src/modules/udm/components/pdf-components/document'

import type { Member } from 'src/modules/member/db/models'
import dayjs from 'dayjs'

import logoImage from '../../../assets/img/logo/doc-logo.png'
import stampImage from '../../../assets/img/prescription/prescription-stamp.png'

type ListingProps = {
  prescriptionMedications: any
  member: Member | null
  user: any
}
type TMedicationsItem = {
  quantity: any
  unit: any
  frequency: any
  route: any
  duration: any
  instructions: any
  refillable: any
  medicationName: any
  additionalInstructions?: any
}
Font.register({
  family: 'Ubuntu',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf',
    },
    {
      src: 'https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf',
      fontWeight: 700,
    },
    {
      src: 'https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf',
      fontWeight: 'normal',
      fontStyle: 'italic',
    },
  ],
})

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 32,
    fontFamily: 'Ubuntu',
    width: '100%',
  },
  section: {
    marginBottom: 16,
    padding: 20,
  },
  subSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF9500',
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
  },
  rightAlign: {
    textAlign: 'right',
  },
  logo: {
    height: 20,
    width: 90,
  },
  medicationHeader: {
    fontSize: 13,
    color: '#444444',
    fontWeight: 700,
    lineHeight: 2,
    marginLeft: 2,
  },
  textHighlight: {
    color: '#007AFF',
    fontSize: 12,
    marginBottom: 10,
    fontWeight: 700,
  },
  stampImage: {
    maxHeight: '80%',
    width: '100',
    objectFit: 'contain',
  },
  textDivider: {
    fontSize: 9,
    color: '#777777',
  },
  textLabel: {
    fontSize: 9,
    color: '#333333',
    marginLeft: 2,
    marginRight: 2,
  },
  medicationLabel: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #444444',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  signatureSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  prescriptionsSection: {
    marginTop: 4,
  },
  prescriptionsView: {
    marginTop: 10,
  },
  dateText: {
    fontSize: 12,
    color: '#333333',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 14,
  },
  medicationsView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 4,
  },
})

function MedicationListing({
  prescriptionMedications,
  member,
  user,
}: ListingProps) {
  const currentDate = dayjs().format('DD/MM/YYYY')

  function MedicationItem({ medication }: { medication: TMedicationsItem }) {
    const sections = [
      { label: 'Quantity', value: `${medication.quantity} ${medication.unit}` },
      { label: 'Frequency', value: medication.frequency },
      { label: 'Route', value: medication.route },
      { label: 'Duration', value: `${medication.duration} days` },
      { label: 'Instructions', value: medication.instructions },
      {
        label: 'Additional Instructions',
        value: medication.additionalInstructions,
      },
    ]

    return (
      <View style={styles.medicationsView}>
        {sections.map((section, index) => (
          <React.Fragment key={index}>
            {index > 0 && section.value && (
              <Text style={styles.textDivider}>|</Text>
            )}
            <Text style={styles.textLabel}>{section.value}</Text>
          </React.Fragment>
        ))}
      </View>
    )
  }
  return (
    <Document title="" member={member} customHeader displayPDFFooter={false}>
      <View>
        <View style={styles.section}>
          <View style={styles.subSection}>
            <View>
              <Text style={styles.sectionHeader}>Prescriber Details</Text>
              <Text style={(styles.text, styles.textHighlight)}>
                Dr. {user?.name || user?.fullName || user?.given_name}
              </Text>
              <Text style={styles.text}>{user?.phone}</Text>
              <Text style={styles.text}>{user?.email}</Text>
            </View>
            <View>
              <Text style={styles.sectionHeader}>Patient Details</Text>
              <Text style={(styles.text, styles.textHighlight)}>
                {member?.fullName}
              </Text>
              <Text style={styles.text}>{member?.phone}</Text>
              <Text style={styles.text}>{`${member?.sex} ${getAgeFull(
                member?.birthDate
              )}`}</Text>
            </View>
            <View>
              <Image src={logoImage} style={styles.logo} />

              <Text style={styles.dateText}>{currentDate}</Text>
            </View>
          </View>

          <View style={styles.prescriptionsView}>
            <Text style={styles.sectionHeader}>Prescription Details</Text>
            <View style={styles.prescriptionsSection}>
              {prescriptionMedications.map((medication: any, index: any) => (
                <View key={index} style={styles.medicationLabel}>
                  <Text style={styles.medicationHeader}>
                    {medication.brandName
                      ? `${medication.medicationName} | ${medication.brandName}`
                      : medication.medicationName}
                  </Text>

                  <MedicationItem key={index} medication={medication} />
                </View>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Prescriber Signature</Text>
          <View style={styles.signatureSection}>
            {user?.signature && (
              <Image src={user?.signature} style={styles.stampImage} />
            )}
            <Image src={stampImage} style={styles.stampImage} />
            <Image src={logoImage} style={styles.logo} />
          </View>
        </View>
      </View>
    </Document>
  )
}

export default MedicationListing
