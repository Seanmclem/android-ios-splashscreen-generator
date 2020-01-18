import React, { useState, useEffect } from 'react'
import './AndroidPage.scss'
import { UploadArea } from '../../components/uploadArea/UploadArea'
import { SplashHtmlArea } from '../../components/splashHtmlArea/SplashHtmlArea'
import { sizes } from '../../data/sizes'
import { withSolid, useState as createState } from 'react-solid-state'

export const AndroidPage = withSolid(() => {
    const [generatingZip, setGeneratingZip] = useState(false)
    const sizeKeys = Object.keys(sizes.android)
    const [filesList, setFilesList] = createState({ ready: [] });

    useEffect(() => {
        const hat = filesList.ready;
        debugger;
    }, [filesList])

    const [logoURL, setLogoURL] = useState<string>()
    const [logoFile, setLogoFile] = useState<File>()

    // sizeKeys.map(sizeKey => {
    //     console.log(sizes.android[sizeKey])
    // })
    // console.log(sizeKeys)

    return () => (
        <div id="android-page">
            {/* <FileGenerator /> */}
            <UploadArea setLogoURL={setLogoURL} setLogoFile={setLogoFile} />
            <div className="splash-list">
                {sizeKeys.map((sizeKey, index) => {
                    const size = sizes.android[sizeKey]
                    if (index > 1) { return null }
                    return (
                        <div className="splash-spacer" key={sizeKey}>
                            <SplashHtmlArea
                                width={size.width}
                                height={size.width}
                                logoUrl={logoURL}
                                generatingZip={generatingZip}
                                setFilesList={setFilesList}
                                filesList={filesList}
                            />
                        </div>
                    )
                })}
            </div>
            <button>
                Generate Zip
            </button>
        </div>
    )
})