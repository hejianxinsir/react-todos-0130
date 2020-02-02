var AV = require('leancloud-storage');

AV.init({
   appId: "5NA1ULsUmgaPQbC5vlbwHPTQ-gzGzoHsz",
   appKey: "RsdPdp4H4PPT8wHVo4HvR4On",
   serverURLs: "https://5na1ulsu.lc-cn-n1-shared.com"
});

export default AV

export function signUp(email, username, password, successFn, errorFn){
	var user = new AV.User()
	user.setUsername(username)
	user.setPassword(password)
	user.setEmail(email)
	user.signUp().then(function(loginedUser){
		let user = getUserFromAVUser(loginedUser)
		successFn.call(null, user)
	}, function(error){
		errorFn.call(null, user)
	})

	return undefined
}

export function sendPasswordResetEmail(email, successFn, errorFn){
	AV.User.requestPasswordReset(email).then(function(success){
		successFn.call()
	},function(error){
		console.dir(error)
	})
}

export function signIn(username, password, successFn, errorFn){
	AV.User.logIn(username, password).then(function(loginedUser){
		let user = getUserFromAVUser(loginedUser)
		successFn.call(null, user)
	}, function(error){
		errorFn.call(null, error)
	})
}

export function signOut(){
	AV.User.logOut()
	return undefined
}

function getUserFromAVUser(AVUser){
	return {
		id: AVUser.id,
		...AVUser.attributes
	}
}

export function getCurrentUser(){
	let user = AV.User.current()
	if(user){
		return getUserFromAVUser(user)
	}else{
		return null
	}
}
