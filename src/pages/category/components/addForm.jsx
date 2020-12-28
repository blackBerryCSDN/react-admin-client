import React, {Component} from 'react';
import { Form, Input, Select, Button} from 'antd';
const Item = Form.Item;
const { Option } = Select;
export default class AddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    // 表单提交
    onFinish = values => {
        console.log(values);
    };
    render() {
        return (
            <div>
                <Form initialValues={{ remember: true }} onFinish={this.onFinish}>
                    <Item label="分类" name="parentId" labelCol={{span: 4}}>
                        <Select
                            style={{ width: '100%' }}
                            showSearch
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="tom">Tom</Option>
                        </Select>
                    </Item>

                    <Item label="分类名称" name="categoryName" labelCol={{span: 4}} rules={[{ required: true, whitespace: true, message: '分类名称必须输入!' }]}>
                        <Input placeholder='请输入分类名称'/>
                    </Item>

                    <Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Item>
                </Form>
            </div>
        )
    }
}