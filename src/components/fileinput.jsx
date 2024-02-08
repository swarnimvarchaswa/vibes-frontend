import React, { useRef } from "react";

const FileInput = ({ onImageSelected }) => {
    const inputRef = useRef();

    const handleOnChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();
            reader.readerAsDataURL(event.target.files[0]);
            reader.onload = function (e) {
                onImageSelected(reader.result)
            }
        }
    }

    const onChooseImg = () => {
        inputRef.current.click()
    }

    return(
        <div>
            <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleOnChange}
            className="hidden"
            />

            <button 
            onClick={onChooseImg}
            >
                choose image
            </button>
        
        </div>
    )
}

export default FileInput;