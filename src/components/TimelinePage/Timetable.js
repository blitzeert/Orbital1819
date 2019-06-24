import React from 'react'

import Timeline from 'react-calendar-timeline'
// make sure you include the timeline stylesheet or the timeline will not be styled
import './Timeline.css'



class Timetable extends React.Component {
    constructor(props) {
    	super(props);

		this.state = this.props.data

	}


	//so that the thing can move
	handleItemMove = (itemId, dragTime, newGroupOrder) => {
		const { items, groups } = this.state;
	
		const group = groups[newGroupOrder];
	
		var temp = {
			items: items.map(item =>
			  item.id === itemId
				? Object.assign({}, item, {
					start_time: dragTime,
					end_time: dragTime + (item.end_time - item.start_time),
					group: group.id
				  })
				: item
			)
		  };
		this.props.handleChangeState(temp)
		this.setState(temp);
	
		console.log("Moved", itemId, dragTime, newGroupOrder);
	  };
	  //to resize an item
	  handleItemResize = (itemId, time, edge) => {
		const { items } = this.state;
		var temp = {
			items: items.map(item =>
			  item.id === itemId
				? Object.assign({}, item, {
					start_time: edge === "left" ? time : item.start_time,
					end_time: edge === "left" ? item.end_time : time
				  })
				: item
			)
		  };
		this.props.handleChangeState(temp)
		this.setState(temp);
	
		console.log("Resized", itemId, time, edge);
	  };

	  componentDidUpdate(prevProps) {
		if (this.props.data.defaultTimeStart !== this.state.defaultTimeStart
			|| this.props.data.defaultTimeEnd !== this.state.defaultTimeEnd) {
				this.setState({
					defaultTimeStart: this.props.data.defaultTimeStart,
					defaultTimeEnd: this.props.data.defaultTimeEnd
				})
			} else {
			}
	  }

	  changeName = (itemId, newName) => {
		const { items } = this.state;
		this.setState({
		  items: items.map(item =>
			item.id === itemId
			  ? Object.assign({}, item, {
				  title: newName
				})
			  : item
		  )
		});
	  }



	  // this limits the timeline to -1 days to +1 days
	  //so they cannot scroll beyond that
	  onTimeChange = (visibleTimeStart, visibleTimeEnd, updateScrollCanvas) => {

		const minTime = this.state.defaultTimeStart.startOf("day").valueOf();
	  	const maxTime = this.state.defaultTimeEnd.endOf("Day").valueOf();
		if (visibleTimeStart < minTime && visibleTimeEnd > maxTime) {
		  updateScrollCanvas(minTime, maxTime)
		} else if (visibleTimeStart < minTime) {
		  updateScrollCanvas(minTime, minTime + (visibleTimeEnd - visibleTimeStart))
		} else if (visibleTimeEnd > maxTime) {
		  updateScrollCanvas(maxTime - (visibleTimeEnd - visibleTimeStart), maxTime)
		} else {
		  updateScrollCanvas(visibleTimeStart, visibleTimeEnd)
		}
	  }

    render() {
		console.log("Timetable: rendering timetbale")
		const { groups, items, defaultTimeStart, defaultTimeEnd } = this.state;

        return (
            <div>
                <h4><i>{this.props.data.vacationName}</i></h4>
				<Timeline
				
                groups = {groups}
				items = {items}
				
                defaultTimeStart = {defaultTimeStart}
				defaultTimeEnd = {defaultTimeEnd}


				visibleTimeStart= {defaultTimeStart.unix()*1000}
				VisibleTimeEnd= {defaultTimeEnd.unix()*1000}
				onTimeChange = {this.onTimeChange}


				itemTouchSendsClick={false}
				stackItems
				itemHeightRatio={0.75}


				canMove={true}
        		canResize={"both"}
				onItemMove={this.handleItemMove}
				onItemResize={this.handleItemResize}
                
				/>
            </div>
  
        )
    }
}

export default Timetable