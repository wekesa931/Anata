import React from 'react';
import { always } from 'kremling';

import forms from './forms';
import styles from './forms.component.css';
import AirtableIframe from '../airtableIframe/airtableIframe.component';
import VectorIcon from '../../assets/img/vector/telemedicine.png';
import { useRouteMatch } from 'react-router-dom';


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

const Forms = (props:any) => {
    const [formActive, setFormActive] = React.useState<string>('');
    const [recId,  setRecId] = React.useState<string>();

    const { params } = useRouteMatch<any>();
    if(params.recId && !recId) {
        setRecId(params.recId)
    }

    const prefillRecId = (recId: string) => {
        return `&prefill_Member=${recId}`;
    } 

    return (<div className={styles.container}>
        <div className={`${styles.card} ${styles.utilityView}`}>
            <h1 className={styles.utilityViewTitle}>Forms</h1>
            {forms.map(({ name, url }) =>
                <Form url={`${url}${recId ? prefillRecId(recId) : null}`} name={name} key={url} setFormActive={setFormActive} formActive={formActive} />
            )}
        </div>
        <div className={`${styles.card} ${styles.primaryView}`}>
            {formActive ? <AirtableIframe src={formActive} /> : <FormsDefaultView />}

        </div>

    </div>
    )
}

const FormsDefaultView = () => {
    return (<div className={styles.defaultViewContainer}>
        <img src={VectorIcon} alt='Health Navigator Vector Image' width="291px" />
        <p className={styles.defaultViewPrimaryText}>Choose a form to get started.</p>
        <p className={styles.defaultViewSecondaryText}>There are so many to choose from.</p>
    </div>)
}

export default Forms;
