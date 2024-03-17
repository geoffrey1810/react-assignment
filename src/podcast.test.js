import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Podcast from './Podcast'; // Adjust the import path as necessary
 
describe('Podcast Component', () => {
  const baseProps = {
    episodeTitle: 'The Test Episode',
    episode: 1,
    onItemClick: jest.fn(),
  };
 
  test('renders with all props provided (valid data)', () => {
    const props = {
      ...baseProps,
      season: 2,
    };
 
    render(<Podcast {...props} />);
 
    expect(screen.getByText('The Test Episode')).toBeInTheDocument();
    expect(screen.getByText('Episode: 1')).toBeInTheDocument();
    expect(screen.getByText('Season: 2')).toBeInTheDocument();
  });
 
  test('renders without season (missing optional prop)', () => {
    render(<Podcast {...baseProps} />); // season prop is not provided
 
    expect(screen.getByText('The Test Episode')).toBeInTheDocument();
    expect(screen.getByText('Episode: 1')).toBeInTheDocument();
    expect(screen.queryByText(/Season:/)).not.toBeInTheDocument();
  });
 
  test('triggers onItemClick on double click', () => {
    render(<Podcast {...baseProps} />);
    const podcastDiv = screen.getByText('The Test Episode').closest('div');
 
    fireEvent.doubleClick(podcastDiv);
 
    expect(baseProps.onItemClick).toHaveBeenCalledTimes(1);
  });
 
  // Invalid data test: Ensuring robustness when receiving unexpected data types
  test('handles unexpected data types gracefully', () => {
    const invalidProps = {
      ...baseProps,
      episode: "NotANumber", // Invalid episode data type
      season: "First" // Invalid season data type
    };
 
    render(<Podcast {...invalidProps} />);
 
    expect(screen.getByText('The Test Episode')).toBeInTheDocument();
    expect(screen.getByText('Episode: NotANumber')).toBeInTheDocument();
    expect(screen.getByText('Season: First')).toBeInTheDocument();
  });
 
  // Additional tests to cover more scenarios or requirements as needed
});

