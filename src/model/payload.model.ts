interface Payload {
    "challenge": string,
    "token": string,
    "team_id": string,
    "api_app_id": string,
    "event": {
        "type": string,
        "user": string,
        "text": string,
        "ts": string,
        "channel": string,
        "event_ts": string
    },
    "type": string,
    "authed_users": string[],
    "event_id": string,
    "event_time": number
}
