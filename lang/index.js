import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from './en.js'
import zh from './zh.js'
import kr from './kr.js'
import tai from './tai.js'
import can from './can.js'
import ind from './in.js'
import mal from './mal.js'
Vue.use(VueI18n);
const messages = {
	en: {
		...en
	},
	cn: {
		...zh
	},
	kr: {
		...kr
	},
	tai: {
		...tai
	},
	can: {
		...can
	},
	mal: {
		...mal
	},
	ind: {
		...ind
	}
}
const i18n = new VueI18n({
	locale: localStorage.getItem('lang') || 'en',
	messages,
});

export default i18n;
