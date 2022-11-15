import React,{Component} from'react';
import {connect} from 'react-redux';
import Auxx from '../hoc/Auxx';
import Burger from '../Burger/Burger';
import BuildControls from '../Burger/BuildControls/BuildControls'
import Modal from '../UI/Modal1/Modal/Modal';
import OrderSummary from '../Burger/OrderSummary/OrderSummary';
import Spinner from'../UI/Modal1/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

export class BurgerBuilder extends Component{
  // constructor(props){
    //   super(props);
      //  this.state={
          state={
            
           purchasing:false
        }
           
    
    componentDidMount(){
        this.props.onInitIngredients();
       /* axios.get('https://react-my-burger-5a264.firebaseio.com/orders/ingredients.json')
         .then(response=>{
           this.setState({ingredients:response.data})
         })
         .catch(error=>{
             this.setState({error:true})
         });
    }
}*/
} 
    updatePurchaseState(ingredients){
       
        const sum=Object.keys(ingredients)
        .map(igKey=>{
            return ingredients[igKey];
        }
            )
            .reduce((sum,el)=>{
          return sum +el;
            },0);
            return sum>0;
    }
  /*  addIngredientHandler=(type)=>{
     const oldCount=this.state.ingredients[type];
     const updatedCount=oldCount+1;
     const updatedIngredients={
         ...this.state.ingredients
     };
     updatedIngredients[type]=updatedCount;
     const priceAddition=INGREDIENT_PRICES[type];
     const oldPrice=this.state.totalPrice;
     const newPrice=oldPrice+priceAddition;
     this.setState

({totalPrice:newPrice,ingredients:updatedIngredients})

;
    this.updatePurchaseState(updatedIngredients);
    }
    removeIngredientHandler=(type)=>{
        const oldCount=this.state.ingredients[type];
        if(oldCount<=0){
            return;
        }
     const updatedCount=oldCount-1;
     const updatedIngredients={
         ...this.state.ingredients
     };
     updatedIngredients[type]=updatedCount;
     const priceDeduction=INGREDIENT_PRICES

[type];
     const oldPrice=this.state.totalPrice;
     const newPrice=oldPrice-priceDeduction;
     this.setState

({totalPrice:newPrice,ingredients:updatedIngredients})

;
    this.updatePurchaseState(updatedIngredients);
    }*/
    
purchaseHandler=()=>{
    if(this.props.isAuthenticated){
    this.setState({purchasing:true});
}
else{
    this.props.onSetAuthRedirectPath('/checkout');
    this.props.history.push('/auth');
}
}
purchaseCancelHandler=()=>{
    this.setState({purchasing:false});
}
purchaseContinueHandler=()=>{
    //alert('You continue!');
   /* this.setState({loading:true});
    const order={
        ingredients:this.state.ingredients,
        price:this.state.totalPrice,
        customer:{
            name:'Max Sch',
            address:{
                street:'Street 1',
                zipCode:'41331',
                country:'India'
            },
            email:'test@test.com'
        },
        deliveryMethod:'fastest'
     }
     axios.post('/orders.json',order)
     .then(response=>{
         this.setState({loading:false,purchasing:false});
     })
     .catch(error=>{
         this.setState({loading:false,purchasing:false});
     });*/
     /*const queryParams=[];
     for(let i in this.state.ingredients){
         queryParams.push(encodeURIComponent(i)+'='+ 

encodeURIComponent(this.state.ingredients[i]));
     }
     queryParams.push('price='+this.state.totalPrice);
      const queryString=queryParams.join('&');
     this.props.history.push({
         pathname:'/checkout',
         search:'?'+queryString
     });*/
     this.props.onInitPurchase();
     this.props.history.push('/checkout');
}    
    render(){
        const disabledInfo={
            ...this.props.ings
        };
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0
        }
         let orderSummary=null;
        
     let burger=this.props.error?<p>Ingredients can't be loaded</p> : <Spinner/>;
     
     if(this.props.ings){
    
     burger= (
      
         <Auxx>

     <Burger ingredients={this.props.ings}/>
     <BuildControls
     ingredientAdded={this.props.onIngredientAdded}
     ingredientRemoved={this.props.onIngredientRemoved}
     disabled={disabledInfo}
     purchasable={this.updatePurchaseState(this.props.ings)}
     ordered={this.purchaseHandler}
     isAuth={this.props.isAuthenticated}
     price={this.props.price}/>
     </Auxx>
     );
     orderSummary=<OrderSummary
        ingredients={this.props.ings}
        price={this.props.price}
        purchaseCancelled={this.purchaseCancelHandler}
   purchaseContinued={this.purchaseContinueHandler}/>;
    }
   // if(this.state.loading){
       // orderSummary=<Spinner/>}
    
        //{salad:true,meat:false,....}
        return(
            <Auxx>
                <Modal show={this.state.purchasing}
                 modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
            {burger}
            </Auxx>
        );
        }
    }
    
    const mapStateToProps=state=>{
        return{
            ings:state.burgerBuilder.ingredients,
            price:state.burgerBuilder.totalPrice,
            error:state.burgerBuilder.error,
            isAuthenticated:state.auth.token!==null
        };
    }
    const mapDispatchToProps=dispatch=>{
        return{
            onIngredientAdded:(ingName)=>dispatch(actions.addIngredient(ingName)),
            onIngredientRemoved:(ingName)=>dispatch(actions.removeIngredient(ingName)),
            onInitIngredients:()=>dispatch(actions.initIngredients()),
            onInitPurchase:()=>dispatch(actions.purchaseInit()),
            onSetAuthRedirectPath:(path)=>dispatch(actions.setAuthRedirectPath(path))
        }
    }

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));