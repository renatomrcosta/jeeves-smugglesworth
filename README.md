# jeeves-smugglesworth
Your friendly Merge flow butler!

Jeeves will watch your slack channels and keep track of your merging procedure, now in nodeJS!

#### How to use
After installing the bot app in your workspace, simple add the user @Jeeves to any channel you wish your devs to coordinate their merges. Just mention jeeves with the commands he knows, and he'll do the rest for you:

##### Options:
- Merge -> Requests Jeeves for a spot in the merging queue.
- Done -> Signals the end of your merge. However, it only works if you are the one in the merge queue at the moment
- Kick -> Kicks whoever is in the queue at the moment. Good for those pesky git and runners, but use it wisely!
- Status - Shows the status of the merge queue for the current channel
- Help -> Shows a friendly message!

#### How it works:
This app exposes a simple ExpressJS endpoint ('/jeeves') that takes an event POST from Slack.

Whenever Jeeves is mentioned, we can execute a function for each expected command.

With the usage of the Event API rather than the RealTime API, we should also avoid having the pesky 'Jeeves is Dead' problems.

#### How to Deploy

Any pull request merged into the master will be automatically deployed to the remote server.

#### How to execute (locally):

As always, first NPM install:

`npm install`

Provide in your root folder a file named **literally** `.env`
This file will contain the environment variables for this application. They should be the following (you can provide for your own slack app / firebase db):

- `PORT=`
- `SLACK_TOKEN=`
- `FIREBASE_PROJECT_ID=`
- `FIREBASE_CLIENT_EMAIL=`
- `FIREBASE_PRIVATE_KEY=`

Then run the jeeves.ts file:

`node src/jeeves.ts`

or
`npm start`

Have ngrok installed (https://ngrok.com/) and open your local port to the web:

`ngrok http 4521`

Take the forwarded URL and configure our event subscriptions at (https://api.slack.com/apps/AD5164XKP/event-subscriptions)

Example: https://071e360d.ngrok.io/jeeves

Save your changes and jeeves should be working.

####Donations

This has been a work of passion from the start. More than a simple slack butler or a funny joke, we have always considered the wellbeing and comfort of our fellow coworkers and coders out there. That is what drives us to spend time away from our families to deliver these products and solutions, flawed as they may be.

If you have in your heart, consider donating a couple of bucks for a good cup of coffee or for a nice beer. We'd really appreciate it!

[![](https://www.paypalobjects.com/en_US/BE/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=22GZLFDR7W832)
