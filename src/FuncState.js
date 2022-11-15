import React from 'react'
/*function App(){
    return(
<div>
<h1>You are currently logged (in/out)</h1>
</div>
    )
}*/
class App extends React.Component{
    constructor(){
        super()
        this.state={
            isLoggedIn: true
        }
    }
    render(){
        let wordDisplay
        if(this.state.isLoggesIn){
            wordDisplay="in"
        }else{
            wordDisplay="out"
        }
        return(
            <div>
                <h1>You are currently logged{wordDisplay}</h1>
            </div>
        )
    }
}
export default App