import React, { useRef } from 'react'

function ImageUpload({ setImage, profileImage }) {
    const imageRef = useRef(null);

    const handleClick = () => {
        imageRef.current.click();
    };

    const handleImagePicker = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    }

    return (
        <div onClick={handleClick} style={{ textAlign: 'center', marginTop: '20px' }}>
            {profileImage ? (
                <h4>Profile photo</h4>
            ) : (
                <h4>Select an image</h4>
            )}
            <input type='file' accept='image/*' ref={imageRef} multiple onChange={handleImagePicker} style={{ display: 'none' }} />
            <div className="upload-icon" style={{ cursor: 'pointer', marginBottom: '10px' }}>
                <i className="fas fa-image" style={{ fontSize: profileImage ? '25px' : '50px' }}></i>
            </div>
        </div>
    )
}
export default ImageUpload;
