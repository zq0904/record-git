module.exports = {
	extends: 'stylelint-config-standard',
	rules: {
		'rule-empty-line-before': 'never', // 禁用标签前空行
		'comment-empty-line-before': 'never', // 禁用注释前空行
		'max-nesting-depth': 2 // 允许嵌套的深度
	}
}