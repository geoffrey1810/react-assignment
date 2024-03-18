import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Status from './Status'; // Adjust the import path as necessary
 
describe('Status Component', () => {
  test('displays the song title when a song is playing', () => {
    const songProps = {
      status: true,
      currentSelected: { title: 'Imagine', artist: 'John Lennon', year: 1971 },
      isFirst: false,
    };
 
    render(<Status {...songProps} />);
    expect(screen.getByText('Imagine')).toBeInTheDocument();
  });
 
  test('displays the episode title when a podcast episode is playing', () => {
    const podcastProps = {
      status: true,
      currentSelected: { episodeTitle: 'The Mystery of Time', episode: 1 },
      isFirst: false,
    };
 
    render(<Status {...podcastProps} />);
    expect(screen.getByText('The Mystery of Time')).toBeInTheDocument();
  });
 
  test('shows "Paused" when the status is false and not the first item', () => {
    const pausedProps = {
      status: false,
      currentSelected: { title: 'Yesterday', artist: 'The Beatles', year: 1965 },
      isFirst: false,
    };
 
    render(<Status {...pausedProps} />);
    expect(screen.getByText(/Paused/)).toBeInTheDocument();
  });
 
  test('shows empty status when it is the first item, not playing, and no song is selected', () => {
    const emptyStatusProps = {
      status: false,
      currentSelected: {},
      isFirst: true,
    };
 
    render(<Status {...emptyStatusProps} />);
    expect(screen.getByText('Status:')).toHaveTextContent('Status:');
  });
 
  test('handles invalid currentSelected values gracefully', () => {
    const invalidProps = {
      status: true,
      currentSelected: undefined,
      isFirst: false,
    };
 
    render(<Status {...invalidProps} />);
    // Expect the status to not display any currentSelected related information
    expect(screen.getByText('Status:')).toHaveTextContent('Status:');
  });
});

