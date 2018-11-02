import React from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import friends from "./friends.json";
import "./App.css";


class App extends React.Component {


  state = {
    friends,
    score: 0,
    topScore: 0,
    clicked: false
  };


  checkClicked = id => {
    const clickedCard = this.state.friends.filter(friend => friend.id == id)[0];
    const cardsCopy = this.state.friends.slice().sort(function(a, b){return 0.5 - Math.random()});

    if (!clickedCard.clicked) {
      clickedCard.clicked = true;

      cardsCopy[cardsCopy.findIndex((friend) => friend.id === id)] = clickedCard;

      this.setState({
        friends: cardsCopy,
        score: this.state.score + 1,
        topScore: (this.state.topScore + 1 > this.state.topScore ? this.state.score + 1 : this.state.topScore),
      });
    }

    else {
      const resetCards = cardsCopy.map((friend) => {
        return {
          id: friend.id,
          image: friend.image,
          clicked: false
        }
      });
      this.setState({
        friend: resetCards,
        score: 0
      });
    }
  }


  render() {
    return(
      <Wrapper>
      <h1 className="score"> Current Score:{this.state.score} </h1>
      <h2 className="bestScore">Personal Best: {this.state.topScore}</h2>


        <h1 className="title">Memory Game</h1>
      {this.state.friends.map((item, i) => (
        <FriendCard
        removeFriend={this.checkClicked}
        key={item.id}
        id={item.id}
        image={item.image}
        />
      ))}
      </Wrapper>

    );
  }
}

export default App;
