import {FileDB} from "./FileDB";

export class House {
  idHouse!: number;
  image !:FileDB;
  houseType!: string;
  places!: number;
  nbrofBedrooms!:number;
  price!:number;
  contracted!:boolean
  title!:string
}
