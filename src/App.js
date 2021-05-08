import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {
  unsubscribeFromAuth = null;

  // When app component mounts, authentication state of user changes from null to the current logged in user
  componentDidMount() {
    const { setCurrentUser } = this.props; 

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // If a user signs in, we check to see that they signed in using userAuth
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        
        // We will listen for any changes and get back the state of that data and set the state of the user with snapshotid and data
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      } 
      // If user logs out, then we will set the state back to userAuth which is null
      else {
        setCurrentUser(userAuth);
      }
    });
  }
  
  // when app component unmounts, authenication state of user changes back to null
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)} />
        </Switch>
      </div>
    );  
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
