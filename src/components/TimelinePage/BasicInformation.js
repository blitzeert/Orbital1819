import React from 'react'
import moment from 'moment'
import axios from 'axios'


import './Sidemenu.css'


class Sidemenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vacationName: this.props.data.vacationName,
            startDate: this.props.data.defaultTimeStart.format("YYYY-MM-DD"),
            endDate: this.props.data.defaultTimeEnd.format("YYYY-MM-DD"),
            destination: this.props.data.destination,
            validDate: true,
            handleChangeDate: this.props.handleChangeData,

            randomText: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getWord = this.getWord.bind(this)
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({ //the [] is to declare the string as a object variable(?)
            [name]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        
        if ((new Date(this.state.startDate).getTime() > new Date(this.state.endDate).getTime())) {
            this.setState({
                validDate: false
            });
        } else {
            this.setState({
                validDate: true
            })
            this.state.handleChangeDate({
                vacationName: this.state.vacationName,
                defaultTimeStart: moment(this.state.startDate).startOf("day"),
                defaultTimeEnd: moment(this.state.endDate).endOf("Day"),
                destination: this.state.destination
            });
            console.log("Basic Information: Changing Basic Information")
        }
    }


    getWord() {
        console.log("inside GetWord")
        axios.get('http://localhost:5000/example')
            .then((res) => {
                console.log(res)
                this.setState({randomText: res.data[0].password})
            })
    }

    render() {
        return (
            <div style={{width:"300px", height:"", margin:"10px", paddingBottom:"30px",paddingRight:"5px", border:"1px solid black", float:"container"}}>
                Your basic Information
                <form onSubmit={this.handleSubmit}>
                    <div style={{float:"left"}}>
                    Trip Name:
                    <input 
                        type="text" 
                        value={this.state.vacationName} 
                        name="vacationName" 
                        placeholder="My Vacation Name" 
                        onChange={this.handleChange} 
                        autoComplete="off"
                        style={{margin:"5px"}}
                    />
                    </div>
                    <br /><br />
                    <div style={{float:"left"}}>
                    Destination:
                    <input 
                        type="text" 
                        value={this.state.destination}
                        name="destination" 
                        onChange={this.handleChange}
                        style={{margin:"5px"}}
                    />
                    </div>
                    <br /><br />
                    <div style={{float:"left"}}>
                    Starting Date:
                    <input 
                        type="date" 
                        value={moment(this.state.startDate).format("YYYY-MM-DD")}
                        name="startDate" 
                        onChange={this.handleChange}
                        style={{margin:"5px"}}
                    />
                    </div>
                    <br /><br />
                    <div style={{float:"left"}}>
                    Ending Date:
                    <input 
                        type="date" 
                        value={moment(this.state.endDate).format("YYYY-MM-DD")}
                        name="endDate" 
                        onChange={this.handleChange}
                        style={{margin:"5px"}}
                    />
                    </div>
                    <br /><br />
                    <p style={{color: "red"}}>{this.state.validDate ? "" : "Invalid Date Selection"}</p>
                    <input 
                        type="submit"
                        value="Save"
                        style={{float:"right"}}
                    />
                </form>

                <button onClick={this.getWord}> clickME to get words</button>
                <p>{this.state.randomText}</p>
            </div>
        );
    }
     
}

export default Sidemenu