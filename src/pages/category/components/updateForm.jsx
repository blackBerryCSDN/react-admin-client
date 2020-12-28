import React, {Component} from 'react';
// import PropTypes from 'prop-types'
import { Form, Input} from 'antd';
const Item = Form.Item;

export default class UpdateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        // 清空form的数据
        // this.refs.form.resetFields();
        // console.log(this.refs.form);
        this.props.setForm(this.refs.form)
        // console.log(this.props.categoryName.name);

    }
    render() {
        const categoryName = this.props.categoryName.name
        return (
            <Form ref="form" initialValues={{categoryName: categoryName}}>
                <Item label="分类名称" name="categoryName" labelCol={{span: 4}} rules={[{ required: true, whitespace: true, message: '分类名称必须输入!' }]}>
                    <Input placeholder='请输入分类名称'/>
                </Item>
            </Form>
        )
    }
}
//
// UpdateForm.propTypes = {
//     categoryName: PropTypes.string.isRequired,
//     setForm: PropTypes.func.isRequired
// };
