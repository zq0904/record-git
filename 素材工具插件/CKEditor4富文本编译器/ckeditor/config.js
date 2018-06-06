/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// 获取配置   位置 及 按钮显示隐藏  ./samples/toolbarconfigurator/index.html
	config.toolbarGroups = [
		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
		{ name: 'links' },
		{ name: 'insert' },
		{ name: 'forms' },
		{ name: 'tools' },
		{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'others' },
		'/',
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
		{ name: 'styles' },
		{ name: 'colors' },
		{ name: 'about' }
	];
	config.removeButtons = 'Underline,Subscript,Superscript';

	config.format_tags = 'p;h1;h2;h3;pre';

  config.language = 'zh-cn';
  // config.uiColor = '#DA2E16'; // 编译器头颜色
  config.removePlugins = 'elementspath,resize'; // 移除编辑器底部状态栏显示 和 调整辑器大小的按钮
  config.forcePasteAsPlainText = true; // 是否强制复制过来的文字去除格式
  config.removeDialogTabs = 'image:advanced;image:Link'; // 移除图片上传页面的 高级、链接 页签

  config.height = 200; // 输入内容部分的 高度
  config.width = '100%';  // 宽度
  // config.filebrowserUploadUrl  备用
  // config.filebrowserFlashUploadUrl 
  config.filebrowserImageUploadUrl = "http://localhost:8080/XTKFQAir/editor/iconUpload"; // 文件上传到服务器的路径
  // config.filebrowserImageBrowseUrl = '/browerServer?type=image'; // 浏览服务器的功能
};
