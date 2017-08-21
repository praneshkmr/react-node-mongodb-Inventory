import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { Header, Segment, Input, Label, Form, Button, Message } from "semantic-ui-react";
import { push } from 'react-router-redux';

import BaseLayout from "./../baseLayout";

import { addInventory } from "./../../actions/InventoryActions";

function validate(values) {
    var errors = {
        batch: {}
    };
    const { productId, productName, mrp, batch, quantity } = values;
    if (!productId || productId.trim() === "") {
        errors.productId = "ProductId is Required";
    }
    if (!productName || productName.trim() === "") {
        errors.productName = "ProductName is Required";
    }
    if (!mrp || mrp.trim() === "") {
        errors.mrp = "MRP is Required";
    }
    if (!quantity || quantity.trim() === "") {
        errors.quantity = "Quantity is Required";
    }
    if (!(batch && batch.number) || batch.number.trim() === "") {
        errors.batch.number = "Batch Name is Required";
    }
    if (!(batch && batch.date) || batch.date.trim() === "") {
        errors.batch.date = "Batch Date is Required";
    }
    return errors;
}

class AddInventory extends Component {
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
        return dispatch(addInventory(values));
    }
    render() {
        const { handleSubmit, pristine, initialValues, errors, submitting } = this.props;
        const { token, user, isLoggingIn, loggingInError } = this.props.auth;
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
            <BaseLayout>
                <Segment textAlign='center'>
                    <Header as="h2">Add Inventory</Header>
                    {error}
                    <Form onSubmit={handleSubmit(this.onSubmit.bind(this))} loading={isLoggingIn}>
                        <Form.Field inline>
                            <Field name="productId" placeholder="Enter the Product ID" component={this.renderField}></Field>
                        </Form.Field>
                        <Form.Field inline>
                            <Field name="productName" placeholder="Enter the Product Name" component={this.renderField}></Field>
                        </Form.Field>
                        <Form.Field inline>
                            <Field name="mrp" placeholder="Enter the MRP" component={this.renderField}></Field>
                        </Form.Field>
                        <Form.Field inline>
                            <Field name="batch.number" placeholder="Enter the Batch Number" component={this.renderField}></Field>
                        </Form.Field>
                        <Form.Field inline>
                            <Field name="batch.date" placeholder="Enter the Batch Date" component={this.renderField}></Field>
                        </Form.Field>
                        <Form.Field inline>
                            <Field name="quantity" placeholder="Enter the Quantity" component={this.renderField}></Field>
                        </Form.Field>
                        <Button loading={submitting} disabled={submitting}>Add Inventory</Button>
                    </Form>
                </Segment>
            </BaseLayout>
        )
    }
}

function mapStatesToProps(state) {
    return {
        auth: state.auth
    }
}

export default reduxForm({
    form: "AddInventory",
    validate
})(connect(mapStatesToProps)(AddInventory));
