import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "./Settings.css";
import baseurl from "../Api";
import axios from "axios";
import { TextField } from "@mui/material";



const Settings = () => {

  
  const [file, setFile] = useState(null);
  var [selectedimage,setSelectedimage] = useState();
  // const [inputs,setInputs] = useState({"username":'',"email":'',"password":''});
  const [inputs, setInputs] = useState({ username: '', email: '', password: '' });
  var[userdetails,setUserdetails] = useState([]);
   

  useEffect(()=>{
    const storevalue =localStorage.getItem("user");
    console.log(storevalue);
      axios.get(baseurl + "/register/sviewuser/"+storevalue)
      .then(response =>{
      
          console.log(response.data)
          setUserdetails(response.data)
          
          // setInputs((prevInputs) => ({
          //   ...prevInputs,
          //   username: response.data.username
          // }));
          console.log(inputs.username)
          // console.log(userdetails)
      })
      .catch(err=>console.log(err))
  },[])


  const inputhandler =(event)=> {
    const {name,value}=event.target
    // setInputs((inputs)=>({...inputs,[name]:value}))
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
    console.log(inputs)
}


 
  const handleimage =(event)=>{
      const file = event.target.files[0];
      setSelectedimage(file)
      setFile(file)
      inputs.profilephoto=file;
  }

  const savedata =(event)=>{
    event.preventDefault();
  console.log("dgjks")

  const formdata = new FormData();
  formdata.append('username',inputs.username);
  formdata.append('email',inputs.email);
  formdata.append('password',inputs.password);
  formdata.append('profilephoto',selectedimage)

  
  fetch(baseurl + '/update/pnew',
  {method:'post',body:formdata,})
  .then((response)=>response.json())
  .then((data)=>{
      alert("record saved")
  })
  .catch((err)=>{
     console.log("error")
  }
 )

  
  }


 
  return (
        <div className="settings">
        {Array.isArray(userdetails) && userdetails.map((val,index)=>{
        return(
         
          <div key={index}>
            <label>Username</label>
            
            <TextField  variant="filled" name="username" value={val.username}  onChange={inputhandler} />
     <div className="settingsWrapper">
           	<div className="settingsTitle">
          		<span className="settingsTitleUpdate">Update Your Account</span>
          		<span className="settingsTitleDelete">Delete Account</span>
        	</div>
        	<form className="settingsForm">  
          	<label>Profile Picture</label>
          	<div className="settingsPP">
          		{file && (
        		<img className="writeImg" src={URL.createObjectURL(file)}   alt="" />
      			)} 
            	<label htmlFor="fileInput">
              	<i className="settingsPPIcon far fa-user-circle"></i>{" "}
            	</label>
           	 <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={handleimage}

            //   onChange={(e) => setFile(e.target.files[0])}
            />
           
          </div>
          <label>Username</label>
          <input type="text" name="username"  value={val.username}
          onChange={inputhandler}
          />
          <label>Email</label>
          <input type="email" name="email" value={val.email}
          onChange={inputhandler}
           />
          <label>Password</label>
          <input type="password" name="password" value={val.password}
          onChange={inputhandler}
           />
          <button className="settingsSubmitButton" type="submit" onClick={savedata}>
         update
          </button>  
        </form> 
        
      </div>
          </div>
  )
})}
       <Sidebar/>
       </div>
  
  );
}

  


export default Settings
