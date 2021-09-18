import Login from '../Login.js';
import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Image } from 'react-bootstrap/esm';
import avatar from '../../images/img_avatar2.png'
import logo from '../../images/UberEATS.png'
import backendServer from '../../Config'


import Axios from 'axios';


const UserProfile = () =>{
    const [email, getEmail] = useState('');
  const [fullname, getFullname] = useState('');
  const [phonenumber, getPhonenumber] = useState('');
  const [city, getCity] = useState('');
  const [state, getState] = useState('');
  const [zipcode, getZipcode] = useState('');

  const [file, setFile] = useState('');
  const [emailUpdate, setEmail] = useState('');
  const [fullnameUpdate, setFullname] = useState('');
  const [phonenumberUpdate, setPhonenumber] = useState('');
  const [cityUpdate, setCity] = useState('');
  const [stateUpdate, setState] = useState('');
  const [zipcodeUpdate, setZipcode] = useState('');
  
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');


  console.log(fullname);

  const updateProfile = () => {
    const data = new FormData();
     data.append('name', 'file_name.jpg');
    data.append('file', "file_name.jpg");
    let url = `${backendServer}/image/user`
   // axios.defaults.headers.common.authorization = localStorage.getItem('token');
  //  axios.post(url, data).then((res) => {
  //     setImage(res.data.imagepath);
  //     // history.push('/profile');
  //   });
    axios.post(`${backendServer}/UserProfile`, {
        email: email,
       emailUpdate:emailUpdate,
        fullnameUpdate: fullnameUpdate,
        phonenumberUpdate:phonenumberUpdate,
        cityUpdate:cityUpdate,
        stateUpdate:stateUpdate,
        zipcodeUpdate:zipcode
      })
      .then((response) => {
        console.log(response);

      });
  };


  useEffect(async () => {
   // axios.defaults.headers.common.authorization = localStorage.getItem('token');
    //const getURL = `${backendServer}/profile/${userid}`;
    const response = await axios.get(`${backendServer}/UserProfile`);
    
   console.log(response)
   // setImage(response.data[0].image);
  //  const dbemail = response.data[0].EmailId;
    getEmail(response.data[0].EmailId);
    getFullname(response.data[0].CustomerName);
    getPhonenumber(response.data[0].PhoneNumber)
   // console.log(dbemail);
   
  }, []);
 


const imageup = (event)=>{
    setFile(event.target.files[0]);
    const file = event.target.files[0];
    setImage(file);
    setImageUrl(URL.createObjectURL(file))
    };

  //  const {items} = this.response;
    return (
        <>
        <Login />
        <br></br>
        <div class="container">
<div class="row gutters">
<div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
<div class="card h-100">
	<div class="card-body">
		<div class="account-settings">
			<div class="user-profile">
				<div class="user-avatar">
					{/* <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Maxwell Admin" /> */}
                    
                    <Image className="main myImage" src={imageUrl} height={100} width={100}/>
                    <br></br>
                    
            <input
              type="file"
              id="file"
              accept="image/*"
              onChange={imageup}
            />
				</div>
                <br></br>
				<h6 class="user-name">Name: {fullname}</h6>
				<h6 class="user-email">Email ID : {email}</h6>
			</div>
			<div class="about">
				<h5>About</h5>
				<p>I'm Yuki. Full Stack Designer I enjoy creating user-centric, delightful and human experiences.</p>
			</div>
		</div>
	</div>
</div>
</div>
<div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
<div class="card h-100">
	<div class="card-body">
		<div class="row gutters">
			<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
				<h6 class="mb-2 text-primary">Personal Details</h6>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="fullName">Full Name</label>
					<input type="text" class="form-control" id="fullName" placeholder={fullname} onChange={(e) => {
                      setFullname(e.currentTarget.value);
                    }}/>
				</div>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="eMail">Email</label>
					<input type="email" class="form-control" id="eMail" placeholder={email} onChange={(e) => { setEmail(e.currentTarget.value); }} /> 
          {/* onChange={(e) => { setEmail(e.currentTarget.value); }} */}
				</div>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="phone">Phone</label>
					<input type="text" class="form-control" id="phone" placeholder={phonenumber} onChange={(e) => {
                      setPhonenumber(e.currentTarget.value);
                    }}/>
				</div>
			</div>
			
		</div>
		<div class="row gutters">
			<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
				<h6 class="mt-3 mb-2 text-primary">Address</h6>
			</div>
			
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="city">City</label>
					<input type="name" class="form-control" id="ciTy" placeholder={city} />
				</div>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="sTate">State</label>
					<input type="text" class="form-control" id="sTate" placeholder={state}/>
				</div>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="zIp">Zip Code</label>
					<input type="text" class="form-control" id="zIp" placeholder={zipcode}/>
				</div>
			</div>
		</div>
        <br></br>
		<div class="row gutters">
			<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
				<div class="text-right">
					{/* //<button type="button" id="submit" name="submit" class="btn btn-secondary">Cancel</button>  */}
                    
					<button type="button" id="submit" name="submit" class="btn btn-primary" onClick={()=>updateProfile()}>Update</button>
				</div>
			</div>
		</div>
	</div>
</div>
</div>
</div>
</div>
</>
)
}

export default UserProfile;