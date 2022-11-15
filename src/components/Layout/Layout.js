import React,{Component} from 'react';
import {connect} from 'react-redux';
import Auxx from '../hoc/Auxx';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import './Layout.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
  class Layout extends Component{
    state={
        showSideDrawer:false
    }
    sideDrawerClosedHandler=()=>{
      this.setState({showSideDrawer:false});
    }
    sideDrawerToggleHandler=()=>{
        this.setState((prevState)=>{
            return {showSideDrawer:
                //!prevState
                this.showSideDrawer};
    });
}
    render(){
        return(
        <Auxx>

            <Toolbar 
            isAuth={this.props.isAuthenticated}
            drawerToggleClicked={this.sideDrawerToggleHandler}/>
            
            <SideDrawer
            isAuth={this.props.isAuthenticated}
             open={this.state.showSideDrawer}
              closed={this.SideDrawerClosedHandler}/>
        <div className="Content"></div>
        <main>
            {this.props.children}
        </main>
        </Auxx>
        )
    }
}

  const mapStateToProps=state=>{
      return{
          isAuthenticated:state.auth.token!==null
      };
  };  

export default connect(mapStateToProps)(Layout);