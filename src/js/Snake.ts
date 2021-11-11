class Snake {
  // 表示蛇头的元素
  head: HTMLElement
  // 蛇的身体
  bodies: HTMLCollection
  // 获取蛇的容器
  element: HTMLElement
  constructor() {
    this.element = document.getElementById('snake')!;
    this.head = document.querySelector('#snake > div')!;
    this.bodies = this.element.getElementsByTagName('div');
  }
  // 获取蛇头的坐标
  get X() {
    return this.head.offsetLeft
  }
  //  获取蛇的Y轴坐标
  get Y() {
    return this.head.offsetTop
  }
  // 设置坐标
  set X(value) {
    // 如果新的值和旧的值相同，则直接返回不再修改
    if(this.X === value) {
      return;
    }
    // X的合法范围时0-290之间
    if(value < 0 || value > 290) {
      // 进入判断说明蛇撞墙了
      throw new Error("蛇撞墙了~")
    }

    // 修改X时，是在修改水平的坐标，蛇在左右移动，蛇在向左移动时，不能向右掉头，反之亦然。
    if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
      // console.log("水平方向发生了掉头~");
      // 如果发生了掉头，让蛇向反方向继续移动
      if(value > this.X) {
        // 如果新值value大于了旧值X,说明了蛇在向右走，此时发生掉头，应该使蛇继续向左走
        value = this.X - 10
      }else {
        // 向左走
        value = this.X + 10
      }
    }

    // 移动身体
    this.moveBody()
    this.head.style.left = value + 'px'
    // 检查有没有撞到自己
    this.checkHeadBody()
  }
  set Y(value) {
    // 如果新的值和旧的值相同，则直接返回不再修改
    if(this.Y === value) {
      return;
    }
     // Y的合法范围时0-290之间
     if(value < 0 || value > 290) {
      // 进入判断说明蛇撞墙了
      throw new Error("蛇撞墙了~")
    }

    // 修改Y时，是在修改垂直的坐标，蛇在上下移动，蛇在向上移动时，不能向下掉头，反之亦然。
    if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop=== value) {
      // console.log("水平方向发生了掉头~");
      // 如果发生了掉头，让蛇向反方向继续移动
      if(value > this.Y) {
        value = this.Y - 10
      }else {
        value = this.Y + 10
      }
    }
     // 移动身体
     this.moveBody()
    this.head.style.top = value + 'px'
    // 检查有没有撞到自己
    this.checkHeadBody()
  }

  //给蛇增加身体
  addBody() {
    // 向element添加一个div
    this.element.insertAdjacentHTML('beforeend',"<div></div>")
  }

  // 添加一个蛇身体移动的方法
  moveBody() {
    /**
     * 将后边的身体设置为前面的身体的位置
     *   举列子：
     *        第4节 = 第3节的位置
     *        第3节 = 第3节的位置  
     *        第2节 = 蛇头的位置  
     * 
     */
    // 遍历获取所有的身体
    for(let i = this.bodies.length - 1; i > 0; i--) {
      // 获取前边身体的位置
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

      // 将值设置到当前身体上
      (this.bodies[i] as HTMLElement).style.left = X + 'px';
      (this.bodies[i] as HTMLElement).style.top = Y + 'px';
    }
  }

  // 检查蛇头和身体是否相撞
  checkHeadBody() {
    // 获取所有的身体，检查其是否和蛇头的坐标发生重叠
    for(let i = 1; i < this.bodies.length; i++) {
      if(this.X === (this.bodies[i] as HTMLElement).offsetLeft && this.Y ===  (this.bodies[i] as HTMLElement).offsetTop ) {
        // 进入判断
        throw new Error("你的🐍撞到自己了~")
      }
    }
  }
}
export default Snake