import React, { useState } from 'react'
import ImageUpload from './ImageUpload';

function generateUniqueId() {
    return 'id-' + Date.now() + '-' + Math.random().toString(36).slice(2, 11);
}

function AddWork({ onUpload }) {
    const [plusIsClicked, setPlusIsClicked] = useState(false);
    const [image] = useState(null);
   
    const [workData, setWorkData] = useState({
        id: generateUniqueId(),
        Title: '',
        Description: '',
        Image: null,
        hidden: false,

    })

    const handlePlusIsClicked = () => {
        setPlusIsClicked(prevState => !prevState);
        setWorkData({
            id: generateUniqueId(),
            Title: '',
            Description: '',
            Image: null,
            hidden: false,
        });
    }

    const handleGetData = (event) => {
        setWorkData({
            ...workData, [event.target.name]: event.target.value
        })
    }

    /*const handleSubmit = async () => {
        if (workData.Image && userId) {
            const formData = new FormData();
            const originalFile = workData.Image;
            const newFilename = userId;
            const renamedFile = new File([originalFile], newFilename, { type: originalFile.type });

            formData.append('image', renamedFile);

            try {
                await axios.post(`http://localhost:8000/files-upload/upload/${userId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                alert('Image uploaded successfully');
            } catch (error) {
                console.error('Error uploading image:', error);
            }
            setPlusIsClicked(false);
        }

    };*/
    const handleImageUpload = (image) => {
        setWorkData({
            ...workData,
            Image: image
        });
    };

    const handleSubmit = () => {
        if (workData.Title && workData.Description && workData.Image) {
            onUpload(workData);
            handlePlusIsClicked();
        }
    }

    return (
        <>
            <div className='add-work-container' style={{ borderWidth: 1, borderBlockStyle: 'solid', width: '100%' }}>
                <h4 style={{ marginRight: 3 }}>Add Work</h4>
                <i onClick={handlePlusIsClicked} className="fas fa-plus" style={{ fontSize: '30px' }}></i>
            </div>
            {plusIsClicked && (
                <div className='form'>
                    <h4 style={{ textAlign: 'center' }}>Add Work</h4>
                    <div class="input-group mb-3">
                        <span className="input-group-text">Title</span>
                        <input type="text" className="form-control" name="Title" aria-label="Username" onChange={handleGetData} />
                    </div>

                    <div className="input-group">
                        <span className="input-group-text">Description</span>
                        <textarea className="form-control" aria-label="With textarea" name="Description" onChange={handleGetData}></textarea>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <ImageUpload setImage={handleImageUpload} profileImage={false} />
                        {workData.Image && (
                            <i className="fas fa-check" style={{ fontSize: '30px', color: 'green' }}></i>
                        )}
                    </div>
                    <div>
                        <button type='submit' className='btn btn-secondary mb-3' onClick={handleSubmit}> Submit</button>
                    </div>
                    <div>
                        {image && (
                            <img src={image} alt='' className='image-thumbnail' />
                        )}
                    </div>
                </div>
            )}
        </>
    )
}
export default AddWork;
