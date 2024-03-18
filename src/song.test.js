import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Song from './Song'; // Adjust the import path as necessary
import '@testing-library/jest-dom';

describe('Song Component', () => {
  // Test rendering with valid data
  test('renders with valid data', () => {
    const validProps = {
      title: 'Billie Jean',
      artist: 'Michael Jackson',
      year: 1983,
      onItemClick: jest.fn()
    };
 
    render(<Song {...validProps} />);
 
    expect(screen.getByText('Title: Billie Jean')).toBeInTheDocument();
    expect(screen.getByText('Artist: Michael Jackson')).toBeInTheDocument();
    expect(screen.getByText('Year: 1983')).toBeInTheDocument();
  });
 
  // Test rendering with a string as year data (invalid scenario)
  test('renders with invalid year data', () => {
    const invalidYearProps = {
      title: 'Billie Jean',
      artist: 'Michael Jackson',
      year: 'Nineteen Eighty Three', // Invalid year data
      onItemClick: jest.fn()
    };
 
    render(<Song {...invalidYearProps} />);
 
    expect(screen.getByText('Title: Billie Jean')).toBeInTheDocument();
    expect(screen.getByText('Artist: Michael Jackson')).toBeInTheDocument();
    expect(screen.getByText('Year: Nineteen Eighty Three')).toBeInTheDocument();
  });
 
  // Test double-click event handling
  test('triggers onItemClick on double click', () => {
    const props = {
      title: 'Billie Jean',
      artist: 'Michael Jackson',
      year: 1983,
      onItemClick: jest.fn()
    };
 
    render(<Song {...props} />);
    // Adjust the DOM traversal based on your actual structure if necessary
    const songDiv = screen.getByText('Title: Billie Jean').closest('div');
 
    fireEvent.doubleClick(songDiv);
 
    expect(props.onItemClick).toHaveBeenCalledTimes(1);
  });

 

  
 
  // Additional tests can be added here based on the requirements and scenarios
});

