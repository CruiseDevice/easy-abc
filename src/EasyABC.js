import React, { Component } from 'react';
import alphabets from './alphabets.json';
import classNames from 'classnames';

class EasyABC extends Component {
  constructor(props){
    super(props);
    this.state= {
      alphabets:alphabets,
      currentPosition:0,
      currentTick:0,
      random:false,
      sound:true
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.playSound = this.playSound.bind(this);
    this.switchRandom = this.switchRandom.bind(this);
    this.switchSound = this.switchSound.bind(this);
    this.manualPlaySound = this.manualPlaySound.bind(this);
  }

  manualPlaySound(){
    let letterSound = document.querySelector(`audio[data-key="letter"]`);
    let wordSound = document.querySelector(`audio[data-key="word"]`);

      console.log('play sound');
      if(this.state.currentTick === 0){
        letterSound.currentTime = 0;
        letterSound.play();
      }else{
        wordSound.currentTime = 0;
        wordSound.play();
      }
  }

  switchRandom(){
    if(this.state.random == false){
      this.setState({
        random:true
      });
    }else{
      this.setState({
        random:false
      });
    }
    this.next();
  }

  switchSound(){
    if(this.state.sound == true){
      this.setState({
        sound:false
      });
    }else{
      this.setState({
        sound:true
      });
    }

  }

  componentDidMount(){
    let letterSound = document.querySelector(`audio[data-key="letter"]`);
  }

  componentDidUpdate(){
    this.playSound();
  }

  playSound(){
    let letterSound = document.querySelector(`audio[data-key="letter"]`);
    let wordSound = document.querySelector(`audio[data-key="word"]`);

    if(this.state.sound){
      console.log('play sound');
      if(this.state.currentTick === 0){
        letterSound.currentTime = 0;
        letterSound.play();
      }else{
        wordSound.currentTime = 0;
        wordSound.play();
      }
    }
  }

  randomNumber(min,max){
    return Math.floor(Math.random() * (max - min) + min);
  }
  next(){
    if(this.state.random){
      if(this.state.currentTick < 2){
        this.setState({
          currentTick:this.state.currentTick + 1
        });
      }else{
        this.setState({
          currentPosition:this.randomNumber(0,25),
          currentTick:0
        })
      }
    }else{
      console.log('next button clicked');
      console.log(this.state.currentPosition,this.state.currentTick);
      if(this.state.currentPosition === this.state.alphabets.length-1){
        this.setState({
          currentPosition:0,
          currentTick:0
        });
      }else{
        if(this.state.currentTick < 2){
          this.setState({
            currentTick: this.state.currentTick + 1
          });
        }else{
          this.setState({
            currentPosition:this.state.currentPosition + 1,
            currentTick:0
          });
        }
      }

    }
    // this.playSound();
  }
  previous(){
    console.log('previous button clicked');
    if(this.state.currentPosition >0){
      this.setState({
        currentPosition:this.state.currentPosition - 1
      });
    }else{
      this.setState({
        currentPosition:this.state.alphabets.length-1
      })
    }
  }
  render() {
    let showImage = this.state.currentTick !== 0 ? true : false;
    let showWord = this.state.currentTick === 2 ? true : false;

    console.log(this.state.currentTick,showImage);
    console.log(alphabets);

    return (
      <div className = "game">
        <span className="random-label">Random Letters: </span>
        <label className = "switch">
          <input type = "checkbox" onClick = {this.switchRandom} defaultValue="false" checked={this.state.random}/>
          <div className = "slider round"></div>
        </label>
        <span className="random-label">Sound: </span>
        <label className = "switch">
          <input type = "checkbox" onClick = {this.switchSound} defaultValue="false" checked={this.state.sound}/>
          <div className = "slider round"></div>
        </label>

        <div className ="option">
          <div className = "fields">
            <div className = "field-block">
              {this.state.alphabets[this.state.currentPosition].letter}
            </div>
            <audio src = {this.state.alphabets[this.state.currentPosition].letterSound}
              data-key = "letter"/>

          </div>
          <div className = "buttons">
            <a onClick = {this.previous} className = "button prev">Previous</a>

            <a onClick = {this.manualPlaySound} className = "button sound">Play sound again</a>

            <a onClick = {this.next} className = "button next">Next</a>
          </div>
          <div className = "fields">
            <div className = "field-block">
              <div className ="left-field">
                  <div className = {classNames('placeholder-span',{hide:showImage})}>
                    Click next to view Image
                  </div>
                    <img alt="{this.state.alphabets[this.state.currentPosition].word}" className= {classNames('letter-image',{hide:!showImage})} src = {this.state.alphabets[this.state.currentPosition].image}/>
                      <audio src = {this.state.alphabets[this.state.currentPosition].wordSound}
                        data-key = "word"/>
              </div>
              <div className = "right-field">
                <div className = {classNames('placeholder-span',{hide:showWord})}>
                  Click Next to view Spelling
                </div>
                  <div className = {classNames('word',{hide:!showWord})}>
                    {this.state.alphabets[this.state.currentPosition].word.toUpperCase()}
                  </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
export default EasyABC;
