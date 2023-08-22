import React from 'react';
import './Profile.css'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';

 function Profile(props) {
  
  const userDetails=JSON.parse(localStorage.getItem("user_details"))
     
  return (
    <div >
      <div className='my-custom-container'>
       <MDBRow className="justify-content-left"> 
          <MDBCol md="9" lg="7" xl="5" className="mt-5">
            <MDBCard style={{ borderRadius: '15px' }}>
              <MDBCardBody className="p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    <MDBCardImage
                      style={{ width: '180px', borderRadius: '10px' }}
                      src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp'
                      alt='Generic placeholder image'
                      fluid />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <MDBCardTitle>Name: {userDetails.name}</MDBCardTitle>
                    <MDBCardText>Username: {userDetails.username}</MDBCardText>

                    <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                      style={{ backgroundColor: '#efefef' }}>
                      <div>
                        <p className="small text-muted mb-1">Email: {userDetails.email}</p>
                      </div>
                    </div>
                    <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                      style={{ backgroundColor: '#efefef' }}>
                      <div>
                        <p className="small text-muted mb-1">Mobile No: {userDetails.mobile_number}</p>
                      </div>
                    </div>
                    <button  className="btnupdate">Update Detail</button>
                    
                    {/* <div className="d-flex pt-1">
                      <MDBBtn outline className="me-1 flex-grow-1">Update Detail</MDBBtn>
                      <MDBBtn className="flex-grow-1">Follow</MDBBtn>
                    </div> */}
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow> 
        </div>
    </div>
  );
}
export default Profile;
{/* <div>
                <h2>User Details</h2>
                <p>ID: {userDetails.id}</p>
                <p>Name: {userDetails.name}</p>
                <p>Username: {userDetails.username}</p>
                <p>Email: {userDetails.email}</p>
                <p>Mobile Number: {userDetails.mobile_number}</p>
            </div> */}