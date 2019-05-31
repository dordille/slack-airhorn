const { RTMClient } = require('@slack/rtm-api')
const player = require('play-sound')(opts = {})

const token = process.env.SLACK_BOT_TOKEN
const rtm = new RTMClient(token)


rtm.on('message', (event) => {
  if (event.type != "message") {
    return
  }
  if (event.text.includes(':mega:')) {
    player.play('sounds/kingbeatz.mp3')
  }
});

(async () => {
  // Connect to Slack
  const { self, team } = await rtm.start()
  console.log("connected")
})()