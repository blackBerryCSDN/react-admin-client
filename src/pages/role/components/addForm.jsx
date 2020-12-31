import React, {Component} from 'react';
import {Form, Input} from 'antd'
const Item = Form.Item;

export default class AddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.setForm(this.refs.form)

    }

    render() {
        return (
            <Form ref="form">
                <Item label="角色名称" name="roleName" rules={[{required: true, whitespace: true, message: '角色名称必须输入!'}]}>
                    <Input placeholder="请输入角色名称"/>
                </Item>
            </Form>
        )
    }
}