import * as React from 'react'
import { Grid, Card, Header, Rating, Label, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { ApplicationState } from '../../store'
import { Product } from '../../store/products/types'
import { fetchOneProductRequest } from '../../store/products/actions'
import Loader from '../Loading/Loading'


interface PropsFromState {
  loading: boolean
  product?: Product,
  errors?: string,
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  fetchOneProductRequest: typeof fetchOneProductRequest
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch


class ProductDetails extends React.Component<AllProps> {
    componentDidMount(){
        const { match: { params } }: any = this.props;
        const { fetchOneProductRequest: fetchOneProduct } = this.props;
        fetchOneProduct(params.productId);
    }
    componentWillReceiveProps(){
        const { match: { params } }: any = this.props;
        const { fetchOneProductRequest: fetchOneProduct } = this.props;

        if(this.props.product && (this.props.product.id !== params.productId) && !this.props.loading){
            fetchOneProduct(params.productId);
        }
        
    }
    public render(){
        const { product, loading } = this.props
        return   (
        <Card fluid >
            {loading && (
                <Loader />
            )}
            {product && (
              <>
                <Grid columns={3} divided stackable>
                    <Grid.Row>
                    <Grid.Column>
                        <div className="content">
                            <Header
                                textAlign='left'
                                as='h3'
                                content={product ? product.title: ''}
                                subheader={product ? product.description: ''}
                            />
                        </div>

                    </Grid.Column>
                    <Grid.Column>
                        <div className="content">
                            <img src={product ? product.image : ''} alt ="" className="productImage"></img>
                        </div>
                    </Grid.Column>
                    <Grid.Column>
                        <div className="content alignLeft">
                            <div className="detailItem">{product.price}€</div>
                            <div className="detailItem"><label className="label">Opinion:</label> <Rating icon='heart' defaultRating={1} maxRating={5} /></div>
                            <div className="detailItem"><label className="label">Couleur:</label> <span className="bubble red"></span> <span className="bubble blue"></span> <span className="bubble green"></span> <span className="bubble orange"></span></div>
                            <div className="detailItem"><label className="label">Taille:</label>    <Label as='a' tag>38</Label><Label as='a' tag>40</Label><Label as='a' tag>42</Label></div>
                            <div className="detailItem"><Button secondary fluid={true}>Ajouter au panier</Button></div>                                                                            

                        </div>
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
             </>
            )}
        </Card>
        )
    }
}

const mapStateToProps = ({ products }: ApplicationState) => ({
  loading: products.loading,
  errors: products.errors,
  product: products.product
})

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = {
  fetchOneProductRequest
}

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetails)
