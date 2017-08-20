import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { Header, Segment, Input, Label, Form, Button } from "semantic-ui-react";

function validate(values) {
    var errors = {};
    const { email, password } = values;
    if (!email || email.trim() === "") {
        errors.email = "Email is Required";
    }
    if (!password || password.trim() === "") {
        errors.password = "Password is Required";
    }
    return errors;
}

class Login extends Component {
    renderField({ input, meta: { touched, error }, ...custom }) {
        const hasError = touched && error !== undefined;
        return (
            <div>
                <Input type="text" error={hasError} fluid {...input} {...custom} />
                {hasError && <Label basic color="red" pointing>{error}</ Label>}
            </div>
        )
    }
    onSubmit(values, dispatch) {
        console.log(values);
    }
    render() {
        const { handleSubmit, pristine, initialValues, errors, submitting } = this.props;
        return (
            <Segment textAlign='center'>
                <Header as="h2">Login</Header>
                <Form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Form.Field inline>
                        <Field name="email" placeholder="Enter the Email" component={this.renderField}></Field>
                    </Form.Field>
                    <Form.Field inline>
                        <Field name="password" placeholder="Enter the Password" component={this.renderField}></Field>
                    </Form.Field>
                    <Button loading={submitting} disabled={submitting}>Login</Button>
                </Form>
            </Segment>
        )
    }
}

function mapStatesToProps(state) {
    return state;
}

export default reduxForm({
    form: "Login",
    validate
})(connect(mapStatesToProps)(Login));

