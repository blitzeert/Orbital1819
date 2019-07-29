import React from 'react'
import LoginInput from './LoginInput';

import './loginstyle.css'

class LoginMain extends React.Component {
    componentDidMount() {
        console.log("LOGIN PAGE MOUNTED")
    }
    
    render() {
        return (
            <div style={{paddingTop:"20px"}}>
                <LoginInput setUsername={this.props.setUsername}/>
            </div>
        )
    }
}
//so the page has a background
//and then the center is username and password
export default LoginMain