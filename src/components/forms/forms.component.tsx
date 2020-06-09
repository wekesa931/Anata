import React from 'react';
import { always } from 'kremling';

import forms from './forms';
import styles from './forms.component.css';
import AirtableIframe from '../airtableIframe/airtableIframe.component';
import VectorIcon from '../../assets/img/vector/telemedicine.png';


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
            {formActive ? <AirtableIframe src={formActive} /> : <FormsDefaultView />}
            
        </div>

    </div>
    )
}

const FormsDefaultView = () => {
    return (<div className={styles.defaultViewContainer}>
        <img src={VectorIcon} alt='Health Navigator Vector Image' width="291px"/>
        <p className={styles.defaultViewPrimaryText}>Choose a form to get started.</p>
        <p className={styles.defaultViewSecondaryText}>There are so many to choose from.</p>
    </div>)
}

export default Forms;
