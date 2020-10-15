import React, { Component } from 'react'
import { Grid, Container } from 'semantic-ui-react'
// import Header from './Header'
import SideMenu from './SideMenu'
import TopNav from './TopNav'
// import ProductList from '../Product/ProductList'
import Routes from '../../routes'

export default class MenuExampleStackable extends Component {
  state = {}

  handleItemClick = (e: any, { name } : any) => this.setState({ activeItem: name })

  render() {
    // const { activeItem } : any = this.state
    // const Wrap = ({ children }: any)  => <div>{children}</div>
    return (
    <Container>
        {/* <Header /> */}
        
        <Grid container className="marginTop" stretched stackable>
            <Grid.Row>
            <Grid.Column   mobile={8} tablet={4} computer={3}>
                <SideMenu />
            </Grid.Column>
            <Grid.Column  mobile={8} tablet={12} computer={13}>
                <TopNav />
                <Routes />
            </Grid.Column>
            </Grid.Row>
        </Grid>
    </Container>
    )
  }
}