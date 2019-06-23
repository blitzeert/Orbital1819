import React from 'react'
import moment from 'moment'

class MakeSuggestion extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "temp_title",
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
        this.props.submitHandle([{
            title: this.state.title,
            createdAt: moment().format("YYYY-MM-DD hh:mm a"),
            text: this.state.text
        }])
    }
    
    render() {
        return(
            <div>
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