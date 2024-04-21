import { ReactCarpooling } from "src/app/FrontOffice/Front-Core/Models/Carpooling/react-carpooling";
import { Route } from "src/app/FrontOffice/Front-Core/Models/Carpooling/route";
import { User } from "src/app/FrontOffice/Front-Core/Models/Carpooling/user";

export class AnnouncementCarpooling {

    idCarpoolingAnnouncement!:number;
    dateCarpoolingAnnouncement!:Date;
    description!:string;
    score!:number;
    userAnnCarpooling!:User;
    routeAnnCarpooling!:Route;
    ridePrice!:number;
    places!:number;
    reactCarpoolingsAnnCarpooling!:Array<ReactCarpooling>


}
