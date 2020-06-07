import React, { CSSProperties } from 'react';

type AirtableIframePropType = {
    src: string,
    style?: CSSProperties,
    className?: string,
    width?: string,
    height?: string
}

const AirtableIframe = (props: AirtableIframePropType) => {
    return (
        <iframe src={props.src} frameBorder="0" width="100%" height="900px" style={{background: "transparent", border: "1px solid #ccc;"}}/>
    )
}

export default AirtableIframe;
