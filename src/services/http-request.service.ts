import { environment } from "../environments/environment";
import { Ikoncert } from "../models/koncert.interface";
import { IkoncertCreate } from "../models/koncertCreate.interface";


export default class HttpRequests{
    
    static async getDatas(endpoint: string) {
        const response = await fetch(`${environment.LOCAL_API_URL}${endpoint}`, {
            method: "GET",
            headers: {
                'Content-type':'application/json; charset=UTF-8',
                'Accept': 'application/json'
            },
        }) 
        const result: Ikoncert[] = await response.json();
        return result
    }

    static async createData(endpoint: string, data: IkoncertCreate){
        const response = await fetch(environment.LOCAL_API_URL + endpoint, {
            method: "POST",
            headers: {
                'Content-type':'application/json; charset=UTF-8',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if(!response.ok){
            const result = await response.json()
            throw new Error(result.message || "Ismeretlen hiba történt");
            
        }
        else
        {
            return await  response.json()
        }

    }

    static async updateData(endpoint: string, data: object, id: number){
        const response = await fetch(`${environment.LOCAL_API_URL}${endpoint}/${id}`,
            {
                method: "PATCH",
                headers: {
                    'Content-type':'application/json; charset=UTF-8',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            }
        )

       
        return await response.json()
        
    }

    static async deleteData(endpoint: string, id: number){
        const response = await fetch(`${environment.LOCAL_API_URL}${endpoint}/${id}`,
            {
                method: "DELETE",
                headers: {
                    'Content-type':'application/json; charset=UTF-8',
                    'Accept': 'application/json'
                }
            }
        )

  
        return await response.json()
        
      
        
    }
}