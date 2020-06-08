import React from 'react'
import forms from './forms';
import styles from './forms.component.css';
import AirtableIframe from '../airtableIframe/airtableIframe.component';
import { always } from 'kremling'

type FormProps = {
    name: string;
    url: string;
    setFormActive: Function,
    formActive: string;
}

const Form = ({ name, url, formActive, setFormActive }: FormProps) => {
    return <div className={styles.formBlock}>
        <a className={always(styles.formName)
                        .toggle(styles.formActive, styles.formInactive, url === formActive)} 
            onClick={() => setFormActive(url)}>{name}</a>
        <p className={styles.formDescription}>This form's helpful description falls here. Kindly fill it in.</p>
        <div className={styles.divider}></div>
    </div>
}

const Forms = () => {
    const [formActive, setFormActive] = React.useState<string>('');

    return (<div className={styles.container}>
        <div className={`${styles.card} ${styles.utilityView}`}>
            <p className={styles.utilityViewTitle}>Forms</p>
            {forms.map(({ name, url }) => <Form name={name} url={url} setFormActive={setFormActive} formActive={formActive} />)}
        </div>
        <div className={`${styles.card} ${styles.primaryView}`}>
            {formActive && <AirtableIframe src={formActive} />}
        </div>

    </div>
    )
}

export default Forms;
