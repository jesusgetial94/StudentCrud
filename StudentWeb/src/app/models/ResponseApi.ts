export class ResponseApi{
    success: boolean;
    message: string;
    innerMessage: string;

    constructor(){
        this.success = true;
        this.message= "";
        this.innerMessage = "";
    }
}