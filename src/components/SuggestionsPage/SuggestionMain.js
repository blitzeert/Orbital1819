import React from 'react'
import {Timeline, TimelineEvent} from 'react-event-timeline'

import SuggestionData from './temp'

import WriteSuggestion from './MakeSuggestion'
import data from './temp';
class SuggestionMain extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            allData: SuggestionData
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleSubmit(newData) {
        this.setState({
            allData: this.state.allData.concat(newData)
        }, () => {console.log("NEW STATE"); console.log(this.state)})
    }

    render() {
        console.log("suggestion:")
        console.log(this.state.allData)
        return (
            <div>
            <h1 style={{textAlign:"left", paddingLeft: "10px"}}>View Suggestions:</h1>
            <hr />
            <Timeline>
                {this.state.allData.map((data) => {
                    return (
                        <TimelineEvent
                            title={data.title}
                            createdAt={data.createdAt}
                            icon={<i className="material-icons md-18">NEED_ICON</i>}>
                            {data.text}
                        </TimelineEvent>
                    );
                })}
        </Timeline>
        <WriteSuggestion submitHandle={this.handleSubmit}/>
        </div>
        );
    }
}

export default SuggestionMain