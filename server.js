const fs = require(`fs`);
const http = require(`http`);
const WebSocket = require(`ws`); // npm i ws

const board = [
  [
    "card back",
    "card rank-2 spades",
    "card rank-3 spades",
    "card rank-4 spades",
    "card rank-5 spades",
    "card rank-10 diams",
    "card rank-q diams",
    "card rank-k diams",
    "card rank-a diams",
    "card back",
  ],

  [
    "card rank-6 clubs",
    "card rank-5 clubs",
    "card rank-4 clubs",
    "card rank-3 clubs",
    "card rank-2 clubs",
    "card rank-4 spades",
    "card rank-5 spades",
    "card rank-6 spades",
    "card rank-7 spades",
    "card rank-a clubs",
  ],

  [
    "card rank-7 clubs",
    "card rank-a spades",
    "card rank-2 diams",
    "card rank-3 diams",
    "card rank-4 diams",
    "card rank-k clubs",
    "card rank-q clubs",
    "card rank-10 clubs",
    "card rank-8 spades",
    "card rank-k clubs",
  ],

  [
    "card rank-8 clubs",
    "card rank-k spades",
    "card rank-6 clubs",
    "card rank-5 clubs",
    "card rank-4 clubs",
    "card rank-9 hearts",
    "card rank-8 hearts",
    "card rank-9 clubs",
    "card rank-9 spades",
    "card rank-6 spades",
  ],

  [
    "card rank-9 clubs",
    "card rank-q spades",
    "card rank-7 clubs",
    "card rank-6 hearts",
    "card rank-5 hearts",
    "card rank-2 hearts",
    "card rank-7 hearts",
    "card rank-8 clubs",
    "card rank-10 spades",
    "card rank-10 clubs",
  ],

  [
    "card rank-a spades",
    "card rank-7 hearts",
    "card rank-9 diams",
    "card rank-a hearts",
    "card rank-4 hearts",
    "card rank-3 hearts",
    "card rank-k hearts",
    "card rank-10 diams",
    "card rank-6 hearts",
    "card rank-2 diams",
  ],

  [
    "card rank-k spades",
    "card rank-8 hearts",
    "card rank-8 diams",
    "card rank-2 clubs",
    "card rank-3 clubs",
    "card rank-10 hearts",
    "card rank-q hearts",
    "card rank-q diams",
    "card rank-5 hearts",
    "card rank-3 diams",
  ],

  [
    "card rank-q spades",
    "card rank-9 hearts",
    "card rank-7 diams",
    "card rank-6 diams",
    "card rank-5 diams",
    "card rank-a clubs",
    "card rank-a diams",
    "card rank-k diams",
    "card rank-4 hearts",
    "card rank-4 diams",
  ],

  [
    "card rank-10 spades",
    "card rank-10 hearts",
    "card rank-q hearts",
    "card rank-k hearts",
    "card rank-a hearts",
    "card rank-3 spades",
    "card rank-2 spades",
    "card rank-2 hearts",
    "card rank-3 hearts",
    "card rank-5 diams",
  ],

  [
    "card back",
    "card rank-9 spades",
    "card rank-8 spades",
    "card rank-7 spades",
    "card rank-6 spades",
    "card rank-9 diams",
    "card rank-8 diams",
    "card rank-7 diams",
    "card rank-6 diams",
    "card back",
  ],
];

const positionBoard = [
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
];

const deck = [
  "card rank-a spades",
  "card rank-2 spades",
  "card rank-3 spades",
  "card rank-4 spades",
  "card rank-5 spades",
  "card rank-6 spades",
  "card rank-7 spades",
  "card rank-8 spades",
  "card rank-9 spades",
  "card rank-10 spades",
  "card rank-j spades",
  "card rank-q spades",
  "card rank-k spades",
  "card rank-a clubs",
  "card rank-2 clubs",
  "card rank-3 clubs",
  "card rank-4 clubs",
  "card rank-5 clubs",
  "card rank-6 clubs",
  "card rank-7 clubs",
  "card rank-8 clubs",
  "card rank-9 clubs",
  "card rank-10 clubs",
  "card rank-j clubs",
  "card rank-q clubs",
  "card rank-k clubs",
  "card rank-a diams",
  "card rank-2 diams",
  "card rank-3 diams",
  "card rank-4 diams",
  "card rank-5 diams",
  "card rank-6 diams",
  "card rank-7 diams",
  "card rank-8 diams",
  "card rank-9 diams",
  "card rank-10 diams",
  "card rank-j diams",
  "card rank-q diams",
  "card rank-k diams",
  "card rank-a hearts",
  "card rank-2 hearts",
  "card rank-3 hearts",
  "card rank-4 hearts",
  "card rank-5 hearts",
  "card rank-6 hearts",
  "card rank-7 hearts",
  "card rank-8 hearts",
  "card rank-9 hearts",
  "card rank-10 hearts",
  "card rank-j hearts",
  "card rank-q hearts",
  "card rank-k hearts",
];

const acrossDeck = [
  "card rank-2 spades",
  "card rank-5 clubs",
  "card rank-a spades",
  "card rank-k spades",
  "card rank-q spades"
]

const downDeck = [
  "card rank-2 spades",
  "card rank-3 spades",
  "card rank-4 spades",
  "card rank-5 spades",
  "card rank-10 diams"
]

const rDiagDeck = [
  "card rank-2 spades",
  "card rank-4 clubs",
  "card rank-3 diams",
  "card rank-4 clubs",
  "card rank-2 hearts"
]

const lDiagDeck = [
  "card rank-9 diams",
  "card rank-2 spades",
  "card rank-k diams",
  "card rank-5 hearts",
  "card rank-2 diams"
]

const divideDeckIntoPieces = (deck) => {
  let shuffled = deck
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  const result = new Array(Math.ceil(shuffled.length / 6))
    .fill()
    .map((_) => shuffled.splice(0, 6));
  console.log(result);
  return result;
};

// code to read file
const readFile = (fileName) =>
  new Promise((resolve, reject) => {
    fs.readFile(fileName, `utf-8`, (readErr, fileContents) => {
      if (readErr) {
        reject(readErr);
      } else {
        resolve(fileContents);
      }
    });
  });

// code to create a server
const server = http.createServer(async (req, resp) => {
  console.log(`browser asked for ${req.url}`);
  if (req.url == `/mydoc`) {
    const clientHtml = await readFile(`client.html`);
    resp.end(clientHtml);
  } else if (req.url == `/myjs`) {
    const clientJs = await readFile(`client.js`);
    resp.end(clientJs);
  } else if (req.url == `/sequence.css`) {
    const sequenceCss = await readFile(`sequence.css`);
    resp.end(sequenceCss);
  } else {
    resp.end(`not found`);
  }
});

// to listen for clients
server.listen(8000);

// creating a web socket
const wss = new WebSocket.Server({ port: 8080 });

const shuffledDeck = divideDeckIntoPieces(deck);
shuffledDeck[0] = lDiagDeck;
let playerCount = 0;

wss.on("connection", (ws) => {
  playerCount++;
  console.log("user connected\n" + "players: " + playerCount)

  ws.on('message', (msg) => {
      console.log("received: " + msg)
      msg = JSON.parse(msg)

      if (msg.type == "position") {
        position = msg.position
        currentPosition = msg.board
        console.log(position[0] + " " + position[1])
        if (msg.team == "color green") {
          currentPosition[position[0]][position[1]] = 'g'
          positionBoard[position[0]][position[1]] = 'g'
        }
        else {
          currentPosition[position[0]][position[1]] = 'b'
          positionBoard[position[0]][position[1]] = 'b'
        }
        let player = msg.turn.split(" ")[1]
        player = parseInt(player)
        player = (player%4)+1

        checkWinCondition()

        wss.clients.forEach((client) => {
              if (client.readyState === WebSocket.OPEN) {
                  client.send(JSON.stringify({
                    type: "position", 
                    positionBoard: currentPosition,
                    turn: "player " + player // possible error causer
                }))
              }
          })
      }
      if (msg.type == "nocards?") {
        console.log("player has run out of cards")
        let num = msg.player.split(" ")[1]
        num = parseInt(num)
        console.log("player num: " + num)
        ws.send(JSON.stringify({
          type: "newcards", 
          cards: shuffledDeck[(num+4)-1]
        }))
      }
      if (msg.type == "draw") {
        let num = msg.player.split(" ")[1]
        num = parseInt(num)
        if (num === 4) {
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({
                type: "draw", 
                textBox: "The game has ended in a draw"
              }))
            }
          })
          
          ws.close() // possible error causer
        }
      }
      // wss.clients.forEach((client) => {
      //     if (client.readyState === WebSocket.OPEN) {
      //         client.send(msg.toString())
      //     }
      // }) 
  })
  if (playerCount == 4) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            type: "newboard", 
            board: board,
            positionBoard: positionBoard,
            turn: "player 1"
        }))
      }
    })
  }
  else {
    ws.send(JSON.stringify({
      type: "text", 
      textBox: "Waiting for more players to connect..."
    }))
  }
  ws.send(JSON.stringify({
    type: "connection", 
    name: "player " + playerCount,
    cards: shuffledDeck[playerCount-1]
  }))

  function checkWinCondition () {
    console.log("CHECKING WIN CONDITIONS")
    if (positionBoard[0].length != 0) {
      // console.log("position board: " + positionBoard)
      for (let i=0; i<positionBoard.length; i++) {
        for (let j=0; j<positionBoard[0].length; j++) {
          if (positionBoard[i][j] == "g") {
            if (checkAcross("g", [i,j]) || checkDown("g", [i,j]) || checkRightDiagonal("g", [i,j]) || checkLeftDiagonal("g", [i,j])) {
              console.log("WE HAVE A WINNER")
              wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({
                      type: "winner", 
                      positionBoard: positionBoard,
                      textBox: "Green team wins!!!"
                  }))
                }
              })
            }
            // console.log("across: " + checkAcross("g", [i,j]))
            // console.log("down: " + checkDown("g", [i,j]))
            // console.log("right diag: " + checkRightDiagonal("g", [i,j]))
            // console.log("left diag: " + checkLeftDiagonal("g", [i,j]))
          }
          else if (positionBoard[i][j] == "b") {
            if (checkAcross("b", [i,j]) || checkDown("b", [i,j]) || checkRightDiagonal("b", [i,j]) || checkLeftDiagonal("b", [i,j])) {
              console.log("WE HAVE A WINNER")
              wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({
                      type: "winner", 
                      positionBoard: positionBoard,
                      textBox: "Blue team wins!!!"
                  }))
                }
                ws.close()
              })
            }
            // console.log("across: " + checkAcross("b", [i,j]))
            // console.log("down: " + checkDown("b", [i,j]))
            // console.log("right diag: " + checkRightDiagonal("b", [i,j]))
            // console.log("left diag: " + checkLeftDiagonal("b", [i,j]))
          }
        }
      }
    }

  }

  function checkAcross (team, pos) {
    if (pos[0]+4 > 9) {
      return false
    }
    else {
      if (positionBoard[pos[0]+1][pos[1]] == team){
        if (positionBoard[pos[0]+2][pos[1]] == team){
          if (positionBoard[pos[0]+3][pos[1]] == team){
            if (positionBoard[pos[0]+4][pos[1]] == team){
              return true;
            }
          }
        }
      }
    }
    return false
  }

  function checkDown (team, pos) {
    if (pos[1]+4 > 9) {
      return false
    }
    else {
      if (positionBoard[pos[0]][pos[1]+1] == team){
        if (positionBoard[pos[0]][pos[1]+2] == team){
          if (positionBoard[pos[0]][pos[1]+3] == team){
            if (positionBoard[pos[0]][pos[1]+4] == team){
              return true;
            }
          }
        }
      }
    }
    return false
  }

  function checkRightDiagonal (team, pos) {
    if (pos[1]+4 > 9) {
      return false
    }
    else if (pos[0]+4 > 9) {
      return false
    }
    else {
      if (positionBoard[pos[0]+1][pos[1]+1] == team){
        if (positionBoard[pos[0]+2][pos[1]+2] == team){
          if (positionBoard[pos[0]+3][pos[1]+3] == team){
            if (positionBoard[pos[0]+4][pos[1]+4] == team){
              return true;
            }
          }
        }
      }
    }
    return false
  }

  function checkLeftDiagonal (team, pos) {
    if (pos[0]-4 < 0) {
      return false
    }
    else if (pos[1]+4 > 9) {
      return false
    }
    else {
      if (positionBoard[pos[0]-1][pos[1]+1] == team){
        if (positionBoard[pos[0]-2][pos[1]+2] == team){
          if (positionBoard[pos[0]-3][pos[1]+3] == team){
            if (positionBoard[pos[0]-4][pos[1]+4] == team){
              return true;
            }
          }
        }
      }
    }
    return false
  }

})