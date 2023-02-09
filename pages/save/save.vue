<template>
	<view class="content">
		<Menu></Menu>
		<view class="banner">
			<image src="../../static/contact.jpg"></image>
		</view>
		<view class="save">
			<view class="form">
				<view class="title">
					{{$t('save.title')}}
				</view>
				<view class="tab">
					<view class="in">
						<view class="unit">
							<view class="token">
								<image src="../../static/usdt.png"></image>
								<view class="token">
									USDT
								</view>
							</view>
							<view class="asset">
								{{$t('index.balance')}}：{{usdtTotal | countsFilter}}
							</view>
						</view>
						<input type="number" v-model="usdt" class="inp" :placeholder="this.$t('save.tips')" />
					</view>
					<view class="tip">
						{{$t('save.tip')}}
					</view>
					<view class="oper">
						<button class="btn" @click="grantUsdt" v-if="grantNumber == 0  && auth == 0">{{$t('other.auth')}}</button>
						<button class="btn" v-if="grantNumber == 0  && auth == 1">{{$t('other.authing')}}</button>
						<button class="btn" @click="beforSave"
							v-if="grantNumber > 0 && save == 0">{{$t('save.title')}}</button>
						<button class="btn" @click="beforSave" v-if="grantNumber > 0 && save == 1">{{$t('other.save')}}</button>
					</view>
					<view class="infos">
						<view class="l1">
							{{$t('save.t1')}}
						</view>
						<view class="items">
							<view class="item">
								{{$t('save.t2')}}
							</view>
							<view class="item">
								{{$t('save.t3')}}
							</view>
							<view class="item">
								{{$t('save.t4')}}
							</view>
						</view>
						<view class="info">
							{{$t('save.t5')}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import usdtAbi from '@/common/USDT';
	import dtmAbi from '@/common/DTM';
	import Menu from '@/components/menu/menu.vue'
	export default {
		components: {
			Menu
		},
		data() {
			return {
				usdtContract: '0x0d43B61aBE6c5aE1F41371a08da5ec26f8d74682',
				dtmContract: '0xBD63e220611Db4836Cc07daA0a61F171cB489689',
				usdtTotal: '',
				grantNumber: '',
				usdt: '',
				auth: 0,
				save: 0
			}
		},
		filters: {
			countsFilter(value) {
				if (value === 'NaN') {
					const counts = '0.0000';
					return `${counts}`;
				} else {
					const counts = parseFloat(value).toFixed(4);
					return `${counts}`;
				}
			}
		},
		onShow() {
			this.getAssets();
			this.getGrantNumber();
		},
		methods: {
			//获取余额
			async getAssets() {
				const address = uni.getStorageSync('address');
				const web3 = this.$web3;
				const abiContract = new web3.eth.Contract(usdtAbi, this.usdtContract);
				const abiTokenTotal = await abiContract.methods.balanceOf(address).call();
				this.usdtTotal = $web3.utils.fromWei(String(abiTokenTotal), 'ether');
			},
			//查询授权数量
			async getGrantNumber() {
				const address = uni.getStorageSync('address');
				const web3 = this.$web3;
				const abiContract = new web3.eth.Contract(usdtAbi, this.usdtContract);
				const abiTokenBalance = await abiContract.methods.allowance(address, this.dtmContract).call();
				this.grantNumber = abiTokenBalance;
			},
			//授权USDT
			grantUsdt() {
				this.auth = 1;
				const address = uni.getStorageSync('address');
				const web3 = this.$web3;
				const amount = $web3.utils.toWei(String('10000000'), 'ether');
				const abiContract = new web3.eth.Contract(usdtAbi, this.usdtContract);
				const that = this;
				abiContract.methods
					.approve(this.dtmContract, BigInt(amount))
					.send({
						from: address
					})
					.on('transactionHash', async hash => {
						if (hash) {
							const approveTimer = setInterval(() => {
								that.getGrantNumber();
								if (that.grantNumber > 0) {
									that.auth = 0;
									clearInterval(approveTimer)
								}
							}, 1000);
						}
					}).catch((e) => {
						uni.showToast({
							title: e.message,
							duration: 2000,
							icon: 'none',
							success() {
								that.auth = 0;
							}
						})
					});
			},
			//存款前
			beforSave() {
				if (this.usdt >= 100 && parseInt(this.usdt) % 100 == 0) {
					this.saveUsdt()
				} else {
					uni.showToast({
						title: this.$t('other.tip1'),
						duration: 2000,
						icon: 'none'
					})
				}
			},
			saveUsdt() {
				this.save = 1;
				const web3 = this.$web3;
				const fromAddress = uni.getStorageSync('address');
				const amount = $web3.utils.toWei(String(this.usdt), 'ether');
				const abiContract = new web3.eth.Contract(dtmAbi, this.dtmContract);
				const that = this;
				abiContract.methods.
				deposit(BigInt(amount)).send({
						from: fromAddress
					})
					.on('transactionHash', async hash => {
						if (hash) {
							uni.showToast({
								title: this.$t('other.yes3'),
								duration: 2000,
								icon: 'success',
								success() {
									that.save = 0;
									that.getAssets();
								}
							})
						}
					}).catch((e) => {
						uni.showToast({
							title: e.message,
							duration: 2000,
							icon: 'error',
							success() {
								that.save = 0;
								that.getAssets();
							}
						})
					})
			}
		}
	}
</script>

<style scoped>
	.content {
		background-color: #1f0644;
		height: 100%;
		background-size: 100%;
	}

	.banner image {
		width: 100%;
	}

	.save {
		padding: 0 30rpx;
		margin-top: -250rpx;
		position: relative;
		z-index: 1;
	}

	.tab {
		border: 1px solid rgba(255, 255, 255, 0.105);
		padding: 60rpx 30rpx;
		margin: 70rpx 0;
		border-radius: 20rpx;
	}

	.form {
		background-color: #1f0644;
		padding: 80rpx 30rpx;
		border-radius: 30rpx;
	}

	.title {
		text-align: center;
		color: #fff;
		font-size: 50rpx;
		font-weight: bold;
		letter-spacing: 2rpx;
	}

	.in {
		padding: 0 30rpx;
	}

	.inp {
		padding: 30rpx;
		border-radius: 30rpx;
		color: #fff;
		opacity: 0.9;
		box-shadow: inset 0px 0px 8rpx 4rpx #00a2ff;
	}

	/deep/ .uni-input-placeholder {
		color: #6180c0;
		opacity: 0.9;
		font-size: 28rpx;
	}

	.unit {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30rpx;
	}

	.token {
		display: flex;
		align-items: center;
	}

	.asset {
		color: aliceblue;
		opacity: 0.8;
	}

	.unit image {
		width: 40rpx;
		height: 40rpx;
	}

	.token {
		color: #fff;
		font-size: 34rpx;
		padding-left: 10rpx;
	}

	.tip {
		padding: 20rpx 30rpx;
		color: #fff;
		font-size: 24rpx;
		opacity: 0.8;
	}

	.infos {
		background-color: rgba(255, 255, 255, 0.06);
		border-radius: 20rpx;
		padding: 30rpx;
		color: #fff;
		margin-top: 50rpx;
	}

	.l1 {
		padding: 20rpx 0;
	}

	.item {
		line-height: 44rpx;
	}

	.info {
		margin-top: 40rpx;
		font-size: 24rpx;
	}

	.oper {
		margin-top: 40rpx;
	}

	.btn {
		width: 40%;
		box-shadow: inset 0px 0px 20rpx 10rpx #00a2ff;
		background: unset;
		border-radius: 40rpx;
		color: #fff;
		padding: 10rpx 0;
		font-size: 30rpx;
	}
</style>
