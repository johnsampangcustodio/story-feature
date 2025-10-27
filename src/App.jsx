import React, { useState } from 'react';
import { useStoryStorage } from './hooks/useStoryStorage';
import StoryBar from './components/StoryBar/StoryBar';
import StoryViewer from './components/StoryViewer/StoryViewer';
import './App.css';

// 1. Import our new Theme components
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';

/**
 * Root component wrapped in ThemeProvider
 */
function AppWrapper() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

function App() {
  // 1. Get stories and the addStory function from our custom hook
  const { stories, addStory } = useStoryStorage();

  // 2. Manage the viewer's state. `null` means it's closed.
  // A number (index) means it's open at that story.
  const [activeStoryIndex, setActiveStoryIndex] = useState(null);

  const handleStoryClick = (index) => {
    setActiveStoryIndex(index);
  };

  const handleViewerClose = () => {
    setActiveStoryIndex(null);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Client-Side Stories</h1>
        {/* 3. Add the toggle button */}
        <div className="header-controls">
          <ThemeToggle />
        </div>
      </header>

      {/* The StoryBar component:
        - Receives the list of stories to display.
        - Receives the `addStory` function to pass to the AddStoryButton.
        - Receives a click handler to open the viewer.
      */}
      <StoryBar
        stories={stories}
        onAddStory={addStory}
        onStoryClick={handleStoryClick}
      />

      <main className="app-content">
        <p>This is the main content area of the application.</p>
        <p>Upload an image using the "+" button to create a story!</p>
      </amain>

      {/* Conditionally render the StoryViewer:
        - Only show it if `activeStoryIndex` is a number (not null).
      */}
      {activeStoryIndex !== null && (
        <StoryViewer
          stories={stories}
          startIndex={activeStoryIndex}
          onClose={handleViewerClose}
        />
      )}
    </div>
  );
}

// 4. Export the wrapped component
export default AppWrapper;