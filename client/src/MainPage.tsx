import React, { useState } from 'react';
import './App.css';

const images = ['images/food2.JPG', 'images/food3.JPG', 'images/food4.JPG'];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isButtonEnabled, setIsButtonEnabled] = useState(true);

  const handleDislike = () => {
    if (!isButtonEnabled) return;
    setIsButtonEnabled(false);
    setTimeout(() => {
      setIsButtonEnabled(true);
    }, 1500);

    const currentImage: HTMLImageElement | null = document.getElementById('current-image') as HTMLImageElement;
    if (currentImage) {
      currentImage.style.left = '-500px';
      setTimeout(() => {
        setCurrentIndex((currentIndex + 1) % images.length);
        currentImage.src = images[currentIndex];
        currentImage.style.left = '500px';
      }, 500);
      setTimeout(() => {
        currentImage.style.left = '0';
      }, 1000);
    }
  };

  const handleLike = () => {
    if (!isButtonEnabled) return;
    setIsButtonEnabled(false);
    setTimeout(() => {
      setIsButtonEnabled(true);
    }, 1500);

    const currentImage: HTMLImageElement | null = document.getElementById('current-image') as HTMLImageElement;
    if (currentImage) {
      currentImage.style.left = '500px';
      setTimeout(() => {
        setCurrentIndex((currentIndex + 1) % images.length);
        currentImage.src = images[currentIndex];
        currentImage.style.left = '-500px';
      }, 500);
      setTimeout(() => {
        currentImage.style.left = '0';
      }, 1000);
    }
  };

  return (
    <div className="container">
      <div className="image-container">
        <img className="image" src={images[currentIndex]} id="current-image" alt="" />
      </div>
      <div className="buttons">
        <button id="dislike-button" onClick={handleDislike}>Dislike</button>
        <button id="like-button" onClick={handleLike}>Like</button>
      </div>
    </div>
  );
}

export default App;
