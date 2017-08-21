import React, { Component } from 'react'
import { Container, Menu, Grid } from 'semantic-ui-react'

export default class MenuExampleHeaderVertical extends Component {
    render() {
        return (
            <Container fluid>
                <Grid divided='vertically'>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <Menu vertical>
                                <Menu.Item>
                                    <Menu.Header>Inventory</Menu.Header>
                                    <Menu.Menu>
                                        <Menu.Item name='addInventory' />
                                        <Menu.Item name='viewInventory' />
                                    </Menu.Menu>
                                </Menu.Item>
                                <Menu.Item>
                                    <Menu.Header>Work Flow</Menu.Header>
                                    <Menu.Menu>
                                        <Menu.Item name='approveInventory' />
                                    </Menu.Menu>
                                </Menu.Item>
                            </Menu>
                        </Grid.Column>
                        <Grid.Column>
                            {this.props.children}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}