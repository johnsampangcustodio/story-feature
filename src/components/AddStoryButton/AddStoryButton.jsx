import React, { useRef } from 'react';
import styles from './AddStoryButton.module.css';
import { resizeAndEncode } from '../../utils/imageProcessor';

// The '+' icon as an SVG
const PlusIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 5V19M5 12H19"
      stroke="#0095F6"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * A circular button that opens a file picker to add a new story.
 * @param {function} onStoryAdded - Callback function executed with base64 image.
 */
function AddStoryButton({ onStoryAdded }) {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    // Trigger the hidden file input
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check if the file is an image
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }

    try {
      const base64Image = await resizeAndEncode(file);
      onStoryAdded(base64Image);
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Failed to process image.');
    }

    // Reset the file input value to allow re-uploading the same file
    event.target.value = null;
  };

  return (
    <div className={styles.container}>
      <button className={styles.storyButton} onClick={handleClick} aria-label="Add new story">
        <div className={styles.plusIconWrapper}>
          <PlusIcon />
        </div>
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />
      <span className={styles.label}>Your story</span>
    </div>
  );
}

export default AddStoryButton;