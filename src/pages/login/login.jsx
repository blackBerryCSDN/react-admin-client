/*用户登陆的路由组件 */
import React from 'react'
import { Form, Input, Button,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {reqLogin} from "../../api";
import memory from '../../utils/memory'
import storage from '../../utils/storage'

import logo from '../../assets/images/logo.png'
import './login.less'
const Item = Form.Item

class Login extends React.Component{
    // 表单提交
    onFinish = async values=> {
        const {username, password} = values;
        const response = await reqLogin(username, password)
        console.log(response);
        if (response.status === 0) {
            const user = response.data;
            memory.user = user;
            storage.saveUser(user)
            message.success('登录成功');
            setTimeout( () => {
                this.props.history.replace('/')
            }, 1000)
        }else {
            message.error(response.msg)
        }
        // reqLogin(username, password).then(res => {
        //     console.log(res.data);
        // }).catch(err => {
        //     console.log(err);
        // })
    };

    // 自定义校验规则
    validator = (rule, value)=> {
        const length = value && value.length
        const pwdReg = /^[a-zA-Z0-9_]+$/
        if (!value) {
            return Promise.reject('请输入密码!')
        }else if (length < 4) {
            return Promise.reject('密码必须大于4位!')
        }else if (length > 12) {
            return Promise.reject('密码必须小于12位!')
        }else if (!pwdReg.test(value)) {
            return Promise.reject('密码必须是英文、数组或下划线 组成!')
        }else {
            return Promise.resolve()
        }
    };

    render() {
        return (
            <div className='login'>
                <header className='login-header'>
                    <img src={logo} alt="logo"/>
                    <h1>React 项目: 后台管理系统</h1>
                </header>
                <section className='login-content'>
                    <h3>用户登录</h3>
                    <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={this.onFinish}>
                        <Item name="username" rules={[
                            { required: true, whitespace: true, message: '请输入用户名!' },
                            { min: 4, message: '用户名必须大于4位!' },
                            { max: 12, message: '用户名必须小于12位!' },
                            { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数组或下划线 组成!' },
                            ]}>
                            <Input prefix={<UserOutlined className="site-form-item-icon" style={{color: 'rgba(0,0,0,.25)'}} />} placeholder="用户名" />
                        </Item>
                        <Item name="password" rules={[
                            { validator: this.validator }
                            ]}>
                            <Input prefix={<LockOutlined className="site-form-item-icon" style={{color: 'rgba(0,0,0,.25)'}} />} type="password" placeholder="密码"/>
                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Item>
                    </Form>
                </section>
            </div>
        )
    }
}
export default Login