import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  myInput = React.createRef();

  goToStore = event => {
      event.preventDefault();
      const storeName = this.myInput.current.value;
      this.props.history.push(`/store/${storeName}`);
  };

  render() {
      return (
          <form className="store-selector" onSubmit={ this.goToStore }>
              <h2>Please Enter a Store</h2>
              <input
                  defaultValue={ getFunName() }
                  placeholder="Store Name"
                  ref={ this.myInput }
                  required
                  type="text"
              />
              <button type="submit"> Visit Store -&gt;</button>
          </form>
      );
  }
}

export default StorePicker;
