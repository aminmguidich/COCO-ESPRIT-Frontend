export class PaginatorData {

    constructor(size:number=3,index:number=0){
        this.pageIndex=index;
        this.pageSize=size;
    }
  pageSize !:number;
  pageIndex !:number;
}
