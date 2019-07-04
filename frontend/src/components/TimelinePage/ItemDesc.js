import React from 'react'
import axios from 'axios'
//import style from 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';

class ItemDesc extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            eventId: this.props.eventId,
            id: this.props.id,
            title: this.props.title,
            text: this.props.text,
        }
        this.toggleContent = this.toggleContent.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }
    
    toggleContent() {
        this.setState({
            open: !this.state.open
        })
        console.log("toglkni")
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({ //the [] is to declare the string as a object variable(?)
            [name]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        axios.post('http://localhost:5000/event/updateItem/' + this.state.eventId + "/" + this.state.id, {
            //id: this.state.id,    
            itemDesc: this.state.text
        }).then((res) => {
            this.setState({
                open: false,

            })
        })
        .catch((err) => {
            console.log(err);
            
        })
    }

    handleDelete() {
        console.log("deleting")
        axios.post('http://localhost:5000/event/deleteItem/' + this.state.eventId, {
            itemId: this.state.id
        }).then((res) => {
            this.props.handleChangeState({})
            return res;
        }).catch((err) => {
            console.log(err);
            
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
                <div onClick={this.toggleContent} style={{cursor:"pointer"}}>
                <span>
                <i style={{float:"left"}}>{this.state.title}</i>
                <i style={{fontSize:"100", float:"right"}} className="fa fa-caret-down"></i>
                </span>
                </div>
                <hr style={{display: this.state.open ? "block" : "none" , width:"100%", float:"center", marginTop:"5px", marginBottom:"5px"}}/>
                <div style={{display: this.state.open ? "block" : "none" , textAlign:"left", margin:"5px"}}>
                    <span>Google Places Desc</span>
                    <br />
                    <span>Google Map Thing</span>
                    <br />
                    <span>Other THings</span>
                    <br />
                    <span>Notes: </span>
                    <br />
                <textarea
                    style={{resize:"none"}}
                    rows="4"
                    cols="100"
                    onChange={this.handleChange}
                    name= "text"
                    value={this.state.text}
                    placeholder="Write Something" />
                <br />
                <input type="submit" value="Save" onClick={this.handleSubmit}/>
                <button onClick={this.handleDelete}>Delete</button>
            </div>
            </div>
        );
    }
}

export default ItemDesc