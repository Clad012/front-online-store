import React, { Component } from 'react'
import { Icon, Card, Button, Image, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class MenuExampleInvertedVertical extends Component {
//   state = { activeItem: 'home' }

//   handleItemClick = (e: any, { name }: any) => this.setState({ activeItem: name })

  render() {
    // const { activeItem } = this.state

    return (
        <Card fluid className="minHeight alignLeft linkCard">
            <div className="logo">
                  <Image src='https://uploads-ssl.webflow.com/5d6697e045315232309ca291/5f464d99f24bfc3ab155f93e_smaller%20version%20new%20logo%20(2).png' size='small' />
            </div>
            <div className="Links">
              {/* <div className="linkNav"><Link to="/something"> <Icon circular color='red' name='users' /> Test</Link></div>
              <div className="linkNav"><Link to="/something"> <Icon circular color='orange' name='sign language' /> Test</Link></div>
              <div className="linkNav"><Link to="/something"> <Icon circular color='blue' name='universal access' /> Test</Link></div> */}
              <Link to="/all" className="linkNav">
                <Label tag>
                  Tous les produits
                </Label>
              </Link>
              <Link to="/femme" >
                <Label  color="pink" className="linkNav" tag>
                  Femme
                </Label>
              </Link>
              <Link to="/homme" >
                <Label color="blue" className="linkNav"  tag>
                    Homme
                </Label>
              </Link>
              <Link to="/jacket" >
                <Label color='teal' className="linkNav"  tag>
                  Jackets
                </Label>
              </Link>
              <Link to="/electronics">
                <Label  color='orange' className="linkNav"  tag>
                  Electronics
                </Label>
              </Link>

              <Link to="/SSD">
                <Label  color='olive' className="linkNav"  tag>
                  SSD
                </Label>
              </Link>

              <Link to="/coat">
                <Label  color='brown' className="linkNav"  tag>
                  Coats
                </Label>
              </Link>

              <Link to="/winter">
                <Label  color='grey' className="linkNav"  tag>
                  Winter
                </Label>
              </Link>

              <Link to="/screen">
                <Label  color='green' className="linkNav"  tag>
                  Screen
                </Label>
              </Link>
            </div>
        </Card>
    )
  }
}
