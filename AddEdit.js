import React from 'react'
import { Link,useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
//import { Toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const initialState={
    name:"",
    email:"",
    contact:""
}

function AddEdit() {
    const [state,setState]=useState(initialState);
    const {name,email,contact}=state;
    const navigate=useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!name || !email || !contact){
            toast.error(("please provide value"));
        }
        else
        {
            if(!id)
            {
            
            axios.post("http://localhost:5000/api/post",{name,email,contact})
            .then(()=>{
                setState({name:"",email:"",contact:""});
            })
            .catch((err)=>{
                toast.error(err.response.data);
            })
            toast.success("contact added sucessfully");
            setTimeout(()=>navigate("/",500));
           }
            else
            {
                axios.put(`http://localhost:5000/api/put/${id}`,{name,email,contact,id})
                .then(()=>{
                    setState({name:"",email:"",contact:""});
                })
                .catch((err)=>{
                    toast.error(err.response.data);
                })
                toast.success("contact updated sucessfully");
                setTimeout(()=>{History("/")},500);
            }
        }  
    }
    const {id}  =useParams();
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/put/${id}`)
        .then((resp)=>setState({...resp.data[0]}))
    },[id])


    
    const handleInputChange=(e)=>{
        const {name,value}=e.target;
        setState({...state,[name]:value})
    }

  return (
    <div>
        <div style={{marginTop: '100px'}}>
        <form style={{
            margin: 'auto',
            padding: '15px',
            maxWidth: '400px',
            alignContent: 'center'
        }} onSubmit={handleSubmit}>
            
            <label htmlFor='name'>Name</label>
            <input type='text' id='name' name='name' placeholder='Your Name....' value={name} onChange={handleInputChange}/>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' name='email' placeholder='Your Email....' value={email} onChange={handleInputChange}/>
            <label htmlFor='contact'>Contact</label>
            <input type='text' id='contact' name='contact' placeholder='Your Contact No....' value={contact} onChange={handleInputChange}/>
            <input type='submit' value={id? "update":"Save"} /><br></br>
            <Link to="/">
                <input type='button' value='Back' />
            </Link>
        </form>
    </div>
    </div>
  )
}

export default AddEdit