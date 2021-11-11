// 定义类
class Food {
  // 定义一个属性表示食物对应的元素
  element: HTMLElement;

  constructor() {
    // 获取页面中的food元素并将其赋值给element
    this.element = document.getElementById("food")!;
  }

  // 定义一个获取食物X坐标的方法
  get X() {
    return this.element.offsetLeft
  }
  // 定义一个获取食物Y坐标的方法
  get Y() {
    return this.element.offsetTop
  }

  // 修改食物的位置
  // 每次移动一格，10的倍数
  change() {
    this.element.style.left = `${Math.round(Math.random()*29) * 10}px`
    this.element.style.top = `${Math.round(Math.random()*29) * 10}px`
  }
}
export default Food