<template>
	<view class="content">
		<Menu></Menu>
		<view class="team">
			<view class="banner">
				<image src="../../static/about-bc.jpg"></image>
				<view class="tip">
					<view class="tip1">MY TEAM</view>
				</view>
			</view>
			<Info></Info>
			<view class="items">
				<view class="item i1">
					<view class="icon">
						<image src="../../static/i1.png"></image>
					</view>
					<view class="infos">
						<view class="titles">
							{{$t('team.total')}}
						</view>
						<view class="nums">
							$ {{allWorks | assetsFilter}}
						</view>
					</view>
				</view>
				<view class="item i2">
					<view class="icon">
						<image src="../../static/i4.png"></image>
					</view>
					<view class="infos">
						<view class="titles">
							{{$t('team.nums')}}
						</view>
						<view class="nums">
							{{family}}
						</view>
					</view>
				</view>
				<view class="item i3">
					<view class="icon">
						<image src="../../static/i2.png"></image>
					</view>
					<view class="infos">
						<view class="titles">
							{{$t('team.a')}}
						</view>
						<view class="nums">
							$ {{Aworks | assetsFilter}}
						</view>
					</view>
				</view>
				<view class="item i4">
					<view class="icon">
						<image src="../../static/i3.png"></image>
					</view>
					<view class="infos">
						<view class="titles">
							{{$t('team.b')}}
						</view>
						<view class="nums">
							$ {{Bworks | assetsFilter}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
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
				Aworks: 0,
				Bworks: 0,
				allWorks: 0,
				family: 0
			}
		},
		created() {
			this.getTeam();
			this.getFamily()
		},
		filters: {
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
			async getTeam() {
				const address = uni.getStorageSync('address');
				const web3 = this.$web3;
				const abiContract = new web3.eth.Contract(dtmAbi, this.dtmContract);
				const teams = await abiContract.methods.getTeamDeposit(address).call();
				this.Aworks = $web3.utils.fromWei(String(teams[0]), 'ether');
				this.Bworks = $web3.utils.fromWei(String(teams[1]), 'ether');
				this.allWorks = $web3.utils.fromWei(String(teams[2]), 'ether');
			},
			async getFamily() {
				const address = uni.getStorageSync('address');
				const web3 = this.$web3;
				const abiContract = new web3.eth.Contract(dtmAbi, this.dtmContract);
				const user = await abiContract.methods.userInfo(address).call();
				this.family = user.teamNum;
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
		left: 10%;
		transform: translate(-10%, -30%);
	}

	.tip1 {
		text-align: center;
		font-size: 60rpx;
		line-height: 50rpx;
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
		margin-top: 100rpx;
		padding: 0 40rpx;
	}

	.item {
		padding: 40rpx;
		border-radius: 30rpx;
		display: flex;
		margin-bottom: 40rpx;
	}

	.i1 {
		background: linear-gradient(107.11deg, #8F00FF 2.55%, #5F12FF 43.66%);
	}

	.i2 {
		background: linear-gradient(107.74deg, #23DAE6 0%, #00A5C9 101.82%);
	}

	.i4 {
		background: linear-gradient(106.57deg, #00B2FF 0%, #001AFF 100%);
	}

	.i3 {
		background: linear-gradient(106.57deg, #FA3BE7 0%, #B9006F 100%);
	}

	.icon {
		margin-right: 60rpx;
	}

	.icon image {
		width: 160rpx;
		height: 160rpx;
	}

	.titles {
		font-size: 34rpx;
		color: #fff;
		line-height: 90rpx;
	}

	.nums {
		color: #fff;
		font-size: 40rpx;
		font-weight: bold;
		font-family: "Josefin Sans", sans-serif;
	}
</style>
