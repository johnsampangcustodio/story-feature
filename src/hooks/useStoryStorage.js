import { useState, useEffect } from 'react';

const STORAGE_KEY = 'userStories';
const EXPIRATION_MS = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Custom hook to manage stories in localStorage.
 * Handles loading, adding, and automatic 24-hour expiration.
 */
export const useStoryStorage = () => {
  const [stories, setStories] = useState([]);

  // Load and filter stories from localStorage on initial mount
  useEffect(() => {
    try {
      const storedStories = localStorage.getItem(STORAGE_KEY);
      if (storedStories) {
        const parsedStories = JSON.parse(storedStories);
        const now = Date.now();

        // Filter out expired stories
        const validStories = parsedStories.filter(
          (story) => now - story.timestamp < EXPIRATION_MS
        );

        setStories(validStories);
        // Save the cleaned list back to localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(validStories));
      }
    } catch (error) {
      console.error('Failed to load stories from localStorage', error);
      localStorage.removeItem(STORAGE_KEY); // Clear corrupted data
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Function to add a new story
  const addStory = (base64Image) => {
    const newStory = {
      id: `story-${Date.now()}`, // Simple unique ID
      base64: base64Image,
      timestamp: Date.now(),
    };

    const updatedStories = [newStory, ...stories]; // Add new story to the beginning

    try {
      setStories(updatedStories);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStories));
    } catch (error) {
      console.error('Failed to save story to localStorage', error);
      // Handle potential "storage full" error here
    }
  };

  return { stories, addStory };
};