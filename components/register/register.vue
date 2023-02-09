<template>
	<view class="register">
		<view class="regs">
			<view class="lang" @click="changeLang">
				<image src="../../static/icon-lang.2cc933ed.svg"></image>
			</view>
			<view class="title">
				{{$t('register.title')}}
			</view>
			<view class="address">
				{{address}}
			</view>
			<view class="tips" v-if="isUper">
				{{$t('register.tips')}}
			</view>
			<view class="tip-null" v-else>
				{{$t('other.tip')}}
			</view>
			<view class="oper">
				<button class="btn" @click="register" v-if="isCan && reg == 0">{{$t('register.reg')}}</button>
				<button class="btns" v-if="isCan && reg == 1">{{$t('other.reg')}}</button>
				<button class="btns" @click="tips" v-if="isCan == false">{{$t('register.reg')}}</button>
			</view>
		</view>
		<uni-popup ref=" popup" background-color="#fff">
			<view class="lans">
				<view class="lan" @click="English">
					<image src="../../static/en.jpg"></image>
				</view>
				<view class="lan" @click="Korean">
					<image src="../../static/han.jpg"></image>
				</view>
				<view class="lan" @click="India">
					<image src="../../static/in.jpg"></image>
				</view>
				<view class="lan" @click="China">
					<image src="../../static/cn.jpg"></image>
				</view>
				<view class="lan" @click="Thailand">
					<image src="../../static/tai.jpg"></image>
				</view>
				<view class="lan" @click="Kanada">
					<image src="../../static/jia.jpg"></image>
				</view>
				<view class="lan" @click="Malaysia">
					<image src="../../static/ma.jpg"></image>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import dtmAbi from '@/common/DTM';
	export default {
		data() {
			return {
				address: '',
				isUper: true,
				isCan: true,
				dtmContract: '0xBD63e220611Db4836Cc07daA0a61F171cB489689',
				reg: 0,
				isReg: 0
			}
		},
		created() {
			const uper = uni.getStorageSync('uper');
			const url = this.$route.query.url;
			if (uper) {
				this.address = uper;
			} else {
				if (url) {
					this.address = url;
					uni.setStorageSync('uper', url);
				} else {
					this.isUper = false;
					this.isCan = false;
				}
			}
		},
		methods: {
			async register() {
				this.reg = 1;
				const address = uni.getStorageSync('address');
				const uper = uni.getStorageSync('uper');
				const web3 = this.$web3;
				const abiContract = new web3.eth.Contract(dtmAbi, this.dtmContract);
				abiContract.methods.register(uper).send({
					from: address
				}).on('transactionHash', async hash => {
					if (hash) {
						const approveTimer = setInterval(() => {
							this.checkUser();
							if (this.isReg == 1) {
								clearInterval(approveTimer);
							}
						}, 1000);
					}
				}).catch((e) => {
					this.reg = 0;
					uni.showToast({
						title: 'You have canceled!',
						duration: 2000,
						icon: 'none'
					})
				});
			},
			async checkUser() {
				const address = uni.getStorageSync('address');
				const web3 = this.$web3;
				const abiContract = new web3.eth.Contract(dtmAbi, this.dtmContract);
				const userinfo = await abiContract.methods.userInfo(address).call();
				if (userinfo.referrer == "0x0000000000000000000000000000000000000000") {
					this.reg = 1;
				} else {
					uni.showToast({
						title: this.$t('other.yes1'),
						duration: 1000,
						icon: 'success'
					})
					this.$emit("isReg", true);
					this.isReg = 1;
					const regTimer = setInterval(() => {
						clearInterval(regTimer);
					}, 1000);
				}
			},
			tips() {
				uni.showToast({
					title: this.$t('register.error'),
					duration: 2000,
					icon: 'none'
				});
			},
			changeLang() {
				this.$refs.popup.open('bottom')
			},
			English() {
				this.$i18n.locale = 'en';
				uni.setStorageSync('lang', 'en');
				this.isLang = false;
			},
			China() {
				this.$i18n.locale = 'cn';
				uni.setStorageSync('lang', 'cn');
				this.isLang = false;
			},
			Korean() {
				this.$i18n.locale = 'kr';
				uni.setStorageSync('lang', 'kr');
				this.isLang = false;
			},
			India() {
				this.$i18n.locale = 'ind';
				uni.setStorageSync('lang', 'ind');
				this.isLang = false;
			},
			Thailand() {
				this.$i18n.locale = 'tai';
				uni.setStorageSync('lang', 'tai');
				this.isLang = false;
			},
			Kanada() {
				this.$i18n.locale = 'can';
				uni.setStorageSync('lang', 'can');
				this.isLang = false;
			},
			Malaysia() {
				this.$i18n.locale = 'mal';
				uni.setStorageSync('lang', 'mal');
				this.isLang = false;
			}
		}
	}
</script>

<style scoped>
	.register {
		height: 100vh;
		position: fixed;
		z-index: 100;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.7);
	}

	.regs {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: rgba(93, 33, 212, 0.8);
		box-shadow: inset 0px 0px 24rpx 16rpx #00a2ff;
		width: 60%;
		padding: 60rpx 40rpx;
		border-radius: 20rpx;
	}

	.title {
		color: #fff;
		text-align: center;
		font-size: 44rpx;
		font-weight: bold;
		margin-bottom: 60rpx;
	}

	.address {
		background: unset;
		border-radius: 20rpx;
		padding: 40rpx 30rpx;
		color: #fff;
		border: 1rpx solid #00a2ff;
		word-wrap: break-word;
		font-size: 32rpx;
		font-family: "Josefin Sans", sans-serif;
	}

	.tips {
		color: #b1abc7;
		font-size: 28rpx;
		margin-bottom: 80rpx;
		padding-left: 10rpx;
		margin-top: 10rpx;
		line-height: 50rpx;
	}

	.tip-null {
		color: #fa009f;
		font-size: 28rpx;
		margin-bottom: 80rpx;
		padding-left: 10rpx;
		margin-top: 10rpx;
		line-height: 50rpx;
	}

	.btn {
		box-shadow: inset 0px 0px 20rpx 14rpx #00a2ff;
		font-size: 32rpx;
		font-weight: 600;
		border-radius: 60rpx;
		background-color: unset;
		color: #fff;
		padding: 10rpx 0;
		width: 50%;
	}

	.btns {
		box-shadow: inset 0px 0px 20rpx 14rpx #00a2ff;
		font-size: 32rpx;
		font-weight: 600;
		border-radius: 60rpx;
		background-color: unset;
		color: #fff;
		padding: 10rpx 0;
		width: 50%;
		opacity: 0.6;
	}

	.lang {
		position: absolute;
		right: 40rpx;
		top: 40rpx;
	}

	.lang image {
		width: 60rpx;
		height: 60rpx;
		opacity: 0.9;
	}

	.lans {
		background: #0b021b;
		border: 1px solid rgba(255, 255, 255, 0.105);
		box-shadow: 0px 0px 10rpx 7rpx #00a2ff;
		color: #fff;
		text-align: center;
		padding-top: 40rpx;
		display: flex;
		flex-wrap: wrap;
	}

	.lan {
		line-height: 70rpx;
		width: 20%;
		margin-bottom: 30rpx;
	}

	.lan image {
		width: 100rpx;
		height: 66rpx;
		border-radius: 10rpx;
	}

	.it {
		background: rgba(41, 55, 84, 0.6);
		border-radius: 6rpx;
		width: 190rpx;
		display: inline-block;
		text-align: center;
		font-size: 28rpx;
	}
</style>
