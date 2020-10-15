import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import Search from '../Search/Search'
export default class MenuExampleInvertedSegment extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e: any, { name }: any) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Segment >
        <Menu  secondary>
          <Menu.Item
            name='Rechercher'
            active={activeItem === 'friends'}
            onClick={this.handleItemClick}
          />
          <Search />
          {/* <Menu.Item
            name='Voir tous les produits'
            inverted
            color="red"
            active={activeItem === 'Voir tous les produitsnds'}
            onClick={this.handleItemClick}
          /> */}
        </Menu>
      </Segment>
    )
  }
}