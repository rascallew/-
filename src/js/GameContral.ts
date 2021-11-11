import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";
// 游戏控制器，控制其他的所有类
class GameControl {
  // 定义三个属性
  // 蛇
  snake: Snake
  // 食物
  food: Food
  // 记分牌
  scorepanel: ScorePanel

  // 创建一个属性来存储蛇的移动方向（也就是按键的方向）
  direction: string = ''
  //创建一个属性来记录游戏是否结束、
  isLive = true
  startEle: HTMLElement
  restartEle: HTMLElement
  constructor() {
    this.snake = new Snake()
    this.food = new Food()
    this.scorepanel = new ScorePanel()
    this.startEle = document.getElementById('start')!;
    this.restartEle = document.getElementById('restart')!;

    this.init()
  }
  // 游戏的初始化方法，调用后游戏即开始
  init() {
    // 绑定键盘的按键按下事件
    document.addEventListener('keydown', this.keydownHandle.bind(this))
    // 调用run方法，让蛇移动
    this.run()
    // 开始
    this.startEle.addEventListener('click',() => {
      this.direction= 'ArrowRight'
    })
    // 重置
    this.restartEle.addEventListener('click',()=>{
      window.location.reload()
    })
  }
  // 创建一个键盘按下的响应函数
  keydownHandle(event: KeyboardEvent) {
    // console.log(event.key);
    // 修改direction的值
    // 需要检查event.key的值是否合法
    this.direction = event.key
    
  }
  // 创建一个控制蛇移动的方法
  run() {
    // 获取蛇现在的坐标
    let X = this.snake.X
    let Y = this.snake.Y
    // 根据按键的方向修改
    switch(this.direction) {
      case "ArrowUp":
      case "Up":
        Y -= 10
        break;
      case "ArrowDown":
      case "Down":
        Y += 10
        break;
      case "ArrowLeft":
      case "Left":
        X -= 10
        break;
      case "ArrowRight":
      case "Right":
        X += 10
        break;
    }
    // 检查蛇是否吃到了食物
    this.checkEat(X,Y)

    // 修改蛇的X和Y的值
    try {
      this.snake.X = X
      this.snake.Y = Y
    } catch (error) {
      alert("你的🐍挂了~ GAME OVER~ ---温馨提示如果觉得太小可以放大浏览器哦")
      this.isLive = false
    }
  
    // 开启一个定时调用
    this.isLive && setTimeout(this.run.bind(this),300 - (this.scorepanel.level -1)*30)
  }

  // 定义一个方法，用来检查蛇是否吃到食物
  checkEat(X: number, Y: number) {
    if(X === this.food.X && Y === this.food.Y){
      console.log("eat~~~~~~~~~");
      //食物的位置要进行重置
      this.food.change()
      // 分数增加
      this.scorepanel.addScore()
      // 蛇要增加一节
      this.snake.addBody()
    }
  }
}
export default GameControl