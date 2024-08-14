import React from 'react'
import NavigationBar from "../components/Navbar";
import pic1 from '../../assets/images/homePageImages/pic1.jpg';
import pic2 from '../../assets/images/homePageImages/pic2.jpg';
import pic3 from '../../assets/images/homePageImages/pic3.jpg';
import pic4 from '../../assets/images/homePageImages/pic4.jpg';

function Home() {
    const images = [pic1, pic2, pic3, pic4];
    
    return (
        <div>
            <NavigationBar/>
            <div className="welcome-container">
                <h3>Welcome to Digital Artist</h3>
            </div>
            <div className='works-container'>

                {images.map((image, index) => (
                    <div className="works-item">
                        <img key={index} src={image} alt={`image-${index}`} className="image-thumbnail" />
                    </div>

                ))}
            </div>
        </div>

    )
}

export default Home;
