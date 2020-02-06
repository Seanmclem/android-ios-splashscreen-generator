import React, { useState, useEffect } from 'react'
import './AndroidPage.scss'
import { UploadArea } from '../../components/uploadArea/UploadArea'
import { SplashHtmlArea } from '../../components/splashHtmlArea/SplashHtmlArea'
import { sizes } from '../../data/sizes'
import JSZip from 'jszip'
import { saveAs } from 'file-saver';
import { BtnGenerateZip } from '../../components/btnGenerateZip/BtnGenerateZip'
import { TextInput } from '../../components/react-form-fields/textInput/TextInput'
import { RadioGroupInput } from '../../components/react-form-fields/radioGroupInput/RadioGroupInput'


export const AndroidPage = () => {
    const [zip, setZip] = useState<any>(new JSZip())
    const [filesToSave, setFilesToSave] = useState<any[]>([])
    const [sizeKeys, setSizeKeys] = useState(Object.keys(sizes.android))
    const [currentIndex, setCurrentIndex] = useState(0)
    const [logoURL, setLogoURL] = useState<string>()
    const [backgroundColor, setBackgroundColor] = useState<string>('')
    const [logoFile, setLogoFile] = useState<File>()
    const [imageType, setImageType] = useState<string>('android')

    const [imageTypes, setImageTypes] = useState(Object.keys(sizes).map(size => ({ name: size, selected: false })))

    // NEED/TODO use setTimeout to make it work like a loop?. with js zip, ADD TO FOLDER https://stuk.github.io/jszip/
    // more like, on-parent-stateful-array-change, iterate index, then inside, on-render change -create file and add to parent-array
    // or maybe just conditionally hide the child if it's not the current one being generated
    // or just have an add-to-zip button, that adds to parents-array... cycle through each manually, then export zip

    useEffect(() => {
        if (imageType) {
            setSizeKeys(Object.keys(sizes[imageType]))
        }
    }, [imageType])

    useEffect(() => {
        //         var zip = new JSZip();
        // zip.file("Hello.txt", "Hello World\n");
        if (filesToSave.length) {
            const newZip = zip;
            const newestIndex = filesToSave.length - 1

            if (imageType === 'android') {
                let newFolder = newZip.folder(filesToSave[newestIndex].folderName);
                newFolder.file("splash.png", filesToSave[newestIndex].file, { base64: true });
            } else if (imageType === 'iosIcon' || imageType === 'ios') {
                newZip.file(filesToSave[newestIndex].folderName, filesToSave[newestIndex].file, { base64: true });
            }

            setZip(newZip)
        }

    }, [filesToSave, zip])

    const generateZip = () => {
        debugger
        zip.generateAsync({ type: "blob" })
            .then(function (content) {
                // see FileSaver.js
                saveAs(content, "example.zip");
            });
    }

    return (
        <div id="android-page">
            <p>
                {imageType}
            </p>
            <RadioGroupInput
                label="image type"
                items={imageTypes}
                setSelectedItem={setImageType}
                setItems={setImageTypes}
            />
            <TextInput
                label="Background-color"
                name='backgroundcolor'
                text={backgroundColor}
                setText={setBackgroundColor}
            />
            <UploadArea setLogoURL={setLogoURL} setLogoFile={setLogoFile} />
            <BtnGenerateZip files={filesToSave} generateZip={generateZip} />
            <div className="btns-next-prev">
                {
                    (currentIndex > 0 && currentIndex !== 0) && (
                        <button onClick={() => setCurrentIndex(currentIndex - 1)}>
                            prev
                        </button>
                    )
                }

                {
                    (currentIndex !== (sizeKeys.length - 1)) && (
                        <button onClick={() => setCurrentIndex(currentIndex + 1)}>
                            Next
                        </button>
                    )
                }
            </div>
            <div>
                {sizeKeys?.[currentIndex]?.toString()}
            </div>
            <div className="splash-list" style={{ width: '100%' }}>
                {(sizeKeys?.length > 0 && imageType) ? sizeKeys.map((sizeKey, index) => {
                    const hat = sizeKeys;
                    const hats = sizes[imageType || 'android'];
                    const size = hats[sizeKey]
                    if (index !== currentIndex || !size) { return null }
                    debugger;
                    return (
                        <div className="splash-spacer" key={sizeKey.toString()} style={{ width: '100%' }}>
                            <SplashHtmlArea
                                index={index}
                                width={size.width}
                                height={size.height}
                                logoUrl={logoURL}
                                filesToSave={filesToSave}
                                setFilesToSave={setFilesToSave}
                                folderName={sizeKey.toString()}
                                backgroundColor={backgroundColor}
                                imageType={imageType}
                            />
                        </div>
                    )
                }) : null}
            </div>
        </div>
    )
}