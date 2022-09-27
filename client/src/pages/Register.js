import { Button, Form, Input, message} from 'antd'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import React, {useEffect} from 'react'

const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = async (value) => {
        try {
            dispatch({
              type: "SHOW_LOADING",
            });
            console.log(value);
            const res = await axios.post("/api/users/register", value);
            message.success("User Registered Succesfully");
            navigate('/login');
            dispatch({ type: "HIDE_LOADING" });
          } catch (error) {
            dispatch({ type: "HIDE_LOADING" });
            message.error("Something Went Wrong");
            console.log(error);
          }
    }

    useEffect(() => {
        if(localStorage.getItem('auth')){
            localStorage.getItem('auth');
            navigate("/");
        }
    },[navigate])

  return (
    <>

        <div className='register'>

            <div className="register-form">
            <h3>Point of Sale</h3>
            <h5>Register</h5>

        <Form layout='vertical' onFinish={handleSubmit}>
              <Form.Item name="name" label="Name">
                <Input />
              </Form.Item>
              <Form.Item name="userId" label="User Id">
                <Input />
              </Form.Item>
              <Form.Item name="password" label="Password">
                <Input type="password"/>
              </Form.Item>


                <div className='d-flex justify-content-between mt-3'>
                  <Button type="primary" htmlType='submit'>
                    Register
                  </Button>
                  <p> Already have an account? 
                    <Link to="/login"> Login</Link>
                  </p>
                </div>
              
            </Form>
            </div>
            </div>
    </>
  )
}

export default Register