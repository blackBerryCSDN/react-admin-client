import React, {Component} from 'react';
import {Form, Input, Select} from 'antd'
const Item = Form.Item;
const { Option } = Select;

export default class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.setForm(this.refs.form)
    }

    // UNSAFE_componentWillMount() {
    //     // this.roles = this.props.roles
    //     this.user = this.props.user || {}
    // }

    render() {
        const {roles} = this.props;
        const user = this.props.user || {}
        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        };
        return (
            <Form
                ref="form"
                initialValues={{username: user.username, phone: user.phone, email: user.email, role_id: user.role_id}}
                {...layout}
            >
                <Item label="用户名称" name="username" rules={[
                    { required: true, whitespace: true, message: '请输入用户名!' },
                    { min: 4, message: '用户名必须大于4位!' },
                    { max: 12, message: '用户名必须小于12位!' },
                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数组或下划线 组成!' },
                ]}>
                    <Input placeholder="请输入用户名称"/>
                </Item>
                {
                    user._id ? null : (
                        <Item label="密码" name="password" rules={[
                            { required: true, whitespace: true, message: '请输入密码!' },
                            { min: 4, message: '密码必须大于4位!' },
                            { max: 12, message: '密码必须小于12位!' },
                            { pattern: /^[a-zA-Z0-9_]+$/, message: '密码必须是英文、数组或下划线 组成!' },]}>
                            <Input placeholder="请输入密码"/>
                        </Item>
                    )
                }
                <Item label="手机号" name="phone" rules={[{required: true, whitespace: true, message: '手机号必须输入!'}]}>
                    <Input placeholder="请输入手机号"/>
                </Item>
                <Item label="邮箱" name="email" rules={[{required: true, whitespace: true, message: '邮箱必须输入!'}]}>
                    <Input placeholder="请输入邮箱"/>
                </Item>
                <Item label="所属角色" name="role_id" rules={[{required: true, message: '所属角色必须选择!'}]}>
                    <Select
                        placeholder="请选择所属角色"
                        showSearch
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                        {roles.map(role => <Option value={role._id} key={role._id}>{role.name}</Option>)}
                    </Select>
                </Item>
            </Form>
        )
    }
}