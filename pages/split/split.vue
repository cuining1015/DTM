<template>
	<view class="content">
		<Menu></Menu>
		<view class="banner">
			<image src="../../static/contact.jpg"></image>
		</view>
		<view class="save">
			<view class="form">
				<view class="title">
					{{$t('split.title')}}
				</view>
				<view class="tab">
					<view class="in">
						<view class="unit">
							<view class="token">
								{{$t('split.save')}} (USDT)
							</view>
							<view class="blance">
								{{$t('split.balance')}}：{{split | countsFilter}}
							</view>
						</view>
						<input type="number" class="inp" v-model="usdt" :placeholder="this.$t('split.t1')" />
					</view>
					<view class="tip">
						{{$t('split.tip')}}
					</view>
					<view class="oper">
						<button class="btn" @click="beforSave" v-if="save == 0">{{$t('save.title')}}</button>
						<button class="btn" v-if="save == 1">{{$t('other.save')}}</button>
					</view>
				</view>
				<view class="tab">
					<view class="in">
						<view class="unit">
							<view class="token">
								{{$t('split.change')}} (USDT)
							</view>
							<view class="blance">
								{{$t('split.balance')}}：{{split | countsFilter}}
							</view>
						</view>
						<input type="number" v-model="usdts" class="inp" :placeholder="this.$t('split.t1')" />
						<view class="units">
							<view class="token">
								{{$t('split.addr')}}
							</view>
						</view>
						<input class="inp" v-model="toAddr" :placeholder="this.$t('split.t2')" />
					</view>
					<view class="tip">
						{{$t('split.t3')}}
					</view>
					<view class="oper">
						<button class="btn" @click="before" v-if="change == 0">{{$t('split.change')}}</button>
						<button class="btn" v-if="change == 1">{{$t('other.draw')}}</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import dtmAbi from '@/common/DTM';
	import usdtAbi from '@/common/USDT';
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
				usdt: '',
				usdts: '',
				toAddr: '',
				save: 0,
				split: 0,
				change: 0
			}
		},
		onShow() {
			this.getInfos();
		},
		filters: {
			countsFilter(value) {
				if (value === '0') {
					const counts = 0;
					return `${counts}`;
				} else {
					const counts = parseFloat(value).toFixed(4);
					return `${counts}`;
				}
			}
		},
		methods: {
			//存款前
			beforSave() {
				if (this.usdt >= 100 && parseInt(this.usdt) < parseInt(this.split) && parseInt(this.usdt) % 100 == 0) {
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
				depositBySplit(BigInt(amount)).send({
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
									that.getInfos();
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
								that.getInfos();
							}
						})
					})
			},
			//资产
			async getInfos() {
				const address = uni.getStorageSync('address');
				const web3 = this.$web3;
				const abiContract = new web3.eth.Contract(dtmAbi, this.dtmContract);
				const incomes = await abiContract.methods.rewardInfo(address).call();
				this.split = $web3.utils.fromWei(String(incomes.split), 'ether');
			},
			//拆分
			before() {
				if (this.toAddr && this.usdts >= 100 && parseInt(this.usdts) < parseInt(this.split)) {
					if (parseInt(this.usdts % 100) == 0) {
						this.exchange()
					} else {
						uni.showToast({
							title: this.$t('other.tip1'),
							duration: 2000,
							icon: 'error'
						})
					}
				} else {
					uni.showToast({
						title: this.$t('other.tip2'),
						duration: 2000,
						icon: 'error'
					})
				}
			},
			async exchange() {
				this.change = 1;
				const address = uni.getStorageSync('address');
				const web3 = this.$web3;
				const abiContract = new web3.eth.Contract(dtmAbi, this.dtmContract);
				const fromAddress = uni.getStorageSync('address');
				const amount = $web3.utils.toWei(String(this.usdts), 'ether');
				const toAddress = this.toAddr;
				const that = this;
				abiContract.methods.
				transferBySplit(toAddress, BigInt(amount)).send({
						from: fromAddress
					})
					.on('transactionHash', async hash => {
						if (hash) {
							that.change = 0;
							uni.showToast({
								title: this.$t('other.yes4'),
								duration: 2000,
								icon: 'success'
							})
						}
					}).catch((e) => {
						uni.showToast({
							title: e.message,
							duration: 2000,
							icon: 'error',
							success() {
								that.change = 0;
								that.getInfos();
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
		border-radius: 10rpx;
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
		margin-bottom: 30rpx;
		display: flex;
		justify-content: space-between;
	}

	.blance {
		color: #dadada;
	}

	.units {
		margin: 30rpx 0;
	}

	.token {
		color: #fff;
		font-size: 32rpx;
		padding-left: 10rpx;
	}

	.tip {
		padding: 20rpx 30rpx;
		color: #fff;
		font-size: 24rpx;
		opacity: 0.8;
	}

	.oper {
		margin-top: 60rpx;
	}

	.btn {
		width: 40%;
		box-shadow: inset 0px 0px 18rpx 10rpx #00a2ff;
		background: unset;
		border-radius: 50rpx;
		color: #fff;
		padding: 10rpx 0;
		font-size: 30rpx;
	}
</style>
