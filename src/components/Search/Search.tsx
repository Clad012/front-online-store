import _ from 'lodash'
import React from 'react'
import { Search, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import { Product } from '../../store/products/types'
import { callApi } from '../../utils/api'
import { RouteComponentProps } from "react-router-dom"; 
import { withRouter } from "react-router-dom";

// Separate state props + dispatch props to their own interfaces.

interface PropsFromState {
  loading: boolean
  data: Product[]
  errors?: string
}


const initialState = { isLoading: false, results: [], value: '' }
// const resultRenderer = ({ title, image, price }: any) => {

//     return (<div>
//     <Image src={image} size='tiny' verticalAlign='middle' />
//     <span className="title">{title}</span></div>)
// }
type AllProps = PropsFromState & RouteComponentProps
class SearchExampleStandard extends React.Component<AllProps, any> {
  state = initialState
  constructor(props: AllProps) {
    super(props)
    this.handleResultSelect = this.handleResultSelect.bind(this)
  }

  handleResultSelect = (e: any, { result }: any) => {
      this.setState({ value: result.title })
      this.props.history.push("/product/"+result.id);
    }

  handleSearchChange = (e: any, { value }: any) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      const isLocal = false;
      const GLITCH_ENDPOINT = 'https://backend-api-store.glitch.me';
      const LOCAL_API = 'http://localhost:4000'
      const API_ENDPOINT = isLocal ? LOCAL_API : GLITCH_ENDPOINT;
      callApi('get', API_ENDPOINT, 'search?search='+value)
      .then((response) =>{
          if (this.state.value.length < 1) return this.setState(initialState)
          const data = _.map(response.result, '_source');
          data.forEach(el =>{
            el.description = '';
            el.price = el.price+'€';
          });
          this.setState({
            isLoading: false,
            results: data,
          })
       })

    }, 300)
  }

  render() {
    const { isLoading, value, results } = this.state

    return (
      <Grid>
        <Grid.Column>
          <Search
            input={{ icon: 'search', iconPosition: 'left' }}
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            results={results}
            // resultRenderer={resultRenderer}
            value={value}
          />
        </Grid.Column>
      </Grid>
    )
  }
}
const mapStateToProps = ({ products }: ApplicationState) => ({
  loading: products.loading,
  errors: products.errors,
  data: products.data
})

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
  mapStateToProps
)(withRouter(SearchExampleStandard))