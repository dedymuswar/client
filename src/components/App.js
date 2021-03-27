import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Header from './Header'
import StreamCreate from './streams/StreamCreate'
import StreamEdit from './streams/StreamEdit'
import StreamDelete from './streams/StreamDelete'
import StreamList from './streams/StreamList'
import StreamShow from './streams/StreamShow'

const App = () => {
    return (
        <div className="ui container">
            <BrowserRouter>
                <Header />
                <Route path="/" exact component={StreamList}></Route>
                <Route path="/stream/new" component={StreamCreate}></Route>
                <Route path="/stream/edit" component={StreamEdit}></Route>
                <Route path="/stream/delete" component={StreamDelete}></Route>
                <Route path="/stream/show" component={StreamShow}></Route>
            </BrowserRouter>
        </div>
    );
}
export default App;