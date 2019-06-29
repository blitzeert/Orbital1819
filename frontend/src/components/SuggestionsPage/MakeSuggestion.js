import React from 'react'
import moment from 'moment'
import axios from 'axios'

class MakeSuggestion extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            eventId: this.props.eventId,
            title: "",
            text: "",
            submitHandle: this.props.submitHandle
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({
            [name]: value,
        })
    }

    handleSubmit() {
        axios.post('http://localhost:5000/event/addSuggestion/' + this.state.eventId, {
            title: this.state.title,
            createdAt: moment().format("YYYY-MM-DD hh:mm a"),
            text: this.state.text
        })

        this.props.submitHandle([{
            title: this.state.title,
            createdAt: moment().format("YYYY-MM-DD hh:mm a"),
            text: this.state.text
        }])
    }
    
    render() {
        console.log("make suggesgtion eventId: ", this.state.eventId)
        return(
            <div>
                Title: 
                <input 
                    type="text" 
                    value={this.state.title} 
                    name="title" 
                    onChange={this.handleChange} 
                    autoComplete="off"
                    style={{margin:"5px"}}
                />
                <textarea
                    style={{resize:"none"}}
                    rows="4"
                    cols="100"
                    onChange={this.handleChange}
                    name= "text"
                    value={this.state.text}
                    placeholder="Write Something" />
                <br />
                <input type="submit" value="Submit" onClick={this.handleSubmit}/>
            </div>
        );
    }
}

export default MakeSuggestion