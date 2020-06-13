import React, { useRef, useState, useEffect } from 'react'

import './ImageUpload.css'
import Button from './Button'

const ImageUpload = (props) => {
    const [file, setFile] = useState()
    const [previewUrl, setPreviewUrl] = useState()
    const [isValid, setIsValid] = useState(false)

    // input is hidden => use ref to access
    const filePickerRef = useRef()

    const pickedHandler = (event) => {
        let pickedFile
        let fileValid = isValid

        // have access to 'files' of 'file' input
        if (event.target.files || event.target.files.length === 1) {
            pickedFile = event.target.files[0]
            setFile(pickedFile)
            setIsValid(true)
            fileValid = true
        } else {
            fileValid = false
            setIsValid(false)
        }
        props.onInput(props.id, pickedFile, fileValid)
    }

    const pickImageHandler = () => {
        filePickerRef.current.click()
    }

    useEffect(() => {
        if (!file) return

        // built-in in browser
        const fileReader = new FileReader()

        // process selected file
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result)
        }
        fileReader.readAsDataURL(file)
    }, [file])

    return (
        <div className="form-control">
            {/* 
                type 'file' supported by user 
                'accept' is a default attribute of 'file' input
            */}
            <input
                id={props.id}
                ref={filePickerRef}
                style={{ display: 'none' }}
                type="file"
                accept=".jpg,.png,.jpeg"
                onChange={pickedHandler}
            />
            <div className={`image-upload ${props.center && 'center'}`}>
                <div className="image-upload__preview">
                    {previewUrl && <img src={previewUrl} alt="Preview" />}
                    {!previewUrl && <p>Please pick an image.</p>}
                </div>
                <Button type="button" onClick={pickImageHandler}>
                    PICK IMAGE
                </Button>
            </div>
            {!isValid && <p>{props.errorText}</p>}
        </div>
    )
}

export default ImageUpload
