import React , {useEffect} from 'react'
import { Button, Form, Input} from 'antd'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { message } from 'antd'
import axios from 'axios'


const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = async (value) => {
        try {
            dispatch({
              type: "SHOW_LOADING",
            });
            const res = await axios.post("/api/users/login",value);
            message.success("User Logged In Succesfully");
            // Storing the user details in localStorage -> we can use sessions and cookies otherwise
            
            localStorage.setItem('auth',JSON.stringify(res.data));
            navigate('/');
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
        <h5>Login</h5>

        <Form layout='vertical' onFinish={handleSubmit}>
            
            <Form.Item name="userId" label="User Id">
                <Input />
            </Form.Item>
            <Form.Item name="password" label="Password">
                <Input type="password"/>
            </Form.Item>
        
            <div className='d-flex justify-content-between mt-3'>
                <Button type="primary" htmlType='submit'>
                    Login
                </Button>
                <p> Don't have an account? 
                    <Link to="/register"> Register</Link>
                </p>
            </div>
        
        </Form>
        </div>
        </div>
    
    </>
  )
}

export default Login