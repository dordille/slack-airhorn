const { RTMClient } = require("@slack/rtm-api")
const playsound = require("play-sound")
const genericPool = require("generic-pool")

const token = process.env.SLACK_BOT_TOKEN
const rtm = new RTMClient(token)

const AIR_HORN = "sounds/kingbeatz.wav"
const WEE_WOO = "sounds/weewoo.wav"
const NERD = "sounds/nerd.wav"
const BREAK_CHAIN = "sounds/breakthechain.wav"

const sounds = {
  "mega": AIR_HORN,
  "rotating_light": WEE_WOO,
  "nerd_face": NERD
  "chains": BREAK_CHAIN
}

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
  if (sounds[match[1]]) {
    await playSound(sounds[event.reaction])
  }
})

rtm.on('message', async (event) => {
  const regexp = /\:(\w*)\:/g;
  while ((match = regexp.exec(event.text)) !== null) {
    if (sounds[match[1]]) {
      await playSound(sounds[match[1]])
    }
  }
});

(async () => {
  // Connect to Slack
  const { self, team } = await rtm.start()
  console.log("connected")
})()
