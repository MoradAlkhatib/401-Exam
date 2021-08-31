import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { withAuth0 } from '@auth0/auth0-react';
import {Card ,Button,Row,Col ,Modal ,Form} from "react-bootstrap"
class FavCrypto extends React.Component {
  constructor(){
    super();
    this.state={
      allData:[],
      showModal:false,
      newId:""
    }
  }
  componentDidMount(){
   axios.get(`https://cryptobackendnew.herokuapp.com/favorite/${this.props.auth0.user.email}`).then(
     res=>{
       console.log(res.data);
       this.setState({
        allData:res.data,
      })
     }
   ).catch(err=>{console.log(err);})
  }


  componentDidUpdate(){
    axios.get(`https://cryptobackendnew.herokuapp.com/favorite/${this.props.auth0.user.email}`).then(
      res=>{
        console.log(res.data);
        this.setState({
         allData:res.data,
       })
      }
    ).catch(err=>{console.log(err);})
   }



  deleteFav(id){
    console.log(id);
    axios.delete(`https://cryptobackendnew.herokuapp.com/delete-fav/${id}`).then(
      res=>{console.log(res.data);}
    ).catch(err=>{console.log(err);})

  }

  setShow(id){
    this.setState({
      showModal:true,
      newId:id
    })
  }
  unSetShow(){
    this.setState({
      showModal:false,
    })
  }

 updateFav=(e)=>{
   let id =this.state.newId;
   let newBody={
    email:this.props.auth0.user.email,
    title:e.target.title.value,
    description:e.target.description.value,
    toUSD: e.target.toUSD.value,

   }
  axios.get(`https://cryptobackendnew.herokuapp.com/delete-fav/${id}` ,newBody).then(res=>{
    console.log(res.data);
  })

 }

  render() {
    return(
        <>
           <Modal show={this.showModal} onHide={this.unSetShow}>
           <Form>
  
    <Form.Control type="text" name ="title"  placeholder="Enter text" />
    <Form.Control type="text" description ="title" placeholder="Enter text" />
    <Form.Control type="text" toUSD ="title" placeholder="Enter text" />
   

  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
          <Button variant="primary" onClick={(e)=>this.updateFav(e)}>
            Save Changes
          </Button>
        
      </Modal>

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
            <Button variant="danger"  onClick={()=>this.deleteFav(item._id)}>Delete</Button>
            <Button variant="info"  onClick={()=>this.setShow(item._id)}>Update</Button>
          </Card.Body>
        </Card></Col>)
        })
      }
       
      </Row>
      </>
    )
  }
}

export default withAuth0(FavCrypto);
