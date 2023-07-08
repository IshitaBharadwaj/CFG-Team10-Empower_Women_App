import React from 'react';
import AI from "../../assets/AI.jpg";
import blockchain from "../../assets/blockchain.png";
import communication from "../../assets/communication.png";
import finance from "../../assets/finance.jpg";
import ML from "../../assets/ML.jpg";
import SDE from "../../assets/SDE.jpg";
import {useNavigate} from 'react-router-dom'
import axios from 'axios';


function Cards() {
  const navigate=useNavigate()
  const assignMentor=(userData)=>{
  const jsonObject = JSON.stringify({"areasOfInterest": userData});
  // const jsondata = JSON.parse(jsonObject);
   console.log(jsonObject)
    axios.put("http://localhost:3001/mentee/assign-module",jsonObject)
    .then((res)=>{
        if(res){
            console.log(res);
            navigate(`/dashboard-mentee`);
        }
        console.log(res)
    
    })
    .catch((err)=>console.log(err))
}
const handleSubmit=()=>{
  navigate(`/calender/64a08f74c71416175b1574de`);
}
  return (
 <>
    <div className='container my-5'>
      <div className='row'>
        <div className='col-md-4'>
          <div className="card" style={{ width: '18rem' }}>
            <img className="card-img-top" src={AI} alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">Artificial Intelligence</h5>
              <p className="card-text">Description...</p>
              <a className="btn btn-dark" onClick={() => assignMentor("Artificial Intelligence")}>Enroll Now</a>
            </div>
          </div>
        </div>
        {/* Repeat the above card structure for the remaining two cards */}
        <div className='col-md-4'>
          <div className="card" style={{ width: '18rem' }}>
            <img className="card-img-top" src={blockchain} alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">Blockchain</h5>
              <p className="card-text">Description...</p>
              <a className="btn btn-dark"onClick={handleSubmit}>Enroll Now</a>
            </div>
          </div>
        </div>
        <div className='col-md-4'>
          <div className="card" style={{ width: '18rem' }}>
            <img className="card-img-top" src={communication} alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">Communication</h5>
              <p className="card-text">Description...</p>
              <a className="btn btn-dark" onClick={() => assignMentor("communication")}>Enroll Now</a>
            </div>
          </div>
        </div>
      </div>
      {/* Repeat the above row structure for additional rows */}
      <div className='row'>
        {/* Place the next set of cards here */}
      </div>
    </div>

    <div className='container my-5'>
      <div className='row'>
        <div className='col-md-4'>
          <div className="card" style={{ width: '18rem' }}>
            <img className="card-img-top" src={finance} alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">Finance</h5>
              <p className="card-text">Description...</p>
              <a className="btn btn-dark"onClick={handleSubmit}>Enroll Now</a>
            </div>
          </div>
        </div>
        {/* Repeat the above card structure for the remaining two cards */}
        <div className='col-md-4'>
          <div className="card" style={{ width: '18rem' }}>
            <img className="card-img-top" src={ML} alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">Machine Learning</h5>
              <p className="card-text">Description...</p>
              <a className="btn btn-dark"onClick={handleSubmit}>Enroll Now</a>
            </div>
          </div>
        </div>
        <div className='col-md-4'>
          <div className="card" style={{ width: '18rem' }}>
            <img className="card-img-top" src={SDE} alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">Software Developement</h5>
              <p className="card-text">Description...</p>
              <a className="btn btn-dark" onClick={handleSubmit}>Enroll Now</a>
            </div>
          </div>
        </div>
      </div>
      {/* Repeat the above row structure for additional rows */}
      <div className='row'>
        {/* Place the next set of cards here */}
      </div>
    </div>
      </>
  );
}

export default Cards;
