import React,{useState,useEffect} from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useSelector , useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {DeleteOutlined,PlusCircleOutlined,MinusCircleOutlined} from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Select, Table } from 'antd';
import axios from 'axios'

const CartPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [subTotal, setSubTotal] = useState(0)
    const [billpopUp, setBillpopUp] = useState(false)

    const { cartItems } = useSelector(state => state.rootReducer);
    
    // Adding item to CART
    const handleIncrement = (record) => {
        dispatch({
            type : 'UPDATE_CART',
            payload : {...record, quantity : record.quantity + 1}
        })
        // console.log("Clicked")
    }

    // Removing item from Cart
    const handleDecrement = (record) => {
        if(record.quantity !== 1){
            dispatch({
                type : 'UPDATE_CART',
                payload : {...record, quantity : record.quantity - 1}
            })
        }
        
        // console.log("Clicked")
    }

    // Delete Item from CART
    const handleDelete = (record) => {
        console.log("Record : ------",record);
        dispatch({
            type : 'DELETE_FROM_CART',
            payload : record
        })
        setSubTotal(0);
    }

    // Submit Invoice
    const handleSubmit = async (value) => {

        try {
            const newObj = {
                ...value,
                cartItems,
                subTotal,
                tax : Number(((subTotal / 100) * 10).toFixed(2)),
                totalAmount : Number(Number(subTotal) + Number(((subTotal / 100) * 10).toFixed(2))),
                userId : JSON.parse(localStorage.getItem('auth'))._id
            }
            console.log("New OBJ ---------------",newObj.cartItems)
            await axios.post('/api/bills/addBills',newObj);
            setSubTotal(0);
            message.success("Bills Generated Successfully!");            
            navigate("/bills");
            

        } catch (error) {
            message.error("Something went Wrong!");
            console.log(error)
        }
        
        
    }


    const columns = [
        {
            title : 'Name',
            dataIndex: 'name'

        },
        {
            title : 'Image',
            dataIndex: 'image',
            render: (image,record) => <img src={image} alt={record.name} height="60" width="60" />
        },
        {
            title : 'Price',
            dataIndex: 'price'
        },
        {
            title : 'Quantity',
            dataIndex: '_id',
            render : (id,record) => 
                <div>
                    <PlusCircleOutlined className='align-middle m-3'style={{cursor:'pointer'}} 
                    onClick={() => handleIncrement(record)}/>
                    <b>{record.quantity}</b>
                    <MinusCircleOutlined className='align-middle m-3'style={{cursor:'pointer'}}
                    onClick={() => handleDecrement(record)}/>
                </div>
        },
        {
            title : 'Actions' , 
            dataIndex : "_id",
            render : (id,record) => <DeleteOutlined onClick={() => handleDelete(record)}/>
        }
    ]


    // Calculating total after item is added to cart
    useEffect(() => {
        let temp = 0;
        cartItems.forEach(item => {
            temp = temp + (item.price * item.quantity)
            setSubTotal(temp);
        });
    },[cartItems])

    

  return (
    <DefaultLayout>
        <Table columns={columns} dataSource={cartItems} bordered/>

        <div className='d-flex flex-column align-items-end'>
            <hr />
            <h3>Total : <b>₹ {subTotal}</b></h3>
            <Button onClick={() => setBillpopUp(true)}>Generate Invoice</Button>
        </div>

        <Modal title="Generate Invoice" visible={billpopUp} onCancel={() => setBillpopUp(false)} footer={false}>
            
        <Form layout='vertical' onFinish={handleSubmit}>
              <Form.Item name="customerName" label="Customer Name">
                <Input />
              </Form.Item>
              <Form.Item name="customerNumber" label="Contact">
                <Input />
              </Form.Item>
              <Form.Item name="paymentMode" label="Payment Mode">
                <Select>
                  <Select.Option value="cash">Cash</Select.Option>
                  <Select.Option value="card">Card</Select.Option>
                </Select>
              </Form.Item>

              <div className="bill-it">
                <h5>
                Sub Total : <b>{subTotal}</b>
                </h5>
                <h5>
                TAX :
                <b> {((subTotal / 100) * 10).toFixed(2)}</b>
                </h5>
                <h4>
                GRAND TOTAL :{" "}
                <b>
                    {Number(subTotal) + Number(((subTotal / 100) * 10).toFixed(2))}
                </b>
                </h4>
            </div>
                <div className='d-flex justify-content-end mt-3'>
                  <Button type="primary" htmlType='submit'>
                    Generate Bill
                  </Button>
                </div>             
            </Form>


        </Modal>

    </DefaultLayout>
  )
}

export default CartPage