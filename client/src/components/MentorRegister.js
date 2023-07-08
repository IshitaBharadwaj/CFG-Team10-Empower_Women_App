import React from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import NavbarLogin from './NavbarLogin';


function MentorRegister()
{
    const { register,handleSubmit,formState:{errors}}=useForm();
    const navigate=useNavigate()

    const onFormSubmit=(userData)=>{
        console.log(userData)
        axios.post("http://localhost:3001/mentor/register",userData)
        .then((res)=>{
            console.log(res)
            navigate('/dashboard-mentor')
        })
        .catch((err)=>{
            console.log(err)
            navigate('/')
        });
        // console.log(userData)
    
    }
    return(
        <div id="reg">
        <NavbarLogin/>
        <div className='container'>
        <div className='row'>
            <div className="col-11 col-sm-8 col-md-5 mx-auto mt-5 mb-4">
                <form className='border p-4 bg-secondary bg-opacity-50' onSubmit={handleSubmit(onFormSubmit)}>
                  <div className='mb-3'>
                  <p className='display-6'>Mentor Registration Form</p>
                  </div>

                    {/* username */}
                    <div className="mb-3">
                        <label htmlFor="username"><em>Name</em></label>
                        <input type="text" id="username" className="form-control" {...register("username", { required: true, minLength: 4 ,maxLength:10})} />
                        {/* validation error msg for username */}
                        {errors.username?.type === 'required' && <p className='text-danger'>* Username required</p>}
                        {errors.username?.type === 'minLength' && <p className='text-danger'>* Min length should be 4</p>}
                        {errors.username?.type === 'maxLength' && <p className='text-danger'>* Max length should be 10</p>}
                    </div>


                    {/* email */}
                    <div className="mb-3">
                        <label htmlFor="email"><em>Email</em></label>
                        <input type="email" id="email" className="form-control" {...register("email", { required: true })} />
                        {/* validation error msg for email */}
                        {errors.email?.type === 'required' && <p className='text-danger'>* Email required</p>}
                    </div>


                     {/* password */}
                     <div className="mb-3">
                        <label htmlFor="password"><em>Password</em></label>
                        <input type="password" id="password" className="form-control" {...register("password", { required: true, minLength: 8 ,maxLength:16})} />
                        {/* validation error msg for password */}
                        {errors.password?.type === 'required' && <p className='text-danger'>* Password required</p>}
                        {errors.password?.type === 'minLength' && <p className='text-danger'>* Min length should be 8</p>}
                        {errors.password?.type === 'maxLength' && <p className='text-danger'>* Max length should be 16</p>}
                    </div>

                    {/* mobile number */}
                    <div className="mb-3">
                        <label htmlFor="phoneNumber"><em>Mobilenumber</em></label>
                        <input type="number" id="phoneNumber" className="form-control" {...register("phoneNumber", { required: true })} />
                        {/* validation error msg for number */}
                        {errors.number?.type === 'required' && <p className='text-danger'>* Mobilenumber required</p>}
                    </div>

                    {/*Gender*/}
                    <div className="mb-3">
                <label htmlFor="gender">
                  <em>Gender</em>
                </label>
                <div>
                  <input
                    type="radio"
                    id="gender-male"
                    value="Male"
                    {...register("gender", { required: true })}
                  />
                  <label htmlFor="gender-male">Male</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="gender-female"
                    value="Female"
                    {...register("gender", { required: true })}
                  />
                  <label htmlFor="gender-female">Female</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="gender-other"
                    value="Other"
                    {...register("gender", { required: true })}
                  />
                  <label htmlFor="gender-other">Other</label>
                </div>
                </div>


                {/* qualification */}
              <div className="mb-3">
                <label htmlFor="qualification">
                  <em>Plans after 5 years</em>
                </label>
                <textarea
                  id="qualification"
                  className="form-control"
                  {...register("qualification", { required: true })}
                />
                {/* validation error msg for address */}
                {errors.address?.type === "required" && (
                  <p className="text-danger">* This field is required</p>
                )}
              </div>




              {/* Languages spoken */}
              <div className="mb-3">
                <label htmlFor="languagesSpoken">
                  <em>Languages Known</em>
                </label>
                <div>
                  <input
                    type="checkbox"
                    id="english"
                    value="English"
                    {...register("languagesSpoken", { required: true })}
                  />
                  <label htmlFor="english">English</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="hindi"
                    value="Hindi"
                    {...register("languagesSpoken", { required: true })}
                  />
                  <label htmlFor="hindi">Hindi</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="telugu"
                    value="Telugu"
                    {...register("languagesSpoken", { required: true })}
                  />
                  <label htmlFor="telugu">Telugu</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="kannada"
                    value="Kannada"
                    {...register("languagesSpoken", { required: true })}
                  />
                  <label htmlFor="kannada">Kannada</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="tamil"
                    value="Tamil"
                    {...register("languagesSpoken", { required: true })}
                  />
                  <label htmlFor="tamil">Tamil</label>
                </div>
                {/* validation error msg for languagesSpoken */}
                {errors.languagesSpoken?.type === "required" && (
                  <p className="text-danger">* Select at least one language</p>
                )}
              </div>



              {/* Available days */}
              <div className="mb-3">
                <label htmlFor="availableDays">
                  <em>Available Days</em>
                </label>
                <div>
                  <input
                    type="checkbox"
                    id="monday"
                    value="Monday"
                    {...register("availableDays", { required: true })}
                  />
                  <label htmlFor="monday">Monday</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="tuesday"
                    value="Tuesday"
                    {...register("availableDays", { required: true })}
                  />
                  <label htmlFor="tuesday">Tuesday</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="wednesday"
                    value="Wednesday"
                    {...register("availableDays", { required: true })}
                  />
                  <label htmlFor="wednesday">Wednesday</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="thursday"
                    value="Thursday"
                    {...register("availableDays", { required: true })}
                  />
                  <label htmlFor="thursday">Thursday</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="friday"
                    value="Friday"
                    {...register("availableDays", { required: true })}
                  />
                  <label htmlFor="friday">Friday</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="saturday"
                    value="Saturday"
                    {...register("availableDays", { required: true })}
                  />
                  <label htmlFor="saturday">Saturday</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="sunday"
                    value="Sunday"
                    {...register("availableDays", { required: true })}
                  />
                  <label htmlFor="sunday">Sunday</label>
                </div>
                {/* validation error msg for availableDays */}
                {errors.availableDays?.type === "required" && (
                  <p className="text-danger">
                    * At least one day must be selected
                  </p>
                )}
              </div>



              {/* Available timing slots */}
              <div className="mb-3">
                <label htmlFor="availableTimingSlots">
                  <em>Available Timing Slots</em>
                </label>
                <div>
                  <input
                    type="checkbox"
                    id="timing-9-11"
                    value="9-11"
                    {...register("availableTimingSlots", { required: true })}
                  />
                  <label htmlFor="timing-9-11">9-11</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="timing-11-1"
                    value="11-1"
                    {...register("availableTimingSlots", { required: true })}
                  />
                  <label htmlFor="timing-11-1">11-1</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="timing-1-3"
                    value="1-3"
                    {...register("availableTimingSlots", { required: true })}
                  />
                  <label htmlFor="timing-1-3">1-3</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="timing-3-5"
                    value="3-5"
                    {...register("availableTimingSlots", { required: true })}
                  />
                  <label htmlFor="timing-3-5">3-5</label>
                </div>
                {/* validation error msg for availableTimingSlots */}
                {errors.availableTimingSlots?.type === "required" && (
                  <p className="text-danger">
                    * Select at least one timing slot
                  </p>
                )}
              </div>

                {/* areofinterest */}
                <div className="mb-3">
                <label htmlFor="areasOfInterest">
                  <em>Area of Interest</em>
                </label>
                <div>
                  <input
                    type="radio"
                    id="areasOfInterest-DataScience"
                    value="DataScience"
                    {...register("areasOfInterest", { required: true })}
                  />
                  <label htmlFor="areasOfInterest-DataScience">Data Science</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="areasOfInterest-communication"
                    value="communication"
                    {...register("areasOfInterest", { required: true })}
                  />
                  <label htmlFor="areasOfInterest-communication">communication</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="areasOfInterest-digitalMarketing"
                    value="digitalMarketing"
                    {...register("areasOfInterest", { required: true })}
                  />
                  <label htmlFor="areasOfInterest-digitalMarketing">digitalMarketing</label>
                </div>
                </div>



               

                      
                    {/* terms and conditions */}
                    <div className="mb-4">
                     <div className="form-check">
                            <input type="checkbox" id="front-end" className="form-check-input"  value="front-end" />
                            <label htmlFor="front-end" className="form-check-label"><em>I accept all the <a href="#">Terms and conditions</a></em></label>
                        </div>
                    </div>
                    {/* submit button */}
                    <div className='mb-0 text-center'>
                    <button type="submit" className="btn btn-success w-50 mb-1">Register</button>                      
                    </div>
                </form>
            </div>
            </div>
            </div>

            
            
        </div>
        
    )
}

export default MentorRegister;