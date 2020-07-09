import React from 'react';
import './App.css';

import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component.jsx';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';

import { Switch,Route,Redirect} from 'react-router-dom';
import {connect } from 'react-redux';
import {setCurrentUser} from './redux/user/user-action';
import {auth,createUserProfileDocument} from './firebase/firebase.utils';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from './redux/user/user.selectors';

class App extends React.Component {

  unsubscribeFromAuth=null;

  componentDidMount(){

    const {setCurrentUser}=this.props;

   this.unsubscribeFromAuth=auth.onAuthStateChanged( async userAuth =>{
     if(userAuth)
     {
       const userRef=await createUserProfileDocument(userAuth);

       userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id:snapShot.id,
              ...snapShot.data()
            }
          );
          
       });
     }
     else
     {
       setCurrentUser(userAuth);
     }
    });
  }
 componentWillUnmount(){
   this.unsubscribeFromAuth();  
 }

  render(){
    return (
      <div >
        <Header />
       < Switch>                                     
        <Route  exact path='/' component={Homepage} />
        <Route   path='/shop' component={ShopPage} />
        <Route   exact path='/checkout' component={CheckoutPage} />

        <Route   
        exact 
        path='/signin' 
        render={() => this.props.currentUser ? (<Redirect to='/'/>) : (<SignInAndSignUpPage/>)} />
  
        </Switch>
      </div>
    );
  }
  
}
const mapStateToProps=createStructuredSelector({
  currentUser:selectCurrentUser
});

const mapDispatchToProps=dispatch => ({
  setCurrentUser: user => 
 dispatch(setCurrentUser(user))
  
});
export default connect(mapStateToProps,mapDispatchToProps)(App);
//null is placed bcz app component does not have any concern with the state props now 
// in ab0ve function map dispatch is doing that whatever u pass to dipatch it will be an action object which will be 
//passed to the action