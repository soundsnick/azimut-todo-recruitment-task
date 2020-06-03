import './App.css'

import React from 'react';
import {
    RecoilRoot,
    atom
} from 'recoil';
import {
    Switch,
    Route,
    Link
} from 'react-router-dom';
import Home from './views/Home';
import Header from './components/Header';
import TodoPage from './views/TodoPage';

const App = () => {
    return (
        <RecoilRoot>
            <Header />
            <main className="main">
                <Switch>
                    <Route exact path='/' component={ Home }/>
                    <Route path='/todos/:page' component={ TodoPage }/>
                </Switch>
            </main>
        </RecoilRoot>
    );
}

export default App;
