const grid = document.getElementById("grid")
const gameStatus = document.getElementById("gameStatus")
const score = document.getElementById("score")

const map = []
const amountOfCoins = 5

const coordinatesInfo = {
  x: {
    start: 1,
    end: 10,
  },
  y: {
    start: 1,
    end: 5,
  },
}

const player = {
  coordinates: {
    x: getRandomCoordinate().x,
    y: getRandomCoordinate().y,
  },
  score: 0,
}

let previousPlayerCoordinates = {
  x: player.coordinates.x,
  y: player.coordinates.y,
}

let coins = 0

function generateLayout() {
  let elements = ""

  for (let y = coordinatesInfo.y.start; y <= coordinatesInfo.y.end; y++) {
    for (let x = coordinatesInfo.x.start; x <= coordinatesInfo.x.end; x++) {
      elements += ` <div class="cube" id="${x}-${y}"></div>`
    }
  }

  grid.innerHTML = elements
}

function generateMap() {
  for (let y = coordinatesInfo.y.start; y <= coordinatesInfo.y.end; y++) {
    for (let x = coordinatesInfo.x.start; x <= coordinatesInfo.x.end; x++) {
      map.push({
        element: document.getElementById(`${x}-${y}`),
        coordinates: {
          x: x,
          y: y,
        },
        coin: false,
      })
    }
  }
}

function getRandomCoordinate() {
  return {
    x: Math.floor(Math.random() * coordinatesInfo.x.end) + 1,
    y: Math.floor(Math.random() * coordinatesInfo.y.end) + 1,
  }
}

function generateCoins() {
  while (coins !== amountOfCoins) {
    let random = getRandomCoordinate()
    let foundPosition = map.findIndex(
      (element) =>
        element.coordinates.x === random.x &&
        element.coordinates.y === random.y,
    )

    if (map[foundPosition].coin === true) continue

    map[foundPosition].coin = true
    map[foundPosition].element.style.backgroundColor = "yellow"
    coins++
  }
}

function checkPosition() {
  for (const square of map) {
    if (
      player.coordinates.x === square.coordinates.x &&
      player.coordinates.y === square.coordinates.y
    ) {
      if (square.coin === true) {
        player.score++
        score.textContent = player.score
        square.coin = false
      }

      const foundMap = map.findIndex(
        (element) =>
          element.coordinates.x === previousPlayerCoordinates.x &&
          element.coordinates.y === previousPlayerCoordinates.y,
      )

      map[foundMap].element.style.backgroundColor = "black"
      square.element.style.backgroundColor = "red"
    }
  }
}

function move(e) {
  if (e.key === "ArrowUp") {
    if (player.coordinates.y === coordinatesInfo.y.start) return

    previousPlayerCoordinates = {
      x: player.coordinates.x,
      y: player.coordinates.y,
    }

    player.coordinates.y = player.coordinates.y - 1
  } else if (e.key === "ArrowDown") {
    if (player.coordinates.y === coordinatesInfo.y.end) return

    previousPlayerCoordinates = {
      x: player.coordinates.x,
      y: player.coordinates.y,
    }

    player.coordinates.y = player.coordinates.y + 1
  } else if (e.key === "ArrowLeft") {
    if (player.coordinates.x === coordinatesInfo.x.start) return

    previousPlayerCoordinates = {
      x: player.coordinates.x,
      y: player.coordinates.y,
    }

    player.coordinates.x = player.coordinates.x - 1
  } else if (e.key === "ArrowRight") {
    if (player.coordinates.x === coordinatesInfo.x.end) return

    previousPlayerCoordinates = {
      x: player.coordinates.x,
      y: player.coordinates.y,
    }

    player.coordinates.x = player.coordinates.x + 1
  }
}

function checkCompletion() {
  if (player.score === amountOfCoins) {
    score.textContent = ""
    gameStatus.textContent = "Game win"

    removeEventListener("keydown", handleKeydown)
  }
}

function handleKeydown(e) {
  move(e)
  checkPosition()
  checkCompletion()
}

function startGame() {
  generateLayout()
  generateMap()
  generateCoins()
  checkPosition()
}

addEventListener("keydown", handleKeydown)

startGame()
