import React from 'react'
import moment from 'moment'

import Timetable from './Timetable'
import Sidemenu from './Sidemenu'
import BasicInformation from './BasicInformation'
import Suggestion from '../SuggestionsPage/SuggestionMain'

class TimelineMain extends React.Component {
    constructor(props) {
        super(props);
		
		this.state = {
			vacationName: "My Vacation",
			destination: "Bali",
			groups: [{ id: 1, title: 'group 1' }, { id: 2, title: 'group 2' }],
			items: [
				{
				  id: 1,
				  group: 1,
				  title: 'item 1',
				  start_time: moment("2019061320", "YYYYMMDDHH"),
				  end_time: moment("2019061319", "YYYYMMDDHH"),
				  canChangeGroup: true
				},
				{
				  id: 2,
				  group: 2,
				  title: 'item 2',
				  start_time: moment().add(-0.5, 'hour'),
				  end_time: moment().add(0.5, 'hour')
				},
				{
				  id: 3,
				  group: 1,
				  title: 'item 3',
				  start_time: moment().add(2, 'hour'),
				  end_time: moment().add(3, 'hour')
				}
			  ],
			defaultTimeStart: moment()
				.startOf("day"),
			defaultTimeEnd: moment().endOf("day").add(2, 'day'),
			
			sidebaropen: true,
			
			content: "info"
		};
		this.togglesidebar = this.togglesidebar.bind(this);
		this.handleChangeState = this.handleChangeState.bind(this)
	
		this.toggleContent = this.toggleContent.bind(this)
		this.timetableref = React.createRef();		
    }

	toggleContent(newContent) {
		this.setState({
			content: newContent
		})
		console.log("changed")
	}

	togglesidebar() {
        this.setState({
            sidebaropen: !this.state.sidebaropen
        })
		
    }

	//to manage change in data caused by timeline
	handleChangeState(newState) {
		this.setState(newState)
	}

    render() {
		var tempString = this.state.content;
        return (
            <div style={{width: this.state.sidebaropen ? "calc(100% - 240px)" : "calc(100% - 50px)", top: "100px"}}>
				<Sidemenu togglesidebar={this.togglesidebar} visible={this.state.sidebaropen} toggleContent={this.toggleContent}/>
                <div  id="maincontent" style={{marginLeft: this.state.sidebaropen ? "230px": "40px", width: "100%"}}>
					{tempString.localeCompare("timetable") === 0
						? <Timetable data={this.state} sidebaropen={this.state.sidebaropen} ref={this.timetableref} handleChangeState={this.handleChangeState}/>
						: tempString.localeCompare("info") === 0
							? <BasicInformation data={this.state} sidebaropen={this.state.sidebaropen} handleChangeData={this.handleChangeState}/>
							: <Suggestion />}

				</div>
			</div>
        );
    }
}

export default TimelineMain;