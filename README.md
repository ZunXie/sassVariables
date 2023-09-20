# sassVariables
sass变量同步js

# 背景
共享样式和js间的共同变量，只维护一个入口即可。

# 使用
```js

import path from 'path'
import sassVarAsync from 'sassVarAsync'

export default defineConfig({
  plugins: [
      sassVarAsync({// {sassfilepath,inputfilepath,globalName}  分别是 sass变量定义文件路径，js入口文件路径，打包后映射js的全局变量名
          sassfilepath: path.resolve(__dirname, './src/variable.scss'),
          inputfilepath: path.resolve(__dirname, './src/main.tsx'),
      }),
  ]
}）
```

# 联系
有基于插件拓展需求可联系 QQ 391119413 及时完善更改