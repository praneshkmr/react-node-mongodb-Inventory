import React, { Component } from "react";
import { connect } from "react-redux";
import { Segment, Header, Message, Table, Icon } from "semantic-ui-react";
import { push } from 'react-router-redux';

import BaseLayout from "./../baseLayout";

import { getInventories, deleteInventory } from "./../../actions/InventoryActions";

class AddInventory extends Component {
    componentWillMount() {
        const { token, dispatch } = this.props;
        dispatch(getInventories({ token: token }));
    }
    onPressEdit(inventory) {
        const { dispatch } = this.props;
        dispatch(push("/inventory/" + inventory.id));
    }
    onPressDelete(inventory) {
        const { token, dispatch } = this.props;
        dispatch(deleteInventory({ token: token, inventory: inventory })).then(function (data) {
            dispatch(getInventories({ token: token }));
        });
    }
    render() {
        const { inventories, isFetchingInventories, fetchingInventoriesError, deletingsInventoriesError } = this.props.inventory;
        let error = null;
        if (fetchingInventoriesError || deletingsInventoriesError) {
            error = (
                <Message negative>
                    <Message.Header>Error while Fetching Inventory</Message.Header>
                    <p>{fetchingInventoriesError}</p>
                    <p>{deletingsInventoriesError}</p>
                </Message>
            )
        }
        const inventoriesView = inventories.map(function (inventory) {
            return (
                <Table.Row key={inventory.id}>
                    <Table.Cell>{inventory.productId}</Table.Cell>
                    <Table.Cell>{inventory.productName.en}</Table.Cell>
                    <Table.Cell>{inventory.status}</Table.Cell>
                    <Table.Cell >{inventory.mrp}</Table.Cell>
                    <Table.Cell >{inventory.quantity}</Table.Cell>
                    <Table.Cell >{inventory.batch.number}</Table.Cell>
                    <Table.Cell >{inventory.batch.date}</Table.Cell>
                    <Table.Cell >
                        <Icon name='trash outline' size='large' onClick={this.onPressDelete.bind(this, inventory)} />
                        <Icon name='pencil' size='large' onClick={this.onPressEdit.bind(this, inventory)} />
                    </Table.Cell>
                </Table.Row>
            )
        }, this);
        let tableView = <h4>No Inventories Found. Please Add Some </h4>
        if (inventories.length > 0) {
            tableView = (
                <Table celled fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={1}>Product ID</Table.HeaderCell>
                            <Table.HeaderCell>Product Name</Table.HeaderCell>
                            <Table.HeaderCell width={1}>Status</Table.HeaderCell>
                            <Table.HeaderCell width={1}>MRP</Table.HeaderCell>
                            <Table.HeaderCell width={1}>Quantity</Table.HeaderCell>
                            <Table.HeaderCell>Batch Number</Table.HeaderCell>
                            <Table.HeaderCell>Batch Date</Table.HeaderCell>
                            <Table.HeaderCell>Options</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {inventoriesView}
                    </Table.Body>
                </Table>
            )
        }
        return (
            <BaseLayout>
                <Segment textAlign='center' >
                    <Header as="h2">Inventory List</Header>
                    {error}
                    {/* <Segment loading={isFetchingInventories}> */}
                    {tableView}
                    {/* </Segment> */}
                </Segment>
            </BaseLayout>
        )
    }
}

function mapStatesToProps(state) {
    return {
        token: state.auth.token,
        inventory: state.inventory
    }
}

export default connect(mapStatesToProps)(AddInventory);
