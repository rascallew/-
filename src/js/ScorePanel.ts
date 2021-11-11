class ScorePanel {
  score = 0
  level = 1
  scoreEle: HTMLElement
  levelEle: HTMLElement
  // 设置一个变量限制等级
  maxLevel: number
  constructor(maxLevel: number = 10) {
    this.scoreEle = document.getElementById('score')!;
    this.levelEle = document.getElementById('level')!;
    this.maxLevel = maxLevel
  }
  // 设置一个加分的方法
  addScore() {
    // 使分数自增
    this.scoreEle.innerText = ++this.score + ''
    //判断分数是多少
    if(this.score % 4 === 0) {
      this.levelUp()
    }
  }
  // 提升等级的方法
  levelUp() {
    if(this.level <= this.maxLevel) {
       this.levelEle.innerText = ++this.level + ''
    }else {
      this.levelEle.innerText = 'max'
    }
  }
}
export default ScorePanel