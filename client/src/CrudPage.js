import React,{useEffect,useState} from "react";
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
function CrudPage()
{
   const [foodName,setFoodName]=useState("");
   const [description,setDescription]=useState();
   const [foodList,setFoodList]=useState([]);
   const [newFoodName,setNewFoodName]=useState("");


   useEffect(()=>{
    fetchData();
   },[])
   //insert
   const addFoodData=()=>{
    Axios.post("http://localhost:3001/insert",{foodName,description})
    .then((res)=>{
        console.log(res)
    })
    .catch((err)=>{
        console.log(err)
    })
   }

   //Getdata
   const fetchData=()=>{
    Axios.get("http://localhost:3001/read").then((response)=>{
        console.log(response.data)
        setFoodList(response.data)
    })
   }

   //update
   const updateFood=(id)=>{
    Axios.put(`http://localhost:3001/update`,{id,newFoodName})
    .then(()=>fetchData())
   }

   //delete
   const deleteFood=(id)=>{
    Axios.delete(`http://localhost:3001/delete/${id}`).then(()=>fetchData())
   }
   return(
    <div>
        <div className="container">
         <h1>Fruits Name</h1>
        <div className="mb-3">
         <input type="text" className="from-control" placeholder="FoodName" required
         onChange={(e)=>setFoodName(e.target.value)}
         />
        </div>

        <div className="mb-3">
         <input type="text" className="from-control" placeholder="FoodName" required
         onChange={(e)=>setDescription(e.target.value)}
         />
        </div>
         
         <div className="mb-3">
        <button className="btn btn-primary" onClick={addFoodData}>AddFood</button>
        </div>
    
        <h3>View Details</h3>
        <table className="table table-bordered table-striped">
            <tr>
                <th>FoodName</th>
                <th>FoodDescription</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            <tbody>
                {foodList.map((val,key)=>(
                    <tr key={key}>
                        <td>{val.foodName}</td>
                        <td>{val.description}</td>
                        <td>
                            <input type='text' placeholder='updateFoodName' onChange={(e)=>setNewFoodName(e.target.value)}/>
                            <button className="btn btn-primary" onClick={()=>updateFood(val._id)}>Edit</button>
                        </td>
                        <td>
                            <button className="btn btn-danger" onClick={()=>deleteFood(val._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    </div>
   )
}
export default CrudPage;