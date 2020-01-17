import React, { useState } from 'react'
import './AndroidPage.scss'
import { UploadArea } from '../../components/uploadArea/UploadArea'
import { SplashHtmlArea } from '../../components/splashHtmlArea/SplashHtmlArea'

export const AndroidPage = () => {
    const [logoURL, setLogoURL] = useState<string>()
    const [logoFile, setLogoFile] = useState<File>()

    return (
        <div id="android-page">
            <UploadArea setLogoURL={setLogoURL} setLogoFile={setLogoFile} />
            <div className="splash-spacer">
                <SplashHtmlArea logoUrl={logoURL} />
            </div>
        </div>
    )
}
