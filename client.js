const ws = new WebSocket(`ws://localhost:8080`);

const Sequence = () => {
  const [board, setBoard] = React.useState([[]]);
  const [positionBoard, setPositionBoard] = React.useState([[]]);
  const [cards, setCards] = React.useState([]);
  const [textBox, setTextBox] = React.useState('');
  const [playerName, setPlayerName] = React.useState('');
  const [team, setTeam] = React.useState('');
  const [turn, setTurn] = React.useState('');
  const [endGame, setEndGame] = React.useState(false);

  let diamondSign = "♦";
  let heartSign = "♥";
  let spadesSign = "♠";
  let clubsSign = "♣";

  function checkSuit (suit) {
        if (suit == "diams") {
          return diamondSign
        }
        if (suit == "clubs") {
          return clubsSign
        }
        if (suit == "hearts") {
          return heartSign
        }
        if (suit == "spades") {
          return spadesSign
        }
        return ""
  }

  ws.onmessage = (event) => {
    const clientMsg = JSON.parse(event.data)
    if (clientMsg.type == 'newboard') {
      console.log(clientMsg)
      setBoard(clientMsg.board)
      setPositionBoard(clientMsg.positionBoard)
      setTurn(clientMsg.turn)
      setTextBox(clientMsg.turn + "'s turn")
    }
    if (clientMsg.type == 'position') {
      console.log(clientMsg)
      setPositionBoard(clientMsg.positionBoard)
      setTurn(clientMsg.turn)
      // setTextBox(clientMsg.turn + "'s turn")
    }
    if (clientMsg.type == 'text') {
      console.log(clientMsg)
      setTextBox(clientMsg.textBox)
    }
    if (clientMsg.type == 'connection') {
      console.log(clientMsg)
      setPlayerName(clientMsg.name)
      setTextBox("Welcome " + clientMsg.name)
      setCards(clientMsg.cards)
      if (clientMsg.name == "player 1" || clientMsg.name == "player 3") {
        setTeam("color green")
      }
      else {
        setTeam("color blue")
      }
    }
    if (clientMsg.type == 'winner') {
      console.log(clientMsg)
      setPositionBoard(clientMsg.positionBoard)
      setTextBox(clientMsg.textBox)
      ws.close()
    }
    if (clientMsg.type == 'newcards') {
      console.log(clientMsg)
      setCards(clientMsg.cards)
    }
    if (clientMsg.type == 'draw') {
      console.log(clientMsg)
      setTextBox(clientMsg.textBox)
      ws.close()
    }
  }

  // class Card extends React.Component {
  //   render () {
  //       <li>
  //         <div className={cardname}>
  //           <span class="rank">{cardrank}</span><span class="suit">{this.CheckSuit(cardsuit)}</span>
  //         </div>
  //       </li>
  //   }
  // }

  return (
    <div>
      <div className="container">
        {
          board.map((column, y) => {
            return (
                <div className="playingCards fourColours rotateHand">
                <ul className="table">
                    {
                      column.map((card, x) => {
                        const position = [y,x]
                        const suit = card.split(" ")[2];
                        const rank = card.split(" ")[1];

                        function checkMove() {
                          const newCards = cards
                          if (turn == playerName) {
                            console.log("Checking for card")
                            for (let i=0; i<cards.length; i++) {
                              if (cards[i] == card) {
                                newCards.splice(i,1)
                                ws.send(JSON.stringify({
                                  type: "position", 
                                  position: position,
                                  board: positionBoard,
                                  team: team,
                                  turn: turn
                                }))
                                setCards(newCards)
                                setTextBox("")
                                if (cards.length == 0) {
                                  if (endGame == false) {
                                    setEndGame(true);
                                    ws.send(JSON.stringify({
                                      type: "nocards?", 
                                      player: playerName
                                    }))
                                  }
                                  else {
                                    ws.send(JSON.stringify({
                                      type: "draw", 
                                      player: playerName
                                    }))
                                  }
                                }
                                return;
                              }
                            }
                            console.log("Checking for jack")
                            for (let j=0; j<cards.length; j++) {
                              if (cards[j].split(" ")[1] == "rank-j") {
                                newCards.splice(j,1)
                                ws.send(JSON.stringify({
                                  type: "position", 
                                  position: position,
                                  board: positionBoard,
                                  team: team,
                                  turn: turn
                                }))
                                setCards(newCards)
                                setTextBox("")
                                if (cards.length == 0) {
                                  if (endGame == false) {
                                    setEndGame(true);
                                    ws.send(JSON.stringify({
                                      type: "nocards?", 
                                      player: playerName
                                    }))
                                  }
                                  else {
                                    ws.send(JSON.stringify({
                                      type: "draw", 
                                      player: playerName
                                    }))
                                  }
                                }
                                return;
                              }
                            }
                            console.log("not found: " + card)
                            setTextBox("Invalid Move!")
                          }
                          else {
                            console.log("not your turn")
                            setTextBox("Currently " + turn + "'s turn!!")
                          }
                          return
                        }

                        if(positionBoard[0].length != 0){
                          if (positionBoard[y][x] == "g") {
                            return (
                              <div>
                              <li>
                                <div className="card"><div className="green"></div></div>
                              </li>
                              </div>
                            )
                          }
                          else if (positionBoard[y][x] == "b") {
                            return (
                              <div>
                              <li>
                              <div className="card"><div className="blue"></div></div>
                              </li>
                              </div>
                              )
                          }
                          else {
                          return ( 
                            <div>
                              <li>
                                <div className={card} onClick={checkMove}>
                                  <span className="rank">{rank.split("-")[1]}</span><span className="suit">{checkSuit(suit)}</span>
                                </div>
                              </li>
                            </div>
                              // <Card cardname={card} cardrank={rank.split("-")[1]} cardsuit={suit} />
                            )
                          }
                        }
                      })
                    }
                  </ul>
                </div>
            )
          })
        }
      </div>
      <div className="container">
        <div>
          <h1>Your Cards:</h1>
        </div>
        {/* code for client cards comes here */}
        <div className="playingCards fourColours rotateHand">
          <ul className="table">
            {
              cards.map((card) => {
                const suit = card.split(" ")[2];
                const rank = card.split(" ")[1];
                return ( 
                  <li>
                    <a className={card}>
                      <span className="rank">{rank.split("-")[1]}</span><span className="suit">{checkSuit(suit)}</span>
                    </a>
                  </li>
                  // <Card cardname={card} cardrank={rank.split("-")[1]} cardsuit={suit} />
                )
              })
            }
          </ul>
        </div>
        {/* code for text box comes here */}
        <div className="text_box"> {textBox}</div>
        {/* code for circle representing the players team color comes here */}
        
        <div className={team}></div>
      </div>
    </div>
  );
};

ReactDOM.render(<Sequence />, document.querySelector(`#root`));
