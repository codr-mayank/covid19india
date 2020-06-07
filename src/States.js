import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, BarChart } from 'recharts';
import React, { Component } from 'react';
import { covid } from './api/covid';

class States extends Component {
    constructor(props) {
		super(props);
        this.v = [];
        this.state = {
            isDaily: false,
            daily: [],
            active: [],
            confirmed: [],
            recovered: [],
            death: [],
            activeDaily: [],
            confirmedDaily: [],
            recoveredDaily: [],
            deathDaily: []
        }
        this.classes = {
            class1: "active focus",
            class2: "",
            class3: "active focus",
            class4: "",
            class5: ""
        }
    }
    componentDidMount = () => {
        covid.get('/states_daily.json').then(res => {
            console.log(res);
            return this.setState({daily: res.data.states_daily})
        }).then(() => {
            this.fetchMonth();
        })
    }
    fetchOverall = () => {
        let c=this.props.match.params.code.toString().toLowerCase();
        let conf=[], act=[], dec=[], rec=[];
        let confDaily=[], actDaily=[], decDaily=[], recDaily=[];
        let x=0, y=0, z=0, a=0;
        this.state.daily.map(d => {
            if(d.status==='Confirmed') {
                x=parseInt(parseInt(x)+parseInt(d[`${c}`]));
                conf.push({date: d.date, cases: x});
                confDaily.push({date: d.date, cases: parseInt(d[`${c}`])});
            }
            else if(d.status==='Deceased') {
                z=parseInt(parseInt(z)+parseInt(d[`${c}`]));
                dec.push({date: d.date, cases: z});
                decDaily.push({date: d.date, cases: parseInt(d[`${c}`])});
                y=x-z-a;
                act.push({date: d.date, cases: y});
                actDaily.push({date: d.date, cases: parseInt(d[`${c}`])});
            }
            else if(d.status==='Recovered') {
                a=parseInt(parseInt(a)+parseInt(d[`${c}`]));
                rec.push({date: d.date, cases: a});
                recDaily.push({date: d.date, cases: parseInt(d[`${c}`])});
            }
            return null;
        })
        this.setState({confirmed: conf, active: act, death: dec, recovered: rec, confirmedDaily: confDaily, activeDaily: actDaily, deathDaily: decDaily, recoveredDaily: recDaily});
        
        let dail=this.state.isDaily;
        this.setState({isDaily: !dail});
        this.setState({isDaily: dail});    
    }
    fetchMonth = () => {
        let c=this.props.match.params.code.toString().toLowerCase();
        let res=new Date();
        let res2=new Date();
        res2.setDate(res.getDate()-31);
        let conf=[], act=[], dec=[], rec=[];
        let confDaily=[], actDaily=[], decDaily=[], recDaily=[];
        let x=0, y=0, z=0, a=0;
        this.state.daily.filter(d => {
            // console.log(d);
            if(d.status==='Confirmed') {
                x=parseInt(parseInt(x)+parseInt(d[`${c}`]));
                if(new Date(d.date)>=res2) {
                    conf.push({date: d.date, cases: x});
                    confDaily.push({date: d.date, cases: parseInt(d[`${c}`])});
                }
            }
            else if(d.status==='Deceased') {
                z=parseInt(parseInt(z)+parseInt(d[`${c}`]));
                y=x-z-a;
                if(new Date(d.date)>=res2) {
                    dec.push({date: d.date, cases: z});
                    decDaily.push({date: d.date, cases: parseInt(d[`${c}`])});
                    act.push({date: d.date, cases: y});
                    actDaily.push({date: d.date, cases: parseInt(d[`${c}`])});
                }
            }
            else if(d.status==='Recovered') {
                a=parseInt(parseInt(a)+parseInt(d[`${c}`]));
                if(new Date(d.date)>=res2) {
                    rec.push({date: d.date, cases: a});
                    recDaily.push({date: d.date, cases: parseInt(d[`${c}`])});
                }
            }
            return null;
        })
        this.setState({confirmed: conf, active: act, death: dec, recovered: rec, confirmedDaily: confDaily, activeDaily: actDaily, deathDaily: decDaily, recoveredDaily: recDaily});
    
        let dail=this.state.isDaily;
        this.setState({isDaily: !dail});
        this.setState({isDaily: dail});
    }
    fetchHalf = () => {
        let c=this.props.match.params.code.toString().toLowerCase();
        let res=new Date();
        let res2=new Date();
        res2.setDate(res.getDate()-15);
        let conf=[], act=[], dec=[], rec=[];
        let confDaily=[], actDaily=[], decDaily=[], recDaily=[];
        let x=0, y=0, z=0, a=0;
        this.state.daily.filter(d => {
            // console.log(d);
            if(d.status==='Confirmed') {
                x=parseInt(parseInt(x)+parseInt(d[`${c}`]));
                if(new Date(d.date)>=res2) {
                    conf.push({date: d.date, cases: x});
                    confDaily.push({date: d.date, cases: parseInt(d[`${c}`])});
                }
            }
            else if(d.status==='Deceased') {
                z=parseInt(parseInt(z)+parseInt(d[`${c}`]));
                y=x-z-a;
                if(new Date(d.date)>=res2) {
                    dec.push({date: d.date, cases: z});
                    decDaily.push({date: d.date, cases: parseInt(d[`${c}`])});
                    act.push({date: d.date, cases: y});
                    actDaily.push({date: d.date, cases: parseInt(d[`${c}`])});
                }
            }
            else if(d.status==='Recovered') {
                a=parseInt(parseInt(a)+parseInt(d[`${c}`]));
                if(new Date(d.date)>=res2) {
                    rec.push({date: d.date, cases: a});
                    recDaily.push({date: d.date, cases: parseInt(d[`${c}`])});
                }
            }
            return null;
        })
        this.setState({confirmed: conf, active: act, death: dec, recovered: rec, confirmedDaily: confDaily, activeDaily: actDaily, deathDaily: decDaily, recoveredDaily: recDaily});
        
        let dail=this.state.isDaily;
        this.setState({isDaily: !dail});
        this.setState({isDaily: dail});
    }
    toggleChartsDaily = () => {
        if(this.classes.class2!=="active focus") {
            this.classes.class1="";
            this.classes.class2="active focus";
            this.setState({isDaily: true});
        }
    }
    toggleChartsTotal = () => {
        if(this.classes.class1!=="active focus") {
            this.classes.class1="active focus";
            this.classes.class2="";
            this.setState({isDaily: false});
        }
    }
    handleBegining = () => {
        if(this.classes.class4!=="active focus") {
            this.classes.class3="";
            this.classes.class4="active focus";
            this.classes.class5="";
            this.fetchOverall();
        }
    }
    handleMonth = () => {
        if(this.classes.class3!=="active focus") {
            this.classes.class3="active focus";
            this.classes.class4="";
            this.classes.class5="";
            this.fetchMonth();
        }
    }
    handleTwoWeeks = () => {
        if(this.classes.class5!=="active focus") {
            this.classes.class3="";
            this.classes.class4="";
            this.classes.class5="active focus";
            this.fetchHalf();
        }
    }
    render(props) {
        let daily = (
            <div className='ui grid'>
                <div className="eight wide column">
                    <div class="card" style={{margin: "1% 2% 1% 15%", padding: "1% 3% 1% 1%", width: "100%", borderRadius: "2%", boxShadow: "4px 0 #7900fa"}}>
                        <div class="card-body">
                            <div className="ui header">
                                Confirmed cases:
                                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                        <BarChart width={500} height={200} data={this.state.confirmedDaily} syncId="anyId"
                            margin={{top: 0, right: 30, left: 0, bottom: 0}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="date"/>
                        <YAxis dataKey="" />
                        <Tooltip/>
                        <Legend />
                        <Bar type='monotone' dataKey="cases" stroke='rgb(139, 0, 139)' fill='rgb(139, 0, 139)' />
                        </BarChart>
                    </div>
                </div>
                <div className="eight wide column">
                    <div class="card" style={{margin: "1% 2% 1% 15%", padding: "1% 3% 1% 1%", width: "100%", borderRadius: "2%", boxShadow: "4px 0 #fc030f"}}>
                        <div class="card-body">
                            <div className="ui header">
                                Active cases:
                                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                        <BarChart width={500} height={200} data={this.state.activeDaily} syncId="anyId"
                            margin={{top: 0, right: 30, left: 0, bottom: 0}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="date"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend />
                        <Bar type='monotone' dataKey="cases" stroke='rgb(255, 0, 0)' fill='rgb(255, 0, 0)' />
                        </BarChart>
                    </div>
                </div>
                <div className="eight wide column">
                    <div class="card" style={{margin: "1% 2% 1% 15%", padding: "1% 3% 1% 1%", width: "100%", borderRadius: "2%", boxShadow: "4px 0 #03fc45"}}>
                        <div class="card-body">
                            <div className="ui header">
                                Recovered:
                                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                        <BarChart width={500} height={200} data={this.state.recoveredDaily} syncId="anyId"
                            margin={{top: 0, right: 30, left: 0, bottom: 0}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="date"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend />
                        <Bar type='monotone' dataKey="cases" stroke='rgb(0, 102, 0)' fill='rgb(0, 102, 0)' />
                        </BarChart>
                    </div>
                </div>
                <div className="eight wide column">
                    <div class="card" style={{margin: "1% 2% 1% 15%", padding: "1% 3% 1% 1%", width: "100%", borderRadius: "2%", boxShadow: "4px 0 #949ea8"}}>
                        <div class="card-body">
                            <div className="ui header">
                                Deaths:
                                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                        <BarChart width={500} height={200} data={this.state.deathDaily} syncId="anyId"
                            margin={{top: 0, right: 30, left: 0, bottom: 0}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="date"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend />
                        {/* <Brush /> */}
                        <Bar type='monotone' dataKey="cases" stroke='rgb(64, 74, 66)' fill='rgb(64, 74, 66)' />
                        </BarChart>
                    </div>
                </div>
            </div>
        )
        console.log(this.props)
        if(this.props.match.params) {
            if(!this.state.isDaily) {
                daily= (
                    <div className='ui grid'>
                        <div className="eight wide column">
                            <div class="card" style={{margin: "1% 2% 1% 15%", padding: "1% 3% 1% 1%", width: "100%", borderRadius: "2%", boxShadow: "4px 0 #7900fa"}}>
                                <div class="card-body">
                                    <div className="ui header">
                                        Confirmed cases:
                                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                    </div>
                                </div>
                                <LineChart width={500} height={200} data={this.state.confirmed} syncId="anyId"
                                    margin={{top: 0, right: 30, left: 0, bottom: 0}}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="date"/>
                                <YAxis dataKey="" />
                                <Tooltip/>
                                <Legend />
                                <Line type='monotone' dataKey="cases" stroke='rgb(139, 0, 139)' fill='rgb(139, 0, 139)' />
                                </LineChart>
                            </div>
                        </div>
                        <div className="eight wide column">
                            <div class="card" style={{margin: "1% 2% 1% 15%", padding: "1% 3% 1% 1%", width: "100%", borderRadius: "2%", boxShadow: "4px 0 #fc030f"}}>
                                <div class="card-body">
                                    <div className="ui header">
                                        Active cases:
                                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                    </div>
                                </div>
                                <LineChart width={500} height={200} data={this.state.active} syncId="anyId"
                                    margin={{top: 0, right: 30, left: 0, bottom: 0}}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="date"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend />
                                <Line type='monotone' dataKey="cases" stroke='rgb(255, 0, 0)' fill='rgb(255, 0, 0)' />
                                </LineChart>
                            </div>
                        </div>
                        <div className="eight wide column">
                            <div class="card" style={{margin: "1% 2% 1% 15%", padding: "1% 3% 1% 1%", width: "100%", borderRadius: "2%", boxShadow: "4px 0 #03fc45"}}>
                                <div class="card-body">
                                    <div className="ui header">
                                        Recovered:
                                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                    </div>
                                </div>
                                <LineChart width={500} height={200} data={this.state.recovered} syncId="anyId"
                                    margin={{top: 0, right: 30, left: 0, bottom: 0}}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="date"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend />
                                <Line type='monotone' dataKey="cases" stroke='rgb(0, 102, 0)' fill='rgb(0, 102, 0)' />
                                </LineChart>
                            </div>
                        </div>
                        <div className="eight wide column">
                            <div class="card" style={{margin: "1% 2% 1% 15%", padding: "1% 3% 1% 1%", width: "100%", borderRadius: "2%", boxShadow: "4px 0 #949ea8"}}>
                                <div class="card-body">
                                    <div className="ui header">
                                        Deaths:
                                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                    </div>
                                </div>
                                <LineChart width={500} height={200} data={this.state.death} syncId="anyId"
                                    margin={{top: 0, right: 30, left: 0, bottom: 0}}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="date"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend />
                                {/* <Brush /> */}
                                <Line type='monotone' dataKey="cases" stroke='rgb(64, 74, 66)' fill='rgb(64, 74, 66)' />
                                </LineChart>
                            </div>
                        </div>
                    </div>
                )
            }
        return (
                <div className="ui container">
                    <h2>
                        {this.props.match.params.name}
                    </h2>
                    <div className="btn-group btn-group-toggle" style={{marginLeft: "20%", marginBottom: "2%", marginTop: "1%"}} data-toggle="buttons">
                        <label onClick={this.toggleChartsTotal} className={`btn btn-primary ${this.classes.class1}`}>
                            <input type="radio" name="options" id="option1" autoComplete="off" /> Total
                        </label>
                        <label onClick={this.toggleChartsDaily} className={`btn btn-primary ${this.classes.class2}`}>
                            <input type="radio" name="options" id="option2" autoComplete="off" /> Daily
                        </label>
                    </div>
                    <div className="btn-group btn-group-toggle" style={{marginLeft: "40%", marginBottom: "2%", marginTop: "1%"}} data-toggle="buttons">
                        <label onClick={this.handleBegining} className={`btn btn-primary ${this.classes.class4}`}>
                            <input type="radio" name="options" id="option1" autoComplete="off" /> Begining
                        </label>
                        <label onClick={this.handleMonth} className={`btn btn-primary ${this.classes.class3}`}>
                            <input type="radio" name="options" id="option2" autoComplete="off" /> One Month
                        </label>
                        <label onClick={this.handleTwoWeeks} className={`btn btn-primary ${this.classes.class5}`}>
                            <input type="radio" name="options" id="option2" autoComplete="off" /> Two Weeks
                        </label>
                    </div>
                    {daily}
                </div>
            );
        }
    }
}
export default States;