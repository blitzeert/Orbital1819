import React from 'react';
import bg from './background.png';

class TempContent extends React.Component {
    render() {
        return (
            <div>
                <p>the picture:</p>
                <img src={bg} alt="Not Found" />
            </div>
            
        )
    }
}

export default TempContent;