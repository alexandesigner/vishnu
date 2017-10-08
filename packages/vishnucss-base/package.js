Package.describe({
	name: 'vishnucss:base',
	version: '1.0.0-rc.0',
	summary: 'A simple and minimalist toolkit with modern css.',
	git: 'https://github.com/vishnucss/vishnu.git',
	documentation: 'README.md'
})

Package.onUse((api) => {
	api.versionsFrom('METEOR@1.0')
	api.addFiles([
		'dist/vishnu.css'
	], 'client')
})