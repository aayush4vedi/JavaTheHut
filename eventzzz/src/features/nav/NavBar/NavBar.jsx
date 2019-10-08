import React, { Component } from 'react'
import { Menu, Button, Container } from 'semantic-ui-react'

class NavBar extends Component {
    render() {
        return (
            <Menu inverted fixed="top">
                <Container>
                    <Menu.Item header>
                        <img src="assests/logo.png" alt="logo"/>
                        Eventzzz
                    </Menu.Item>
                    <Menu.Item
                        name='Events'
                        />
                    <Menu.Item>
                        <Button floated="right" positive inverted content="Create Event"/>
                    </Menu.Item>
                    <Menu.Item position="right">
                        <Button basic inverted content="login"></Button>
                        <Button basic inverted content="logout" 
                            style = {{marginLeft: '1em'}}
                            ></Button>
                    </Menu.Item>
                </Container>
            </Menu>
        )
    }
}
export default NavBar
