import React, { Component } from "react";
import { connect } from "react-redux";
import { Segment, Header, Message, Table, Icon } from "semantic-ui-react";
import { push } from 'react-router-redux';

import BaseLayout from "./../baseLayout";

import { getPendingInventories, approveInventory } from "./../../actions/InventoryActions";

class ApproveInventory extends Component {
    componentWillMount() {
        const { token, dispatch } = this.props;
        dispatch(getPendingInventories({ token: token }));
    }
    onPressApprove(inventory) {
        const { token, dispatch } = this.props;
        dispatch(approveInventory({ token: token, inventory: inventory })).then(function (data) {
            dispatch(push("/inventory"));
        });
    }
    render() {
        const { pendingInventories, isFetchingInventories, fetchingInventoriesError, deletingsInventoriesError } = this.props.inventory;
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
        const inventoriesView = pendingInventories.map(function (inventory) {
            const latestHistory = getLatestHistory(inventory);
            let operationText = null;
            switch (latestHistory.action) {
                case "created": {
                    operationText = "Creation";
                    break;
                }
                case "updated": {
                    operationText = "Updation";
                    break;
                }
                case "removed": {
                    operationText = "Removal";
                    break;
                }
            }
            return (
                <Table.Row key={inventory.id}>
                    <Table.Cell>{inventory.productId}</Table.Cell>
                    <Table.Cell>{inventory.productName.en}</Table.Cell>
                    <Table.Cell>{operationText}</Table.Cell>
                    <Table.Cell>{inventory.status}</Table.Cell>
                    <Table.Cell ><Icon name='checkmark' size='large' onClick={this.onPressApprove.bind(this, inventory)} /></Table.Cell>
                </Table.Row>
            )
        }, this);
        let tableView = <h4>No Inventories Found. Please Add Some </h4>
        if (pendingInventories.length > 0) {
            tableView = (
                <Table celled fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Product ID</Table.HeaderCell>
                            <Table.HeaderCell>Product Name</Table.HeaderCell>
                            <Table.HeaderCell>Operation</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
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

function getLatestHistory(inventory) {
    let latestHistory = null
    inventory.history.every(function (history) {
        if (latestHistory) {
            if ((new Date(history.timestamp)).getTime() > (new Date(latestHistory.timestamp)).getTime()) {
                latestHistory = history;
            }
        }
        else {
            latestHistory = history;
        }
        return true;
    });
    return latestHistory;
}

function mapStatesToProps(state) {
    return {
        token: state.auth.token,
        inventory: state.inventory
    }
}

export default connect(mapStatesToProps)(ApproveInventory);
