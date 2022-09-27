import React from 'react'
import { Card } from 'antd';
import '../styles/ItemList.css'
import { useDispatch } from "react-redux"

const ItemList = ({item}) => {

  const dispath = useDispatch();
  // Update cart handler
  const handleAddToCart = () => {
    dispath({
      type : 'ADD_TO_CART',
      payload : {...item,quantity : 1}
    })
  }


const { Meta } = Card;
  return (
    <div>
        <Card
            hoverable
            style={{ width: 200,height: 250 , margin: 10 , border: '2px solid #f0f2f5'}}
            cover={<img alt={item.name} src={item.image} style={{height: 150,backgroundSize:'cover'}}/>}
            >
            <Meta title={item.name}
            // style={{font : 'bold'}}
            />
            <div className='item-button'>
              {/* <Button>Add to Cart</Button> */}
              
              <button onClick={() => handleAddToCart()}>Add to Cart</button>
            </div>
        </Card>
        {/* <Card title={item.name}
        hoverable
        style={{ width: 180,height: 250 }}
        cover={<img alt={item.name} src={item.image} style={{height: 120}}/>}       
        /> */}
            
        
    </div>
    
  )
}

export default ItemList