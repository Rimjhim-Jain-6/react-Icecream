
import React, {Component} from 'react';
import {Route,Switch,withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import asyncComponent from 

'./components/hoc/asyncComponent/asyncComponent';
import ReactDOM from 'react-dom';
import Layout from'./components/Layout/Layout';
import BurgerBuilder 

from'./components/containers/BurgerBuilder';
import Post from './components/Post/Post';
import FullPost from './components/FullPost/FullPost';
import NewPost from 

'./components/NewPost/NewPost';
import Auth from 

'./components/containers/Auth/Auth';
import Logout from 

'./components/containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const asyncCheckout=asyncComponent(()=>{
return import 

('./components/containers/Checkout/Checkout');
});
const asyncOrders=asyncComponent(()=>{
  return import 

('./components/containers/Orders/Orders');
  });
  const asyncAuth=asyncComponent(()=>{
    return import 

('./components/containers/Auth/Auth');
    });
class App extends Component{
  componentDidMount(){
    this.props.onTryAutoSignup();
  }
  render(){
    let routes=(
      <Switch>
      <Route path='/auth' component={asyncAuth}/>
      <Route path='/'exact component={BurgerBuilder}/>
      <Redirect to='/'/>
      </Switch>

    );
    if(this.props.isAuthenticated){
      routes=(
        <Switch>
            
        <Route path='/checkout' component=

{asyncCheckout}/>
        <Route path='/orders' component=

{asyncOrders}/>
        <Route path='/logout' component={Logout}/>
        <Route path='/auth' component={asyncAuth}/>
        <Route path='/' exact component=

{BurgerBuilder}/>
        <Redirect to='/'/>
         </Switch>
      );
    }
    return(
      
      <div>
         <Layout>
          {routes}
      </Layout>
            </div>
           /* <div>
              <Post/>
              
              <FullPost/>
              <NewPost/>
              
            </div>
            </BrowserRouter>*/

    );
  }
}
const mapStateToProps=state=>{
  return{
    isAuthenticated:state.auth.token!==null
  };
};
const mapDispatchToProps=dispatch=>{
  return{
    onTryAutoSignup:()=>dispatch

(actions.authCheckState())
  };
};


export default withRouter(connect

(mapStateToProps,mapDispatchToProps)( App));
/*

class App extends Component{
render(){
  return(
<div>
<Layout>
<Switch>
 <Route path='/checkout' component={Checkout}/>
        <Route path='/orders' component={Orders}/>
        <Route path='/logout' component={Logout}/>
        <Route path='/auth1' component={Auth1}/>
        <Route path='/' exact component=

{BurgerBuilder}/>
        
         </Switch>
         </Layout>
         </div>

  )
}
}
export default App;




/*

import React ,{Component} from 'react';

import logo from './logo.svg';
import Person from'./components/Person';




class App extends Component{
  state={
  persons:[
    {name:'Max',age:26},
    {name:'Manu',age:29}
  ],
  otherState:'some other value',
  showPersons:false
}
 switchNameHandler=(newName)=>{
  this.setState({
    persons:[
      {name:newName,age:28},
      {name:'Manu',age:27}

    ]
  }

  )
}
nameChnagedhandler=(event)=>{
  this.setState({
    persons:[
      {name:event.target.value,age:28},
      {name:'Manu',age:27}
    ]
  })
}
togglePersonsHandler=()=>{
  const doesShow=this.state.shoePersons;
  this.setState({showPersons:!doesShow});
}
render(){
const style={
  backgroundColor:'white',
  font:'inherit',
  border:'1px solid blue',
  padding:'8px',
  cursor:'pointer'
};

    return(
      <div className="App">
<h1>hi, i am react app</h1>
<p>this is really working</p>
<button 
style={style}
onClick={()=>this.togglePersonsHandler('Maximili')}

>Switch Name</button>
{this.state.showPersons===true?
<div>
<Person
 name={this.state.persons[0].name}
  age={this.state.persons[0].age}/>
<Person 
name={this.state.persons[1].name}
 age={this.state.persons[1].age}
 click={this.switchNameHandler.bind(this,)}
 chnaged={this.nameChnagedHandler}>My 

Hobbies:Racing
 </Person>
      </div>:null
}
      </div>
    );
    }
    
}

    

  export default App;
*/

