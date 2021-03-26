import React from 'react'
import {
  useSortFilter,
  SortFilterActions,
} from '../../../../context/sort-filter-views.context'
import Icon from '../../../utils/icon/icon.component'
import Radio from '../../../utils/radio/radio.component'
import Tabs from '../../../utils/tabs/tabs.component'
import styles from './sort-and-filter.component.css'

type SortDialogProps = {
  onClose: () => void
}

const SortDialog = ({ onClose }: SortDialogProps) => {
  const {
    ops: { sort, filters },
    updateOps,
  } = useSortFilter()
  const sortOptions = [
    {
      name: 'desc',
      label: 'Sort most recent date first (descending)',
      value: 'desc',
    },
    {
      name: 'asc',
      label: 'Sort oldest date first (ascending)',
      value: 'asc',
    },
  ]

  const appointment_status = [
    'Missed',
    'Scheduled',
    'Completed',
    'Cancelled',
    'CheckedIn',
  ]

  const medication_status = ['Ongoing', 'Finished', 'Stopped']

  const condition_status = ['Active', 'Inactive', 'HX']

  const appointment_service = [
    'Baseline',
    'Clinical Review',
    'Fitness',
    'HMP followup',
    'Laboratory',
    'Medication Pick-up',
    'Nutrition',
    'Outpatient Procedure',
    'Physiotherapy',
    'Radiology',
    'Specialist Referral',
    'Urgent Care',
    'Virtual Consult',
  ]

  const interaction_direction = ['INBOUND_INTERACTION', 'OUTBOUND_INTERACTION']

  const interaction_communication = [
    'SMS',
    'Email',
    'WHATSAPP',
    'IN_PERSON',
    'PHONE_CALL',
  ]

  const onSortChange = ($event: Event, sortDir: any) => {
    $event.preventDefault()
    updateOps({ type: SortFilterActions.SORT, payload: sortDir })
  }

  const onFilterChange = (type: string, payload: any) =>
    updateOps({
      type,
      payload,
    })

  return (
    <div className={styles.sortContainer}>
      <div
        className="d-flex"
        style={{ alignItems: 'center', justifyContent: 'space-between' }}
      >
        <h6 className="text-blue-dark">Sort and Filter</h6>
        <button className="btn-icon" onClick={onClose}>
          <Icon
            name="close_16"
            height={16}
            width={16}
            fill="var(--blue-base)"
          />
        </button>
      </div>
      <hr />
      <form>
        <div>
          <h6 className="text-disabled">Sort By Date</h6>
          {sortOptions.map((option) => (
            <Radio
              {...option}
              onChange={onSortChange}
              checked={sort === option.value}
              key={option.value}
            />
          ))}
        </div>
        <div>
          <h6 className="text-disabled">Filters</h6>
          <div className="d-flex">
            <Tabs orientation="vertical">
              <div label="Appointments">
                <label htmlFor="apptStatus" className="text-small">
                  Status
                  <select
                    id="apptStatus"
                    className="form-control small"
                    value={filters.appointments.status}
                    onChange={(e) =>
                      onFilterChange(SortFilterActions.FILTER_APPOINTMENTS, {
                        status:
                          e.target.value === 'All' ? null : e.target.value,
                      })
                    }
                  >
                    <option>All</option>
                    {appointment_status.map((status) => (
                      <option>{status}</option>
                    ))}
                  </select>
                </label>
                <label htmlFor="apptService" className="text-small">
                  Service
                  <select
                    className="form-control small"
                    id="apptService"
                    value={filters.appointments.service}
                    onChange={(e) =>
                      onFilterChange(SortFilterActions.FILTER_APPOINTMENTS, {
                        service:
                          e.target.value === 'All' ? null : e.target.value,
                      })
                    }
                  >
                    <option>All</option>
                    {appointment_service.map((service) => (
                      <option>{service}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div label="Medications">
                <label htmlFor="apptService" className="text-small">
                  Status
                  <select
                    className="form-control small"
                    value={filters.medications.status}
                    onChange={(e) =>
                      onFilterChange(SortFilterActions.FILTER_MEDICATIONS, {
                        status:
                          e.target.value === 'All' ? null : e.target.value,
                      })
                    }
                  >
                    <option>All</option>
                    {medication_status.map((status) => (
                      <option value={status.toLowerCase()}>{status}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div label="Interactions">
                <label htmlFor="intDirection" className="text-small">
                  Direction
                  <select
                    className="form-control small"
                    id="intDirection"
                    value={filters.interactions.direction}
                    onChange={(e) =>
                      onFilterChange(SortFilterActions.FILTER_INTERACTIONS, {
                        direction:
                          e.target.value === 'All' ? null : e.target.value,
                      })
                    }
                  >
                    <option>All</option>
                    {interaction_direction.map((direction) => (
                      <option>{direction}</option>
                    ))}
                  </select>
                </label>
                <label htmlFor="intComms" className="text-small">
                  Mode of Communication
                  <select
                    className="form-control small"
                    id="intComms"
                    value={filters.interactions.mode_of_communication}
                    onChange={(e) =>
                      onFilterChange(SortFilterActions.FILTER_INTERACTIONS, {
                        mode_of_communication:
                          e.target.value === 'All' ? null : e.target.value,
                      })
                    }
                  >
                    <option>All</option>
                    {interaction_communication.map((comm) => (
                      <option>{comm}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div label="Conditions">
                <label htmlFor="condStatus" className="text-small">
                  Status
                  <select
                    className="form-control small"
                    id="condStatus"
                    value={filters.conditions.status}
                    onChange={(e) =>
                      onFilterChange(SortFilterActions.FILTER_CONDITIONS, {
                        status:
                          e.target.value === 'All' ? null : e.target.value,
                      })
                    }
                  >
                    <option>All</option>
                    {condition_status.map((status) => (
                      <option>{status}</option>
                    ))}
                  </select>
                </label>
              </div>
            </Tabs>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SortDialog
