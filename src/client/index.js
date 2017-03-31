import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import RootContainer from './containers/RootContainer';
import ballShooterGame from './reducers';


let store = createStore(ballShooterGame);

render(
    <Provider store={store}>
        <RootContainer />
    </Provider>,
    document.getElementById('react-root')
);