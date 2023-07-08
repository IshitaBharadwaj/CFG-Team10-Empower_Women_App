import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import "./PIC_dashboard.css"
import axios from 'axios';
import { useState, useEffect } from 'react';


export default function PersonalProfile() {

    const [menteeData, setMenteeData] = useState([]);
    const [mentorData, setMentorData] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
    const fetchData = async () => {
      try {


        const response = await axios.get('http://localhost:3001/pic-dashboard');
        const data = response.data;
        console.log(data);

        data.map((ele)=>{
            menteeData.push(ele.mentee_data)
            mentorData.push(ele.mentor_data)
        })


        // axios.get('https://localhost:3001/pic-dashboard').then((res)=>setMenteeData(res.data));
        // console.log("hello  ",menteeData);
        // const mentorResponse = await axios.get('API_URL_FOR_MENTOR_DATA');
        // console.log("data:  ", data);
  

        // setMenteeData(mentee_data);
        // setMentorData(mentor_data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            {menteeData && menteeData.map((mentee, index) => (
              <MDBCol lg="6" className="mb-4 mb-lg-0" key={index}>
                <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                  <MDBRow className="g-0">
                    <MDBCol md="4" className="gradient-custom text-center text-white"
                      style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                      <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                        alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                      <MDBTypography tag="h5">{mentee.email}</MDBTypography>
                      <MDBCardText>{mentee.areasOfInterests}</MDBCardText>
                      {/* <MDBIcon far icon="edit mb-5" /> */}
                    </MDBCol>
                    <MDBCol md="8">
                      <MDBCardBody className="p-4">
                        <MDBTypography tag="h6">Mentee Information</MDBTypography>
                        <hr className="mt-0 mb-4" />
                        <MDBRow className="pt-1">
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Email</MDBTypography>
                            <MDBCardText className="text-muted">{mentee.email}</MDBCardText>
                          </MDBCol>
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Phone</MDBTypography>
                            <MDBCardText className="text-muted">{mentee.phoneNumber}</MDBCardText>
                          </MDBCol>
                        </MDBRow>
                        
                        <MDBTypography tag="h6">Mentor Information</MDBTypography>
                        <hr className="mt-0 mb-4" />
                        <MDBRow className="pt-1">
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Email</MDBTypography>
                            <MDBCardText className="text-muted">{mentorData[index].email}</MDBCardText>
                          </MDBCol>
                          <MDBCol size="6" className="mb-3">
                            <MDBTypography tag="h6">Phone</MDBTypography>
                            <MDBCardText className="text-muted">{mentorData[index].phoneNumber}</MDBCardText>
                          </MDBCol>
                        </MDBRow>
  
                        <div className="d-flex justify-content-start">
                          <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg" /></a>
                          <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
                          <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
                        </div>
                      </MDBCardBody>
                    </MDBCol>
                  </MDBRow>
                </MDBCard>
              </MDBCol>
            ))}
          </MDBRow>
        </MDBContainer>
      </section>
    </div>
  );
  



//   return (
//     <div>
//     <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
//       <MDBContainer className="py-5 h-100">
//         <MDBRow className="justify-content-center align-items-center h-100">
//           <MDBCol lg="6" className="mb-4 mb-lg-0">
//             <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
//               <MDBRow className="g-0">
//                 <MDBCol md="4" className="gradient-custom text-center text-white"
//                   style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
//                   <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
//                     alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
//                   {/* <MDBTypography tag="h5">{menteeData.username}</MDBTypography> */}
//                   <MDBTypography tag="h5">{menteeData.email}</MDBTypography>

//                   {/* <MDBCardText>{menteeData.areasOfInterests}</MDBCardText> */}
//                   <MDBCardText>"hello"</MDBCardText>

//                   {/* <MDBIcon far icon="edit mb-5" /> */}
//                 </MDBCol>
//                 <MDBCol md="8">
//                   <MDBCardBody className="p-4">
//                     <MDBTypography tag="h6">Mentee Information</MDBTypography>
//                     <hr className="mt-0 mb-4" />
//                     <MDBRow className="pt-1">
//                       <MDBCol size="6" className="mb-3">
//                         <MDBTypography tag="h6">Email</MDBTypography>
//                         {/* <MDBCardText className="text-muted">{menteeData.email}</MDBCardText> */}
//                         <MDBCardText className="text-muted">"abc@gmail.com"</MDBCardText>

//                       </MDBCol>
//                       <MDBCol size="6" className="mb-3">
//                         <MDBTypography tag="h6">Phone</MDBTypography>
//                         {/* <MDBCardText className="text-muted">{menteeData.phoneNumber}</MDBCardText> */}
//                         <MDBCardText className="text-muted">{"abc"}</MDBCardText>

//                       </MDBCol>
//                     </MDBRow>
                    
//                     <MDBTypography tag="h6">Mentor Information</MDBTypography>
//                     <hr className="mt-0 mb-4" />
//                     <MDBRow className="pt-1">
//                       <MDBCol size="6" className="mb-3">
//                         <MDBTypography tag="h6">Email</MDBTypography>
//                         {/* <MDBCardText className="text-muted">{mentorData.email}</MDBCardText> */}
//                         <MDBCardText className="text-muted">abc@gmail.com</MDBCardText>

//                       </MDBCol>
//                       <MDBCol size="6" className="mb-3">
//                         <MDBTypography tag="h6">Phone</MDBTypography>
//                         {/* <MDBCardText className="text-muted">{mentorData.phoneNumber}</MDBCardText> */}
//                         <MDBCardText className="text-muted">23456</MDBCardText>

//                       </MDBCol>
//                     </MDBRow>

//                     <div className="d-flex justify-content-start">
//                       <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg" /></a>
//                       <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
//                       <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
//                     </div>
//                   </MDBCardBody>
//                 </MDBCol>
//               </MDBRow>
//             </MDBCard>
//           </MDBCol>
//         </MDBRow>
//       </MDBContainer>
//     </section>
//     </div>
//  );
}