import React from 'react'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Application } from '../../src/client/Application'
import { CartApi } from '../../src/client/api'
import { initStore } from '../../src/client/store'
import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { filledCart, detailsItem1, detailsItem2 } from './mockData'
import { fireEvent } from '@testing-library/react'
import { screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

const basename = '/hw/store'

export function wrapWithProviders ({useMockData = true } = {}) {
  const cart = useMockData ? new mockCartApi() : new CartApi()
  const history = createMemoryHistory({
    initialEntries: ['/'],
    initialIndex: 0,
  })

  const api = new productApi(filledCart)
  const store = initStore(api, cart)

  return { ...render(
      <Router basename={basename} history={history}>
        <Provider store={store}>
          <Application />
        </Provider>
      </Router>
    ), 
    history, 
    store 
  }
}


class productApi {
  constructor(stubProducts) {
    this.stubProducts = stubProducts;
  }
  async getProducts() {
    return { data: this.stubProducts };
  }

  async getProductById(id) {
    return {
      data: id == detailsItem1.id ? detailsItem1 : detailsItem2,
    }
  }

  async checkout(form, cart) {
    return { data: { id: 1 } }
}
}

class mockCartApi {
  constructor() {
    this.state = {}
  }
  getState() {
    return this.state
  }

  setState(cart) {
    this.state = cart
  }
}

export async function openPage ({ history, address }) {
  history.push(address)
  await waitFor(() => {
      try {
          // const loading = screen.getByText('LOADING')
          return false
      } catch (e) {
          return true
      }
  })
}

export const openCatalogPage = async (...args) => {
  const params = wrapWithProviders(...args)
  await openPage({ address: '/catalog', history: params.history })
  return params
}

export async function addItemToCart ({ id, history, count }) {
    history.push('/')
    await openPage({ history, address: `/catalog/${id}` })
    let addToCartButton = screen.getByText('Add to Cart')
    for (let i = 0; i < count; ++i) {
      await fireEvent.click(addToCartButton)
    }
}



