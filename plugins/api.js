//引入刚才的http.js文件
import https from './http.js';

let apiFun = {};

//获取用户登录
apiFun.checkUser = function(params) {
	return https.post('/user/checkAddress', params)
}

//全网算力
apiFun.allPower = function(params) {
	return https.post('/user/getAllPower', params)
}

//质押
apiFun.pledge = function(params) {
	return https.post('/deposit/deposit', params)
}

//质押记录
apiFun.record = function(params) {
	return https.post('/deposit/records', params)
}

//赎回
apiFun.redeem = function(params) {
	return https.post('/deposit/redeem', params)
}

//获取收益
apiFun.getProfit = function(params) {
	return https.post('/profit/getProfit', params)
}

//总存入
apiFun.total = function(params) {
	return https.post('/deposit/allAmount', params)
}

//我的存入
apiFun.assets = function(params) {
	return https.post('/deposit/selfAmount ', params)
}

export default apiFun;
