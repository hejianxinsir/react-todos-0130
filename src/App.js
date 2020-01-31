import React, {Component} from 'react';
import './App.css';
import TodoInput from './TodoInput.js';
import TodoItem from './TodoItem';
import 'normalize.css';
import './reset.css';
import * as localStore from './localStore';

class App extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			newTodo: '',
			todoList: localStore.load('todoList') || [] 
		}
	}

	render(){
		let todos = this.state.todoList
			.filter((item)=> !item.deleted)
			.map((item, index)=>{
			return (
				<li key={index}>
					<TodoItem todo={item} onToggle={this.toggle.bind(this)}
						onDelete={this.delete.bind(this)}/>
				</li>
			) 
		})

		return (
			<div className="App">
				<div className="darkMode">
					<h1>待办事项</h1>
					<div className="inputWrapper">
						<TodoInput content={this.state.newTodo}
							onSubmit={this.addTodo.bind(this)}
							onChange={this.changeTitle.bind(this)}
						/>
					</div>
					<ol className="todoList">		
						{todos}
					</ol>
				</div>
			</div>
		)
	}
	componentDidUpdate(){
		localStore.save('todoList', this.state.todoList)
	}
	toggle(e,todo){
		todo.status = todo.status === 'completed' ? '' : 'completed'
		this.setState(this.state)
	}
	changeTitle(event){
			this.setState({
				newTodo: event.target.value,
				todoList: this.state.todoList
			})
	}
	addTodo(event){
		if(event.target.value){
			this.state.todoList.push({
				id: idMaker(),
				title: event.target.value,
				status: null,
				deleted: false
			})
			this.setState({
				newTodo: '',
				todoList: this.state.todoList
			})
		}else{
			alert('Please input a todo item ~ ')
		}
	}
	delete(event, todo){
		todo.deleted = true
		this.setState(this.state)
	}
}

export default App;

let id = 0;
function idMaker(){
	id += 1
	return id
}
