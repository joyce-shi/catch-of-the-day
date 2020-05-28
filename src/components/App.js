import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
  static propTypes = {
      match: PropTypes.object
  }

  state = {
      fishes: {},
      order: {},
  }

  componentDidMount() {
      const { params } = this.props.match;

      const localStorageRef = localStorage.getItem(params.storeId);
      if (localStorageRef) {
          this.setState({ order: JSON.parse(localStorageRef) });
      }

      this.ref = base.syncState(`${params.storeId}/fishes`, {
          context: this,
          state: 'fishes',
      });
  }

  componentWillUnmount() { // to avoid memory leak
      base.removeBinding(this.ref);
  }

  componentDidUpdate() {
      const { params } = this.props.match;
      localStorage.setItem(params.storeId, JSON.stringify(this.state.order));
  }

  addFish = (fish) => {
      const fishes = { ...this.state.fishes }; // copy existing state
      fishes[`fish${Date.now()}`] = fish; // push new fish onto array
      this.setState({ // update whole state
          fishes,
      });
  }

  updateFish = (key, updatedFish) => {
      const fishes = { ...this.state.fishes };
      fishes[key] = updatedFish;
      this.setState({ fishes });
  }

  deleteFish = (key) => {
      const fishes = { ...this.state.fishes };
      fishes[key] = null; // so firebase also deletes
      this.setState({ fishes });
  }

  loadSampleFishes = () => {
      this.setState({
          fishes: sampleFishes,
      });
  }

  addToOrder = (key) => {
      const order = { ...this.state.order };
      order[key] = order[key] + 1 || 1;
      this.setState({
          order,
      });
  }

  removeFromOrder = (key) => {
      const order = { ...this.state.order };
      delete order[key];
      this.setState({ order });
  }

  render() {
      return (
          <div className="catch-of-the-day">
              <div className="menu">
                  <Header tagline="Fresh Seafood Market" />
                  <ul className="fishes">
                      {
                          Object.keys(this.state.fishes).map(key =>
                              <Fish
                                  addToOrder={ this.addToOrder }
                                  details={ this.state.fishes[key] }
                                  index={ key }
                                  key={ key } // recall: can't access key property from inside the component
                              />)
                      }
                  </ul>
              </div>
              <Order
                  fishes={ this.state.fishes }
                  order={ this.state.order }
                  removeFromOrder={ this.removeFromOrder }
              />
              <Inventory
                  addFish={ this.addFish }
                  deleteFish={ this.deleteFish }
                  fishes={ this.state.fishes }
                  loadSampleFishes={ this.loadSampleFishes }
                  updateFish={ this.updateFish }
              />
          </div>
      );
  }
}

export default App;
