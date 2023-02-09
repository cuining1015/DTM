<script>
	export default {
		
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import url("https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100;300;400;500;600;700&family=Open+Sans:wght@300;400;600;700;800&display=swap");
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';

	// 设置整个项目的背景色
	page {
		background-color: #f5f5f5;
		font-family: "Open Sans", sans-serif;
	}

	.loading {
		position: fixed;
		background: rgba(0, 0, 0, 0.4);
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		z-index: 999;
	}

	.load-icon {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
		z-index: inherit;
	}

	@-webkit-keyframes rotation {
		from {
			-webkit-transform: rotate(0deg);
		}

		to {
			-webkit-transform: rotate(360deg);
		}
	}

	.an {
		-webkit-transform: rotate(360deg);
		animation: rotation 2s linear infinite;
		-moz-animation: rotation 2s linear infinite;
		-webkit-animation: rotation 2s linear infinite;
		-o-animation: rotation 2s linear infinite;
		width: 50rpx !important;
		height: 50rpx !important;
	}

	/* #endif */
</style>
