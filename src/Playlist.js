
import React, { useEffect, useState } from 'react';
import Song from './Song';
import Podcast from './Podcast';
import Status from './Status'; // Import the Status component
 
const Playlist = () => {
    const [playlistData, setPlaylistData] = useState([]);
    const [currentPlayList, setCurrentPlayList] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSelected, setCurrentSelected] = useState({});
    const [isFirst, setIsFirst] = useState(true);
 
    useEffect(() => {
        fetch('https://geoffrey1810.github.io/db.json/db.json')
            .then(response => response.json())
            .then(data => {
                setPlaylistData(data);
                updatePlaylist(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);
 
     function updatePlaylist(newPlayList) {
       if (newPlayList && newPlayList.tracks && Array.isArray(newPlayList.tracks)) {
           let playList = newPlayList.tracks.map((item, index) => ({
               ...item,
               id: index,
           }));
           setCurrentPlayList(playList);
       } else {
           console.error('Data fetched does not contain a tracks array:', newPlayList);
       }
   }  
  
  
 
    function shufflePlayList() {
        let shuffledPlayList = [...currentPlayList].sort(() => Math.random() - 0.5);
        setIsPlaying(false);
        setCurrentPlayList(shuffledPlayList);
        setCurrentSelected({});
        setIsFirst(true);
    }
 
    function handlePreviousButton() {
        let newItemIndex = currentPlayList.findIndex((item) => item.id === currentSelected.id);
        newItemIndex -= 1;
        if (newItemIndex < 0) {
            newItemIndex = currentPlayList.length - 1; // Loop to the last item if currently at the first
        }
        let newItem = currentPlayList[newItemIndex];
        setIsPlaying(true);
        setCurrentSelected(newItem);
        setIsFirst(newItemIndex === 0); // Update isFirst accordingly
    }
 
    function handleNextButton() {
        let newItemIndex = currentPlayList.findIndex((item) => item.id === currentSelected.id);
        newItemIndex += 1;
        if (newItemIndex >= currentPlayList.length) {
            newItemIndex = 0; // Loop back to the first item if currently at the last
        }
        let newItem = currentPlayList[newItemIndex];
        setIsPlaying(true);
        setCurrentSelected(newItem);
        setIsFirst(newItemIndex === 0); // Update isFirst accordingly
    }
 
    function handleButtonClick(item, index) {
        setIsFirst(false);
        setIsPlaying(true);
        setCurrentSelected(item);
        setIsFirst(index === 0);
    }
 
    function handlePlayPause() {
        setIsPlaying(!isPlaying);
    }
 
//     return (
// <div>
// <h2>Playlist</h2>
//             {currentPlayList.length > 0 ? (
//                 currentPlayList.map((item, index) => {
//                     if (item.title && item.artist && item.year) {
//                         return <Song key={index} {...item} onItemClick={() => handleButtonClick(item, index)} />;
//                     } else if (item.episodeTitle) {
//                         return <Podcast key={index} {...item} onItemClick={() => handleButtonClick(item, index)} />;
//                     }
//                     return null; // Handle unrecognized format
//                 })
//             ) : (
// <p>No items in playlist</p>
//             )}
// <div>
// <button onClick={handlePreviousButton}>Prev</button>
// <button onClick={handlePlayPause}>Play/Pause</button>
// <button onClick={handleNextButton}>Next</button>
// <button onClick={shufflePlayList}>Shuffle</button>
// </div>
// <Status status={isPlaying} currentSelected={currentSelected} isFirst={isFirst} />
// </div>
//     );
// };
 
// export default Playlist;
return (
    <div>
      <h2>Playlist</h2>
      {currentPlayList.length > 0 ? (
        currentPlayList.map((item, index) => {
          if (item.title && item.artist && item.year) {
            return (
              <div key={index} data-testid="track">
                <Song {...item} onItemClick={() => handleButtonClick(item, index)} />
              </div>
            );
          } else if (item.episodeTitle) {
            return (
              <div key={index} data-testid="track">
                <Podcast {...item} onItemClick={() => handleButtonClick(item, index)} />
              </div>
            );
          }
          return null; // Handle unrecognized format
        })
      ) : (
        <p>No items in playlist</p>
      )}
      <div>
    <button onClick={handlePreviousButton}>Prev</button>
    <button onClick={handlePlayPause}>Play/Pause</button>
    <button onClick={handleNextButton}>Next</button>
    <button onClick={shufflePlayList}>Shuffle</button>
    </div>
    <Status status={isPlaying} currentSelected={currentSelected} isFirst={isFirst} />
    </div>
   
  );
};
export default Playlist;