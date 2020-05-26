import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  }

  addFish = fish => {
    const fishes = {...this.state.fishes}; // copy existing state
    fishes[`fish${Date.now()}`] = fish; // push new fish onto array
    this.setState({ // update whole state
      fishes
    });
  }

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes,
    })
  }

  addToOrder = (key) => {
    const order = {...this.state.order};
    order[key] = order[key] + 1 || 1;
    this.setState({
      order
    });
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
                  addToOrder={this.addToOrder}
                  details={this.state.fishes[key]}
                  index={key}
                  key={key} // recall: can't access key property from inside the component
                />
              )
            }
          </ul>
        </div>
          <Order fishes={this.state.fishes} order={this.state.order}/>
          <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes} />
      </div>
    );
  }
}

export default App;
