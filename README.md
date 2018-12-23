# jeeves-smugglesworth
NodeJS implementation of the Jeeves Slack bot

#### How it works:
This app exposes a simple ExpressJS endpoint ('/jeeves') that takes an event POST from Slack.

Whenever Jeeves is mentioned, we can execute a function for each expected command.

In slack, you can mention the Bot User @Jeeves with any of the following commands:

- Merge
- Done
- Kick
- Status
- Help

#### How to Deploy

Run the following command to deploy jeeves to firebase:

`npm run deploy`

#### How to execute (locally):

As always, first NPM install:

`npm install`

Secondly, run the jeeves.ts file:

`npm src/jeeves.local.ts`

Have ngrok installed (https://ngrok.com/) and open your local port to the web:

`ngrok http 4521`

Take the forwarded URL and configure our event subscriptions at (https://api.slack.com/apps/AD5164XKP/event-subscriptions?)

Example: https://071e360d.ngrok.io/jeeves

Save your changes and jeeves should be working.