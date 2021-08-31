import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Card ,Button ,Row,Col} from "react-bootstrap";
import { withAuth0 } from '@auth0/auth0-react';
class Home extends React.Component {
   constructor(){
     super();
     this.state={
       allData:[]
     }
   }
  componentDidMount(){
    axios.get(`https://cryptobackendnew.herokuapp.com/`).then(response=>{
      console.log(response.data);
      this.setState({
        allData:response.data,
      })
    })

  }
  
  addFavorite(item){
    let bodyFav={
        email:this.props.auth0.user.email,
        title:item.title,
        description:item.description,
        toUSD: item.toUSD,
        image_url:item.image_url
    }
    axios.post(`https://cryptobackendnew.herokuapp.com/add-fav`,bodyFav).then(
     res=> {console.log(res.data);}
    ).catch(err=>{console.log(err);})
  }
  

  render() {
    return (
      <Row>{
        this.state.allData.map((item,index)=>{
          return(<Col key={index}> <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={item.image_url} />
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Card.Title>{item.toUSD}</Card.Title>
            <Card.Text>
              {item.description}
            </Card.Text>
            <Button variant="primary" onClick={()=>this.addFavorite(item)}>Add To Favorite</Button>
          </Card.Body>
        </Card></Col>)
        })
      }
       
      </Row>
    )
  }
}

export default withAuth0(Home);
