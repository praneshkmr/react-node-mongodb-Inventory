import React, { Component } from "react";
import { render } from "react-dom";
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createHashHistory';
import { Route } from 'react-router';
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { persistStore, autoRehydrate } from 'redux-persist'

import { ConnectedRouter, routerMiddleware, push } from 'react-router-redux';

import reducers from './reducers';

import Login from "./containers/login";
import AddInventory from "./containers/addInventory";
import ViewInventories from "./containers/viewInventories";
import ApproveInventory from "./containers/approveInventory";

const history = createHistory();
const logger = createLogger();

const middleware = routerMiddleware(history)

const store = createStore(
    reducers,
    undefined,
    compose(
        applyMiddleware(middleware, logger, thunk),
        autoRehydrate()
    )
)



class App extends Component {
    state = {
        isLoading: true
    }
    componentWillMount() {
        persistStore(store, { whitelist: ['auth'] }, () => {
            this.setState({ isLoading: false });
            store.dispatch(push('/login'))
        })
    }
    render() {
        if (this.state.isLoading) {
            return (
                <div>Loading...</div>
            );
        }
        else {
            return (
                <Provider store={store}>
                    <ConnectedRouter history={history}>
                        <div>
                            {/* <Route exact path="/" component={AddInventory} /> */}
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/inventory/add" component={AddInventory} />
                            <Route exact path="/inventory/approve" component={ApproveInventory} />
                            <Route path="/inventory/:id" component={AddInventory} />
                            <Route exact path="/inventory" component={ViewInventories} />
                        </div>
                    </ConnectedRouter>
                </Provider>
            );
        }
    }
}

render(
    <App />
    , document.getElementById('app')
)
