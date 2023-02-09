<template>
	<view class="content">
		<Menu></Menu>
		<view class="team">
			<view class="banner">
				<image src="../../static/h5.jpg"></image>
				<view class="tip">
					<view class="tip1">Deposit details</view>
				</view>
			</view>
			<Info></Info>
			<view class="table">
				<view class="icon">
					<image src="../../static/b8.png"></image>
				</view>
				<view class="titles">
					{{$t('deposit.title')}}
				</view>
				<view class="tab">
					<view class="th">
						<view class="td1">
							{{$t('deposit.nums')}}
						</view>
						<view class="td2">
							{{$t('deposit.save')}}
						</view>
						<view class="td2">
							{{$t('deposit.thaw')}}
						</view>
						<view class="td1">
							{{$t('deposit.income')}}
						</view>
						<view class="td1">
							{{$t('deposit.status')}}
						</view>
					</view>
					<view class="tobody" v-if="recordList.length > 0">
						<view class="tr" v-for="(item,index) in recordList" :key="index">
							<view class="td1">
								${{item.amount}}
							</view>
							<view class="td2">
								{{item.startTime | showDate}}
							</view>
							<view class="td2">
								{{item.unfreeTime | showDate}}
							</view>
							<view class="td1 re">
								${{item.profit | assetsFilter}}
							</view>
							<view class="td1 link" v-if="item.isUnfreezed == false">
								<span v-if="item.isLink == 0">
									{{$t('deposit.freeze')}}
								</span>
								<span v-if="item.isLink == 1">
									{{$t('deposit.wait')}}
								</span>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		formatDate
	} from '@/plugins/filter.js';
	import dtmAbi from '@/common/DTM'
	import Menu from '@/components/menu/menu.vue'
	import Info from '@/components/info/info.vue'
	export default {
		components: {
			Menu,
			Info
		},
		data() {
			return {
				dtmContract: '0xBD63e220611Db4836Cc07daA0a61F171cB489689',
				recordList: []
			}
		},
		created() {
			this.getRecord()
		},
		filters: {
			showDate(value) {
				let date = new Date(value * 1000);
				return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
			},
			assetsFilter(value) {
				if (value === '0') {
					const counts = '0.00';
					return `${counts}`;
				} else {
					const counts = parseFloat(value).toFixed(2);
					return `${counts}`;
				}
			}
		},
		methods: {
			async getRecord() {
				const address = uni.getStorageSync('address');
				// const address = '0x1187886FADC34b11d7c2BD2F285c468A9a74329f';
				const web3 = this.$web3;
				const abiContract = new web3.eth.Contract(dtmAbi, this.dtmContract);
				const length = await abiContract.methods.getOrderLength(address).call();
				const fee = await abiContract.methods.Reduceproduction().call();
				if (length > 0) {
					for (var i = 0; i < length; i++) {
						const list = await abiContract.methods.orderInfos(address, i).call();
						const curTime = parseInt(new Date().getTime() / 1000) + '';
						let isLink = 0;
						if (list.unfreeze < curTime) {
							isLink = 1
						}
						const amount = $web3.utils.fromWei(String(list.amount), 'ether');
						const profits = $web3.utils.fromWei(String(list.profit), 'ether');
						if (list.isUnfreezed == false) {
							this.recordList.push({
								id: i,
								address: list.user,
								startTime: list.start,
								unfreeTime: list.unfreeze,
								isUnfreezed: list.isUnfreezed,
								profit: profits,
								amount: amount,
								isLink: isLink
							})
						}
					}
				} else {
					console.log('order-null')
				}
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
		z-index: 1;
		top: 54%;
		left: 40rpx;
		transform: translateY(-40%);
	}

	.tip1 {
		text-align: center;
		font-size: 60rpx;
		line-height: 50rpx;
		color: #F705F4;
		font-style: oblique;
		font-family: "Josefin Sans", sans-serif;
		font-weight: bold;
		text-shadow: 0px -5rpx 3rpx rgb(12 19 55 / 0%), 0 -1rpx 4rpx #1b7ae2, 0 -2rpx 10rpx #1b7ae2, 0 -10rpx 20rpx #1b7ae2, 0 -18rpx 40rpx #1b7ae2;
	}

	.tip2 image {
		height: 86rpx;
		width: 460rpx;
	}

	.table {
		margin-top: 50rpx;
		padding: 0 10rpx;
	}

	.icon {
		text-align: center;
	}

	.icon image {
		width: 187rpx;
		height: 187rpx;
	}

	.titles {
		background: linear-gradient(to right, #913AFF, #CC00FF);
		-webkit-background-clip: text;
		color: transparent;
		text-align: center;
		font-family: "Josefin Sans", sans-serif;
		font-weight: bold;
		font-size: 54rpx;
		padding: 20rpx 0;
		margin-bottom: 30rpx;
	}

	.tab {
		padding: 30rpx 0;
		box-shadow: inset 0px 0px 20rpx 10rpx #9a13d2;
		border-radius: 30rpx;
		overflow-x: auto;
	}

	.th {
		display: flex;
		color: #b9b9b9;
		line-height: 80rpx;
		width: 1200rpx;
		overflow-x: auto;
	}

	.td1 {
		width: 20%;
		text-align: center;
	}

	.td2 {
		width: 32%;
		text-align: center;
	}
	
	.tobody {
		min-height: 120rpx;
	}

	.tr {
		display: flex;
		border-radius: 6rpx;
		padding: 10rpx 0;
		margin-bottom: 10rpx;
		color: #EB00FF;
		font-size: 24rpx;
		width: 1200rpx;
		overflow-x: auto;
		font-family: "Josefin Sans", sans-serif;
		background: linear-gradient(90deg, rgba(145, 58, 255, 0.3) 0%, rgba(204, 0, 255, 0.3) 100%);
	}

	.re {
		color: #FFE600;
	}

	.link {
		color: #FFE600;
	}

	.wait {
		color: #00a2ff;
	}
</style>
