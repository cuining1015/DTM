<template>
	<view class="footer">
		<view class="foo-logo">
			<image src="../../static/footer-ogo.png"></image>
		</view>
		<view class="links">
			<view class="link">
				<image src="../../static/face.png"></image>
			</view>
			<view class="link">
				<image src="../../static/twitter-fill.png"></image>
			</view>
			<view class="link">
				<image src="../../static/telegram.png"></image>
			</view>
			<view class="link">
				<image src="../../static/linkedin.png"></image>
			</view>
			<view class="link">
				<image src="../../static/Instagram.png"></image>
			</view>
		</view>
		<view class="right">
			Copyright © 2022.All Rights Reserved By DTM
		</view>
	</view>
</template>

<script>
</script>

<style scoped>
	.footer {
		padding-top: 450rpx;
		overflow: hidden;
		position: relative;
		background-color: #070b28;
		background-image: url('../../static/footerbg.jpg');
		background-repeat: no-repeat;
		background-position: top center;
		background-size: auto;
		padding-bottom: 40rpx;
		margin-top: 80rpx;
	}
	
	.foo-logo {
		text-align: center;
	}

	.foo-logo image {
		width: 265rpx;
		height: 189rpx;
		vertical-align: middle;
	}
	
	.links {
		display: flex;
		justify-content: center;
		margin-top: 60rpx;
	}
	
	.link {
		padding: 10rpx;
		border: 1rpx solid rgba(255, 255, 255, 0.3);
		border-radius: 100%;
		width: 44rpx;
		height: 44rpx;
		text-align: center;
		margin: 0 15rpx;
	}
	
	.link image {
		width: 30rpx;
		height: 30rpx;
		padding-top: 7rpx;
	}
	
	.right {
		margin-top: 100rpx;
		text-align: center;
		color: #fff;
		opacity: 0.8;
	}
</style>
