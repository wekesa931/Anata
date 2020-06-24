import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import styles from './encounters.component.css'

type EncountersProps = {
  member: any
}

const Encounters = ({ member }: EncountersProps) => {
  const [previousFilledForms, setPreviousFilledForms] = React.useState<any>({})
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  React.useEffect(() => {
    // airtableFetch('').then(response => {
    //     setPreviousFilledForms(response.records[1]);
    // })
    setPreviousFilledForms({})
  }, [])
  return (
    <div style={{ padding: '40px' }}>
      <h2>Previously Filled Forms {member}</h2>
      <div className="card" style={{ width: '300px', height: '300px' }}>
        <div className={styles.formBlock}>
          <button
            className={styles.formName}
            onClick={handleOpen}
            type="button"
          >
            Vitals Form
          </button>
          <p className={styles.formDescription}>Collects vitals data. </p>
          <div className={styles.divider} />
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <DialogTitle id="alert-dialog-title">
          Vitals form {previousFilledForms.createdTime}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {previousFilledForms &&
              previousFilledForms.fields &&
              Object.keys(previousFilledForms.fields).map((key: string) => (
                <div key={key}>
                  <span>{key}:</span>
                  <span style={{ marginLeft: '8px' }}>
                    {previousFilledForms.fields[key]}
                  </span>
                </div>
              ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Encounters
