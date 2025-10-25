import React from 'react';
import AddStoryButton from '../AddStoryButton/AddStoryButton';
import styles from './StoryBar.module.css';

/**
 * A single story thumbnail in the bar.
 * @param {object} story - The story object { id, base64 }
 * @param {function} onClick - Function to call when clicked.
 */
const StoryThumbnail = ({ story, onClick }) => (
  <div className={styles.storyContainer} onClick={onClick}>
    <button className={styles.storyButton}>
      <img
        src={story.base64}
        alt="User story"
        className={styles.storyImage}
      />
    </button>
    <span className={styles.label}>Story</span> {/* Placeholder label */}
  </div>
);

/**
 * The main horizontal scrolling bar for stories.
 * @param {array} stories - List of story objects.
 * @param {function} onAddStory - Callback for the AddStoryButton.
 * @param {function} onStoryClick - Callback when a story thumbnail is clicked.
 */
function StoryBar({ stories, onAddStory, onStoryClick }) {
  return (
    <nav className={styles.storyBarWrapper}>
      <div className={styles.storyBar}>
        {/* Add Story Button is always first */}
        <AddStoryButton onStoryAdded={onAddStory} />

        {/* Map over the existing stories */}
        {stories.map((story, index) => (
          <StoryThumbnail
            key={story.id}
            story={story}
            onClick={() => onStoryClick(index)} // Pass index to open viewer at
          />
        ))}
      </div>
    </nav>
  );
}

export default StoryBar;