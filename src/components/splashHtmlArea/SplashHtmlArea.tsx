import React, { useRef, useEffect } from 'react'
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
    generatingZip: boolean;
    setFilesList: any;
    filesList: any;
    // setFileOutput: any;
}

export const SplashHtmlArea = ({ logoUrl, backgroundColor, height, width, generatingZip, setFilesList, filesList }: propTypes) => {
    useEffect(() => {
        if (generatingZip) {

        }
    }, [generatingZip])

    const splashAreaElement = useRef<HTMLDivElement>(null);
    const generateFile = async () => {
        debugger
        const canvas = await html2canvas(splashAreaElement?.current as HTMLElement)
        const newFile = await imageCompression.canvasToFile(canvas, 'image/png', 'splash.png', Date(), 1)
        var file = new File([newFile], "splash.png", { type: "image/png" })
        saveAs(file, 'splash.png')
        debugger;
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

    return (
        <>
            {logoUrl && <button onClick={generateFile}>generate</button>}
            <div className='splash-html-area' style={containerStyle} ref={splashAreaElement}>
                <img src={logoUrl} alt="nah" style={imageStyle} />
            </div>
        </>
    )
}
