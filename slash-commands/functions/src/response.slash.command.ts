export class ResponseSlashCommand {
    response_type: string;
    text: string;

    constructor(response_type:string){
        this.response_type = response_type;
    }

}