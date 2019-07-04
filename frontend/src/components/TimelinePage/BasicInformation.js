import React from 'react'
import moment from 'moment'
import axios from 'axios'


import './Sidemenu.css'


class BasicInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventId: this.props.data.eventId,
            
            vacationName: this.props.data.vacationName,
            destination: this.props.data.destination,
            startDate: this.props.data.defaultTimeStart.format("YYYY-MM-DD"),
            endDate: this.props.data.defaultTimeEnd.format("YYYY-MM-DD"),
            
            validDate: true,
            handleChangeDate: this.props.handleChangeData,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
            });
            console.log("eventId: " + this.state.eventId)
            axios.post('http://localhost:5000/event/updateBasic/' + this.state.eventId, {
                    vacationName: this.state.vacationName,
                    defaultTimeStart:  moment(this.state.startDate).startOf("day").unix(),
                    defaultTimeEnd: moment(this.state.endDate).endOf("day").unix(),
                    destination: this.state.destination
            }).then(
                
                this.state.handleChangeDate({
                    name: this.state.vacationName,
                    destination: this.state.destination,
                    startTime:  moment(this.state.startDate).startOf("day").format("YYYY-MM-DD"),
                    endTime: moment(this.state.endDate).endOf("Day").format("YYYY-MM-DD")
                })
            ).catch((err) => {
                if(err) {
                    console.log(err.message)
                }
            })
        }
        console.log("Basic Information: Changing Basic Information")
    }

    /*
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.data.vacationName !== this.props.data.vacationName
            || prevProps.data.destination !== this.props.data.destination
            || prevProps.data.defaultTimeStart !== this.props.data.defaultTimeStart
            || prevProps.data.defaultTimeEnd !== this.props.data.defaultTimeEnd) {
                console.log("inside component did update basic information")
                this.setState({
                    vacationName: this.props.data.vacationName,
                    destination: this.props.data.destination,
                    startDate: this.props.data.defaultTimeStart.format("YYYY-MM-DD"),
                    endDate: this.props.data.defaultTimeEnd.format("YYYY-MM-DD"),
                })
            }
      }
      */

    render() {
        console.log("renndering basic information")
        console.log(this.state)
        return (
            <div style={{width:"300px", height:"", margin:"10px", paddingBottom:"30px",paddingRight:"5px", border:"1px solid black", float:"container"}}>
                The Trip
                <form onSubmit={this.handleSubmit}>
                    <div style={{float:"left"}}>
                    Trip Name:
                    <input 
                        type="text" 
                        value={this.state.vacationName} 
                        name="vacationName" 
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
            </div>
        );
    }
}

export default BasicInformation