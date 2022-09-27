import React from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch } from 'react-redux';
import { useState , useEffect } from 'react';
import axios from 'axios'
import { DeleteOutlined , EditOutlined , PlusOutlined } from '@ant-design/icons';
import { Modal, Button, Table, Form, Input, Select , message } from 'antd';


const ItemPage = () => {

  const [itemsData,setItemsData] = useState([]);
  const dispatch = useDispatch();
  const [popModal , setpopModal] = useState(false);
  const [editItem , setEditItem] = useState(null);


  const getAllItems = async () => {
    try {
      dispatch({
        type:'SHOW_LOADING'
      })
      const { data } = await axios.get('/api/items/getItem');
      setItemsData(data);
      dispatch({
        type: 'HIDE_LOADING'
      })
      console.log(data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllItems();
  },[])

// Table Data for ANT DESIGN
  const columns = [
    {
        title : 'Name',
        dataIndex: 'name'

    },
    {
        title : 'Image',
        dataIndex: 'image',
        render: (image,record) => <img src={image} alt={record.name} height="50" width="50" />
    },
    {
        title : 'Price',
        dataIndex: 'price'
    },
    {
        title : 'Actions' , 
        dataIndex : "_id",
        render : (id,record) => 
        <div>
          
          <DeleteOutlined className='align-middle m-3' 
            onClick={() => { handleDelete(record); }} style={{cursor:'pointer' , fontSize: '16px' , color : 'red'}} />
        
          <EditOutlined className='align-middle m-3' 
            onClick = {() => {setEditItem(record) ;setpopModal(true)}} style={{cursor:'pointer' , fontSize: '16px' , color : '#1890ff'}}/>
          
        </div> 
    }
]


  // const handleSubmit = async (value) => {
  //   if (editItem === null) {
  //     try {
  //       dispatch({
  //         type: "SHOW_LOADING",
  //       });
  //       console.log(value)
  //       const res = await axios.post("/api/items/addItem", value);
  //       message.success("Item Added Succesfully");
  //       getAllItems();
  //       setpopModal(false);
  //       dispatch({ 
  //         type: "HIDE_LOADING" 
  //       });
  //     } catch (error) {
  //       dispatch({ 
  //         type: "HIDE_LOADING" 
  //       });
  //       message.error("Something Went Wrong");
  //       console.log(error);
  //     }
  //   } else {
  //       try {
  //         dispatch({
  //           type: "SHOW_LOADING",
  //         });
  //         await axios.put("/api/items/editItem", {
  //           ...value,
  //           itemId: editItem._id,
  //         });
  //         message.success("Item Updated Succesfully");
  //         getAllItems();
  //         setpopModal(false);
  //         dispatch({ 
  //           type: "HIDE_LOADING" 
  //         });
  //     } catch (error) {
  //         dispatch({
  //            type: "HIDE_LOADING" 
  //           });
  //         message.error("Something Went Wrong");
  //         console.log(error);
  //     }
  //   }
  // };

  const handleSubmit = async (value) => {
    if (editItem === null) {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const res = await axios.post("/api/items/addItem", value);
        message.success("Item Added Succesfully");
        getAllItems();
        setpopModal(false);
        dispatch({ type: "HIDE_LOADING" });
      } catch (error) {
        dispatch({ type: "HIDE_LOADING" });
        message.error("Something Went Wrong");
        console.log(error);
      }
    } else {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        await axios.put("/api/items/editItem", {
          ...value,
          itemId: editItem._id,
        });
        message.success("Item Updated Succesfully");
        getAllItems();
        setpopModal(false);
        dispatch({ type: "HIDE_LOADING" });
      } catch (error) {
        dispatch({ type: "HIDE_LOADING" });
        message.error("Something Went Wrong");
        console.log(error);
      }
    }
  };


  const handleDelete = async (record) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      console.log(record);
      await axios.post("/api/items/deleteItem", { itemId: record._id });
      message.success("Item Deleted Succesfully");
      getAllItems();
      setpopModal(false);
      dispatch({ type: "HIDE_LOADING" });
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      message.error("Something Went Wrong");
      console.log(error);
    }
  }


  return (
    <DefaultLayout>

        <div className='d-flex justify-content-between'>
          <h1>Item List</h1>
          <Button 
            onClick = {() => setpopModal(true)} 
            style={{backgroundColor : '#1890ff' , 'color' : '#fff'}}>
                <PlusOutlined style={{'color' : '#fff'}}/>Add Item
              
          </Button>
        </div>
        {/* <h1>Item List</h1> */}
        <Table columns={columns} dataSource={ itemsData } bordered/>


      {popModal && (
        <Modal title={`${editItem !== null ? 'Edit Item' : 'Add Item'}`} 
               open={popModal} onCancel={() => {
                setEditItem(null)
                setpopModal(false)}} footer={false}>
            

            <Form layout='vertical' initialValues={editItem} onFinish={handleSubmit}>
              <Form.Item name="name" label="Name">
                <Input />
              </Form.Item>
              <Form.Item name="price" label="Price">
                <Input />
              </Form.Item>
              <Form.Item name="image" label="Image URL">
                <Input />
              </Form.Item>
              <Form.Item name="category" label="Category">
                <Select>
                  <Select.Option value="drinks">Drinks</Select.Option>
                  <Select.Option value="rice">Rice</Select.Option>
                  <Select.Option value="noodles">Noodels</Select.Option>
                </Select>
              </Form.Item>
                <div className='d-flex justify-content-end mt-3'>
                  <Button type="primary" htmlType='submit'>
                    ADD
                  </Button>
                </div>
              
            </Form>


        </Modal>
      )}


    </DefaultLayout>
        
    
  )
}

export default ItemPage