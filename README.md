# jeeves-smugglesworth
NodeJS implementation of the Jeeves Slack bot

#### How it works:
This app exposes a simple ExpressJS endpoint ('/jeeves') that takes an event POST from Slack.

Whenever Jeeves is mentioned, we can execute a function for each expected command.

The template has been laid bare. Now we need first to implement the current code based on Erico's first slack implementation, then integrate the storage in a database (be it firebase or otherwise).


#### How to execute (locally):

As always, first NPM install:

`npm install`

Secondly, run the jeeves.ts file:

`npm src/jeeves.ts`

Have ngrok installed (https://ngrok.com/) and open your local port to the web:

`ngrok http 4521`

Take the forwarded URL and configure our event subscriptions at (https://api.slack.com/apps/AD5164XKP/event-subscriptions?)

Example: https://071e360d.ngrok.io/jeeves
