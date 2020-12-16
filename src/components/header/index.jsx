import React from 'react'

import './index.less'

export default class Header extends React.Component{
    render() {
        return(
            <div className="header">
                <div className="header-top">
                    <span>欢迎，admin</span>
                    <a href="javaScript:">退出</a>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">首页</div>
                    <div className="header-bottom-right">
                        <span>2020-12-16 19:15:12</span>
                        <img src="" alt="weather"/>
                        <span>晴</span>
                    </div>
                </div>
            </div>
        )
    }
}