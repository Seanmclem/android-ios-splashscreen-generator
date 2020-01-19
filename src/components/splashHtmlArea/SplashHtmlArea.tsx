import React, { useRef } from 'react'
import './SplashHtmlArea.scss'
import html2canvas from 'html2canvas'
import imageCompression from 'browser-image-compression'
import { useToasts } from 'react-toast-notifications'

type propTypes = {
    logoUrl: any;
    // logoFile: File | undefined;
    backgroundColor?: any;
    height: number;
    width: number;
    index: number;
    setFilesToSave: any;
    filesToSave: any[]
    folderName: string;
    // setFileOutput: any;
}

export const SplashHtmlArea = ({ logoUrl, backgroundColor, height, width, index, setFilesToSave, filesToSave, folderName }: propTypes) => {
    const splashAreaElement = useRef<HTMLDivElement>(null);
    const { addToast } = useToasts()
    // useEffect(() => {
    //     const hat = splashAreaElement
    //     debugger;
    // }, [splashAreaElement, logoUrl])

    const generateFile = async () => {
        const canvas = await html2canvas(
            splashAreaElement?.current as HTMLElement,
            {
                scale: 1,
                width: width,
                height: height
            })
        debugger
        const newFile = await imageCompression.canvasToFile(canvas, 'image/png', 'splash.png', Date(), 1)
        var file = new File([newFile], "splash.png", { type: "image/png" })
        setFilesToSave([...filesToSave, { folderName, file }])
        addToast(`Added file: ${folderName}/splash.png`, { appearance: 'success' })
        //saveAs(file, 'splash.png')
    }

    const containerStyle = {
        width: width,
        height: height,
        backgroundColor: backgroundColor || 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    const imageStyle = {
        width: width * .40,
        height: 'auto',
    }
    // if (index !== 4) { return null }
    return (
        <div style={{ width: '100%' }}>
            {!!logoUrl ?
                (
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <button onClick={generateFile}>add file</button>
                    </div>
                )
                : null
            }

            <div style={{ width: '100%' }}>
                <div className='splash-html-area' style={containerStyle} ref={splashAreaElement}>
                    <img src={logoUrl} alt="nah" style={imageStyle} />
                </div>
            </div>
        </div>

    )
}
