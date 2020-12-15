import React from 'react'
import { Button, message } from 'antd'

class App extends React.Component{
    handleClick = ()=> {
        message.success('成功啦...');
    }
    render() {
        return (
            <div>
                <Button type='primary' onClick={this.handleClick}>学习</Button>
            </div>
        )
    }
}
export default App