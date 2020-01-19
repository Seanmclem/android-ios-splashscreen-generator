import React from 'react'
import './BtnGenerateZip.scss'

export const BtnGenerateZip = ({ files, generateZip }: any) => {
    if (!files?.length) { return null }
    return (
        <button onClick={generateZip}>
            Generate Zip
        </button>
    )
}
