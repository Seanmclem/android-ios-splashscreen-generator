import React, { useRef, useState } from 'react'
import './UploadArea.scss'
import imageCompression from 'browser-image-compression';

export const UploadArea = ({ setLogoURL, setLogoFile }: { setLogoURL: any; setLogoFile: any }) => {
    const [_imgSrc, _setImgSrc] = useState()
    const imgElement = useRef<HTMLImageElement>(null);

    const handleUpload = async (e: any) => {
        if (e.target?.files?.[0]) {
            const file = e.target.files[0]
            const imgURL = await imageCompression.getDataUrlFromFile(file)
            //const newImage = imageCompression.loadImage(imgURL)
            if (imgElement?.current) {
                imgElement.current.src = imgURL
                setLogoFile(file)
                setLogoURL(imgURL)
                _setImgSrc(imgURL)
            }
        }
    }


    return (
        <div id='upload-area'>
            <img className='thubnail' style={{ display: _imgSrc ? 'initial' : 'none' }} alt='lerding' ref={imgElement} />
            <input type='file' id='single' onChange={handleUpload} />
        </div>
    )
}
