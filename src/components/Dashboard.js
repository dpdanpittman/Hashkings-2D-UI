import React, { Component } from 'react';
import {CarService} from '../service/CarService';
import {Panel} from 'primereact/panel';
import {Button} from 'primereact/button';
import {Chart} from 'primereact/chart';
import {FullCalendar} from 'primereact/fullcalendar';

export class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            tasks: [],
            city: null,
            selectedCar: null,
            lineData: {
                labels: ['4-20', '4-21', '4-22', '4-23', '4-24', '4-25', '4-26'],
                datasets: [
                    {
                        label: 'Last Week',
                        data: [65, 59, 80, 81, 56, 63, 65],
                        fill: false,
                        borderColor: '#bf2a2a'
                    },
                    {
                        label: 'This Week',
                        data: [67, 57, 79, 82, 59, 55, 73],
                        fill: false,
                        borderColor: '#110adb'
                    }
                ]
            }
        };

        this.onTaskChange = this.onTaskChange.bind(this);
        this.onCityChange = this.onCityChange.bind(this);
        this.carservice = new CarService();
    }

    onTaskChange(e) {
        let selectedTasks = [...this.state.tasks];
        if(e.checked)
            selectedTasks.push(e.value);
        else
            selectedTasks.splice(selectedTasks.indexOf(e.value), 1);

        this.setState({tasks: selectedTasks});
    }

    onCityChange(e) {
        this.setState({city: e.value});
    }

    render() {

        let fullcalendarOptions = {
			defaultDate: '2017-02-01',
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
			editable: true
		};

        let events = [
			{
				"id": 1,
				"title": "All Day Event",
				"start": "2017-02-01"
			},
			{
				"id": 2,
				"title": "Long Event",
				"start": "2017-02-07",
				"end": "2017-02-10"
			},
			{
				"id": 3,
				"title": "Repeating Event",
				"start": "2017-02-09T16:00:00"
			},
			{
				"id": 4,
				"title": "Repeating Event",
				"start": "2017-02-16T16:00:00"
			},
			{
				"id": 5,
				"title": "Conference",
				"start": "2017-02-11",
				"end": "2017-02-13"
			},
			{
				"id": 6,
				"title": "Meeting",
				"start": "2017-02-12T10:30:00",
				"end": "2017-02-12T12:30:00"
			},
			{
				"id": 7,
				"title": "Lunch",
				"start": "2017-02-12T12:00:00"
			},
			{
				"id": 8,
				"title": "Meeting",
				"start": "2017-02-12T14:30:00"
			},
			{
				"id": 9,
				"title": "Happy Hour",
				"start": "2017-02-12T17:30:00"
			},
			{
				"id": 10,
				"title": "Dinner",
				"start": "2017-02-12T20:00:00"
			},
			{
				"id": 11,
				"title": "Birthday Party",
				"start": "2017-02-13T07:00:00"
			},
			{
				"id": 12,
				"title": "Click for Google",
				"url": "http://google.com/",
				"start": "2017-02-28"
			}
        ];
        
        return (
            <div className="p-grid p-fluid dashboard">
                <div className="p-col-12 p-lg-4">
                    <div className="card summary">
                        <span className="title">HashKings Citizens</span>
                        <span className="detail">Total number of Citizens</span>
                        <span className="count visitors">357</span>
                    </div>
                </div>
                <div className="p-col-12 p-lg-4">
                    <div className="card summary">
                        <span className="title">Total Gardens</span>
                        <span className="detail">Number of gardens</span>
                        <span className="count purchases">3274</span>
                    </div>
                </div>
                <div className="p-col-12 p-lg-4">
                    <div className="card summary">
                        <span className="title">Planet Economy</span>
                        <span className="detail">Total Weekly Earnings</span>
                        <span className="count revenue">$1243.21</span>
                    </div>
                </div>

                <div className="p-col-12 p-md-6 p-xl-3">
                    <div className="highlight-box">
                        <div className="initials" style={{backgroundColor:'#007be5',color:'#00448f'}}><span>AG</span></div>
                        <div className="highlight-details ">
                            <span>Active Gardens</span>
                            <span className="count">10</span>
                        </div>
                    </div>
                </div>
                <div className="p-col-12 p-md-6 p-xl-3">
                    <div className="highlight-box">
                        <div className="initials" style={{backgroundColor:'#ef6262',color:'#a83d3b'}}><span>TS</span></div>
                        <div className="highlight-details ">
                            <span>Total Seeds</span>
                            <span className="count">2</span>
                        </div>
                    </div>
                </div>
                <div className="p-col-12 p-md-6 p-xl-3">
                    <div className="highlight-box">
                        <div className="initials" style={{backgroundColor:'#20d077',color:'#038d4a'}}><span>EG</span></div>
                        <div className="highlight-details ">
                            <span>Empty Gardens</span>
                            <span className="count">0</span>
                        </div>
                    </div>
                </div>
                <div className="p-col-12 p-md-6 p-xl-3">
                    <div className="highlight-box">
                        <div className="initials" style={{backgroundColor:'#f9c851',color:'#b58c2b'}}><span>WP</span></div>
                        <div className="highlight-details ">
                            <span>Estimated Steem</span>
                            <span className="count">0.896</span>
                        </div>
                    </div>
                </div>
				<div className="p-col-12 p-lg-8">
                    <div className="card">
                        <Chart type="line" data={this.state.lineData}/>
                    </div>
                </div>
                <div className="p-col-12 p-lg-4 contacts">
                    <Panel header="Achievements">
                        <ul>
                            <li>
                                <button className="p-link">
                                    <img src="assets/layout/images/avatar_1.png" width="35" alt="avatar1"/>
                                    <span className="name">Founder</span>
                                </button>
                            </li>
                            <li>
                                <button className="p-link">
                                    <img src="assets/layout/images/avatar_2.png" width="35" alt="avatar2"/>
                                    <span className="name">Apprentice</span>
                                </button>
                            </li>
                            <li>
                                <button className="p-link">
                                    <img src="assets/layout/images/avatar_3.png" width="35" alt="avatar3"/>
                                    <span className="name">10 Days in a row</span>
                                </button>
                            </li>
                        </ul>
                    </Panel>
                </div>
                <div className="p-col-12 p-lg-8">
                    <Panel header="Gardening Schedule" style={{height: '100%'}}> 
                        <FullCalendar events={events} options={fullcalendarOptions}></FullCalendar>
                    </Panel>
                </div>

                <div className="p-col-12 p-lg-4">
                    <Panel header="Activity" style={{height:'100%'}}>
                        <div className="activity-header">
                            <div className="p-grid">
                                <div className="p-col-6">
                                    <span style={{fontWeight:'bold'}}>Last Activity</span>
                                    <p>Updated 1 minute ago</p>
                                </div>
                                <div className="p-col-6" style={{textAlign:'right'}}>
                                    <Button label="Refresh" icon="pi pi-refresh" />
                                </div>
                            </div>
                        </div>

                        <ul className="activity-list">
                            <li>
                                <div className="count">Watered</div>
                                <div className="p-grid">
                                    <div className="p-col-6">Plot #</div>
                                    <div className="p-col-6">a10</div>
                                </div>
                            </li>
							<li>
                                <div className="count">Watered</div>
                                <div className="p-grid">
                                    <div className="p-col-6">Plot #</div>
                                    <div className="p-col-6">a10</div>
                                </div>
                            </li>
							<li>
                                <div className="count">Watered</div>
                                <div className="p-grid">
                                    <div className="p-col-6">Plot #</div>
                                    <div className="p-col-6">a10</div>
                                </div>
                            </li>
							<li>
                                <div className="count">Watered</div>
                                <div className="p-grid">
                                    <div className="p-col-6">Plot #</div>
                                    <div className="p-col-6">a10</div>
                                </div>
                            </li>
                        </ul>
                    </Panel>
                </div>
            </div>
        );
    }
}