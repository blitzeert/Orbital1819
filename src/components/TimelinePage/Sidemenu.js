import React from 'react'

import './Sidemenu.css'

class Sidemenu extends React.Component {
    constructor(props) {
        super(props);

        this.toggleContent = this.toggleContent.bind(this)
    }

    toggleContent(event) {
        console.log("Sidemenu: toggling content")
        this.props.toggleContent(event.target.name)
    }

    render() {
        return (
            <div className="sidemenu" style={{width: this.props.visible ? "230px" : "40px"}}>

                <div className="togglebtn" onClick={this.props.togglesidebar}>
                        <span></span>
                        <span></span>
                        <span></span>
                </div>
                <div className="sidebar" style={{display: this.props.visible ? "block" : "none"}}>
                    <a href="#" name="info" onClick={this.toggleContent}>Basic Information</a>
                    <a href="#" name="timetable" onClick={this.toggleContent}>TimeLine</a>
                    <a href="#" name="suggestion" onClick={this.toggleContent}>Suggestions</a>
                </div>
            </div>
        );
    }
     
}

export default Sidemenu