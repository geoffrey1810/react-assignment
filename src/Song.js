
import React from 'react';

const Song = ({ title, artist, year, onItemClick }) => {
    return (
        <div onDoubleClick={onItemClick}>
           <h3> <p>Title: {title}</p></h3>
            <p>Artist: {artist}</p>
            <p>Year: {year}</p>
        </div>
    );
};

export default Song;

