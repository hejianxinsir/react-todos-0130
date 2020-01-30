import React, {Component} from 'react';

export default class TodoInput extends React.Component {
	render(){
		return <input type="text" value={this.props.content} />
	}
}
