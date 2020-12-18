import React from 'react'
import {withRouter} from 'react-router-dom'
import menuList from '../../config/menuConfig'
import {reqWeather} from '../../api'
import {formateDate} from '../../utils/date'
import memory from '../../utils/memory'
import { Modal} from 'antd';
import {removeUser} from '../../utils/storage'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './index.less'
const { confirm } = Modal;
class Header extends React.Component{
    // 状态数据
    state = {
        systemTime: formateDate(Date.now()),
        fengxiang: '',
        type: ''
    }

    // 获取当前天气信息
    getWeather = async () => {
        const {fengxiang, type} = await reqWeather('宁波')
        this.setState({
            fengxiang,
            type
        })
    }

    // 获取当前系统时间
    getTime = () => {
        this.timeID = setInterval(() => {
           this.setState({
               systemTime: formateDate(Date.now()),
           })
        }, 1000)
    }

    // 获取当前标题
    getTitle = () => {
        const path = this.props.location.pathname
        let title
        menuList.forEach(menu => {
            if (menu.key === path) {
                title = menu.title
            }else if (menu.children) {
                menu.children.forEach(item => {
                    if (path.indexOf(item.key) === 0) {
                        title = item.title
                    }
                })
            }
        })
        return title
    }

    // 退出系统
    loginOut = () => {
        confirm({
            title: '确定退出吗?',
            icon: <ExclamationCircleOutlined />,
            onOk: () => {
                removeUser()
                memory.user = {}
                this.props.history.replace('./login')
            }
        });
    }

    componentDidMount() {
        this.getWeather();
        this.getTime()
    }

    componentWillUnmount() {
        clearInterval(this.timeID)
    }
    render() {
        const {systemTime, fengxiang, type} = this.state
        const name = memory.user.username
        const title = this.getTitle()
        // console.log(title);
        return(
            <div className="header">
                <div className="header-top">
                    <span>欢迎，{name}</span>
                    <a href="#!" onClick={this.loginOut}>退出</a>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{systemTime}</span>
                        <img src="http://api.map.baidu.com/images/weather/day/duoyun.png" alt="weather"/>
                        <span>{fengxiang} {type}</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Header)