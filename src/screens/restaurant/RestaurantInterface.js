import {useState,useEffect} from 'react';
import {serverURL,getData,postData} from '../../services/FetchNodeServices'
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import Heading from '../Heading/Heading';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';   
import Button from '@mui/material/Button';
import UploadFileIcon from '@mui/icons-material/UploadFile'; 
import Avatar from '@mui/material/Avatar';


export default function RestaurantInterface() {
  const styles = {
    root: {
      width: '100vw',
      height: '100vh',
      background: '#dfe4ea',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    box: {
      width: '70%',
      height: 'auto',
      background: '#fff',
      borderRadius: '10px',
      padding: '20px'
    },
    center:{
      display:'flex',
      alignItems:'center',
      justifyContent:'center'
    }
  };


  const [states,setStates]=useState([]);
  const [stateid,setStateId]=useState('');
  const [cities,setCities]=useState([]);
  const [cityid,setCityId]=useState('');
  const [restaurantName,setRestaurantName]=useState('');
  const [ownerName,setOwnerName]=useState('');
  const [phoneNumber,setPhoneNumber]=useState('');
  const [emailid, setEmailid]=useState('');
  const [mobileNumber,setMobileNumber]=useState('');
  const [url,setUrl]=useState('');
  const [fssai,setFssai]=useState('');
  const [gstNo,setGstNo]=useState('');
  const [gstType,setGstType]=useState('');
  const [fileFssai,setFileFssai]=useState('');
  const [fileShopAct,setFileShopAct]=useState('');
  const [fileLogo,setFileLogo]=useState('');  
  const [address,setAddress]=useState('');



  const fetchAllStates=async()=>{
    var result=await getData('statecity/fetch_all_states');
    console.log(result.data)
    setStates(result.data)
  }


const handleStateChange=(event)=>{
    setStateId(event.target.value)
    fetchAllCities(event.target.value);
}


const fetchAllCities=async(stateid)=>{
  var body={stateid:stateid}
  var result=await postData('statecity/fetch_all_cities',body);
  console.log(result.data)
  setCities(result.data)
}


const fillCities=()=>{
  return cities.map((item)=>{
    return <MenuItem value={item.cityid}>{item.cityname}</MenuItem>
  })
}


const handleFssai=(event)=>{
  setFileFssai({url:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
}

const handleShopAct=(event)=>{
  setFileShopAct({url:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
}

const handleLogo=(event)=>{
  setFileLogo({url:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
}


  useEffect(function(){
  fetchAllStates();
  },[])




  const handleSubmit=async()=>{
     var formData=new FormData();
     formData.append('restaurantname',restaurantName)
     formData.append('ownername',ownerName)
     formData.append('phonenumber',phoneNumber)
     formData.append('emailid',emailid)
     formData.append('mobileno',mobileNumber)
     formData.append('url',url)
     formData.append('fssai',fssai)
     formData.append('gstno',gstNo)
     formData.append('gsttype',gstType)
     formData.append('filefssai',fileFssai.bytes)
      formData.append('fileshopact',fileShopAct.bytes)
      formData.append('filelogo',fileLogo.bytes)
      formData.append('address',address)
        formData.append('stateid',stateid)
        formData.append('cityid',cityid)
        var d=new Date();
        var cd=d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()
        formData.append('createdat',cd)
        formData.append('updatedat',cd)
     
      
        var result=await postData('restaurant/restaurant_submit',formData)
        alert(result.status)

  }
 



  const fillStates=()=>{
    return states.map((item)=>{
      return <MenuItem value={item.stateid}>{item.statename}</MenuItem>
    })
  }

  return (
    <div style={styles.root}>
      <div style={styles.box}>
        <Grid container spacing={2}>
          <Grid size={{xs:12}}>
            <Heading title="Restaurant Registration" />
          </Grid>
          <Grid  size={{xs:6}}>
            <TextField label="Restaurant Name" fullWidth  onChange={(event)=>setRestaurantName(event.target.value)}/>
          </Grid>
          <Grid  size={{xs:6}}>
            <TextField label="Owner Name" fullWidth onChange={(event)=>setOwnerName(event.target.value)} />
          </Grid>
          <Grid size={{xs:4}}>
            <TextField label="Phone Number" fullWidth onChange={(event)=>setPhoneNumber(event.target.value)} />
          </Grid>
          <Grid size={{xs:4}}>
            <TextField label="Mobile Number" fullWidth onChange={(event)=>setMobileNumber(event.target.value)} />
          </Grid>
          <Grid size={{xs:4}}>
            <TextField label="Email Address" fullWidth onChange={(event)=>setEmailid(event.target.value)} />
          </Grid>
            <Grid size={{xs:12}}>
            <TextField label="Address" fullWidth onChange={(event)=>setAddress(event.target.value)} />
          </Grid>
          <Grid size={{xs:4}}>
               <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">State</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="State"
          value={stateid}
          onChange={handleStateChange}
        >
 <MenuItem>-Select State-</MenuItem>
       {fillStates()}
        </Select>
      </FormControl>
          </Grid>
             <Grid size={{xs:4}}>
                <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">City</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="City"
          value={cityid}
          onChange={(event)=>setCityId(event.target.value)}
        >
          <MenuItem>-Select City-</MenuItem>
           {fillCities()}
        </Select>
      </FormControl>
          </Grid>
             <Grid size={{xs:4}}>
            <TextField label="URL" fullWidth onChange={(event)=>setUrl(event.target.value)} />
          </Grid>

          <Grid size={{xs:4}}>
            <TextField label="Fssai Number" fullWidth  onChange={(event)=>setFssai(event.target.value)} />
          </Grid>

          <Grid size={{xs:4}}>
            <TextField label="GST Number" fullWidth onChange={(event)=>setGstNo(event.target.value)} />
          </Grid>

          <Grid size={{xs:4}}>
                <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">GST Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="GST Type"
          value={gstType}
          onChange={(event)=>setGstType(event.target.value)}
        >
          <MenuItem>-Select GST Type-</MenuItem>
          <MenuItem value="5 Star">5 Star</MenuItem>
          <MenuItem value="Others">Others</MenuItem>
        </Select>
      </FormControl>
          </Grid>
     <Grid size={{xs:4}} style={styles.center}>
  <Avatar
        sx={{ width: 56, height: 56 }}
        alt="Remy Sharp"
        src={fileFssai.url}
       variant="rounded"
      />
    </Grid>
    <Grid size={{xs:4}} style={styles.center}>
      <Avatar
        sx={{ width: 56, height: 56 }}
        alt="Remy Sharp"
        src={fileShopAct.url}
       variant="rounded"
      />

    </Grid>
    <Grid size={{xs:4}} style={styles.center}>
      <Avatar
        sx={{ width: 56, height: 56 }}
        alt="Remy Sharp"
        src={fileLogo.url}
       variant="rounded"
      />

    </Grid>
        <Grid size={{xs:4}}>
            <Button component="label" variant="contained" color="primary" fullWidth endIcon={<UploadFileIcon />}>
             <input onChange={handleFssai} type="file" accept="image/*" hidden multiple />
              Upload Fssai 
            </Button>
          </Grid>
          
          <Grid size={{xs:4}}>
            <Button component="label" variant="contained" color="primary" fullWidth endIcon={<UploadFileIcon />}>
             <input onChange={handleShopAct} type="file" accept="image/*" hidden multiple />
              Upload Shop Act 
            </Button>
          </Grid>
                <Grid size={{xs:4}}>
            <Button component="label" variant="contained" color="primary" fullWidth endIcon={<UploadFileIcon />}>
             <input onChange={handleLogo} type="file" accept="image/*" hidden multiple />
              Upload Logo
            </Button>
          </Grid>
          <Grid size={{xs:6}}>
            <Button onClick={handleSubmit} component="label" variant="contained" color="primary" fullWidth>
           Submit
            </Button>
          </Grid>
                <Grid size={{xs:6}}>
            <Button component="label" variant="contained" color="primary" fullWidth>
              Reset
            </Button>
          </Grid>
          
        </Grid>
      </div>
    </div>
  );
}