import { Adress } from "./adress";
import { ReactCarpooling } from "./react-carpooling";
export class User {

     id!: number;
     username!: string;
     password!: string;
     email!: string;
     roles!: any[];
     fullname?: string;
     niv?: string;
     phone?: number;
     espritId?: string;
     imageUrl?: string;
     birthDate?: Date;
     gender?: any;
     score?: number;
     claimsUser?: any[];
     requirementCollocationsUser?: any[];
     carUser?: any;
     calendarUser?: any;
     adressUser?: Adress;
     reactsUser?: ReactCarpooling[];
     commandsUser?: any[];
 
}
