const { RTMClient } = require("@slack/rtm-api")
const playsound = require("play-sound")
const genericPool = require("generic-pool")

const token = process.env.SLACK_BOT_TOKEN
const rtm = new RTMClient(token)

const player = playsound({
  players: ["afplay", "play"] 
})

const factory = {
  create: function() {
    return playsound({
      players: ["afplay", "play"] 
    })
  },
  destroy: function(player) {
    
  }
}
const pool = genericPool.createPool(factory, {
  max: 3,
  min: 1,
  maxWaitingClients: 5
});

rtm.on('message', async (event) => {
  if (event.type != "message") {
    return
  }
  if (event.text.includes(':mega:')) {
    const player = await pool.acquire()
    player.play('sounds/kingbeatz.wav')
    pool.release(player)
  }
});

(async () => {
  // Connect to Slack
  const { self, team } = await rtm.start()
  console.log("connected")
})()
