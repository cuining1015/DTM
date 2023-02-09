<template>
	<view class="content">
		<Menu @isLoad="isLoad"></Menu>
		<view class="index">
			<view class="banner">
				<image src="../../static/h1.jpg"></image>
				<view class="tip">
					<view class="tip1">{{$t('index.title')}}</view>
					<view class="tip2">
						<image src="../../static/text.png"></image>
					</view>
				</view>
			</view>
			<Info></Info>
			<view class="items">
				<view class="item i1">
					<view class="tit">
						{{$t('index.player')}}
					</view>
					<view class="nums">
						{{playersTotal}}
					</view>
					<view class="i-icon">
						<image src="../../static/i4.png"></image>
					</view>
				</view>
				<view class="item i2">
					<view class="tit">
						{{$t('index.luck')}}
					</view>
					<view class="nums">
						$ {{luckTotal | countsFilter}}
					</view>
					<view class="i-icon">
						<image src="../../static/i2.png"></image>
					</view>
				</view>
				<view class="item i3">
					<view class="tit">
						{{$t('index.top')}}
					</view>
					<view class="nums">
						$ {{topTotal | countsFilter}}
					</view>
					<view class="i-icon">
						<image src="../../static/i3.png"></image>
					</view>
				</view>
				<view class="item i4">
					<view class="tit">
						{{$t('index.fund')}}
					</view>
					<view class="nums">
						$ {{fundTotal | countsFilter}}
					</view>
					<view class="i-icon">
						<image src="../../static/i1.png"></image>
					</view>
				</view>
			</view>
			<view class="opers">
				<view class="oper" @click="toSave">
					<view class="bt">
						{{$t('index.save')}}
					</view>
					<view class="to">
						{{$t('index.enter')}}
						<uni-icons type="forward" size="15" color="#fff"></uni-icons>
					</view>
					<view class="o-icon">
						<image src="../../static/o1.png"></image>
					</view>
				</view>
				<view class="oper-c" @click="toDraw">
					<view class="c-icon">
						<image src="../../static/o2.png"></image>
					</view>
					<view class="oper-cr">
						<view class="bt">
							{{$t('index.out')}}
						</view>
						<view class="to">
							{{$t('index.enter')}}
							<uni-icons type="forward" size="15" color="#fff"></uni-icons>
						</view>
					</view>
				</view>
				<view class="oper" @click="toSplit">
					<view class="bt">
						{{$t('index.split')}}
					</view>
					<view class="to">
						{{$t('index.enter')}}
						<uni-icons type="forward" size="15" color="#fff"></uni-icons>
					</view>
					<view class="o-icon">
						<image src="../../static/o3.png"></image>
					</view>
				</view>
			</view>
			<view class="my">
				<view @click="infos" :class="showInfos ? 'infos' : 'infosed'">
					<view class="inf">
						<view class="k">
							{{$t('index.lv')}}
						</view>
						<view class="v">
							<block v-if="level == 0">{{$t('other.lv')}}</block>
							<block v-else>
								<span v-for="index of 5" :key="index">
									<image src="../../static/star.png" v-if="index <= level"></image>
								</span>
							</block>
						</view>
					</view>
					<view class="inf">
						<view class="k">
							{{$t('index.total')}}
						</view>
						<view class="v">
							{{totalIncome | assetsFilter}}
						</view>
					</view>
					<view class="inf">
						<view class="k">
							BNB {{$t('index.balance')}}
						</view>
						<view class="v">
							{{bnbTotal | assetsFilter}}
						</view>
					</view>
					<view class="inf">
						<view class="k">
							USDT {{$t('index.balance')}}
						</view>
						<view class="v">
							{{usdtTotal | assetsFilter}}
						</view>
					</view>
					<view class="inf">
						<view class="k">
							{{$t('index.referrer')}}
						</view>
						<view class="v">
							{{uperAddress | uperFilter}}
						</view>
					</view>
					<view class="inf">
						<view class="k">
							{{$t('index.link')}}
						</view>
						<view class="vl">
							<view class="url">
								{{shareUrl}}
							</view>
							<view class="copy" @click="copyUrl" id="copyBtn" :data-clipboard-text="shareUrl"
								data-clipboard-action="copy">
								Copy
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="pools">
				<view class="p-tit">
					<span :class="showLuck ? 'tname' : 'tnamed'">
						{{$t('index.luckReward')}}
					</span>
				</view>
				<view @click="luck" :class="showLuck ? 'pool' : 'pooled'">
					<view class="time">
						<view class="abc">
							<view class="abc1">
								count
							</view>
							<view class="abc1">
								down
							</view>
						</view>
						<view class="t-num">
							{{count}}
						</view>
					</view>
					<view class="box">
						<image src="../../static/nz1.png"></image>
					</view>
					<!-- <view class="qa">
						<image src="../../static/wenti.png"></image>
						<view class="qar">
							{{$t('index.tip')}}？
						</view>
					</view> -->
				</view>
				<view class="p-tits">
					<span :class="showTop ? 'tname' : 'tnamed'">
						TOP {{$t('index.reward')}}
					</span>
				</view>
				<view @click="top" :class="showTop ? 'pool' : 'pooled'">
					<view class="time">
						<view class="abc">
							<view class="abc1">
								count
							</view>
							<view class="abc1">
								down
							</view>
						</view>
						<view class="t-num">
							{{count}}
						</view>
					</view>
					<view class="box">
						<image src="../../static/nz2.png"></image>
					</view>
					<!-- <view class="qa">
						<image src="../../static/wenti.png"></image>
						<view class="qar">
							{{$t('index.tip')}}？
						</view>
					</view> -->
				</view>
			</view>
			<view class="people">
				<view class="p-icon">
					<image src="../../static/p4.png"></image>
				</view>
				<view class="pe-tit">
					<span class="tname">
						{{$t('index.new')}}
					</span>
				</view>
				<view class="table">
					<view class="th">
						<view class="td">
							{{$t('index.addr')}}
						</view>
						<view class="td">
							{{$t('index.time')}}
						</view>
						<view class="tds">
							{{$t('index.amount')}}
						</view>
					</view>
					<view class="tbody" v-if="order.length > 0">
						<view class="tr" v-for="(item,index) in order" :key="index">
							<view class="td">
								{{item.address | contractFilter}}
							</view>
							<view class="td">
								{{item.time | showDate}}
							</view>
							<view class="tds">
								${{item.amount}}
							</view>
						</view>
					</view>
					<view class="tbody-null" v-else>
						<view class="load-icons">
							<img class="an" src="../../static/progress.png" />
						</view>
					</view>
				</view>
			</view>
		</view>
		<Footer></Footer>
	</view>
</template>

<script>
	import {
		formatDate
	} from '@/plugins/filter.js';
	import Clipboard from 'clipboard'
	import Menu from '@/components/menu/menu.vue'
	import Info from '@/components/info/info.vue'
	import Footer from '@/components/footer/footer.vue'
	import usdtAbi from '@/common/USDT';
	import dtmAbi from '@/common/DTM';
	export default {
		components: {
			Menu,
			Footer,
			Info
		},
		data() {
			return {
				showLuck: true,
				showTop: true,
				showInfos: true,
				shareUrl: '',
				loading: false,
				// usdtContract: '0x55d398326f99059fF775485246999027B3197955',
				usdtContract: '0x0d43B61aBE6c5aE1F41371a08da5ec26f8d74682',
				dtmContract: '0xBD63e220611Db4836Cc07daA0a61F171cB489689',
				usdtTotal: 0,
				bnbTotal: 0,
				playersTotal: '--',
				luckTotal: 0,
				topTotal: 0,
				fundTotal: 0,
				uperAddress: '',
				level: 0,
				Samplingtime: '',
				count: '', //倒计时
				totalIncome: 0,
				order: []
			}
		},
		mounted() {
			this.Time();
		},
		onShow() {
			this.checkUser();
			this.getAssets();
			this.getBnbAssets();
			this.getOrders();
			this.getPlayers();
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
			},
			assetsFilter(value) {
				if (value === '0') {
					const counts = '0.0000';
					return `${counts}`;
				} else {
					const counts = parseFloat(value).toFixed(4);
					return `${counts}`;
				}
			},
			showDate(value) {
				let date = new Date(value * 1000);
				return formatDate(date, 'hh:mm:ss');
			}
		},
		methods: {
			//验证用户
			checkUser() {
				const address = uni.getStorageSync('address');
				this.shareUrl = 'http://dtm.hbnjtec.com/?url=' + address;
				this.CheckReg();
			},
			//验证是否注册
			async CheckReg() {
				const address = uni.getStorageSync('address');
				const web3 = this.$web3;
				const abiContract = new web3.eth.Contract(dtmAbi, this.dtmContract);
				const userinfo = await abiContract.methods.userInfo(address).call();
				this.uperAddress = userinfo.referrer;
				this.level = userinfo.level;
				this.totalIncome = $web3.utils.fromWei(String(userinfo.totalRevenue), 'ether');
			},
			isLoad(res) {
				if (res) {
					this.checkUser();
					this.getAssets();
					this.getBnbAssets();
					this.getOrders();
					this.getPlayers();
				} else {
					console.log('error')
				}
			},
			//获取USDT余额
			async getAssets() {
				const address = uni.getStorageSync('address');
				const web3 = this.$web3;
				const abiContract = new web3.eth.Contract(usdtAbi, this.usdtContract);
				const abiTokenTotal = await abiContract.methods.balanceOf(address).call();
				this.usdtTotal = $web3.utils.fromWei(String(abiTokenTotal), 'ether');
			},
			//获取NBN余额
			async getBnbAssets() {
				const address = uni.getStorageSync('address');
				const web3 = this.$web3;
				const bnb = await web3.eth.getBalance(address).then();
				this.bnbTotal = $web3.utils.fromWei(String(bnb), 'ether');
			},
			//玩家等信息...
			async getPlayers() {
				const web3 = this.$web3;
				const abiContract = new web3.eth.Contract(dtmAbi, this.dtmContract);
				const players = await abiContract.methods.totalUser().call(); //玩家
				const luck = await abiContract.methods.luckPool().call(); //幸运奖池
				const top = await abiContract.methods.topPool().call(); //top奖池
				const fund = await abiContract.methods.keepPool().call(); //保险基金
				this.playersTotal = players;
				this.luckTotal = $web3.utils.fromWei(String(luck), 'ether');
				this.topTotal = $web3.utils.fromWei(String(top), 'ether');
				this.fundTotal = $web3.utils.fromWei(String(fund), 'ether');
			},
			//倒计时
			async cuntDown() {
				// let hh = new Date().getHours();
				// let mm = new Date().getMinutes();
				// let ss = new Date().getSeconds();
				// let curSeconds = parseInt(hh * 60 * 60) + parseInt(mm * 60) + parseInt(ss);
				// let surplus = this.seconds - curSeconds;
				// let h = parseInt(surplus / (60 * 60) % 24);
				// h = h < 10 ? "0" + h : h;
				// let m = parseInt(surplus / 60 % 60);
				// m = m < 10 ? "0" + m : m;
				// let s = parseInt(surplus % 60);
				// s = s < 10 ? "0" + s : s;
				// this.count = h + ':' + m + ':' + s;
				let curTime = parseInt(new Date().getTime() / 1000) + '';
				const web3 = this.$web3;
				const abiContract = new web3.eth.Contract(dtmAbi, this.dtmContract);
				const lastTime = await abiContract.methods.lastDistribute().call(); //倒计时
				const countTime = parseInt(lastTime) + parseInt(3600);
				let time = countTime - curTime;
				if (time > 0) {
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
					this.count = hh + ':' + mm + ':' + ss;
				} else {
					this.count = '00:00:00';
				}
			},
			Time() {
				setInterval(() => {
					this.cuntDown()
				}, 1000)
			},
			//最新存款
			async getOrders() {
				const address = uni.getStorageSync('address');
				const web3 = this.$web3;
				const abiContract = new web3.eth.Contract(dtmAbi, this.dtmContract);
				const length = await abiContract.methods.OrdersLength().call();
				console.log('length', length)
				const orders = [];
				if (length > 0) {
					for (var i = length - 1; i >= 0; i--) {
						if (orders.length < 10) {
							const list = await abiContract.methods.orders(i).call();
							orders.push({
								id: i,
								address: list.user,
								time: list.start,
								amount: $web3.utils.fromWei(String(list.amount), 'ether')
							})
						}
					}
					this.order = orders;
				} else {
					console.log('order-null')
				}
			},
			toContract() {
				window.open("https://testnet.bscscan.com/address/0xBD63e220611Db4836Cc07daA0a61F171cB489689", "_blank")
			},
			toSave() {
				uni.navigateTo({
					url: '/pages/save/save'
				})
			},
			toDraw() {
				uni.navigateTo({
					url: '/pages/withdraw/withdraw'
				})
			},
			toSplit() {
				uni.navigateTo({
					url: '/pages/split/split'
				})
			},
			luck() {
				this.showLuck = !this.showLuck;
				if (this.showTop == false) {
					this.showTop = true
				}
			},
			top() {
				this.showTop = !this.showTop;
				if (this.showLuck == false) {
					this.showLuck = true
				}
			},
			infos() {
				this.showInfos = !this.showInfos;
			},
			copyUrl() {
				let clipboard = new Clipboard('#copyBtn');
				clipboard.on('success', e => {
					uni.showToast({
						title: this.$t('common.success'),
						duration: 2000,
						icon: 'success'
					});
					clipboard.destroy()
				})
				clipboard.on('error', e => {
					uni.showToast({
						title: this.$t('common.fail'),
						duration: 2000,
						icon: 'error'
					});
					clipboard.destroy()
				})
			}
		}
	}
</script>

<style scoped>
	.content {
		background-image: url('../../static/t2-t-bg.jpg');
		height: 100%;
		background-size: 100%;
	}

	.index {
		margin-bottom: -360rpx;
		position: relative;
		z-index: 2;
	}

	.banner {
		position: relative;
	}

	.banner image {
		width: 100%;
		height: 660rpx;
	}

	.tip {
		position: absolute;
		z-index: 1;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -30%);
	}

	.tip1 {
		text-align: center;
		font-size: 42rpx;
		color: #fff;
		font-style: oblique;
		font-family: "Josefin Sans", sans-serif;
		font-weight: bold;
		text-shadow: 0px -5rpx 3rpx rgb(12 19 55 / 0%), 0 -1rpx 4rpx #1b7ae2, 0 -2rpx 10rpx #1b7ae2, 0 -10rpx 20rpx #1b7ae2, 0 -18rpx 40rpx #1b7ae2;
	}

	.tip2 image {
		height: 86rpx;
		width: 460rpx;
	}

	.items {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.item {
		width: 270rpx;
		height: 150rpx;
		border-radius: 20rpx;
		margin: 15rpx;
		position: relative;
		padding: 20rpx;
		font-family: "Josefin Sans", sans-serif;
	}

	.i1 {
		background: linear-gradient(107.11deg, #8F00FF 2.55%, #5F12FF 43.66%);
	}

	.i2 {
		background: linear-gradient(106.57deg, #00B2FF 0%, #001AFF 100%);
	}

	.i3 {
		background: linear-gradient(107.74deg, #23DAE6 0%, #00A5C9 101.82%);
	}

	.i4 {
		background: linear-gradient(106.57deg, #FA3BE7 0%, #B9006F 100%);
	}

	.i-icon {
		position: absolute;
		bottom: 0;
		right: 20rpx;
	}

	.tit {
		color: #fff;
		font-size: 32rpx;
		letter-spacing: 1rpx;
		margin-top: 20rpx;
	}

	.nums {
		color: #fff;
		font-size: 34rpx;
		position: absolute;
		bottom: 24rpx;
		left: 30rpx;
	}

	.i-icon image {
		width: 130rpx;
		height: 130rpx;
	}

	.opers {
		padding: 80rpx 20rpx;
	}

	.oper {
		box-shadow: inset 0px 0px 20rpx 10rpx #9a13d2;
		padding: 40rpx 30rpx;
		border-radius: 20rpx;
		font-family: "Josefin Sans", sans-serif;
		margin-bottom: 50rpx;
		position: relative;
		background-color: rgba(122, 27, 180, 0.2);
	}

	.oper-c {
		box-shadow: inset 0px 0px 20rpx 10rpx #9a13d2;
		padding: 40rpx 30rpx;
		border-radius: 20rpx;
		font-family: "Josefin Sans", sans-serif;
		margin-bottom: 50rpx;
		position: relative;
		background-color: rgba(122, 27, 180, 0.2);
	}

	.oper-cr {
		text-align: right;
	}

	.bt {
		color: #fff;
		font-size: 34rpx;
		margin-bottom: 20rpx;
		font-weight: bold;
	}

	.to {
		color: #fff;
		opacity: 0.6;
	}

	.o-icon {
		position: absolute;
		top: -40rpx;
		right: 30rpx;
	}

	.o-icon image {
		width: 200rpx;
		height: 200rpx;
	}

	.c-icon {
		position: absolute;
		top: -40rpx;
		left: 30rpx;
	}

	.c-icon image {
		width: 200rpx;
		height: 200rpx;
	}

	.pools {
		padding: 0 50rpx;
	}

	.pool {
		box-shadow: inset 0px 0px 20rpx 10rpx #684dd2;
		border-radius: 20rpx;
		padding: 30rpx;
		margin-bottom: 50rpx;
		transition: all 0.3s;
	}

	.pooled {
		box-shadow: inset 0px 0px 20rpx 10rpx #fea036;
		border-radius: 20rpx;
		padding: 30rpx;
		margin-bottom: 50rpx;
		transition: all 0.3s;
	}

	.p-tit {
		text-align: center;
		font-size: 50rpx;
		font-weight: bold;
		margin: 80rpx 0;
		text-stroke: 2rpx #9239FF;
		-webkit-text-stroke: 2rpx #9239FF;
		color: #fff;
		font-style: oblique;
	}

	.p-tits {
		text-align: center;
		font-size: 50rpx;
		font-weight: bold;
		margin-top: 120rpx;
		margin-bottom: 80rpx;
		text-stroke: 2rpx #9239FF;
		-webkit-text-stroke: 2rpx #9239FF;
		color: #fff;
		font-style: oblique;
	}

	.tname {
		box-shadow: inset 0px 0px 20rpx 10rpx #684dd2;
		padding: 30rpx 50rpx;
		border-radius: 50rpx;
	}

	.tnamed {
		box-shadow: inset 0px 0px 20rpx 10rpx #fea036;
		padding: 30rpx 50rpx;
		border-radius: 50rpx;
	}

	.time {
		margin: 50rpx auto;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #46007E;
		width: 88%;
		border-radius: 10rpx;
		border: 1rpx solid #9239FF;
		padding: 10rpx 0;
	}

	.abc {
		margin-right: 30rpx;
		font-size: 40rpx;
		font-weight: bold;
		font-style: oblique;
		color: #236EFF;
	}

	.qa {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		opacity: 0.6;
		margin-top: -30rpx;
		margin-right: 30rpx;
	}

	.qa image {
		width: 34rpx;
		height: 34rpx;
	}

	.qar {
		font-size: 24rpx;
		color: #fff;
		margin-left: 10rpx;
	}

	.djs {
		padding: 0 20rpx;
		font-size: 42rpx;
		letter-spacing: 1rpx;
		color: #236DFE;
	}

	.t-icon {
		width: 44rpx;
		height: 44rpx;
	}

	.t-num {
		color: #fff;
		font-size: 50rpx;
		line-height: 80rpx;
		font-weight: bold;
		letter-spacing: 4rpx;
		font-family: "Josefin Sans", sans-serif;
	}

	.box {
		text-align: center;
		padding-bottom: 30rpx;
	}

	.box image {
		width: 456rpx;
		height: 426rpx;
	}

	.p-name {
		text-align: center;
		font-family: "Josefin Sans", sans-serif;
		color: #9a13d2;
		font-size: 40rpx;
		font-weight: bold;
		margin-bottom: 20rpx;
	}

	.people {
		margin-top: 80rpx;
		padding: 20rpx;
	}

	.p-icon {
		text-align: center;
	}

	.p-icon image {
		width: 177rpx;
		height: 155rpx;
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
		padding: 30rpx 0;
	}

	.table {
		margin-top: 30rpx;
		padding: 50rpx 30rpx;
		border-radius: 30rpx;
		box-shadow: inset 0px 0px 20rpx 10rpx #6e51df;
		background: rgba(45, 20, 100, 0.8);
		min-height: 500rpx;
	}

	.tbody {
		height: 490rpx;
		overflow-y: auto;
	}

	.th {
		color: #fff;
		display: flex;
		margin-bottom: 1rpx;
		padding: 20rpx 0;
		font-weight: bold;
		opacity: 0.8;
	}

	.th .td {
		width: 35%;
		text-align: center;
	}

	.th .tds {
		width: 30%;
		text-align: center;
	}

	.tr {
		margin-bottom: 10rpx;
		display: flex;
		padding: 10rpx 0;
		font-size: 28rpx;
		border: 1rpx solid #4d096d;
		border-radius: 10rpx;
		background: rgba(45, 20, 100, 0.6);
	}

	.tr .td {
		color: #cfcffd;
		width: 35%;
		text-align: center;
	}

	.tr .tds {
		color: #cfcffd;
		width: 30%;
		text-align: center;
	}

	.my {
		padding-bottom: 50rpx;
	}

	.m-tit {
		text-align: center;
		color: #fa009f;
		font-size: 60rpx;
		font-family: "Josefin Sans", sans-serif;
		font-weight: bold;
		line-height: 80rpx;
		margin-bottom: 20rpx;
	}

	.infos {
		box-shadow: inset 0px 20rpx 20rpx -15rpx #684dd2, inset 0px -20rpx 20rpx -15rpx #684dd2;
		padding: 40rpx;
		transition: all 0.3s;
	}

	.infosed {
		box-shadow: inset 0px 20rpx 20rpx -15rpx #fcc310, inset 0px -20rpx 20rpx -15rpx #fcc310;
		padding: 40rpx;
		transition: all 0.3s;
	}

	.inf {
		display: flex;
		justify-content: space-between;
		color: #fcc310;
		padding: 16rpx 0;
		font-size: 30rpx;
		font-weight: bold;
		font-family: "Josefin Sans", sans-serif;
		align-items: center;
	}

	.v image {
		width: 54rpx;
		height: 54rpx;
	}

	.vl {
		display: flex;
		align-items: center;
	}

	.url {
		width: 300rpx;
		overflow-x: auto;
		font-weight: 400;
	}

	.copy {
		margin-left: 20rpx;
		background: linear-gradient(107.11deg, #8F00FF 2.55%, #5F12FF 43.66%);
		color: #fff;
		font-family: "Josefin Sans", sans-serif;
		padding: 0 16rpx;
		border-radius: 20rpx;
		font-weight: 400;
	}

	.tbody-null {
		position: relative;
		height: 490rpx;
	}

	.load-icons {
		position: absolute;
		top: 30%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
		z-index: inherit;
	}
</style>
