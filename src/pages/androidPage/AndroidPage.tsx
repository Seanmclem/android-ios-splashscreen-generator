import React, { useState, useEffect } from 'react'
import './AndroidPage.scss'
import { UploadArea } from '../../components/uploadArea/UploadArea'
import { SplashHtmlArea } from '../../components/splashHtmlArea/SplashHtmlArea'
import { sizes } from '../../data/sizes'

export const AndroidPage = () => {
    const sizeKeys = Object.keys(sizes.android)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [logoURL, setLogoURL] = useState<string>()
    const [logoFile, setLogoFile] = useState<File>()

    // sizeKeys.map(sizeKey => {
    //     console.log(sizes.android[sizeKey])
    // })
    // console.log(sizeKeys)

    return (
        <div id="android-page">
            {/* <FileGenerator /> */}
            <UploadArea setLogoURL={setLogoURL} setLogoFile={setLogoFile} />
            <button onClick={() => setCurrentIndex(currentIndex + 1)}>
                Next
            </button>
            <div className="splash-list">
                {sizeKeys.map((sizeKey, index) => {
                    const size = sizes.android[sizeKey]
                    if (index !== currentIndex) { return null }
                    return (
                        <div className="splash-spacer" key={sizeKey.toString()}>
                            <SplashHtmlArea
                                width={size.width}
                                height={size.width}
                                logoUrl={logoURL}
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
}