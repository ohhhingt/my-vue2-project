module.exports = {  
  presets: [  
    '@babel/preset-env'  
  ],  
  plugins: [  
    ['component',   
      {  
        libraryName: 'element-ui',  
        styleLibraryName: 'theme-chalk'  
      }  
    ]  
  ],  
  ignore: [  
    'node_modules/element-ui/lib/index.js' // 忽略特定文件  
  ] 
};  