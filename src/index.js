// React Elements
import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux'

// Components

// CSS
import './index.css'

// Initial State
const initialState = [];

// Redux Store
const store = createStore(reducer);

// Reducer
function reducer(state = initialState, action) {
    switch(action.type) {
        case "ADD_ITEM":
            let item = {
                id: Math.random(),
                name: action.name
            };
            return [...state, item];
        default:
            return state;
    }
}

// List
const List = ({ items }) => {
    return items.length ? (
        <ul>
            {items.map(item => (
                <li key={item.id}>{item.name}</li>
            ))}
        </ul>
    ) : (
        <div>No Items Yet</div>
    )
};

// Map State To Props
const mapStateToProps = state => {
    return {
        items: state
    }
};

// Connect List
const ConnectedList = connect(mapStateToProps)(List);

// Main App
class App extends React.Component {
    state = {
        itemName: ''
    };

    setItemName = e => {
        this.setState({
            itemName: e.target.value
        });
    };

    addItem = () => {
        this.props.dispatch({
            type: 'ADD_ITEM',
            name: this.state.itemName
        });
        this.setState({ itemName: '' })
    };

    render() {
        const { itemName } = this.state;

        return (
            <div>
                <form onSubmit={e => e.preventDefault()}>
                    <label>
                        Item to Buy: 
                        <input
                            value={itemName}
                            onChange={this.setItemName}
                        />
                    </label>
                    <button
                        onClick={this.addItem}
                        disable={!itemName}
                    >
                        Add
                    </button>
                </form>
                <ConnectedList />
            </div>
        )
    }
}

// Connect App
const ConnectedApp = connect()(App);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedApp />
    </Provider>,
    document.getElementById('root')
);