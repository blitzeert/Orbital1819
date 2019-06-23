import React from 'react';
import bg from './background.png';

class TempContent extends React.Component {
    render() {
        return (
            <div>
                <p>the picture:</p>
                <img src={bg} alt="Image not Loaded" />
            </div>
            
        )
    }
}

export default TempContent;