import { BalanceSheet } from "./BalanceSheet";

export class Car {
    idCar: number;
    registrationNumber: string;
    image?: string | File; // Change the type to accept both string and File
    smoking: boolean;
    airConditioned: boolean;
    places: number;
    model: string;
    userCar?: number; 
    balanceSheetsCar?: BalanceSheet[];
}