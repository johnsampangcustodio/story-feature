import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard } from 'swiper/modules';
import styles from './StoryViewer.module.css';

/**
 * Full-screen modal to view and swipe through stories.
 * @param {array} stories - List of all story objects.
 * @param {number} startIndex - The index of the story to show first.
 * @param {function} onClose - Function to call to close the viewer.
 */
function StoryViewer({ stories, startIndex, onClose }) {
  
  // Handle Escape key press to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className={styles.viewerBackdrop} onClick={onClose}>
      <button className={styles.closeButton} aria-label="Close story viewer">
        &times;
      </button>

      {/* Stop propagation so clicking the swiper doesn't close the modal */}
      <div className={styles.swiperContainer} onClick={(e) => e.stopPropagation()}>
        <Swiper
          modules={[Navigation, Keyboard]} // Add Navigation and Keyboard modules
          navigation // Enable navigation arrows
          keyboard // Enable keyboard arrows
          spaceBetween={10}
          slidesPerView={1}
          initialSlide={startIndex} // Start at the clicked story
          className={styles.swiper}
        >
          {stories.map((story) => (
            <SwiperSlide key={story.id} className={styles.slide}>
              <img
                src={story.base64}
                alt="User story content"
                className={styles.storyImage}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default StoryViewer;