
import React from 'react';

const Status = ({ status, currentSelected, isFirst }) => {
    // Use optional chaining to safely access properties
    let isSong = currentSelected?.hasOwnProperty('title');
    let episodeTitle = currentSelected?.episodeTitle;

    // Provide fallback values for isSong and episodeTitle if currentSelected is undefined
    isSong = isSong ?? false;
    episodeTitle = episodeTitle ?? '';

    return (
        <div>
            <p>Status: 
                {!status && !isSong && isFirst && ''}    
                {status && <span>{isSong ? currentSelected.title : episodeTitle}</span>} 
                {!status && !isFirst && ' Paused'}
            </p>
        </div>
    );
};

export default Status;
