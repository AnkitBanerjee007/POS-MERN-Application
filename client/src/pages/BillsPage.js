import React from 'react'
import { useState , useEffect , useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button, Table } from 'antd';
import { EditOutlined , PlusOutlined , EyeOutlined } from '@ant-design/icons';
import ReactToPrint from "react-to-print";
import { useReactToPrint } from 'react-to-print';
import DefaultLayout from '../components/DefaultLayout';
import '../styles/InvoiceStyles.css'
import axios from 'axios'


const BillsPage = () => {

  const [billsData,setBillsData] = useState([]);
  const dispatch = useDispatch();
  const [popModal , setpopModal] = useState(false);
  const [selectedBill , setSelectedBill] = useState(null);
  const componentRef = useRef();


  const getAllBills = async () => {
    try {
      dispatch({
        type:'SHOW_LOADING'
      })
      const { data } = await axios.get('/api/bills/getBills');
      setBillsData(data);
      dispatch({
        type: 'HIDE_LOADING'
      })
      // console.log(data);
    } catch (error) {
      console.log(error)
    }
  }

  
  // const handleSubmit = async (value) => {
  //   if (editItem === null) {
  //     try {
  //       dispatch({
  //         type: "SHOW_LOADING",
  //       });
  //       const res = await axios.post("/api/items/addItem", value);
  //       message.success("Item Added Succesfully");
  //       getAllBills();
  //       setpopModal(false);
  //       dispatch({ type: "HIDE_LOADING" });
  //     } catch (error) {
  //       dispatch({ type: "HIDE_LOADING" });
  //       message.error("Something Went Wrong");
  //       console.log(error);
  //     }
  //   } else {
  //     try {
  //       dispatch({
  //         type: "SHOW_LOADING",
  //       });
  //       await axios.put("/api/items/editItem", {
  //         ...value,
  //         itemId: editItem._id,
  //       });
  //       message.success("Item Updated Succesfully");
  //       getAllBills();
  //       setpopModal(false);
  //       dispatch({ type: "HIDE_LOADING" });
  //     } catch (error) {
  //       dispatch({ type: "HIDE_LOADING" });
  //       message.error("Something Went Wrong");
  //       console.log(error);
  //     }
  //   }
  // };


  // const handleDelete = async (record) => {
  //   try {
  //     dispatch({
  //       type: "SHOW_LOADING",
  //     });
  //     console.log(record);
  //     await axios.post("/api/items/deleteItem", { itemId: record._id });
  //     message.success("Item Deleted Succesfully");
  //     getAllBills();
  //     setpopModal(false);
  //     dispatch({ type: "HIDE_LOADING" });
  //   } catch (error) {
  //     dispatch({ type: "HIDE_LOADING" });
  //     message.error("Something Went Wrong");
  //     console.log(error);
  //   }
  // }



  useEffect(() => {
    getAllBills();
  },[])


  // Table Data for ANT DESIGN
  const columns = [
    {
        title : 'ID',
        dataIndex: '_id'

    },
    {
        title : 'Customer Name',
        dataIndex: 'customerName',
    
    },
    {
        title : 'Contact No.',
        dataIndex: 'customerNumber'
    },
    {
      title : 'Total Amount',
      dataIndex: 'totalAmount'
    },
    {
      title : 'Sub Total',
      dataIndex: 'subTotal'
    },   
    {
      title : 'Tax',
      dataIndex: 'tax'
    },
    {
        title : 'Actions' , 
        dataIndex : "_id",
        render : (id,record) => 
        <div>

          <EyeOutlined className='align-middle m-3'onClick = {() => { setSelectedBill(record);setpopModal(true)}} style={{cursor:'pointer' , fontSize: '16px' , color : 'green'}}/>
                 
          {/* <EditOutlined className='align-middle m-3' 
            onClick = {() => {setEditItem(record) ;setpopModal(true)}} style={{cursor:'pointer' , fontSize: '16px' , color : '#1890ff'}}/> */}
          
        </div> 
    }
]


  //print function
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <DefaultLayout>
        
        <div className='d-flex justify-content-between'>
          <h1>Invoices</h1>
          {/* <Button 
            onClick = {() => setpopModal(true)} 
            style={{backgroundColor : '#1890ff' , 'color' : '#fff'}}>
                <PlusOutlined style={{'color' : '#fff'}}/>Add Invoice
              
          </Button> */}
        </div>

        <Table columns={columns} dataSource={ billsData } bordered/>


      {popModal && (
        <Modal title='Invoice Details' 
               open={popModal} onCancel={() => {
                // setEditItem(null)
                setpopModal(false)}} footer={false}>




          {/* ============ invoice modal start ==============  */}
          <div id="invoice-POS" ref={componentRef} > {/*ref={componentRef} */}
            <center id="top">
              <div className="logo" />
              <div className="info">
                <h2>POS</h2>
                <p> Contact : 123456 | WB India</p>
              </div>
              {/*End Info*/}
            </center>
            <br></br>
            {/*End InvoiceTop*/}
            <div id="mid">
              <div className="mt-2">
                <p>
                  Customer Name : <b>{selectedBill.customerName}</b>
                  <br />
                  Phone No : <b>{selectedBill.customerNumber}</b>
                  <br />
                  Date : <b>{selectedBill.date.toString().substring(0, 10)}</b>
                  <br />
                </p>
                <hr style={{ margin: "5px" }} />
              </div>
            </div>
            {/*End Invoice Mid*/}
            <div id="bot">
              <div id="table">
                <table>
                  <tbody>
                    <tr className="tabletitle">
                      <td className="item">
                        <h5>Item</h5>
                      </td>
                      <td className="Hours">
                        <h5>Quantity</h5>
                      </td>
                      <td className="Rate">
                        <h2>Price</h2>
                      </td>
                      <td className="Rate">
                        <h5>Total</h5>
                      </td>
                    </tr>
                    {selectedBill.cartItems.map((item) => (
                      <>
                        <tr className="service">
                          <td className="tableitem">
                            <p className="itemtext">{item.name}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">{item.quantity}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">{item.price}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">
                              {item.quantity * item.price}
                            </p>
                          </td>
                        </tr>
                      </>
                    ))}

                    <tr className="tabletitle">
                      <td />
                      <td />
                      <td className="Rate">
                        <h4>Tax : </h4>
                      </td>
                      <td className="payment">
                        <h5>${selectedBill.tax}</h5>
                      </td>
                    </tr>
                    <tr className="tabletitle">
                      <td />
                      <td />
                      <td className="Rate">
                        <h4>Total : </h4>
                      </td>
                      <td className="payment">
                        <h5>
                          <b>${selectedBill.totalAmount}</b>
                        </h5>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/*End Table*/}
              <div id="legalcopy">
                <p className="legal">
                  <strong>Thank you for your order!</strong>Please note that this amount is non refundable.
                  For any assistance please write email
                  <b> abcd@mydomain.com</b>
                </p>
              </div>
            </div>
            {/*End InvoiceBot*/}
          </div>
          {/*End Invoice*/}
          <div className="d-flex justify-content-end mt-3">
            <Button type="primary" onClick={handlePrint}> {/*onClick={handlePrint}*/}
              Print
            </Button>
          </div>
          {/* ============ invoice modal ends ==============  */}



            

        </Modal>
      )}

    </DefaultLayout>
  )
}

export default BillsPage