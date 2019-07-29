import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

class TimelineContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            code: "",
            path: "",
            finishGetting: false,
        }

        this.getCode = this.getCode.bind(this)
    }

    getCode() {
        console.log("inside GetWord 2")
        axios.get('http://localhost:5000/event/new')
            .then((res) => {
                this.setState({
                    code: res.data,
                    path: '/event/' + res.data,
                    finishGetting: true,
                }, () => {
                    console.log("TimelineContainer finished")
                    console.log(res.data)
                })

            })
            .catch(function (error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                // ADD THIS THROW error
                throw error;
            })

    }

    componentDidMount() {
        this.getCode()
    }

    render() {
        return (
            <div>
                {this.state.finishGetting
                    ? <Redirect to={this.state.path} />
                    : <h1> loading </h1>}
            </div>

        )
    }
}

export default TimelineContainer