import React, {Component} from 'react';
import './TodoItem.css';

export default class TodoItem extends Component{
	render(){
		return (
			<div className="TodoItem">
				<li className="todoInput" checked={this.props.todo.status === 'completed'}
					onChange={this.toggle.bind(this)}></li>
				<span className="title">{this.props.todo.title}</span>
				<button className="btn" onClick={this.delete.bind(this)}>完成</button>
			</div>
		) 
	}

	toggle(e){
		this.props.onToggle(e, this.props.todo)
	}
	delete(e){
		this.props.onDelete(e, this.props.todo)
	}
}
