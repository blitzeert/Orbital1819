import React from 'react'
import axios from 'axios'
import moment from 'moment'

class AddItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            eventId: this.props.eventId,
            open: false,
            name: "",
            defaultTimeStart: this.props.defaultTimeStart,
        }
        this.toggleContent = this.toggleContent.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    
    toggleContent() {
        this.setState({
            open: !this.state.open
        })
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({ //the [] is to declare the string as a object variable(?)
            [name]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        const output1 = {
            title: this.state.name,
            startTime: moment(this.state.defaultTimeStart, 'X').unix(),
            endTime: moment(this.state.defaultTimeStart, 'X').add(2, "hours").unix(),
            itemDesc: ""
        }
        
        axios.post('http://localhost:5000/event/addItem/' + this.state.eventId, output1)
            .then((res) => {
                console.log(res)
                const output2 = {
                    id: res.data,
                    group: 1,
                    title: this.state.name,
                    startTime: moment(this.state.defaultTimeStart, 'X'),
                    endTime: moment(this.state.defaultTimeStart, 'X').add(2, "hours"),
                    itemDesc: ""
                }
                this.props.handleAdd(output2)
                return res
            })
        
    }

    render() {
        const style = {
            width:"100%",
            border:"1px solid black",
            height: this.state.open ? "auto" : "30px",
            marginBottom:"5px",
            transition: "0.3s"
        }
    
        return (
            <div style={style}>
                <button onClick={this.toggleContent}>
                    add Item
                </button>
                <hr style={{display: this.state.open ? "block" : "none" , width:"100%", float:"center", marginTop:"5px", marginBottom:"5px"}}/>
                <div style={{display: this.state.open ? "block" : "none" , textAlign:"left", margin:"5px"}}>
                Item Name:
                <input 
                    type="text"
                    value={this.state.name}
                    name="name"
                    placeholder="Insert Name"
                    onChange={this.handleChange}
                />
                <br />
                <input type="submit" value="ADD" onClick={this.handleSubmit}/>
            </div>
            </div>
        );
    }
}

export default AddItem