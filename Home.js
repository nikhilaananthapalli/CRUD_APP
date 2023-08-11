import { useEffect, useState } from "react"
import React from 'react'
import { Link } from "react-router-dom";
import { Toast, toast } from "react-toastify";
import axios from 'axios';
function Home() {
    const [data,setData]=useState([]);

     const localData=async()=>{
        const response=await axios.get("http://localhost:5000/api/get");
        setData(response.data);
     }

     useEffect(()=>{
        localData();
     })

     const deleteContact=(id)=>{
        if(window.confirm("are you sure, want to delete the contact"));
        axios.delete(`http://localhost:5000/api/remove/${id}`)
        toast.success("contact deleted sucessfully");
        setTimeout(()=>{
            localData();
        },500);
     }

  return (
    <div>
        <div style={{marginTop: '150px'}}>
        <Link to="/addedit">
            <button className='btn btn-contact'>Add Contact</button>
        </Link>
        <table className='styled-table'>
            <thead>
                <tr>
                    <th style={{textAlign: 'center'}}>No.</th>
                    <th style={{textAlign: 'center'}}>Name</th>
                    <th style={{textAlign: 'center'}}>Email</th>
                    <th style={{textAlign: 'center'}}>Phone Number</th>
                    <th style={{textAlign: 'center'}}>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    data && data.map((item,index)=>{
                        return (
                            <tr key={item.id}>
                                <td>{index+1}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.contact}</td>
                                <td>
                                    <Link to={`/update/${item.id}`}>
                                        <button className='btn btn-edit' >Edit</button>
                                    </Link>
                                    <button className='btn btn-delete' onClick={()=>deleteContact(item.id)} >Delete</button>
                                    <Link to={'/view/${item.id}'}>
                                        <button className='btn btn-view'>View</button>
                                    </Link>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </div>
    </div>
  )
}

export default Home