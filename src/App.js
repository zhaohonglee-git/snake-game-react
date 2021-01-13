import Snake from './components/Snake'
import React, { Component } from 'react'
import Food from './components/Food'

// 创建一个生成一个随机坐标的函数
const getRandom = () => {
  let min = 1
  let max = 98
  // 得到0-98的随机偶数
  let x = Math.floor((Math.random() * max + min) / 2) * 2
  let y = Math.floor((Math.random() * max + min) / 2) * 2
  return [x, y]
}

const initialState = {
  snakeDots: [
    [20, 20],
    [20, 22]
  ],
  food: getRandom(),
  direction: 'RIGHT',
  speed: 300,
}

class App extends Component {
  state = initialState

  // 1.键盘事件
  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onkeydown
  }

  componentDidUpdate() {
    this.checkIfOutBorders()
    this.checkIfEat()
  }

  // 2.键盘函数,获取用户的按键
  onkeydown = (e) => {
    switch (e.keyCode) {
      case 38:
        this.setState({ direction: 'UP' })
        break;

      case 40:
        this.setState({ direction: 'DOWN' })
        break

      case 37:
        this.setState({ direction: 'LEFT' })
        break

      case 39:
        this.setState({ direction: 'RIGHT' })
        break

      default:
        this.setState({ direction: 'RIGHT' })
    }
  }

  // 3.移动贪吃蛇函数
  moveSnake = () => {
    let dots = [...this.state.snakeDots]
    let head = dots[dots.length - 1]


    switch (this.state.direction) {
      case 'RIGHT':
        head = [head[0] + 2, head[1]]
        console.log(head)
        break;

      case 'LEFT':
        head = [head[0] - 2, head[1]]
        console.log(head)
        break;

      case 'DOWN':
        head = [head[0], (head[1] + 2)]
        console.log(head)
        break

      case 'UP':
        head = [head[0], (head[1] - 2)]
        console.log(head)
        break

      default:
        break;
    }

    dots.push(head)
    dots.shift()
    this.setState({
      snakeDots: dots
    })
  }

  // 4.限制活动范围
  checkIfOutBorders() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1]
    if (head[0] >= 100 || head[0] < 0 || head[1] < 0 || head[1] >= 100) {
      this.onGameOver()
    }
  }

  // 6.验证head是否撞击到自身
  checkIfCollapsed() {
    let snake = [...this.state.snakeDots]
    let head = snake[snake.length - 1]
    snake.pop()
    snake.forEach(dot => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.onGameOver()
      }
    })
  }

  // 5.游戏结束函数
  onGameOver = () => {
    alert(`游戏结束！你的得分为：${this.state.snakeDots.length}`)
    this.setState(initialState)
  }

  // 7.验证是否吃到food方块
  checkIfEat() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1]
    let food = this.state.food
    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState({
        food: getRandom()
      })
      this.enlargeSnake()
      this.increaseSpeed()
    }
  }

  // 8.填充贪吃蛇
  enlargeSnake = () => {
    let newSnake = [...this.state.snakeDots]
    newSnake.unshift([])
    this.setState({ snakeDots: newSnake })
  }

  // 9.加速运动
  increaseSpeed = () => {
    if (this.state.speed > 20) {
      this.setState({ speed: this.state.speed - 20 })
    }
  }

  render() {
    return (
      <div className="game-canvas">
        <Snake snakeDots={this.state.snakeDots} />
        <Food food={this.state.food} />
      </div>
    )
  }
}

export default App;
