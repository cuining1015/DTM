<template>
	<view class="content">
		<Menu></Menu>
		<view class="about">
			<view class="banner">
				<image src="../../static/dtm.png" class="ban"></image>
				<view class="t3">
					{{$t('about.title')}}
				</view>
			</view>
			<view class="desc">
				<view class="part">
					<view class="title">
						{{$t('about.t1')}}
					</view>
					<view class="dec">
						{{$t('about.t2')}}
					</view>
					<view class="title">
						{{$t('about.t3')}}
					</view>
					<view class="dec">
						{{$t('about.t4')}}
					</view>
					<view class="dec">
						{{$t('about.t5')}}
					</view>
				</view>
				<view class="parts">
					<view class="item">
						<view class="icon">
							<image src="../../static/a2.png"></image>
						</view>
						<view class="name">
							{{$t('about.luck')}}
						</view>
						<view class="bt">
							$ {{luckTotal | assetsFilter}}
						</view>
					</view>
					<view class="item">
						<view class="icon">
							<image src="../../static/a3.png"></image>
						</view>
						<view class="name">
							{{$t('about.top')}}
						</view>
						<view class="bt">
							$ {{topTotal | assetsFilter}}
						</view>
					</view>
					<view class="item">
						<view class="icon">
							<image src="../../static/a1.png"></image>
						</view>
						<view class="name">
							{{$t('about.fund')}}
						</view>
						<view class="bt">
							$ {{fundTotal | assetsFilter}}
						</view>
					</view>
				</view>
				<view class="others">
					<view :class="active == item.id ? 'othered' : 'other'" v-for="(item,index) in cates" :key="index"
						@click="activeCate(item.id)">
						<image :src="item.img" class="tu-icon"></image>
						<view class="tu-nr">
							<span class="prcent">100%</span> {{item.category}}
						</view>
					</view>
				</view>
				<view class="xieyis">
					<view class="trust">
						<image src="../../static/cates.png"></image>
					</view>
					<view class="xieyi">
						<view class="x-icon">
							<image src="../../static/icon4.png"></image>
						</view>
						<view class="x-name">
							{{$t('about.r1')}}
						</view>
						<view class="lines">
							<image src="../../static/line.png"></image>
						</view>
					</view>
					<view class="xieyi">
						<view class="x-names">
							{{$t('about.r2')}}
						</view>
						<view class="x-icon">
							<image src="../../static/icon5.png"></image>
						</view>
						<view class="liner">
							<image src="../../static/liner.png"></image>
						</view>
					</view>
					<view class="xieyi">
						<view class="x-icon">
							<image src="../../static/icon6.png"></image>
						</view>
						<view class="x-name">
							{{$t('about.r3')}}
						</view>
						<view class="lines">
							<image src="../../static/line.png"></image>
						</view>
					</view>
					<view class="sheji">
						<uni-icons type="vip-filled" size="20" color="#fff"></uni-icons>
						{{$t('about.r4')}}
					</view>
					<view class="link">
						《{{$t('about.url')}}》
					</view>
				</view>
			</view>
		</view>
		<Footer></Footer>
	</view>
</template>

<script>
	import dtmAbi from '@/common/DTM'
	import Menu from '@/components/menu/menu.vue'
	import Footer from '@/components/footer/footer.vue'
	export default {
		components: {
			Menu,
			Footer
		},
		data() {
			return {
				luckTotal: 0,
				topTotal: 0,
				fundTotal: 0,
				dtmContract: '0xBD63e220611Db4836Cc07daA0a61F171cB489689',
				active: 0,
				cates: [{
						id: 0,
						category: this.$t('about.a1'),
						img: '../../static/tu1.png'
					},
					{
						id: 1,
						category: this.$t('about.a2'),
						img: '../../static/tu2.png'
					},
					{
						id: 2,
						category: this.$t('about.a3'),
						img: '../../static/tu3.png'
					},
					{
						id: 3,
						category: this.$t('about.a4'),
						img: '../../static/tu4.png'
					},
					{
						id: 4,
						category: this.$t('about.a5'),
						img: '../../static/tu5.png'
					},
					{
						id: 5,
						category: this.$t('about.a6'),
						img: '../../static/tu6.png'
					},
					{
						id: 6,
						category: this.$t('about.a7'),
						img: '../../static/tu7.png'
					},
					{
						id: 7,
						category: this.$t('about.a8'),
						img: '../../static/tu8.png'
					},
					{
						id: 8,
						category: this.$t('about.a9'),
						img: '../../static/tu9.png'
					},
					{
						id: 9,
						category: this.$t('about.a10'),
						img: '../../static/tu3.png'
					}
				]
			}
		},
		watch: {
			'$i18n.locale'() {
				this.getTabs();
			}
		},
		filters: {
			assetsFilter(value) {
				if (value === '0') {
					const counts = '0.0000';
					return `${counts}`;
				} else {
					const counts = parseFloat(value).toFixed(2);
					return `${counts}`;
				}
			}
		},
		created() {
			this.getPlayers()
		},
		methods: {
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
			getTabs() {
				this.cates = [{
						id: 0,
						category: this.$t('about.a1'),
						img: '../../static/tu1.png'
					},
					{
						id: 1,
						category: this.$t('about.a2'),
						img: '../../static/tu2.png'
					},
					{
						id: 2,
						category: this.$t('about.a3'),
						img: '../../static/tu3.png'
					},
					{
						id: 3,
						category: this.$t('about.a4'),
						img: '../../static/tu4.png'
					},
					{
						id: 4,
						category: this.$t('about.a5'),
						img: '../../static/tu5.png'
					},
					{
						id: 5,
						category: this.$t('about.a6'),
						img: '../../static/tu6.png'
					},
					{
						id: 6,
						category: this.$t('about.a7'),
						img: '../../static/tu7.png'
					},
					{
						id: 7,
						category: this.$t('about.a8'),
						img: '../../static/tu8.png'
					},
					{
						id: 8,
						category: this.$t('about.a9'),
						img: '../../static/tu9.png'
					},
					{
						id: 9,
						category: this.$t('about.a10'),
						img: '../../static/tu3.png'
					}
				]
			},
			activeCate(index) {
				this.active = index;
			}
		}
	}
</script>

<style scoped>
	.content {
		height: 100%;
		background-image: url('../../static/a-bg.jpg');
		background-size: 100%;
	}

	.about {
		margin-bottom: -360rpx;
		position: relative;
		z-index: 2;
	}

	.banner {
		position: relative;
		padding: 180rpx 40rpx 60rpx 40rpx;
	}

	.t1 {
		font-size: 100rpx;
		color: #fff;
		font-family: "Josefin Sans", sans-serif;
		font-weight: bold;
	}

	.t2 {
		font-size: 60rpx;
		color: #fff;
		font-family: "Josefin Sans", sans-serif;
		font-weight: bold;
		margin-top: 70rpx;
	}

	.ban {
		width: 100%;
		height: 300rpx;
	}

	.lin {
		width: 180rpx;
		height: 5rpx;
		background-color: #fff;
		margin-top: 20rpx;
	}

	.t3 {
		color: #FCE536;
		font-size: 30rpx;
		line-height: 44rpx;
		margin-top: 20rpx;
		padding-left: 26rpx;
	}

	.tip {
		position: absolute;
		z-index: 1;
		top: 50%;
		left: 12%;
		font-size: 60rpx;
		color: #fff;
		font-style: oblique;
		font-family: "Josefin Sans", sans-serif;
		font-weight: bold;
		text-shadow: 0px -5rpx 3rpx rgb(12 19 55 / 0%), 0 -1rpx 4rpx #1b7ae2, 0 -2rpx 10rpx #1b7ae2, 0 -10rpx 20rpx #1b7ae2, 0 -18rpx 40rpx #1b7ae2;
	}

	.desc {
		padding: 40rpx;
	}

	.part {
		padding: 40rpx 30rpx;
		border-radius: 20rpx;
		margin-bottom: 40rpx;
		background-color: #2C006C;
		border: 2rpx solid #6317B0;
	}

	.title {
		font-family: "Josefin Sans", sans-serif;
		color: #fff;
		font-size: 36rpx;
		line-height: 80rpx;
		font-weight: bold;
	}

	.point {
		display: inline-block;
		width: 20rpx;
		height: 20rpx;
		background-color: #9239d2;
		border-radius: 20rpx;
	}

	.cate {
		font-size: 34rpx;
		padding: 0 10rpx;
		font-weight: bold;
		color: #9239d2;
	}

	.dec {
		color: #cec9ff;
		font-size: 28rpx;
		line-height: 50rpx;
		margin-bottom: 20rpx;
	}

	.item {
		position: relative;
	}

	.icon {
		text-align: center;
	}

	.icon image {
		width: 600rpx;
		height: 600rpx;
	}

	.bt {
		position: absolute;
		top: 26%;
		left: 50%;
		transform: translateX(-50%);
		text-align: center;
		font-weight: 700;
		font-size: 60rpx;
		line-height: 60rpx;
		text-shadow: 0px 0px 20rpx #00a2ff;
		color: #00a2ff;
		font-family: "Josefin Sans", sans-serif;
	}

	.name {
		position: absolute;
		top: 15%;
		left: 50%;
		transform: translateX(-50%);
		text-align: center;
		font-weight: 700;
		font-size: 40rpx;
		line-height: 60rpx;
		text-shadow: 0px 0px 20rpx #00a2ff;
		color: #fff;
		font-family: "Josefin Sans", sans-serif;
	}

	.others {
		background-image: url('../../static/help-aside.jpg');
		background-position: center;
		background-size: cover;
		padding: 30px;
		border-radius: 30rpx;
		margin-top: 30rpx;
	}

	.other {
		font-size: 32rpx;
		color: #fff;
		padding: 10rpx 0;
		display: flex;
		align-items: center;
		background-color: rgba(137, 53, 218, 0.4);
		border-radius: 30rpx;
		margin-bottom: 30rpx;
		padding-left: 10rpx;
	}

	.othered {
		font-size: 32rpx;
		color: #FBFF26;
		padding: 10rpx 0;
		background-color: rgba(137, 53, 218, 0.8);
		transition: all 0.3s;
		border-radius: 30rpx;
		padding-left: 50rpx;
		display: flex;
		align-items: center;
		font-weight: bold;
		margin-bottom: 30rpx;
	}

	.uni-icons {
		padding-right: 10rpx;
	}

	.prcent {
		font-family: "Josefin Sans", sans-serif;
		padding-right: 10rpx;
	}

	.trust {
		padding: 40rpx 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.trust image {
		width: 160rpx;
		height: 160rpx;
	}

	.tr-title {
		color: #fff;
		font-size: 40rpx;
		font-weight: bold;
		padding-left: 14rpx;
	}

	.xieyis {
		margin-top: 100rpx;
		padding: 40rpx;
		border-radius: 30rpx;
		background-color: #2C006C;
		border: 2rpx solid #6317B0;
	}

	.xieyi {
		display: flex;
		margin-bottom: 30rpx;
		position: relative;
	}

	.x-icon {
		width: 30%;
		text-align: center;
	}

	.x-icon image {
		width: 202rpx;
		height: 146rpx;
	}

	.x-name {
		width: 70%;
		color: #FFC408;
		padding-left: 14rpx;
		font-size: 34rpx;
		padding-top: 60rpx;
		font-weight: bold;
	}

	.x-names {
		width: 70%;
		color: #FFC408;
		padding-left: 14rpx;
		font-size: 34rpx;
		padding-top: 60rpx;
		font-weight: bold;
		text-align: right;
	}

	.lines {
		position: absolute;
		bottom: 0;
		left: 20%;
	}

	.lines image {
		width: 443rpx;
		height: 27rpx;
	}

	.liner {
		position: absolute;
		bottom: 0;
		right: 12%;
	}

	.liner image {
		width: 443rpx;
		height: 27rpx;
	}

	.sheji {
		color: #fff;
		margin-top: 60rpx;
	}

	.link {
		color: #00a2ff;
		line-height: 80rpx;
		text-decoration: underline;
	}

	.tu-icon {
		width: 113rpx;
		height: 93rpx;
		margin-right: 20rpx;
	}
</style>
