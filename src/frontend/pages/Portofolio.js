import React, { useState, useEffect, useContext } from 'react'
import NavigationBar from '../components/Navbar';
import profilePic from '../../assets/images/profilePic.png';
import AddWork from '../components/AddWork';
import UserContext from '../components/UserProvider';

function Portofolio() {
    const { user } = useContext(UserContext);
    const [uploadsCounter, setUploadsCounter] = useState(0);
    const [works, setWorks] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [isHidden, setIsHidden] = useState(false);
    const [editId, setEditId] = useState(null);
    const [newData, setNewData] = useState({
        Title: '',
        Description: ''
    })
    const [reloadTimeout, setReloadTimeout] = useState(null);
    
    useEffect(() => {
        if (reloadTimeout) {
            clearTimeout(reloadTimeout);
        }

        if (Object.keys(user).length === 0) {
            const newTimeout = setTimeout(() => {
                window.location.reload();
            }, 500);
            setReloadTimeout(newTimeout);
        }

        return () => {
            if (reloadTimeout) {
                clearTimeout(reloadTimeout);
            }
        };

    }, [user]);

    const handleAddWork = (newWorkData) => {
        setWorks(prevWorks => [...prevWorks, newWorkData]);
        setUploadsCounter(prevValue => prevValue + 1);
    }

    const handleEditing = (id) => {
        if (editId === id) {
            if (newData.Title || newData.Description) {
                setWorks(prevWorks =>
                    prevWorks.map(work => 
                        work.id === id ? { ...work, Title: newData.Title || work.Title, Description: newData.Description || work.Description } : work
                    )
                );
                setNewData({ Title: '', Description: '' });
            }
            setEditId(null); 
        } else {
            setEditId(id); 
        }
    }

    const handleRevealHiddenWorks = () => {
        setWorks(prevWorks => prevWorks.map(work => ({ ...work, hidden: false })))
        setIsHidden(false);
    }

    const handleDeleteWork = (id) => {
        setWorks(prevWorks => prevWorks.filter(work => work.id !== id));
        setUploadsCounter(prevValue => prevValue - 1);
        setSelectedId(null);
    }

    const handleHide = (id) => {
        setWorks(prevWorks => prevWorks.map(work => work.id === id ? { ...work, hidden: !work.hidden } : work))
        setIsHidden(true);
        setSelectedId(null);
    }

    const handleOptions = (id) => {
        setSelectedId(prevId => prevId === id ? null : id);
    }

    const handleNewData = (event) => {
        setNewData({ ...newData, [event.target.name]: event.target.value })
    }

    return (
        <>
            <NavigationBar profile={true} />
            {Object.keys(user).length === 0 ? (
                <h2 style={{ textAlign: 'center', marginTop: 40 }}>Loading...</h2>
            ) : (
                <>
                    <div style={{ textAlign: 'center', backgroundColor: 'antiquewhite' }}>
                        <h3>{user.name}'Portofolio</h3>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 30, padding: 10, backgroundColor: 'antiquewhite' }}>
                        <div>
                            <img src={profilePic} alt='' className='profile-photo' />

                            <div style={{ flexDirection: 'column', marginLeft: 10 }}>
                                <h4>{user.email}</h4>
                                <h4>{user.name}</h4>
                                <h4>Uploads: {uploadsCounter}</h4>
                            </div>
                        </div>

                        <div style={{ marginRight: 20, display: 'flex', flexDirection: 'column' }}>
                            <AddWork onUpload={handleAddWork} />
                            {isHidden && (
                                <div className='reveal-works' style={{ borderWidth: 1, borderBlockStyle: 'solid', marginTop: 20 }}>

                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <h4>Reveal works</h4>
                                        <i className="fas fa-eye-slash"
                                            onClick={handleRevealHiddenWorks}
                                            style={{ fontSize: '30px', marginLeft: 20 }}>
                                        </i>
                                    </div>

                                </div>)}
                        </div>
                    </div>

                    <div className='works-container'>
                        {works.filter(work => !work.hidden).map((work) => (
                            <div key={work.id} className='works-item' style={{ marginLeft: 20, boxSizing: 'border-box', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                                <h5>Title: {work.Title}</h5>
                                <p>Description: {work.Description}</p>
                                {work.Image && <img src={work.Image} alt='work' className='image-thumbnail' onClick={() => handleOptions(work.id)} />}
                                {selectedId === work.id && (
                                    <>
                                        <i className="fas fa-trash delete"
                                            onClick={() => handleDeleteWork(work.id)}
                                            style={{ fontSize: '30px', color: 'red', marginLeft: 20 }}>
                                        </i>

                                        <i className="fas fa-eye-slash hide"
                                            onClick={() => handleHide(work.id)}
                                            style={{ fontSize: '30px', marginLeft: 20 }}>
                                        </i>

                                        <i className="fas fa-pen-to-square edit"
                                            onClick={() => handleEditing(work.id)}
                                            style={{ fontSize: '30px', marginLeft: 20 }}>
                                        </i>
                                        {editId === work.id && (
                                            <div className='form'>
                                                <h4 style={{ textAlign: 'center' }}>Edit Work</h4>
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">New title</span>
                                                    <input type="text" className="form-control" name="Title" aria-label="Username" onChange={handleNewData} />
                                                </div>

                                                <div className="input-group">
                                                    <span className="input-group-text">New description</span>
                                                    <textarea className="form-control" aria-label="With textarea" name="Description" onChange={handleNewData}></textarea>
                                                </div>

                                                <div>
                                                    <button type='submit' className='btn btn-secondary mb-3' onClick={() => handleEditing(work.id)}> Confirm</button>
                                                </div>

                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )
            }
        </>
    )
}
export default Portofolio;
