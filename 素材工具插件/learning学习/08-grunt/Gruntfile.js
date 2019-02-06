// 'useminPrepare','usemin',
module.exports = grunt => {
  const startTack = ['clean:all', 'copy', 'browserify', 'babel', 'uglify', 'less', 'cssmin', 'filerev', 'clean:noHash', 'usemin', 'htmlmin']
  // const pkg = grunt.file.readJSON('package.json') // 可以获取package.json中信息用于配置
  const target = 'TARGET' // 定义一个标签 名字任意 作用是：配置更加灵活 有些如uglify插件必须配置标签
  const htmlMiddlePath = './dist/index.html' // html中间文件
  const jsMiddlePath = './dist/index.js' // js中间文件
  const cssMiddlePath = './dist/index.css' // css中间文件
  grunt.initConfig({
    clean: {
      all: './dist/', // 删除整个./dist目录
      noHash: './dist/index.{css,js}' // 删除./dist目录下没有版本号静态资源
    },
    copy: { // 复制index.html (usemin动态更新hash指纹是在源文件改动的)
      [target]: {
        files: {
          [htmlMiddlePath]: './index.html'
        }
      }
    },
    browserify: {
      options: {
        transform: ['babelify'] // 转换Es6模块规范 npm i -D babelify
      },
      [target]: {
        files: {
          [jsMiddlePath]: './src/**/*.js'
        }
      }
    },
    babel: {
      [target]: {
        files: {
          [jsMiddlePath]: jsMiddlePath
        }
      }
    },
    uglify: {
      options: {
        banner: '/* 构建于： <%= grunt.template.today("yyyy-mm-dd") %> */\n' // 条幅
      },
      [target]: {
        files: {
          [jsMiddlePath]: jsMiddlePath
        }
      }
    },
    less: {
      [target]: {
        files: {
          [cssMiddlePath]: './src/assets/css/**.less'
        }
      }
    },
    cssmin: {
      [target]: {
        files: {
          [cssMiddlePath]: [cssMiddlePath, './src/assets/css/**.css'] // 将转化后的css 和 原有css 合并输出到 ./dist/index.css
        }
      }
    },
    filerev: {
      options: {
        algorithm: 'md5',
        length: 8
      },
      // 可以不指定target
      files: {
        src: [jsMiddlePath, cssMiddlePath],
        dest: './dist/'
      }
    },
    usemin: {
      html: htmlMiddlePath,
      // 这里options 不配置也可以
      options: {
        blockReplacements: {
          css: ({src}) => {
            // filerev插件执行完会在grunt上挂清单 对象为grunt.filerev.summary
            // {
            //   'dist/index.js': 'dist/index.fda4f5f1.js'.replace(/^.+\.(\w{8})\..+$/, '$1'),
            //   'dist/index.css': 'dist/index.27f6a4a4.css'
            // }
            const source = src[0] // './index.css'
            const k = source.replace(/^\.\/(.*)$/, '$1') // 'index.css'
            const reg = new RegExp(k)
            for (let key in grunt.filerev.summary) {
              if (reg.test(key)) {
                const hash = grunt.filerev.summary[key].replace(/^.+\.(\w{8})\..+$/, '$1')
                const url = source.replace(/^(.+)(\..+)$/, `$1.${hash}$2`)
                return `<link rel="stylesheet" href="${url}">`
              }
            }
          },
          js: ({src}) => {
            // filerev插件执行完会在grunt上挂清单 对象为grunt.filerev.summary
            // {
            //   'dist/index.js': 'dist/index.fda4f5f1.js'.replace(/^.+\.(\w{8})\..+$/, '$1'),
            //   'dist/index.css': 'dist/index.27f6a4a4.css'
            // }
            const source = src[0] // './index.css'
            const k = source.replace(/^\.\/(.*)$/, '$1') // 'index.css'
            const reg = new RegExp(k)
            for (let key in grunt.filerev.summary) {
              if (reg.test(key)) {
                const hash = grunt.filerev.summary[key].replace(/^.+\.(\w{8})\..+$/, '$1')
                const url = source.replace(/^(.+)(\..+)$/, `$1.${hash}$2`)
                return `<script src="${url}"></script>`
              }
            }
          }
        }
      }
    },
    htmlmin: {
      options: {
        collapseWhitespace: true, // 压缩html
        removeComments: true, // 删除html中的注释
        removeEmptyAttributes: true, // 删除没用的空属性值
        minifyJS: true, // 压缩页面js
        minifyCSS: true // 压缩页面写css
      },
      [target]: {
        files: {
          [htmlMiddlePath]: htmlMiddlePath
        }
      }
    },
    connect: {
      [target]: {
        options: {
          base: './dist', // 启动服务的根路径
          hostname: '0.0.0.0',
          port: 7777,
          livereload: true, // 启用自动刷新
          open: true // 自动打开浏览器
        }
      }
    },
    watch: {
      options: {
        livereload: true // 通知connect刷新
      },
      files: ['./src/**/**.**'], // 监听文件变动
      tasks: startTack // 文件变动时 重新运行的任务
    }
  })

  // 启用插件
  grunt.loadNpmTasks('grunt-contrib-clean') // 删除目录
  grunt.loadNpmTasks('grunt-contrib-copy') // 复制文件
  grunt.loadNpmTasks('grunt-browserify') // cjs es6模块 转浏览器可以直接识别的
  grunt.loadNpmTasks('grunt-babel') // 编译es6
  grunt.loadNpmTasks('grunt-contrib-uglify') // 压缩js
  grunt.loadNpmTasks('grunt-contrib-less') // 编译less
  grunt.loadNpmTasks('grunt-contrib-cssmin') // 压缩css
  grunt.loadNpmTasks('grunt-filerev') // hash文件指纹
  grunt.loadNpmTasks('grunt-usemin') // 多任务插件 包括 useminPrepare usemin
  grunt.loadNpmTasks('grunt-contrib-htmlmin') // 压缩html
  grunt.loadNpmTasks('grunt-contrib-connect') // 热更新服务
  grunt.loadNpmTasks('grunt-contrib-watch') // 监听

  // 执行默认任务
  grunt.registerTask('default', startTack.concat('connect', 'watch')) // 编译完 在启动服务
}
