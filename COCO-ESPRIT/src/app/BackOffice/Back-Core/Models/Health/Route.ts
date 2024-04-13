import { Address } from "./Address";
import { BalanceSheet } from "./BalanceSheet";

export class Route {
    idRoute: number;
    distance: number;
    balanceSheetsRoute?: BalanceSheet[];
    adressesRoute?: Address[];
}