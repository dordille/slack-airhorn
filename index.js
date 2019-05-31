const { RTMClient } = require("@slack/rtm-api")
const playsound = require("play-sound")
const genericPool = require("generic-pool")

const token = process.env.SLACK_BOT_TOKEN
const rtm = new RTMClient(token)

const AIR_HORN = "sounds/kingbeatz.wav"

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

async function playSound(sound) {
  const player = await pool.acquire()
  player.play(sound)
  pool.release(player)
}

rtm.on('reaction_added', async (event) => {
  if (event.reaction === "mega") {
    await playSound(AIR_HORN)
  }
})

rtm.on('message', async (event) => {
  if (event.text.includes(':mega:')) {
    await playSound(AIR_HORN)
  }
});

(async () => {
  // Connect to Slack
  const { self, team } = await rtm.start()
  console.log("connected")
})()
