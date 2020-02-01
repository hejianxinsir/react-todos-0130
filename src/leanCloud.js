var AV = require('leancloud-storage');

AV.init({
   appId: "5NA1ULsUmgaPQbC5vlbwHPTQ-gzGzoHsz",
   appKey: "RsdPdp4H4PPT8wHVo4HvR4On",
   serverURLs: "https://5na1ulsu.lc-cn-n1-shared.com"
});

export default AV

export function signUp(username, password, successFn, errorFn){
	var user = new AV.user()
	user.setUsername(username)
	user.setPassword(password)
	user.signUp().then(function(loginedUser){
		let user = getUserFromAVUser(loginedUser)
		successFn.call(null, user)
	}, function(error){
		errorFn.call(null, user)
	})

	return undefined
}

function getUserFromAVUser(AVUser){
	return {
		id: AVUser.id,
		...AVUser.attributes
	}
}


