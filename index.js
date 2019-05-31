const { RTMClient } = require('@slack/rtm-api')
const playsound = require('play-sound')

const token = process.env.SLACK_BOT_TOKEN
const rtm = new RTMClient(token)

const player = playsound({
  players: ["afplay", "play"] 
})

rtm.on('message', (event) => {
  if (event.type != "message") {
    return
  }
  if (event.text.includes(':mega:')) {
    player.play('sounds/kingbeatz.wav')
  }
});

(async () => {
  // Connect to Slack
  const { self, team } = await rtm.start()
  console.log("connected")
})()
