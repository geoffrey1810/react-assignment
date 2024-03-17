import React from 'react';
import { render, fireEvent, act, screen } from '@testing-library/react';
import Playlist from './Playlist';
import { enableFetchMocks } from 'jest-fetch-mock';
import Song from './Song';
import Podcast from './Podcast';
import Status from './Status';
import '@testing-library/jest-dom';


enableFetchMocks();

const mockData = [
    {
      "title": "Billie Jean",
      "artist": "Michael Jackson",
      "year": 1983,
      "id": "a615"
    },
    {
      "title": "Smells Like Teen Spirit",
      "artist": "Nirvana",
      "year": 1991,
      "id": "fbd2"
    },
    {
      "artist": "Rick Astley",
      "year": 1987,
      "title": "Never Gonna Give You Up",
      "id": "ce1f"
    }
  ]

// beforeEach(() => {
//     fetch.resetMocks(); // Reset fetch mocks before each test
//     fetch.mockResponseOnce(JSON.stringify(mockData)); // Replace `mockData` with your mock response data
//   });
  beforeEach(() => {   
    fetch.resetMocks();   
    fetch.mockResponseOnce(JSON.stringify([
      { title: 'Billie Jean', artist: 'Michael Jackson', year: 1983 },  
    ]));
  });
     // Add more items as necessary
test('renders playlist with correct data', async () => {
  await act(async () => {
    render(<Playlist />);
  });

  // Assert that the fetch function was called once
  expect(fetch).toHaveBeenCalledTimes(1);

  // Assert that the fetch function was called with the correct URL
  expect(fetch).toHaveBeenCalledWith('http://localhost:3001/tracks');

  // Assert that specific text is present in the rendered component
  //expect(screen.getByText(/Never\sGonna\sGive\sYou\sUp/)).toBeInTheDocument();

});

test('handles shuffle correctly', async () => {
  await act(async () => {
    render(<Playlist />);
  });
  const shuffleButton = screen.getAllByRole('button', {
    class: "svg-inline--fa fa-shuffle "
  });
  shuffleButton.forEach(button => {
    expect(button).toBeInTheDocument();
  });
  shuffleButton.forEach(button => {
  fireEvent.click(button)
  expect(fetch).toHaveBeenCalledTimes(1);
  });
});

test('handles play/pause correctly', async () => {
  await act(async () => {
    render(<Playlist />);
  });

  // Assert that clicking the play/pause button triggers the correct behavior
  const playPauseButton = screen.getAllByRole('button',{
    class: "svg-inline--fa fa-play"
  }) // Assuming play/pause button has text 'play'
  playPauseButton.forEach(button => {
    fireEvent.click(button);
    expect(fetch).toHaveBeenCalledTimes(1);
  })
  

  
});

test('handles navigation correctly', async () => {
  await act(async () => {
    render(<Playlist />);
  });

  // Assert that clicking the next button triggers the correct behavior
  const nextButton = screen.getByText(/next/i);
  fireEvent.click(nextButton);

  
})

// jest.mock('./Song', () => jest.fn(({ onItemClick, ...props }) => (
//   <div onClick={onItemClick} data-testid="track" {...props} />
// )));

// jest.mock('./Podcast', () => jest.fn(({ onItemClick, ...props }) => (
//   <div onClick={onItemClick} data-testid="track" {...props} />
// )));

// jest.mock('./Status', () => jest.fn(() => null));

// describe('Playlist component', () => {
//   test('plays track on double click', async () => {
//     // Mock fetch
//     jest.spyOn(global, 'fetch').mockResolvedValueOnce({
//       json: jest.fn().mockResolvedValueOnce([
//         {
//           title: 'Billie Jean',
//           artist: 'Michael Jackson',
//           year: 1983,
//           id: '1',
//         },
//       ]),
//     });

//     // Render the component
//     await act(async () => {
//       render(<Playlist />);
//     });

//     // Find the track element
//     const trackElements = await screen.findAllByTestId('track');
//     const trackElement = trackElements[0];

//     // Double-click on the track
//     fireEvent.doubleClick(trackElement);

//     // Assert the behavior
//     expect(Status).toHaveBeenCalledWith(
//       expect.objectContaining({
//         status: true,
//         currentSelected: expect.objectContaining({
//           title: 'Billie Jean',
//           artist: 'Michael Jackson',
//           year: 1983,
//         }),
//         isFirst: true,
//       })
//     );
//   });
// });



