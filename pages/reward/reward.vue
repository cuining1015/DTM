<template>
	<view class="content">
		<Menu></Menu>
		<view class="reward">
			<view class="banner">
				<image src="../../static/games.jpg"></image>
				<view class="tip">
					Congratulations to the Winner
				</view>
			</view>
			<Info></Info>
			<view @click="luckAward" :class="showLuckAward ? 'award' : 'awarded'">
				<view class="aw-icon">
					<image src="../../static/p2.png"></image>
				</view>
				<view class="pe-tit">
					<span class="tname">
						{{$t('winner.luck')}}
					</span>
				</view>
				<view class="players" v-if="topList.length > 0">
					<view class="player p2">
						<image src="../../static/top2.png"></image>
						<view class="addrs">
							{{luckTopList[1].user | addrFilter}}
						</view>
						<view class="cash">
							<image src="../../static/bi.png" class="bis"></image>
							<view class="cash-num">
								{{luckTopList[1].cash | assetsFilter}}
							</view>
						</view>
					</view>
					<view class="player p1">
						<image src="../../static/top1.png"></image>
						<view class="addrs">
							{{luckTopList[0].user | addrFilter}}
						</view>
						<view class="cash">
							<image src="../../static/bi.png" class="bis"></image>
							<view class="cash-num">
								{{luckTopList[0].cash | assetsFilter}}
							</view>
						</view>
					</view>
					<view class="player p2">
						<image src="../../static/top3.png"></image>
						<view class="addrs">
							{{luckTopList[2].user | addrFilter}}
						</view>
						<view class="cash">
							<image src="../../static/bi.png" class="bis"></image>
							<view class="cash-num">
								{{luckTopList[2].cash | assetsFilter}}
							</view>
						</view>
					</view>
				</view>
				<view class="tab" v-if="luckOtherList.length > 0">
					<view class="line" v-for="(item,index) in luckOtherList" :key="index">
						<view class="rank">
							<image src="../../static/DJ_4.png" class="r-icon" v-if="index == 0"></image>
							<image src="../../static/DJ_5.png" class="r-icon" v-if="index == 1"></image>
							<image src="../../static/DJ_6.png" class="r-icon" v-if="index == 2"></image>
							<image src="../../static/DJ_7.png" class="r-icon" v-if="index == 3"></image>
							<image src="../../static/DJ_8.png" class="r-icon" v-if="index == 4"></image>
							<image src="../../static/DJ_9.png" class="r-icon" v-if="index == 5"></image>
							<image src="../../static/DJ_10.png" class="r-icon" v-if="index == 6"></image>
						</view>
						<view class="addr">
							{{item.user | uperFilter}}
						</view>
						<view class="money">
							<image src="../../static/bi.png" class="bi"></image>
							<view class="b-num">
								{{item.cash | assetsFilter}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view @click="topAward" :class="showTopAward ? 'top' : 'toped'">
				<view class="top-icon">
					<image src="../../static/p1.png"></image>
				</view>
				<view class="pe-tit">
					<span class="tname">
						{{$t('winner.top')}}
					</span>
				</view>
				<view class="tabs">
					<view class="linet" v-for="(item,index) in topList" :key="index">
						<view class="rankt">
							<image src="../../static/t1.png" class="t-icon" v-if="item.id == 0"></image>
							<image src="../../static/t2.png" class="t-icon" v-if="item.id == 1"></image>
							<image src="../../static/t3.png" class="t-icon" v-if="item.id == 2"></image>
						</view>
						<view class="pinfo">
							<view class="addrt">
								{{item.user | uperFilter}}
							</view>
							<view class="moneyt">
								<image src="../../static/bi.png" class="bi"></image>
								<view class="b-num">
									{{item.cash | assetsFilter}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="loading" v-if="loading">
				<view class="load-icon">
					<img class="an" src="../../static/progress.png" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import dtmAbi from '@/common/DTM';
	import Menu from '@/components/menu/menu.vue'
	import Info from '@/components/info/info.vue'
	export default {
		components: {
			Menu,
			Info
		},
		data() {
			return {
				showLuckAward: true,
				showTopAward: true,
				dtmContract: '0xBD63e220611Db4836Cc07daA0a61F171cB489689',
				luckList: [],
				luckTopList: [],
				luckOtherList: [],
				topList: [],
				loading: false
			}
		},
		created() {
			this.getLuck();
			this.getTop();
		},
		filters: {
			uperFilter(value) {
				if (value) {
					const start = value.slice(0, 8);
					const end = value.slice(-8);
					return `${start}***${end}`;
				}
			},
			addrFilter(value) {
				if (value) {
					const start = value.slice(0, 4);
					const end = value.slice(-4);
					return `${start}***${end}`;
				}
			},
			assetsFilter(value) {
				if (value === '0') {
					const counts = '0.0000';
					return `${counts}`;
				} else {
					const counts = parseFloat(value).toFixed(4);
					return `${counts}`;
				}
			}
		},
		methods: {
			async getLuck() {
				this.loading = true;
				let address = uni.getStorageSync('address');
				let web3 = this.$web3;
				let abiContract = new web3.eth.Contract(dtmAbi, this.dtmContract);
				let curDay = await abiContract.methods.getCurDay().call(); //当前天数
				let day = curDay - 1; //当前天数
				let nums = await abiContract.methods.getDayLuckLength(day).call(); //总数
				let list = [];
				for (var i = 0; i < 10; i++) {
					if (i < nums) {
						let luck = await abiContract.methods.dayLuckUsers(day, i).call(); //幸运
						let cash = $web3.utils.fromWei(String(luck.profit), 'ether');
						if (cash > 0) {
							list.push({
								id: i,
								user: luck.user,
								cash: cash
							})
						} else {
							let user = '0x0000000000000000000000000000000000000000';
							let cash = '0.0000';
							list.push({
								id: i,
								user: user,
								cash: cash
							})
						}
					} else {
						let user = '0x0000000000000000000000000000000000000000';
						let cash = '0.0000';
						list.push({
							id: i,
							user: user,
							cash: cash
						})
					}
				}
				if (list.length == 10) {
					this.loading = false;
					this.luckList = list;
					this.luckList.sort(function(a, b) {
						return a.cash - b.cash
					});
					this.luckList = this.luckList.reverse();
					this.luckTopList = this.luckList;
					this.luckOtherList = this.luckList.slice(3, 10);
				}
			},
			async getTop() {
				const address = uni.getStorageSync('address');
				const web3 = this.$web3;
				const abiContract = new web3.eth.Contract(dtmAbi, this.dtmContract);
				const curDay = await abiContract.methods.getCurDay().call(); //当前天数
				const day = curDay - 1; //当前天数
				for (var i = 0; i < 3; i++) {
					const top = await abiContract.methods.dayTopUsers(day, i).call(); //top
					const cash = $web3.utils.fromWei(String(top.profit), 'ether');
					if (cash > 0) {
						this.topList.push({
							id: i,
							user: top.user,
							cash: cash
						})
					} else {
						let users = '0x0000000000000000000000000000000000000000';
						let cashs = '0.0000';
						this.topList.push({
							id: i,
							user: users,
							cash: cashs
						})
					}

				}
			},
			luckAward() {
				this.showLuckAward = !this.showLuckAward;
			},
			topAward() {
				this.showTopAward = !this.showTopAward;
			}
		}
	}
</script>

<style scoped>
	.content {
		background-image: url('../../static/t2-t-bg.jpg');
		height: 100%;
		background-size: 100%;
		padding-bottom: 100rpx;
	}

	.banner {
		position: relative;
	}

	.banner image {
		width: 100%;
		height: 460rpx;
	}

	.tip {
		position: absolute;
		top: 56%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
		font-size: 50rpx;
		line-height: 60rpx;
		color: #fff;
		font-style: oblique;
		font-family: "Josefin Sans", sans-serif;
		font-weight: bold;
		text-shadow: 0px -5rpx 3rpx rgb(12 19 55 / 0%), 0 -1rpx 4rpx #1b7ae2, 0 -2rpx 10rpx #1b7ae2, 0 -10rpx 20rpx #1b7ae2, 0 -18rpx 40rpx #1b7ae2;
	}

	.award {
		margin-top: 40rpx;
		background: linear-gradient(159.74deg, rgba(72, 23, 145, 0.6) 0%, rgba(34, 0, 118, 0.3) 97.38%);
		padding: 80rpx 30rpx;
		border-radius: 40rpx;
		box-shadow: inset 0px 0px 14rpx 7rpx #684dd2;
		transition: all 0.3s;
		background-image: url('../../static/bg2.png');
	}

	.awarded {
		margin-top: 80rpx;
		background: linear-gradient(159.74deg, rgba(72, 23, 145, 0.8) 0%, rgba(34, 0, 118, 0.4) 97.38%);
		padding: 80rpx 30rpx;
		border-radius: 40rpx;
		box-shadow: inset 0px 0px 14rpx 7rpx #fec414;
		transition: all 0.3s;
		background-image: url('../../static/bg2.png');
	}

	.pe-tit {
		text-align: center;
		color: #fff;
		font-size: 44rpx;
		font-family: "Josefin Sans", sans-serif;
		font-weight: bold;
		line-height: 80rpx;
		letter-spacing: 1rpx;
		text-stroke: 2rpx #9a13d2;
		-webkit-text-stroke: 2rpx #9a13d2;
		font-style: oblique;
		margin-top: 20rpx;
	}

	.tname {
		box-shadow: inset 0px 0px 20rpx 10rpx #684dd2;
		padding: 30rpx 50rpx;
		border-radius: 50rpx;
	}

	.aw-icon {
		text-align: center;
		margin-bottom: 20rpx;
	}

	.aw-icon image {
		width: 143rpx;
		height: 152rpx;
	}

	.top-icon {
		text-align: center;
	}

	.top-icon image {
		width: 149rpx;
		height: 118rpx;
	}

	.tab {
		margin-top: 130rpx;
	}

	.tabs {
		margin-top: 50rpx;
	}

	.line {
		display: flex;
		color: #fff;
		padding: 20rpx 0;
		align-items: center;
		background: rgba(45, 20, 100, 0.6);
		margin-bottom: 20rpx;
		border-radius: 20rpx;
		border: 1rpx solid #571a83;
	}

	.rank {
		width: 20%;
		text-align: center;
	}

	.addr {
		width: 50%;
	}

	.money {
		display: flex;
		align-items: center;
		color: #FCF43E;
	}

	.bi {
		width: 44rpx;
		height: 44rpx;
	}

	.b-num {
		margin-left: 10rpx;
	}

	.r-icon {
		width: 54rpx;
		height: 54rpx;
	}

	.lucky {
		margin-top: 100rpx;
		background-color: rgba(122, 27, 180, 0.2);
		padding: 80rpx 30rpx;
		border-radius: 40rpx;
	}

	.ti-icon {
		width: 46rpx;
		height: 46rpx;
	}

	.t-icon {
		width: 140rpx;
		height: 140rpx;
	}

	.top {
		margin-top: 100rpx;
		background-color: rgba(122, 27, 180, 0.2);
		padding: 80rpx 30rpx;
		border-radius: 40rpx;
		box-shadow: inset 0px 0px 14rpx 7rpx #9a13d2;
		transition: all 0.3s;
		background-image: url('../../static/bg2.png');
	}

	.toped {
		margin-top: 100rpx;
		background-color: rgba(122, 27, 180, 0.2);
		padding: 80rpx 30rpx;
		border-radius: 40rpx;
		box-shadow: inset 0px 0px 14rpx 7rpx #fec414;
		transition: all 0.3s;
		background-image: url('../../static/bg2.png');
	}

	.players {
		display: flex;
		position: relative;
		padding: 50rpx 4%;
		height: 140rpx;
		margin-top: 100rpx;
	}

	.player {
		color: #fff;
	}

	.p2 {
		width: 34%;
		text-align: center;
		position: relative;
		border-bottom: 0;
	}

	.p2 image {
		width: 140rpx;
		height: 140rpx;
	}

	.p1 {
		width: 40%;
		text-align: center;
		margin-top: -80rpx;
	}

	.p1 image {
		width: 220rpx;
		height: 220rpx;
	}

	.addrs {
		line-height: 60rpx;
		font-family: "Josefin Sans", sans-serif;
	}

	.cash {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #37008E;
		border-radius: 30rpx;
		padding: 6rpx 0;
		font-family: "Josefin Sans", sans-serif;
		width: 88%;
		margin: 0 auto;
	}

	.bis {
		width: 36rpx !important;
		height: 36rpx !important;
	}

	.cash-num {
		padding-left: 6rpx;
		font-size: 24rpx;
	}

	.linet {
		display: flex;
		color: #fff;
		padding: 20rpx 0;
		align-items: center;
		background: rgba(45, 20, 100, 0.6);
		margin-bottom: 20rpx;
		border-radius: 20rpx;
		border: 1rpx solid #571a83;
	}

	.rankt {
		width: 30%;
		text-align: center;
	}

	.addrt {
		font-size: 30rpx;
		margin-bottom: 20rpx;
	}

	.moneyt {
		font-size: 32rpx;
		display: flex;
		align-items: center;
		color: #FCF43E;
	}
</style>
