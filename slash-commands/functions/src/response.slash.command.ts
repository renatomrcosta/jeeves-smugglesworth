class ResponseSlashCommand {
    response_type: string;
    text: string;

    constructor(response_type:string){
        this.response_type = response_type;
    }
}
class InChannelResponse extends ResponseSlashCommand {
    constructor(){
        super("in_channel");
    }
}

/**
 * "For the best clarity of intent, we recommend always declaring your intended response_type, even if you wish to use
 *    the default ephemeral value."
 * {@link https://api.slack.com/slash-commands}
 */
class PrivateResponse extends ResponseSlashCommand {
    constructor(){
        super("ephemeral");
    }
}
export {ResponseSlashCommand, InChannelResponse, PrivateResponse}



