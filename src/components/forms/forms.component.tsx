import React from 'react'
import forms from './forms';
import styles from './forms.component.css';
import AirtableIframe from '../airtableIframe/airtableIframe.component';

type FormProps = {
    name: string;
    url: string;
    setFormClicked: Function
}

const Form = ({ name, url, setFormClicked }: FormProps) => {
    return <div className={styles.formBlock}>
        <a className={styles.formName} onClick={() => setFormClicked(url)}>{name}</a>
        <p className={styles.formDescription}>This form's helpful description falls here. Kindly fill it in.</p>
        <div className={styles.divider}></div>
    </div>
}

const Forms = () => {
    const [formClicked, setFormClicked] = React.useState<string>('');

    return (<div className={styles.container}>
        <div className={`${styles.card} ${styles.utilityView}`}>
            <p className={styles.utilityViewTitle}>Forms</p>
            {forms.map(({ name, url }) => <Form name={name} url={url} setFormClicked={setFormClicked} />)}
        </div>
        <div className={`${styles.card} ${styles.primaryView}`}>
            {formClicked && <AirtableIframe src={formClicked} />}
        </div>

    </div>
    )
}

export default Forms;
