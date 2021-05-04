import { render } from "@testing-library/react";
import React,{Component} from "react";
//import React from "react";

class Menu extends Component{
  constructor(props){
    super(props)
    this.state ={
      dummy_dat:[
        {"name": "cappuccino",
        "price": 4.5,
        "image": "https://images.unsplash.com/photo-1557006021-b85faa2bc5e2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3034&q=80",
        "detail": "a double shot of espresso with equal steamed milk and foam"
        },

        {"name": "latte",
        "price": 4.5,
        "image": "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3024&q=80",
        "detail": "a double shot of espresso with steamed milk and small layer of foam"
        },

        {"name": "flat white",
        "price": 4.5,
        "image": "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80",
        "detail": "a double shot of espresso with flat steamed milk"
        }
      ]
    }
  }

  renderTable(){
    return this.state.dummy_dat.map((item,index) => {
      const{ name, price , image, detail} = item
      return(
        <tr key = {name}>
          <td>{name}</td>
          <td>{price}</td>
          <td><img src ={image}/></td>
          <td>{detail}</td>
        </tr>
      )
    })

  }


  render(){
    return (
      <div>
        <h1>Menu </h1>
        <table>
          <tbody>
            {this.renderTable()}
          </tbody>
        </table>
      </div>
    )
  }
}


export default Menu;
