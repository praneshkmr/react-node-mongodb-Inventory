import React, { Component } from 'react'
import { Container, Segment, Sidebar, Menu, Icon } from 'semantic-ui-react'

export default class BaseLayout extends Component {
    render() {
        return (
            <Container fluid>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar as={Menu} animation='slide along' width='thin' visible={true} icon='labeled' vertical inverted>
                        <Menu.Item>
                            Add Inventory
                            </Menu.Item>
                        <Menu.Item>
                            View Inventories
                            </Menu.Item>
                        <Menu.Item>
                            Approve Inventory
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