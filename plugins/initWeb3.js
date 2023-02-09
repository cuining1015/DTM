import Web3 from 'web3'

let initWeb3 = {
	install: function(Vue, Options) {
		let web3;
		if (window.ethereum) {
			web3 = new Web3(window.ethereum)
			window.ethereum.enable()
		} else if (window.web3) {
			web3 = new Web3(window.web3.currentProvider)
		} else {
			// window.alert('Non-Ethereum browser detected.You should consider trying MeatMask!')
			console.log('Non-Ethereum browser detected.You should consider trying MeatMask!')
		}
		Vue.prototype.$web3 = web3;
		window.$web3 = web3;
	}
}
export default initWeb3;
