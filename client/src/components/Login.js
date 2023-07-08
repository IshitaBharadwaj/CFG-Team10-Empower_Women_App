import axios from 'axios';
import React from 'react'
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import NavbarLogin from './NavbarLogin';

function Login()
{
    const { register,handleSubmit,formState:{errors}}=useForm();
    const navigate=useNavigate()

    const onFormSubmit=(userData)=>{
        axios.post("http://localhost:3001/login",userData)
        .then((res)=>{
            if(res==="0"){
                navigate.goBack();
            } //then redirect to landing page
            else if (res.data.role == 'admin'){
                console.log(res);
                navigate(`/dashboard-pic`);
            }
            else{
                console.log(res);
                navigate(`/dashboard-${res.data.role}`);
            }
            console.log(res)
        
        })
        .catch((err)=>console.log(err))
        // console.log(userData)
    }
    return(
        <div id="re">
        <NavbarLogin/>
        <div className='container-fluid'>
            <div className='row'>
            <div className="col-11 col-sm-8 col-md-4 mx-auto mt-5 mb-4">
                <form className='border p-4 bg-secondary bg-opacity-50 shadow' onSubmit={handleSubmit(onFormSubmit)}>
                  <div className='mb-3'>
                  <p className='display-5 '>Login</p>
                  </div>
                    {/* username */}
                    <div className="mb-3">
                        <label htmlFor="un"><em>Username</em></label>
                        <input type="text" id="username" className="form-control" {...register("username", { required: true, minLength: 4 ,maxLength:10})} />
                        {/* validation error msg for username */}
                        {errors.username?.type === 'required' && <p className='text-danger'>* Username required</p>}
                        {errors.username?.type === 'minLength' && <p className='text-danger'>* Min length should be 6</p>}
                        {errors.username?.type === 'maxLength' && <p className='text-danger'>* Max length should be 10</p>}
                    </div>
                    {/* password */}
                    <div className="mb-3">
                        <label htmlFor="password"><em>Password</em></label>
                        <input type="password" id="password" className="form-control" {...register("password", { required: true,maxLength:4, maxLength:8 })} />
                        {/* validation error msg for password */}
                        {errors.email?.type === 'required' && <p className='text-danger'>* Password required</p>}
                        {errors.username?.type === 'minLength' && <p className='text-danger'>* Min length should be 4</p>}
                        {errors.username?.type === 'maxLength' && <p className='text-danger'>* Max length should be 8</p>}
                    </div>
                    {/* login button */}
                    <div className='mb-1 text-center'>
                    <button type="submit" className="btn btn-success w-50 mb-1">Login</button>                      
                    </div>
                    <div className='row mt-3'>
                        <div className='col-6 text-end mt-2'>
                        <p>New User? </p>
                        </div>
                        <div className='col-6 text-start'>
                        <button type="submit" className="btn btn-success"  onClick={()=>navigate('/register')}>SignUp</button>                          
                        
                        </div>
                        
                    </div>
                </form>
            </div>
            </div>
            </div>
        </div>
    )
}

export default Login;