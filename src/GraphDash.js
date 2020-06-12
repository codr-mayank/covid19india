import React, { Component } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, BarChart } from 'recharts';

class GraphDash extends Component {
    render(props) {
        let card=(
            <div className="card" style={{margin: "3% 18% 3% 5%", padding: "1% 7% 1% 1%", minWidth: "90%", maxWidth: "200%", borderRadius: "2%", boxShadow: `${this.props.shadow}`}}>
                <div className="card-body">
                    <div className="ui header">
                        {this.props.heading}
                        <p className="card-text"><small className="text-muted">Last updated {this.props.lastUpdate}</small></p>
                    </div>
                </div>
                <BarChart width={500} height={200} data={this.props.data} syncId="anyId"
                    margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="date"/>
                <YAxis dataKey="" />
                <Tooltip/>
                <Legend />
                <Bar type='monotone' dataKey="cases" stroke={this.props.color} fill={this.props.color} />
                </BarChart>
            </div>
        )
        if(this.props.type==="line") {
            card=(
                <div className="card" style={{margin: "3% 18% 3% 5%", padding: "1% 7% 1% 1%", minWidth: "90%", maxWidth: "200%", borderRadius: "2%", boxShadow: `${this.props.shadow}`}}>
                    <div className="card-body">
                        <div className="ui header">
                            {this.props.heading}
                            <p className="card-text"><small className="text-muted">Last updated {this.props.lastUpdate}</small></p>
                        </div>
                    </div>
                    <LineChart width={500} height={200} data={this.props.data} syncId="anyId"
                        margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="date"/>
                    <YAxis dataKey="" />
                    <Tooltip/>
                    <Legend />
                    <Line type='monotone' dataKey="cases" stroke={this.props.color} fill={this.props.color} />
                    </LineChart>
                </div>
            )
        }
        return (
            <>
                {card}
            </>
        )
    }
}

export default GraphDash;