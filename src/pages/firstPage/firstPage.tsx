import { useEffect, useState } from "react";
import { Ikoncert } from "../../models/koncert.interface";
import HttpRequests from "../../services/http-request.service";
import classes from "./firstPage.module.css";
import { Link } from "react-router-dom";

export default function FirstPage() {
    const [koncertDatas, setKoncertDatas] = useState<Ikoncert[]>([])
    useEffect(() =>{
      getDatas()
    }, [])
  
    async function getDatas(){
      try
      {
        const datas = await HttpRequests.getDatas("koncertek");
        setKoncertDatas(datas)
      }
      catch(error: unknown){
        console.log(error);
        
      }
    
    }
    async function onDelete(id: number){
        console.log(id);
        
        try {
            const response = await HttpRequests.deleteData("koncertek", id);
            console.log(response);
            alert("Sikeres törlés")
            getDatas()
        } catch (error) {
            console.log(error);
        }
    }
    async function updateData(id: number){
        try {
            const response = await HttpRequests.updateData("koncertek", {elmaradE: true}, id);
            console.log(response);
            alert("Sikeres változtatás")
            getDatas()
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className={classes.container}>
            <table className={classes.table}>
                        <tr className={classes.thead}>
                            <th>
                                <div className={classes.elements}>
                                    Fellepő
                                </div>
                            </th>
                            <th>
                                <div className={classes.elements}>
                                    Időtartam
                                </div>
                            </th>
                            <th>
                                <div className={classes.elements}>
                                    Kezdési idő
                                </div>
                            </th>
                            <th >
                                <div className={classes.elements}>

                                </div>
                            </th>
                        </tr>
                        {
                            
                            
                            koncertDatas.map((items) =>(
                                !items.elmaradE ? 
                                <tr className={classes.tbody} key={items.id}>
                                    <td>{items.fellepo}</td>
                                    <td>{items.idotartam} óra</td>
                                    <td>{new Date(items.kezdesiIdo).toLocaleDateString()} </td>
                                    <td><button onClick={()=> updateData(items.id)} type="button">elmarad</button></td>
                                    <td><button  onClick={()=>onDelete(items.id)} type="button">törlés</button></td>
                                </tr>
                                :
                            
                                <tr className={classes.tbody} style={{backgroundColor:"red"}} key={items.id}>
                                    <td>{items.fellepo}</td>
                                    <td>{items.idotartam} óra</td>
                                    <td>{new Date(items.kezdesiIdo).toLocaleDateString()} </td>
                                    <td><button disabled type="button">elmarad</button></td>
                                    <td><button onClick={()=>onDelete(items.id)} type="button">törlés</button></td>
                                </tr>
                            ))
                        }
          <button><Link style={{textDecoration: "none", color: "black"}} to="/secondPage" type="button">koncert felvétel</Link></button>
        </table>
       
        </div>
        
  
    )
}