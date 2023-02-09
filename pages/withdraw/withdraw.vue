<template>
	<view class="content">
		<Menu></Menu>
		<view class="banner">
			<image src="../../static/contact.jpg"></image>
		</view>
		<view class="save">
			<view class="form">
				<view class="title">
					{{$t('out.title')}}
				</view>
				<view class="tab">
					<view class="item">
						<view class="left">
							{{$t('out.ben')}}
						</view>
						<view class="right">
							{{benjin | assetsFilter}} USDT
						</view>
					</view>
					<view class="item">
						<view class="left">
							{{$t('out.income')}}
						</view>
						<view class="right">
							{{income | assetsFilter}} USDT
						</view>
					</view>
					<view class="item">
						<view class="left">
							Level1-4 {{$t('out.reward')}}
						</view>
						<view class="right">
							{{lv4 | assetsFilter}} USDT
						</view>
					</view>
					<view class="item5">
						<view class="lv5">
							<view class="left">
								Level5 {{$t('out.reward')}}
							</view>
							<view class="right">
								{{lv5Can | assetsFilter}} USDT
							</view>
						</view>
						<view class="dj">
							<view class="left">
								{{$t('out.freeze')}}
							</view>
							<view class="right">
								{{lv5Free | assetsFilter}} USDT
							</view>
						</view>
					</view>
					<view class="item">
						<view class="left">
							{{$t('out.luck')}}
						</view>
						<view class="right">
							{{luck | assetsFilter}} USDT
						</view>
					</view>
					<view class="item">
						<view class="left">
							{{$t('out.top')}}
						</view>
						<view class="right">
							{{top | assetsFilter}} USDT
						</view>
					</view>
					<view class="item">
						<view class="left">
							{{$t('out.fund')}}
						</view>
						<view class="right">
							{{fund | assetsFilter}} USDT
						</view>
					</view>
					<view class="total">
						<view class="tit">
							{{$t('out.ok')}}
						</view>
						<view class="right">
							{{total | assetsFilter}} USDT
						</view>
					</view>
				</view>
				<view class="oper">
					<button class="btn" @click="widthDraw" v-if="draw == 0">{{$t('out.draw')}}</button>
					<button class="btn" v-if="draw == 1">{{$t('other.draw')}}</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import dtmAbi from '@/common/DTM';
	import Menu from '@/components/menu/menu.vue'
	export default {
		components: {
			Menu
		},
		data() {
			return {
				dtmContract: '0xBD63e220611Db4836Cc07daA0a61F171cB489689',
				assets: [],
				benjin: '',
				income: '',
				lv4: '',
				lv5Can: '',
				lv5Free: '',
				luck: '',
				top: '',
				fund: '',
				draw: 0
			}
		},
		filters: {
			assetsFilter(value) {
				if (value === 'NaN') {
					const counts = '0.0000';
					return `${counts}`;
				} else {
					const counts = parseFloat(value).toFixed(4);
					return `${counts}`;
				}
			}
		},
		created() {
			this.getInfos();
		},
		computed: {
			total: function() {
				return Number(this.benjin) + Number(this.income) + Number(this.lv4) +
					Number(this.lv5Can) + Number(this.luck) + Number(this.top);
			}
		},
		methods: {
			//资产
			async getInfos() {
				const address = uni.getStorageSync('address');
				const web3 = this.$web3;
				const abiContract = new web3.eth.Contract(dtmAbi, this.dtmContract);
				const incomes = await abiContract.methods.rewardInfo(address).call();
				this.assets = incomes;
				this.benjin = $web3.utils.fromWei(String(incomes.capitals), 'ether');
				this.income = $web3.utils.fromWei(String(incomes.statics), 'ether');
				this.lv4 = $web3.utils.fromWei(String(incomes.level4Released), 'ether');
				this.lv5Can = $web3.utils.fromWei(String(incomes.level5Released), 'ether');
				this.lv5Free = $web3.utils.fromWei(String(incomes.level5Freezed), 'ether');
				this.luck = $web3.utils.fromWei(String(incomes.luck), 'ether');
				this.top = $web3.utils.fromWei(String(incomes.top), 'ether');
				this.fund = $web3.utils.fromWei(String(incomes.keep), 'ether');
			},
			//取款
			async widthDraw() {
				this.draw = 1;
				const address = uni.getStorageSync('address');
				const web3 = this.$web3;
				const abiContract = new web3.eth.Contract(dtmAbi, this.dtmContract);
				const fromAddress = uni.getStorageSync('address');
				const that = this;
				abiContract.methods.
				withdraw().send({
						from: fromAddress
					})
					.on('transactionHash', async hash => {
						if (hash) {
							that.draw = 0;
							uni.showToast({
								title: this.$t('other.yes2'),
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
								that.draw = 0;
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
		padding: 40rpx;
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

	.item {
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid rgba(255, 255, 255, 0.105);
		color: #fff;
		padding: 30rpx 10rpx;
	}

	.item5 {
		border-bottom: 1px solid rgba(255, 255, 255, 0.105);
		color: #fff;
		padding: 30rpx 10rpx;
	}

	.lv5 {
		display: flex;
		justify-content: space-between;
	}

	.dj {
		opacity: 0.5;
		display: flex;
		justify-content: space-between;
		margin-top: 10rpx;
		font-weight: 400;
	}

	.item:last-child {
		border-bottom: 0;
	}

	.right {
		font-size: 32rpx;
		font-family: "Josefin Sans", sans-serif;
	}

	.total {
		text-align: right;
		margin-top: 40rpx;
		color: #fff;
	}

	.tit {
		line-height: 80rpx;
		font-size: 32rpx;
	}

	.oper {
		margin-top: 60rpx;
	}

	.btn {
		width: 40%;
		box-shadow: inset 0px 0px 18rpx 12rpx #00a2ff;
		background: unset;
		border-radius: 50rpx;
		color: #fff;
		padding: 10rpx 0;
	}
</style>
