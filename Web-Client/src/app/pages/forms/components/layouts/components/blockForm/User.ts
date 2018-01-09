export class User{

    uid: number;
    name: string;
    email:string;

    constructor(id:number, name:string, email:string){
            this.uid=id;
            this.name=name;
            this.email=email;
    }
}