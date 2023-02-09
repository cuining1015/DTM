<template>
	<view class="header">
		<Register v-if="register" @isReg="getUser"></Register>
		<view class="menu">
			<image src="../../static/logo.png" @click="toAbout" class="logo"></image>
			<view class="draw">
				<view class="yan" @click="changeLang">
					{{lang}}
					<image src="../../static/bot.png" class="bot"></image>
				</view>
				<uni-icons type="bars" size="34" color="#fff" class="draw-icon" @click="showDrawer"></uni-icons>
			</view>
			<view class="lans" v-if="isLang">
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
		</view>
		<uni-drawer ref="showMenu" mode="right" :width="260" :mask-click="true" @change="isShow($event)">
			<scroll-view style="height: 100%;" scroll-y="true">
				<view class="menu-sm">
					<view class="head">
						<image src="../../static/logo.png" class="logo"></image>
						<view class="d-menu" @click="closeDrawer">
							<uni-icons type="close" size="24" color="#fff"></uni-icons>
						</view>
					</view>
					<view class="wallet">
						<view class="out">
							<view class="addr">
								{{address | addressFilter}}
							</view>
							<view class="user-copy" @click="copy" id="copyBtn" :data-clipboard-text="address"
								data-clipboard-action="copy">
								<image src="../../static/copy.png"></image>
							</view>
						</view>
					</view>
					<view class="items">
						<view class="item" @click="toHome">
							<image src="../../static/m1.png" class="i-icon"></image>
							<view class="item-name">
								{{$t('menu.index')}}
							</view>
						</view>
						<view class="item" @click="toTeam">
							<image src="../../static/m2.png" class="i-icon"></image>
							<view class="item-name">
								{{$t('menu.team')}}
							</view>
						</view>
						<view class="item" @click="toSave">
							<image src="../../static/m3.png" class="i-icon"></image>
							<view class="item-name">
								{{$t('menu.detail')}}
							</view>
						</view>
						<view class="item" @click="toReward">
							<image src="../../static/i2.png" class="i-icon"></image>
							<view class="item-name">
								{{$t('menu.reward')}}
							</view>
						</view>
						<view class="item" @click="toRule">
							<image src="../../static/m4.png" class="i-icon"></image>
							<view class="item-name">
								{{$t('menu.rule')}}
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</uni-drawer>
	</view>
</template>

<script>
	import dtmAbi from '@/common/DTM';
	import Clipboard from 'clipboard';
	import Register from '@/components/register/register.vue'
	export default {
		components: {
			Register
		},
		data() {
			return {
				address: '',
				lang: 'English',
				isLang: false,
				account: '',
				country: '',
				register: false,
				loading: false,
				dtmContract: '0xBD63e220611Db4836Cc07daA0a61F171cB489689'
			}
		},
		created() {
			this.getMetaMask();
			this.checkChain();
			this.getLanguage();
			this.checkUser();
			const uper = this.$route.query.url;
			if (uper) {
				uni.setStorageSync('uper', uper);
			}
		},
		filters: {
			addressFilter(value) {
				const start = value.slice(0, 8);
				const end = value.slice(-8);
				return `${start}***${end}`;
			},
			addrFilter(value) {
				const start = value.slice(0, 5);
				const end = value.slice(-5);
				return `${start}***${end}`;
			}
		},
		methods: {
			//验证是否注册
			async checkUser() {
				const address = uni.getStorageSync('address');
				const web3 = this.$web3;
				const abiContract = new web3.eth.Contract(dtmAbi, this.dtmContract);
				const userinfo = await abiContract.methods.userInfo(address).call();
				if (userinfo.referrer == "0x0000000000000000000000000000000000000000") {
					this.register = true;
					this.loading = false;
				} else {
					this.register = false;
					this.loading = false;
					this.$emit("isLoad", true);
				}
			},
			getUser(res) {
				if (res) {
					this.checkUser()
				}
			},
			getLanguage() {
				const language = uni.getStorageSync('lang');
				if (language) {
					if (language == 'en') {
						this.lang = 'English';
						this.$i18n.locale = 'en';
					} else if (language == 'kr') {
						this.lang = 'Korea';
						this.$i18n.locale = 'kr';
					} else if (language == 'ind') {
						this.lang = 'India';
						this.$i18n.locale = 'ind';
					} else if (language == 'tai') {
						this.lang = 'Thailand';
						this.$i18n.locale = 'tai';
					} else if (language == 'can') {
						this.lang = 'Canada';
						this.$i18n.locale = 'can';
					} else if (language == 'mal') {
						this.lang = 'Malaysia';
						this.$i18n.locale = 'mal';
					} else {
						this.lang = 'Chinese';
						this.$i18n.locale = 'cn';
					}
				} else {
					this.$i18n.locale = 'en';
					uni.setStorageSync('lang', 'en');
					this.lang = 'English';
				}
			},
			checkChain() {
				if (window.ethereum) {
					const Web3 = this.$web3;
					window.ethereum.request({
							method: 'wallet_switchEthereumChain',
							params: [{
								chainId: Web3.utils.numberToHex(97) //测试链id,正式链56
							}]
						}).then(() => {
							console.log('bsc')
						})
						.catch((e) => {
							window.ethereum.request({
								method: 'wallet_addEthereumChain',
								params: [{
									chainId: Web3.utils.numberToHex(97), // 目标链ID
									chainName: 'Binance Smart Chain Testnet',
									nativeCurrency: {
										name: 'tBNB',
										symbol: 'tBNB',
										decimals: 18
									},
									rpcUrls: ['https://bsc-testnet.public.blastapi.io'], // 节点
									blockExplorerUrls: ['https://bsctestapi.terminet.io']
								}]
							})
						})
				}
			},
			getMetaMask() {
				if (window.ethereum) {
					window.ethereum.enable().then((res) => {
						uni.setStorageSync('address', res[0]);
						this.address = res[0];
					});
					//监听钱包切换
					const that = this;
					ethereum.on('accountsChanged', function(accounts) {
						uni.setStorageSync('address', accounts[0]);
						window.location.reload();
					});
				} else {
					console.log('metamask!')
				}
			},
			connentWallet() {
				this.getMetaMask()
			},
			showDrawer() {
				this.$refs.showMenu.open();
			},
			closeDrawer() {
				this.$refs.showMenu.close();
			},
			isShow(e) {
				if (e) {
					uni.hideTabBar()
				} else {
					uni.showTabBar()
				}
			},
			toHome() {
				uni.navigateTo({
					url: '/pages/index/index'
				})
				this.$refs.showMenu.close();
			},
			toTeam() {
				uni.navigateTo({
					url: '/pages/team/team'
				})
				this.$refs.showMenu.close();
			},
			toSave() {
				uni.navigateTo({
					url: '/pages/deposit/deposit'
				})
				this.$refs.showMenu.close();
			},
			toReward() {
				uni.navigateTo({
					url: '/pages/reward/reward'
				})
				this.$refs.showMenu.close();
			},
			toAbout() {
				uni.navigateTo({
					url: '/pages/about/about'
				})
			},
			toRule() {
				this.$refs.showMenu.close();
			},
			changeLang() {
				this.isLang = !this.isLang;
			},
			English() {
				this.$i18n.locale = 'en';
				uni.setStorageSync('lang', 'en');
				this.lang = 'English';
				this.isLang = false;
			},
			China() {
				this.$i18n.locale = 'cn';
				uni.setStorageSync('lang', 'cn');
				this.lang = 'Chinese';
				this.isLang = false;
			},
			Korean() {
				this.$i18n.locale = 'kr';
				uni.setStorageSync('lang', 'kr');
				this.lang = 'Korea';
				this.isLang = false;
			},
			India() {
				this.$i18n.locale = 'ind';
				uni.setStorageSync('lang', 'ind');
				this.lang = 'India';
				this.isLang = false;
			},
			Thailand() {
				this.$i18n.locale = 'tai';
				uni.setStorageSync('lang', 'tai');
				this.lang = 'Thailand';
				this.isLang = false;
			},
			Kanada() {
				this.$i18n.locale = 'can';
				uni.setStorageSync('lang', 'can');
				this.lang = 'Canada';
				this.isLang = false;
			},
			Malaysia() {
				this.$i18n.locale = 'mal';
				uni.setStorageSync('lang', 'mal');
				this.lang = 'Malaysia';
				this.isLang = false;
			},
			copy() {
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
	.header {
		position: fixed;
		left: 0;
		right: 0;
		z-index: 9;
	}

	.logo {
		width: 80rpx;
		height: 80rpx;
		border-radius: 20rpx;
	}

	.menu {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 66rpx;
		padding: 20rpx;
		background: linear-gradient(100.13deg, rgba(255, 255, 255, 0.08) -7.77%, rgba(255, 255, 255, 0.04) 126.5%);
		backdrop-filter: blur(11rpx);
		box-shadow: 0px 5px 15px rgb(0 0 0 / 15%);
	}

	.draw {
		margin-right: 10rpx;
		display: flex;
		align-items: center;
	}

	.yan {
		color: #fff;
		display: flex;
		align-items: center;
		font-size: 34rpx;
		margin-right: 20rpx;
		font-family: "Josefin Sans", sans-serif;
	}

	.bot {
		width: 19.5rpx;
		height: 12rpx;
		margin: 0 10rpx;
	}

	.draw-icon {
		display: inline-block;
	}

	.lang-icon {
		width: 56rpx;
		height: 56rpx;
		padding-right: 20rpx;
	}

	.lans {
		position: absolute;
		top: 106rpx;
		right: 112rpx;
		color: #fff;
		text-align: center;
		padding: 20rpx 30rpx;
		border-radius: 6rpx;
		background: linear-gradient(100.13deg, rgba(87, 5, 150, 0.7) -7.77%, rgba(125, 27, 186, 0.7) 126.5%);
		backdrop-filter: blur(11rpx);
		box-shadow: 0px 5px 15px rgb(0 0 0 / 15%);
	}

	.lan {
		margin: 15rpx 0;
	}

	.lan image {
		width: 100rpx;
		height: 66rpx;
		border-radius: 10rpx;
	}

	.lang image {
		width: 50rpx;
		height: 50rpx;
		margin-top: 10rpx;
		margin-left: 20rpx;
	}

	.link {
		color: #fff;
		border: 1rpx solid #fff;
		padding: 0 20rpx;
		border-radius: 30rpx;
	}

	/deep/.uni-drawer__content {
		height: 100vh;
		background-image: url('../../static/t2-t-bg.jpg');
		background-size: cover !important;
	}

	.head {
		display: flex;
		justify-content: space-between;
		padding: 6rpx 30rpx;
		height: 94rpx;
		background-image: linear-gradient(89deg, rgba(84, 6, 143, 0.2) 0%, rgba(122, 27, 180, 0.2) 100%);
		align-items: center;
	}

	.d-menu {
		display: flex;
		align-items: center;
	}

	.name {
		color: #fff;
		line-height: 94rpx;
		padding-left: 10rpx;
	}

	.wallet {
		padding: 30rpx;
	}

	.out {
		color: #fff;
		border-radius: 30rpx;
		text-align: center;
		padding-top: 10rpx;
		font-size: 26rpx;
		display: flex;
		justify-content: center;
		box-shadow: inset 0px 0px 12rpx 6rpx #9a13d2;
	}

	.addr {
		margin-right: 30rpx;
		opacity: 0.8;
	}

	.user-copy image {
		width: 44rpx;
		height: 44rpx;
	}

	.items {
		margin-top: 60rpx;
	}

	.item {
		display: flex;
		align-items: center;
		color: #fff;
		padding: 26rpx;
		border-bottom: 1rpx solid rgba(84, 6, 143, 0.6);
	}

	.item-name {
		font-size: 30rpx;
		padding-left: 20rpx;
	}

	.i-icon {
		width: 50rpx;
		height: 50rpx;
	}
</style>
