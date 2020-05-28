import React from 'react';

class AddFishForm extends React.Component {
  nameRef = React.createRef();
  priceRef=React.createRef();
  statusRef=React.createRef();
  descRef=React.createRef();
  imageRef=React.createRef();

  createFish = (event) => {
      event.preventDefault();
      const fish = {
          name: this.nameRef.current.value,
          price: parseFloat(this.priceRef.current.value),
          status: this.statusRef.current.value,
          desc: this.descRef.current.value,
          image: this.imageRef.current.value,
      };
      this.props.addFish(fish);
      event.currentTarget.reset(); // this resets form after submission
  }

  render() {
      return (
          <form className="fish-edit" onSubmit={ this.createFish }>
              <input
                  name="name"
                  placeholder="Name"
                  ref={ this.nameRef }
                  type="text"
              />
              <input
                  name="price"
                  placeholder="Price"
                  ref={ this.priceRef }
                  type="text"
              />
              <select name="status" ref={ this.statusRef }>
                  <option value="available">Fresh!</option>
                  <option value="unavailable">Sold Out!</option>
              </select>
              <textarea name="desc" placeholder="Description" ref={ this.descRef }/>
              <input
                  name="image"
                  placeholder="Image"
                  ref={ this.imageRef }
                  type="text"
              />
              <button type="submit">+ Add Fish</button>
          </form>
      );
  }
}

export default AddFishForm;
