import React from "react";
import { useNavigate } from 'react-router-dom';
import Canasu from "../assets/Canasu.png";

function Register() {
  const navigate = useNavigate();

  const handleMenteeRegistration = () => {
    navigate('/mentee-registration');
  };
  const handleMentorRegistration = () => {
    navigate('/mentor-registration');
  };

  return (




    // <div className="container">
    //       <div className="buttons-container" >
    //   <button type="button" className="btn btn-primary mx-3 custom-btn" onClick={handleMenteeRegistration} style={{ backgroundColor: '#4CAF50', borderRadius: '5px', padding: '10px 20px', color: '#fff', fontWeight: 'bold', fontSize: '16px' }}>
    //     Register as Mentee
    //   </button>
    //   <button type="button" className="btn btn-primary mx-3 custom-btn" onClick={handleMentorRegistration} style={{ backgroundColor: '#F44336', borderRadius: '5px', padding: '10px 20px', color: '#fff', fontWeight: 'bold', fontSize: '16px' }}>
    //     Register as Mentor
    //   </button>
    // </div>

    // </div>

    <div style={{ background: '#aec6cf', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding : '100 px'}}>
  <div className="buttons-container" style={{ backgroundColor: '#587ede', padding: '150px', borderRadius: '10px' }}>
    <button
      type="button"
      className="btn btn-primary mx-3 custom-btn"
      onClick={handleMenteeRegistration}
      style={{
        backgroundColor: '#ee918d',
        borderRadius: '5px',
        padding: '10px 20px',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '16px'
      }}
    >
      Register as Mentee
    </button>
    <button
      type="button"
      className="btn btn-primary mx-3 custom-btn"
      onClick={handleMentorRegistration}
      style={{
        backgroundColor: '#ee918d',
        borderRadius: '5px',
        padding: '10px 20px',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '16px'
      }}
    >
      Register as Mentor
    </button>
  </div>
</div>





  );
}

export default Register;
