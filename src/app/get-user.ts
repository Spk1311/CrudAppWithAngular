export class GetUser {
    constructor(
        public id : number,
        public name : string,
        public email : string,
        public password : string,
        public phone : string,
        public gender : number,
        public birthdate : string  
    ){}
}
