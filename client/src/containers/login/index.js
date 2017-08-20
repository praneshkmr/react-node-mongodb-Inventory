import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { Header, Segment, Input, Label, Form, Button, Message } from "semantic-ui-react";
import { push } from 'react-router-redux';

import { loginUser } from "./../../actions/AuthActions";

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
        return dispatch(loginUser(values));
    }
    render() {
        const { handleSubmit, pristine, initialValues, errors, submitting } = this.props;
        const { dispatch } = this.props;
        const { token, user, isLoggingIn, loggingInError } = this.props.auth;
        if (token) {
            dispatch(push("/inventory/add"));
        }
        let error = null;
        if (loggingInError) {
            error = (
                <Message negative>
                    <Message.Header>Error while Login</Message.Header>
                    <p>{loggingInError}</p>
                </Message>
            )
        }
        return (
            <Segment textAlign='center' loading={isLoggingIn}>
                <Header as="h2">Login</Header>
                {error}
                <Form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Form.Field inline>
                        <Field name="email" placeholder="Enter the Email" component={this.renderField}></Field>
                    </Form.Field>
                    <Form.Field inline>
                        <Field name="password" type="password" placeholder="Enter the Password" component={this.renderField}></Field>
                    </Form.Field>
                    <Button loading={submitting} disabled={submitting}>Login</Button>
                </Form>
            </Segment>
        )
    }
}

function mapStatesToProps(state) {
    return {
        auth: state.auth
    }
}

export default reduxForm({
    form: "Login",
    validate
})(connect(mapStatesToProps)(Login));

