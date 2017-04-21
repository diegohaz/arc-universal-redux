import React from 'react'
import { configure, addDecorator } from '@kadira/storybook'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter } from 'react-router-redux'

import configureStore from 'store/configure'
import theme from 'components/themes/default'

const store = configureStore({})
const history = createHistory()
const req = require.context('components', true, /.stories.js$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

addDecorator(story => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ConnectedRouter history={history}>
        {story()}
      </ConnectedRouter>
    </ThemeProvider>
  </Provider>
))

configure(loadStories, module)
