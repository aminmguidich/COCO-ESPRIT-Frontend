import { ReactPost } from "../Forum/ReactPost";

export class User {
    
        id?: number;
        username: string;
        password: string;
        email: string;
        fullname?: string;
        espritId?: string;
        niv?: string;
        phone?: number;
        imageUrl?: string;
        birthDate?: Date;
        gender?: string;
        score?: number;
        claimsUser?: any[];
        requirementCollocationsUser?: any[];
        carUser?: any;
        calendarUser?: any;
        adressUser?: any;
        reactsUser?: any[];
        commandsUser?: any[];
        reactPostuser?: ReactPost[];
      }
