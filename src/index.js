import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import memory from './utils/memory'
import storage from './utils/storage'

// 读取local中保存user, 保存到内存中
const user = storage.getUser()
if (user && user._id) {
    memory.user = user
}

ReactDOM.render(<App/>, document.getElementById('root'))