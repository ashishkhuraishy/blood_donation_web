import { API_KEY } from "$env/static/private";
import type { PageServerLoad } from "./$types";

const BASE_URL = "https://api.airtable.com/v0/appYBidFsRZ4zWqXl/Table%201";

 export type User = {
    Name: string;
    BloodGroup: string;
    Unit: string;
    PhoneNumber: string;
    Place: string;
};


export const load : PageServerLoad = async () => {
    const response = await fetch(BASE_URL, {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
        },
    });

    const data = await response.json();
    // console.log(data.records);

    var users : User[] = [];
    data.records.forEach((record: any) => {
        var user = record.fields as User;
        users.push(user);
    });
   return { users }; 
    
};
