import { Link, useNavigate } from "react-router-dom";
import classes from "./secondPage.module.css";
import { Ikoncert } from "../../models/koncert.interface";
import { useState } from "react";
import HttpRequests from "../../services/http-request.service";
import { IkoncertCreate } from "../../models/koncertCreate.interface";

export default function SecondPage() {
    const navigate = useNavigate();
    const [koncertDatas, setKoncertDatas] = useState<IkoncertCreate>(
        {
            fellepo: "",
            idotartam: 0,
            kezdesiIdo: new Date()
        }
    )

    const [error, setError] = useState<string | null>(null);
    function setValue(e: React.ChangeEvent<HTMLInputElement>, name: string){
        setKoncertDatas({
            ...koncertDatas,
            [name]: e.target.value
        })
    }


    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
            e.preventDefault()
            const newKoncert: IkoncertCreate = {
                fellepo: koncertDatas?.fellepo as string,
                idotartam: Number(koncertDatas.idotartam), 
                kezdesiIdo: new Date(koncertDatas.kezdesiIdo),
            }
            console.log(newKoncert);
            
        try {
            const response = await HttpRequests.createData("koncertek", newKoncert);
            alert("Sikeres hozzáadás");
            navigate("/firstPage");
            console.log(response);
        } catch (error: any) {
            setError(error.message || "Ismeretlen hiba történt");
            console.log(error);
        }
    }



    
    return(
        <>
        <form onSubmit={handleSubmit} className={classes.container}>
            <div className={classes.elements}>
                <div className={classes.element}>
                    <label>Fellepő</label>
                    <input type="text" name="fellepo" required placeholder="Fellepő" onChange={(value) => setValue(value, "fellepo")}></input>
                </div>
                <div className={classes.element}>
                    <label>Időtartam</label>
                    <input type="number" name="idotartam" required placeholder="Időtartam" onChange={(value) => setValue(value, "idotartam")}></input>
                </div>
                <div className={classes.element}>
                    <label>Kezdési idő</label>
                    <input type="date" name="kezdesiIdo" required placeholder="Kezdési idő" onChange={(value) => setValue(value, "kezdesiIdo")}></input>
                </div>
                <div style={{display: "flex", gap: "10px"}}>
                    <button type="submit">Hozzáad</button>
                    <button type="button"><Link style={{textDecoration: "none", color: "black"}}  to="/firstPage">Koncertek</Link></button>
                </div>
                {error && <div className={classes.error}>{error}</div>}
            </div>
            
        </form>

        
        </>
    )
}