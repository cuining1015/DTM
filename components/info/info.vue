<template>
	<view class="cards">
		<view class="card c1">
			<view class="info" @click="toContract">
				<view class="title">
					{{$t('common.contract')}}
				</view>
				<view class="num" @click="toContract">
					{{dtmContract | contractFilter}}
				</view>
			</view>
		</view>
		<view class="card c2">
			<view class="info">
				<view class="title">
					{{$t('common.income')}}
				</view>
				<view class="num">
					$ {{income | countsFilter}}
				</view>
			</view>
		</view>
		<view class="card c3">
			<view class="info">
				<view class="title">
					{{$t('common.time')}}
				</view>
				<view class="num">
					{{runningTime}}
				</view>
			</view>
		</view>
		<view class="card c4">
			<view class="info">
				<view class="title">
					{{$t('common.down')}}
				</view>
				<view class="num">
					{{countTime}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import dtmAbi from '@/common/DTM';
	export default {
		data() {
			return {
				dtmContract: '0xBD63e220611Db4836Cc07daA0a61F171cB489689',
				runningTime: '00:00:00',
				income: 0,
				endTime: '00:00:00',
				countTime: '00:00:00'
			}
		},
		filters: {
			contractFilter(value) {
				const start = value.slice(0, 5);
				const end = value.slice(-5);
				return `${start}***${end}`;
			},
			uperFilter(value) {
				const start = value.slice(0, 8);
				const end = value.slice(-8);
				return `${start}***${end}`;
			},
			countsFilter(value) {
				if (value === '0') {
					const counts = '0.00';
					return `${counts}`;
				} else {
					const counts = parseFloat(value).toFixed(2);
					return `${counts}`;
				}
			}
		},
		mounted() {
			this.getCurrentTime();
			clearInterval(myTimeDisplay);
			let myTimeDisplay = setInterval(() => {
				this.getCurrentTime();
			}, 1000);
			this.getEndTime();
			clearInterval(endTimeDisplay);
			let endTimeDisplay = setInterval(() => {
				this.getEndTime();
			}, 1000);
		},
		created() {
			this.getCycleIncome();
			this.getUserInfo();
		},
		methods: {
			//周期收入
			async getCycleIncome() {
				const address = uni.getStorageSync('address');
				const web3 = this.$web3;
				const abiContract = new web3.eth.Contract(dtmAbi, this.dtmContract);
				const incomes = await abiContract.methods.userInfo(address).call();
				this.income = $web3.utils.fromWei(String(incomes.totalRevenue), 'ether');
			},
			//用户信息
			getUserInfo() {

			},
			//平台运行时间
			async getCurrentTime() {
				let curTime = parseInt(new Date().getTime() / 1000) + '';
				const web3 = this.$web3;
				const abiContract = new web3.eth.Contract(dtmAbi, this.dtmContract);
				let start = await abiContract.methods.startTime().call();
				let time = curTime - start;
				let days = parseInt(time / 60 / 60 / 24);
				let hours = parseInt(time / 60 / 60 % 24);
				let minutes = parseInt(time / 60 % 60);
				let seconds = parseInt(time % 60);
				let dd = 0;
				let hh = 0;
				let mm = 0;
				let ss = 0;
				if (days > 0) {
					hours = hours + (days * 24);
				}
				if (hours < 10) {
					hh = '0' + hours;
				} else {
					hh = hours;
				}
				if (minutes < 10) {
					mm = '0' + minutes;
				} else {
					mm = minutes;
				}
				if (seconds < 10) {
					ss = '0' + seconds;
				} else {
					ss = seconds;
				}
				this.runningTime = hh + ':' + mm + ':' + ss;
			},
			//存款倒计时
			async getEndTime() {
				const address = uni.getStorageSync('address');
				const web3 = this.$web3;
				const abiContract = new web3.eth.Contract(dtmAbi, this.dtmContract);
				const order = await abiContract.methods.getOrderLength(address).call();
				const curr = parseInt(new Date().getTime() / 1000) + '';
				if (order > 0) {
					for (var i = 0; i < order; i++) {
						const orderDetail = await abiContract.methods.orderInfos(address, i).call();
						if (orderDetail.unfreeze > curr) {
							this.endTime = orderDetail.unfreeze;
							break;
						}
					}
					const time = this.endTime - curr;
					if (time > 0) {
						const days = parseInt(time / 60 / 60 / 24);
						const hours = parseInt(time / 60 / 60 % 24);
						const minutes = parseInt(time / 60 % 60);
						const seconds = parseInt(time % 60);
						let dd = 0;
						let hh = 0;
						let mm = 0;
						let ss = 0;
						if (days > 0) {
							hours = hours + (days * 24);
						}
						if (hours < 10) {
							hh = '0' + hours;
						} else {
							hh = hours;
						}
						if (minutes < 10) {
							mm = '0' + minutes;
						} else {
							mm = minutes;
						}
						if (seconds < 10) {
							ss = '0' + seconds;
						} else {
							ss = seconds;
						}
						this.countTime = hh + ':' + mm + ':' + ss;
					} else {
						this.countTime = "00:00:00";
					}
				} else {
					this.countTime = "00:00:00";
				}
			},
			toContract() {
				window.open('https://testnet.bscscan.com/address/0x6c7E8BEF251240a4caC333A125D2Dbb9575652b6', '_blank')
			}
		}
	}
</script>

<style scoped>
	.cards {
		padding: 40rpx 0;
		margin-top: -120rpx;
		position: relative;
		z-index: 1;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.card {
		width: 340rpx;
		height: 285rpx;
		border-radius: 30rpx;
		margin: 10rpx;
		position: relative;
	}

	.c1 {
		background-image: url('../../static/l1.jpg');
		background-size: 100%;
	}

	.c2 {
		background-image: url('../../static/l2.jpg');
		background-size: 100%;
	}

	.c3 {
		background-image: url('../../static/l3.jpg');
		background-size: 100%;
	}

	.c4 {
		background-image: url('../../static/l4.jpg');
		background-size: 100%;
	}

	.info {
		background: rgb(0, 0, 0, 0.8);
		width: 90%;
		position: absolute;
		bottom: 30rpx;
		left: 5%;
		text-align: center;
		border-radius: 30rpx;
		box-shadow: inset 0px 0px 4rpx 3rpx #9a13d2;
	}

	.title {
		font-family: "Josefin Sans", sans-serif;
		font-size: 28rpx;
		color: #fff;
		background: linear-gradient(98.92deg, #BD00FF 2.19%, #8102FF 98.31%);
		box-shadow: inset 8rpx 8rpx 32rpx rgba(84, 84, 84, 0.21);
		backdrop-filter: blur(10rpx);
		padding: 12rpx 0;
		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx;
	}

	.num {
		padding: 15rpx 0;
		font-size: 30rpx;
		color: #fff;
	}
</style>
