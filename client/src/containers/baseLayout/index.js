import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Segment, Sidebar, Menu, Icon } from 'semantic-ui-react';
import { push } from 'react-router-redux';

import { logoutUser } from "./../../actions/AuthActions";

class BaseLayout extends Component {
    componentWillMount() {
        const { token } = this.props.auth;
        const { dispatch } = this.props;
        if (!token) {
            dispatch(push("/login"));
        }
    }
    handleClick(menuItem) {
        const { dispatch } = this.props;
        if (menuItem === "addInventory") {
            dispatch(push('/inventory/add'));
        }
        else if (menuItem === "viewInventories") {
            dispatch(push('/inventory'));
        }
        else if (menuItem === "approveInventory") {
            dispatch(push('/inventory/approve'));
        }
        else if (menuItem === "logout") {
            dispatch(logoutUser());
            dispatch(push('/login'));
        }
    }
    render() {
        const { user } = this.props.auth;
        const isStoreManager = user.roles.indexOf("storeManager") >= 0;
        let approveInventoryMenuItem = null;
        if (isStoreManager) {
            approveInventoryMenuItem = (
                <Menu.Item onClick={this.handleClick.bind(this, "approveInventory")} >
                    Approve Inventory
                </Menu.Item>
            );
        }
        return (
            <Container fluid>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar as={Menu} animation='slide along' width='thin' visible={true} icon='labeled' vertical inverted>
                        <Menu.Item onClick={this.handleClick.bind(this, "addInventory")}>
                            Add Inventory
                        </Menu.Item>
                        <Menu.Item onClick={this.handleClick.bind(this, "viewInventories")} >
                            View Inventories
                        </Menu.Item>
                        {approveInventoryMenuItem}
                        <Menu.Item onClick={this.handleClick.bind(this, "logout")} >
                            Logout
                        </Menu.Item>
                    </Sidebar>
                    <Sidebar.Pusher>
                        {this.props.children}
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </Container>
        )
    }
}

function mapStatesToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStatesToProps)(BaseLayout);