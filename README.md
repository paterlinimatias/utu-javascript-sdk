# utu

SDK - uTu SDK written in javascript

Our SDK is used to capture analytics from your Bot and inject brand engagement
& advertising into your Bot experience.  As the Bot publisher you have complete
control.

[![npm version](https://badge.fury.io/js/utu.svg)](https://badge.fury.io/js/utu) [![NPM Status](http://img.shields.io/npm/dm/utu.svg?style=flat-square)](https://www.npmjs.org/package/utu)

## Installation

```sh
$ npm install --save utu
```

### Platform Flagging

Every platform has its own unique peculiarities. As a starting point, therefore,
we give you an option to flag the platform via an uTu.constant.

Constants are used so you know you have the correct value needed for uTu to process the request. We mainly use this for the platforms we support, which are as follows:

- MESSENGER
- KIK
- ALEXA
- SLACK
- ...

you can access the constants via an import

```javascript
import { constants } from 'utu';

// within constants you will have access to the following:
// constants.MESSENGER
// constants.KIK
// constants.ALEXA
// constants.SLACK
```

### Tracking Functions

From an analytics perspective, uTu gives you the ability to track your user Bot
interactions on three key dimensions: User - track properties and a longitudinal
view over time and platforms; Messages - faithfully recreate a history of a users
conversant experience; and Events - track any custom event you can dream up (e.g.,
requested Horoscope, viewed product, purchased, etc.) along with an unlimited
list of associated properties.

#### User

Use the user function to track users in your system. You can call the same function to create or update a user.  We designate a unique user as a combination of Platform and PlatformID. You can supply and custom key / value identified you'd like for an audience record.

Given other data points like email, firstName + phone, etc. we will also help you
maintain a consistent view of your users via our matching and deduping processes.

```javascript
 import { uTu, constants } from 'utu';
 const utu = new uTu('YOUR_UTU_API_KEY')

 utu.user({
   platform: constants.SLACK, // required
   platformId: 'abc123', // required
   values: {
     firstName: "John", // example matching key
     lastName: "Doe", // example matching key
     email: "john@doe.com", // example matching key
     signedUpOn: new Date(), // example custom key
   }
 }).catch((err) => console.log(err))
```

##### Matching keys

These are keys that we can use to try and link your users across platforms, channels, teams, and agents.

Key       | Example
:-------- | :-------------------
email     | john.doe@example.com
firstName | john
lastName  | doe
phone     | 123.123.12345

#### Message

The Message function tracks messages that come to and from your agent. If you are able to provide a sessionID, which many platforms and NFL services do so, we will organize your message stream into useful dialogs.  

```javascript
  import { uTu, constants } from 'utu';
  const utu = new uTu('YOUR_UTU_API_KEY')

  utu.message({
    platform: constants.SLACK, // required
    platformId: 'abc123', // required
    sessionId: "abc", // required
    values: {
      message: 'hello',
      rawMessage: {
        text: 'hello',
        attachments: [],
      }, // required
      botMessage: true, // required (true if the message is coming from your bot)
    }
  }).catch((err) => console.log(err))
```

#### Event

Events are a powerful way to create outsized value in tracking user experiences
and outcomes across your Bot.  It can be anything.  You can also add any custom
properties you'd like to the 'values' object.

```javascript
  import { uTu, constants } from 'utu';
  const utu = new uTu('YOUR_UTU_API_KEY')

  utu.event('your custom event name', {
    platform: constants.SLACK, // required
    platformId: 'abc123', // required
    values: { // you can log key value paired data here
      myCustomValue: 'hello world',
    }
  }).catch((err) => console.log(err))

 utu.event("Asked for Horoscope", {
   platform: constants.MESSENGER,
   platformId: "abc123",
   values: {
     "horoscope": "Leo"
     "time": new Date(),
   },
 }).catch((err) => console.log(err))
```

### Sugar

There are a few different ways to use our uTu SDK. Below are some extra functions that make it easier to instrument your Bot.

The main aim of these is to reduce repetitive field entries.

#### Configs

You can set default configs on the client so you don't need to replicate the same lines over and over again. Just remember they will be sent with every request

```javascript
import { uTu, constants } from 'utu';
const utu = new uTu('YOUR_UTU_API_KEY', {
  platform: constants.ALEXA,
  appId: 'my alexa skill id', // this can also be slack team, etc.
})
```

There is also a function to do this, incase you need to set the config after initialization.

```javascript
import { uTu, constants } from 'utu';
const utu = new uTu('YOUR_UTU_API_KEY');

utu.setConfig({
  platform: constants.ALEXA,
  appId: 'my alexa skill id', // this can also be slack team, etc.
});
```

#### Context

So sometimes you want to log multiple items within a given sequence of events, but you do not want to keep typing the same thing over and over again. So we have added context. Which returns a new instance of the client bound with new request values.

```javascript
import { uTu, constants } from 'utu';

const utu = new uTu('YOUR_UTU_API_KEY', {
  platform: constants.ALEXA
});

const utux = utu.withContext({
  platformId: 'abc123',
  sessionId: 'abc123',
});

// now each request i make from `utux` will have `platform` bound from the config, `platformId` bound from utux, and `sessionId` bound from utux
utux.user({
  values: {
    firstName: "John"
  }
});

utux.event('User Joined', {
  values: {
    joined: new Date(),
  }
});
```

#### Set values

Setting values are again extra sugar to make your life easy, but if used wrong can cause invalid data to be sent. Setting Values through these functions can only be done if you are using context.

```javascript
import { uTu, constants } from 'utu';
const utu = new uTu('YOUR_UTU_API_KEY', {
  platform: constants.ALEXA
});

const utux = utu.withContext({
  platformId: 'abc123',
  sessionId: 'abc123',
});

utux.setValues({
  sign: 'leo'
});

// we not longer need an object passed on any events/user/messages because we have
// already setup the whole request via context and setting values to that context
utux.event('Got Horoscope');
utux.event('Sent Horoscope');

// set a new single value, just remember this is persisted through each ctx request
utux.setValue('recievedAt', new Date());

utux.event('Door Opened');
```

#### Promises!

Everything is promise based so have fun! use your async await or catch your way through any errors you have.

```javascript
// promise example
utux.event('Got Horoscope').then().catch()

//async await example
async function () {
  const result = await utux.event('Got Horoscope');
}
```
