import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import promise from 'redux-promise';
//BrowserRouter object interacts with History library, and decides what to do with the changed url, it tells react
//what to render based on the url
//Route object is a react component provides configuration, if the url looks like this then show a particular component

import reducers from './reducers';
import PostIndex from './components/posts_index';
import PostsNew from './components/posts_new.js';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
    <div>
      <Switch>
        <Route path="/posts/new" component={PostsNew} />
        <Route path="/" component={PostIndex} />
      </Switch>
    </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));


      {/*path is a string that describes the route, component shows the particular component on screen, so it is
      saying at this particular route show this particular component otherwise dont*/}