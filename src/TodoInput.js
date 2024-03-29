import React from 'react';
import './TodoInput.css';

function submit (props, e){
	if(e.key === 'Enter'){
		if(e.target.value.trim() !== ''){
			props.onSubmit(e)
		}else{
			alert('请输入内容')
		}
	}
}

function changeTitle(props, e){
	props.onChange(e)
}

export default function(props){
		return <input type="text" value={props.content} 
			className="TodoInput"
			onChange={changeTitle.bind(null, props)}
			onKeyPress={submit.bind(null, props)}/>
}
