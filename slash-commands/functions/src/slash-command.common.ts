class PostContent {
    // private _obj: PostContent = new PostContent();

    private _token:string;
    private _text:string;
    private _team_id:string;
    private _command:string;
    private _channel_name:string;
    private _user_name:string;
    private _response_url:string;
    private _user_id:string;
    private _channel_id:string;

    private constructor(token:string,
                text:string,
                team_id:string,
                command:string,
                channel_name:string,
                user_name:string,
                response_url:string,
                user_id:string,
                channel_id:string) {
        this._token = token;
        this._text = text;
        this._team_id = team_id;
        this._command = command;
        this._channel_name = channel_name;
        this._user_name = user_name;
        this._response_url = response_url;
        this._user_id = user_id;
        this._channel_id = channel_id;

    }

    get token():string {
        return this._token;
    }
    get text():string {
        return this._token;
    }
    get team_id():string {
        return this._team_id;
    }
    get command():string {
        return this._command;
    }
    get channel_name():string {
        return this._channel_name;
    }
    get user_name():string {
        return this._user_name;
    }
    get response_url():string {
        return this._response_url;
    }
    get user_id():string {
        return this._user_id;
    }
    get channel_id():string {
        return this._channel_id;
    }

    static builder = class PostContentBuilder {
        private _token:string;
        private _text:string;
        private _team_id:string;
        private _command:string;
        private _channel_name:string;
        private _user_name:string;
        private _response_url:string;
        private _user_id:string;
        private _channel_id:string;

        token(token:string):PostContentBuilder{
            this._token = token;
            return this;
        }
        text(text:string):PostContentBuilder{
            this._text = text;
            return this;
        }
        team_id(team_id:string):PostContentBuilder{
            this._team_id = team_id;
            return this;
        }
        command(command:string):PostContentBuilder{
            this._command = command;
            return this;
        }
        channel_name(channel_name:string):PostContentBuilder{
            this._channel_name = channel_name;
            return this;
        }
        user_name(user_name:string):PostContentBuilder{
            this._user_name = user_name;
            return this;
        }
        response_url(response_url:string):PostContentBuilder{
            this._response_url = response_url;
            return this;
        }
        user_id(user_id:string):PostContentBuilder{
            this._user_id = user_id;
            return this;
        }
        channel_id(channel_id:string):PostContentBuilder{
            this._channel_id = channel_id;
            return this;
        }
        build():PostContent {
            return new PostContent(this._token,
                this._text,
                this._team_id,
                this._command,
                this._channel_name,
                this._user_name,
                this._response_url,
                this._user_id,
                this._channel_id);
        }

    }
}

function parseSlashCommandPostContent(body:any){

    return new PostContent.builder()
        .token(body.token)
        .text(body.text)
        .team_id(body.team_id)
        .command(body.command)
        .channel_name(body.channel_name)
        .user_name(body.user_name)
        .response_url(body.response_url)
        .user_id(body.user_id)
        .channel_id(body.channel_id).build();

}

export {parseSlashCommandPostContent, PostContent}