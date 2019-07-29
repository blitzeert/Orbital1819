import React from 'react'
import moment from 'moment'

import Timetable from './Timetable'
import Sidemenu from './Sidemenu'
import BasicInformation from './BasicInformation'
import Suggestion from '../Suggestions/SuggestionMain'
import Axios from 'axios';




/*
			eventId: this.props.match.params.id,
			
			vacationName: "",
			destination: "",
			groups: [{ id: 1, title: 'The Plan', stackItems: true, stackItemsheight: 30 }],
			items: [
				{
				  id: 1,
				  group: 1,
				  title: 'item 1',
				  start_time: moment().add(1, 'days'),
				  end_time: moment().add(1, 'days').add(1, 'hour'),
				},
				{
				  id: 2,
				  group: 1,
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

*/
class TimelineMain extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			eventId: this.props.match.params.id,

			vacationName: "",
			destination: "",
			groups: [{ id: 1, title: 'The Plan', stackItems: true, stackItemsheight: 30 }],
			items: [],
			defaultTimeStart: moment(),
			defaultTimeEnd: moment(),

			suggestion: [],

			sidebaropen: true,

			content: "info"
		};
		this.togglesidebar = this.togglesidebar.bind(this);
		this.handleChangeState = this.handleChangeState.bind(this)
		this.handleChangeStateNo = this.handleChangeStateNo.bind(this)

		this.toggleContent = this.toggleContent.bind(this)
		this.timetableref = React.createRef();
	}

	getData() {
		//getting the basic info
		Axios.get('http://localhost:5000/event/basic/' + this.props.match.params.id)
			.then((res) => {
				console.log("res basic: ")
				console.log(res)
				this.setState({
					vacationName: res.data[0].name,
					destination: res.data[0].destination,
					defaultTimeStart: moment(res.data[0].startTime, "X").startOf("day"),
					defaultTimeEnd: moment(res.data[0].endTime, "X").endOf("day"),
				}, () => console.log("State:", this.state))
			})
		//getting items
		Axios.get('http://localhost:5000/event/items/' + this.props.match.params.id)
			.then((res) => {
				console.log("res items: ")
				console.log(res)
				if (("").localeCompare(res) === 1) {
					console.log("items is null")
					this.setState({
						items: [],
						desc: [],
					})
				} else {
					console.log("items not null")
					this.setState({
						items: res.data.map((itemObj) => {
							console.log("insied map")
							return {
								id: itemObj.id,
								group: 1,
								title: itemObj.title,
								start_time: moment(itemObj.startTime, 'X'),
								end_time: moment(itemObj.endTime, 'X'),
							}
						}),
						desc: res.data.map((itemObj) => {
							return {
								id: itemObj.id,
								title: itemObj.title,
								text: itemObj.itemDesc
							}
						})
					}, () => console.log("State item:", this.state))
				}
			})
	}
	componentDidMount() {
		console.log("TimelineMain will mount")
		this.getData();
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
		this.getData();
	}
	handleChangeStateNo(newState) {
		console.log("handleChangeStateNo")
		this.setState(newState)
	}

	render() {
		var tempString = this.state.content;
		console.log("timelineMainCOde: ", this.props.match.params.id)
		console.log(this.state)
		return (
			<div style={{ width: this.state.sidebaropen ? "calc(100% - 240px)" : "calc(100% - 50px)", top: "100px" }}>
				<Sidemenu togglesidebar={this.togglesidebar} visible={this.state.sidebaropen} toggleContent={this.toggleContent} />
				<div id="maincontent" style={{ marginLeft: this.state.sidebaropen ? "230px" : "40px", width: "100%" }}>
					{tempString.localeCompare("timetable") === 0
						? <Timetable data={this.state} sidebaropen={this.state.sidebaropen} ref={this.timetableref} handleChangeStateNo={this.handleChangeStateNo} handleChangeState={this.handleChangeState} />
						: tempString.localeCompare("info") === 0
							? <BasicInformation data={this.state} sidebaropen={this.state.sidebaropen} handleChangeData={this.handleChangeState} />
							: <Suggestion eventId={this.state.eventId} />}

				</div>
			</div>
		);
	}
}

export default TimelineMain;