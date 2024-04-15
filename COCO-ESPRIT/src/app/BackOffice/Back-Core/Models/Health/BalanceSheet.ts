import { Car } from "./Car";
import { Route } from "./Route";

export class BalanceSheet {
    idBalanceSheet: number;
    description: string;
    carBalanceSheet?: Car;
    routeBalanceSheet?: Route; 
}