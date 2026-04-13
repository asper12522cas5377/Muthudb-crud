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
    Axios.post("https://muthudb-crud.onrender.com/insert",{foodName,description})
    .then((res)=>{
        console.log(res)
    })
    .catch((err)=>{
        console.log(err)
    })
   }

   //Getdata
   const fetchData=()=>{
    Axios.get("https://muthudb-crud.onrender.com/read").then((response)=>{
        console.log(response.data)
        setFoodList(response.data)
    })
   }

   //update
   const updateFood=(id)=>{
    Axios.put(`https://muthudb-crud.onrender.com/update`,{id,newFoodName})
    .then(()=>fetchData())
   }

   //delete
   const deleteFood=(id)=>{
    Axios.delete(`https://muthudb-crud.onrender.com/delete/${id}`).then(()=>fetchData())
   }
   return(
    <div>
        <div className="container">
         <h1>Food Name</h1>
        <div className="mb-3">
         <input type="text" className="from-control" placeholder="FoodName" required
         onChange={(e)=>setFoodName(e.target.value)}
         />
        </div>

        <div className="mb-3">
         <input type="text" className="from-control" placeholder="FoodDescription" required
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