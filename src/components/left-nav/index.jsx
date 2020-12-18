import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import { Menu } from 'antd';

import menuList from '../../config/menuConfig'
import logo from '../../assets/images/logo.png'
import './index.less'
const { SubMenu } = Menu;


class LeftNav extends React.Component{
    /*
        根据menu的数据数组生成对应的标签数组
        使用map() + 递归调用
    */
    getMenuNodes_map = menuList => {
        return menuList.map(item => {
            if (!item.children) {
                return (
                        <Menu.Item key={item.key} icon={item.icon}>
                            <Link to={item.key}>
                                {item.title}
                            </Link>
                        </Menu.Item>
                )
            }else {
                return (
                    <SubMenu key={item.key} icon={item.icon} title={item.title}>
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        })
    };

    /*
        根据menu的数据数组生成对应的标签数组
        使用reduce() + 递归调用
    */
    getMenuNodes = menuList => {
        const path = this.props.location.pathname
        return menuList.reduce((pre, item) => {
            if (!item.children) {
                pre.push((
                    <Menu.Item key={item.key} icon={item.icon}>
                        <Link to={item.key}>
                            {item.title}
                        </Link>
                    </Menu.Item>
                ))
            }else {
                const cItem = item.children.find(e => path.indexOf(e.key)===0);
                if (cItem) {
                    this.openKey = item.key
                }
                pre.push((
                    <SubMenu key={item.key} icon={item.icon} title={item.title}>
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                ))
            }
            return pre
        },[])
    }

    UNSAFE_componentWillMount() {
        this.menuNodes = this.getMenuNodes(menuList);
    }

    render() {
        const path = this.props.location.pathname;
        const openKey = this.openKey;
        return (
            <div className="left-nav">
                <Link to='/' className="left-nav-header">
                    <img src={logo} alt="logo"/>
                    <h1>硅谷后台</h1>
                </Link>

                <Menu theme="dark" mode="inline" selectedKeys={[path]} defaultOpenKeys={[openKey]}>
                    {this.menuNodes}
                </Menu>
            </div>
        )
    }
}
export default withRouter(LeftNav)