import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import base, { firebaseApp } from '../base';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';

class Inventory extends React.Component {
    static propTypes = {
        fishes: PropTypes.object,
        addFish: PropTypes.func,
        deleteFish: PropTypes.func,
        loadSampleFishes: PropTypes.func,
        storeId: PropTypes.string,
        updateFish: PropTypes.func,
    };

    state = {
        uid: null,
        owner: null,
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.authHandler({ user });
            }
        })
    }

    authHandler = async authData => {
        const store = await base.fetch(this.props.storeId, { context: this });
        if(!store.owner) {
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            });
        }
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        });
    }

    authenticate = (provider) => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.authHandler);
    };

    logout = async () => {
        await firebase.auth().signOut();
        this.setState({
            uid: null,
        });
    }

    render() {
        const logout = <button onClick={ this.logout }>Log Out</button>
        if (!this.state.uid) { // check if logged in
            return <Login authenticate={ this.authenticate }/>;
        }

        if (this.state.uid !== this.state.owner) { // check if owner
            return (
                <div>
                    <p>Sorry you are not the owner!</p>
                    {logout}
                </div>
            )
        }

        return (
            <div className="inventory">
                <h2>Inventory</h2>
                {logout}
                {
                    Object.keys(this.props.fishes).map((key) => (
                        <EditFishForm
                            deleteFish={ this.props.deleteFish }
                            fish={ this.props.fishes[key] }
                            index={ key }
                            key={ key }
                            updateFish={ this.props.updateFish }
                        />
                    ))
                }
                <AddFishForm addFish={ this.props.addFish } />
                <button onClick={ this.props.loadSampleFishes }>Load Sample Fishes</button>
            </div>
        );
    }
}

export default Inventory;
