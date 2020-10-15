import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Card, Image, Icon } from 'semantic-ui-react'

import { ApplicationState } from '../../store'
import { Product } from '../../store/products/types'
import { fetchRequest } from '../../store/products/actions'
import { RouteComponentProps } from "react-router-dom"; 
import { withRouter } from "react-router-dom";
import Loader from '../Loading/Loading'

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  loading: boolean
  data: Product[]
  errors?: string,
  query?: string
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  fetchRequest: typeof fetchRequest
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch & RouteComponentProps


class ProductsIndexPage extends React.Component<AllProps> {
  public componentDidMount() {
    const { match: { params } }: any = this.props;
    const { fetchRequest: getProducts } = this.props
    // let search = new URLSearchParams(this.props.location.search);
    getProducts(params.query ? String(params.query) : 'all');
  }
  componentWillReceiveProps(){
      setTimeout(() => {
        console.log('CLICKED')
        const { fetchRequest: getProducts, query: query } = this.props
        const { match: { params } }: any = this.props;

        let queryStr = params.query ? params.query : 'all';
        console.log(query, queryStr)
        if(!this.props.loading && (queryStr != query)){
            getProducts(queryStr);
        }
      }, 100);
  }
  private renderData() {
    const { loading, data } = this.props

    return (
      <Card.Group itemsPerRow={3}>
        {loading && data.length === 0 && (
            <div></div>
        )}
        {data.map(product => (
              <Card key={product.id} className="float">
                <Image src={product.image}  ui={false} className="cardImage"/>
                <Card.Content>
                <Card.Header>{product.title}</Card.Header>
                <Card.Meta>
                    <span className='date'>{product.category}</span>
                </Card.Meta>
                {/* <Card.Description>
                    Matthew is a musician living in Nashville.
                </Card.Description> */}
                </Card.Content>
                <Card.Content extra>
                <Link to={'/product/'+product.id}>
                    Voir plus &nbsp;&nbsp;
                    <Icon name='arrow right' />
                </Link>
                </Card.Content>
            </Card>
        ))}
      </Card.Group>
    )
  }

  public render() {
    const { loading } = this.props

    return (
        <div>
            {loading && (
                <Loader />
            )}
            {/* <p>
              <small>*in last 30 days</small>
            </p> */}
            {this.renderData()}
        </div>
    )
  }
}

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ products }: ApplicationState) => ({
  loading: products.loading,
  errors: products.errors,
  data: products.data,
  query: products.query
})

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = {
  fetchRequest
}

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductsIndexPage))