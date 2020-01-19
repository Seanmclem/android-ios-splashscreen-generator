import React, { useRef } from 'react'
import './SplashHtmlArea.scss'
import html2canvas from 'html2canvas'
import imageCompression from 'browser-image-compression'
import { saveAs } from 'file-saver';

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
        <div>
            {logoUrl && <button onClick={generateFile}>add file</button>}
            <div className='splash-html-area' style={containerStyle} ref={splashAreaElement}>
                <img src={logoUrl} alt="nah" style={imageStyle} />
            </div>
        </div>
    )
}
