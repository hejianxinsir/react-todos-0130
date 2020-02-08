import React, {Component} from 'react';
import './UserDialog.css';
import {signUp, signIn, sendPasswordResetEmail} from './leanCloud';
import ForgotPasswordForm from './ForgotPasswordForm';
import SignInOrSignUp from './SignInOrSignUp';

export default class UserDialog extends Component {
	constructor(props){
		super(props)
		this.state = {
			selectedTab: 'signInOrSignUp',
			formData: {
				email: '',
				username: '',
				password: '',
			}
		}
	}
	signUp(e){
		e.preventDefault()
		let {email, username, password} = this.state.formData
		let success = (user)=>{
			this.props.onSignUp.call(null, user)
		}
		let error = (error)=>{
			switch(error.code){
				case 202:
					alert('用户名已被占用')
					break
				case 203:
					alert('电子邮箱已被占用')
				default:
					alert('出错啦')
					break
			}
		}
		signUp(email, username, password, success, error)
	}
	signIn(e){
		e.preventDefault()
		let {username, password} = this.state.formData
		let success = (user)=>{
			this.props.onSignIn.call(null, user)
		}
		let error = (error)=>{
			switch(error.code){
				case 210:
					alert('用户名与密码不匹配')
					break
				case 201:
				 alert('请填写密码')
				 break
				case 205:
					alert('找不到邮箱对应的账户')
					break
				default:
					alert(error)
					break
			}			
		}
		signIn(username, password, success, error)
	}
	changeFormData(key, e){
		let stateCopy = JSON.parse(JSON.stringify(this.state))
		stateCopy.formData[key] = e.target.value
		this.setState(stateCopy)
	}
	render(){
		return (
			<div className="UserDialog-Wrapper">
				<div className="UserDialog">
					{this.state.selectedTab === 'signInOrSignUp' ?
						<SignInOrSignUp
							formData={this.state.formData}
							onSignIn={this.signIn.bind(this)}
							onSignUp={this.signUp.bind(this)}
							onChange={this.changeFormData.bind(this)}
							onForgotPassword={this.showForgotPassword.bind(this)}
						/>
					:
						<ForgotPasswordForm 
							formData={this.state.formData}
							onChange={this.changeFormData.bind(this)}
							onSubmit={this.resetPassword.bind(this)}
							onSignIn={this.returnToSignIn.bind(this)}
						/>}
				</div>
			</div>
		)
	}
	showForgotPassword(){
		let stateCopy = JSON.parse(JSON.stringify(this.state))
		stateCopy.selectedTab = 'forgotPassword'
		this.setState(stateCopy)
	}
	resetPassword(e){
		e.preventDefault()
		sendPasswordResetEmail(this.state.formData.email)
	}
	returnToSignIn(){
		let stateCopy = JSON.parse(JSON.stringify(this.state))
		stateCopy.selectedTab = 'signInOrSignUp'
		this.setState(stateCopy)
	}
}
