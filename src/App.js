import React, { Component } from 'react';
import Buttons from './components/Buttons';
class App extends Component {
  constructor() {
    super();
    this.isGridEmpty=false;
    this.then=Date.now();
    this.now="";
    this.delta="";
    this.rows = 30;
    this.cols = 50;
    this.speed=100;
    this.state = {
      generation: 0,
      gridArr: Array(this.rows).fill(Array(this.cols).fill(false)),
      animation:''
    };
  }
  clear=()=>{
    this.isGridEmpty=true;
    let gridArr = Array(this.rows).fill(Array(this.cols).fill(false));
    this.setState({gridArr:gridArr,generation:0});
  }
  selectBox=(row,col)=>{
    let copy=[...this.state.gridArr];
    copy[row][col]=!copy[row][col];
    if(!this.isGridEmpty) this.setState({gridArr:copy});
  }
  selectSpeed=speed=>{
    if(speed==="slow"){
      this.speed=1000;
    }else this.speed=100;
  }
  gridSize=(cols,rows)=>{
    this.isGridEmpty=true;
    this.cols=cols;
    this.rows=rows;
    this.clear();
  }
  seed = () => {
    this.isGridEmpty=false;
    let gridArr = [...this.state.gridArr].map(rows =>
      rows.map(box => {
        if (Math.floor(Math.random() * 4) === 1) {
          return true;
        } else {
          return false;
        }
      })
    );
    this.setState({ gridArr: gridArr });
  };
  pause=()=>{
    this.setState({animation:cancelAnimationFrame(this.state.animation)})
  }
  startButton = () => {
    this.setState({animation:requestAnimationFrame(this.startButton)});
    this.now = Date.now();
    this.delta = this.now - this.then;
    
    if (this.delta > this.speed) {
      

      this.then = this.now - this.delta % this.speed;

      this.start();
    }
  }
  start=()=>{
    let g = this.state.gridArr;
    let g2 = [...this.state.gridArr];

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let count = 0;
        if (i > 0) if (g[i - 1][j]) count++;
        if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
        if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
        if (j < this.cols - 1) if (g[i][j + 1]) count++;
        if (j > 0) if (g[i][j - 1]) count++;
        if (i < this.rows - 1) if (g[i + 1][j]) count++;
        if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
        if (i < this.rows - 1 && j < this.cols - 1) if (g[i + 1][j + 1]) count++;
        if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
        if (!g[i][j] && count === 3) g2[i][j] = true;
      }
    }
    this.setState({ gridArr: g2, generation: this.state.generation + 1 });
  }
  UNSAFE_componentWillMount(){
    this.seed();
  }
  componentDidMount() {
    this.startButton();
  }
  render() {
    return (
      <div className="App">
        <h1>The Game of Life</h1>
        <Buttons seed={this.seed} start={this.startButton.bind(this)} pause={this.pause} clear={this.clear.bind(this)} selectSpeed={this.selectSpeed.bind(this)} gridSize={this.gridSize.bind(this)}/>
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${this.cols},${
              this.cols === 50 ? "16px" : "10px"
            })`,
            gridTemplateRows: `repeat(${this.rows},${
              this.rows === 30 ? "16px" : "10px"
            })`,
            width: `${
              this.cols === 50 ? this.cols * 16 + 30 : this.cols * 10 + 30
            }px`
          }}
        >
          {this.state.gridArr.map((row,i) =>
            row.map((cols, j) => (
              <div className={cols ? "box on" : "box off"} key={j} onClick={()=>this.selectBox(i,j)} />
            ))
          )}
        </div>
        <h2>Generation {this.state.generation}</h2>
      </div>
    );
  }
}

export default App;
