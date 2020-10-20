class Exercise {

  constructor(name){
    this.name = name
  }

  render(node){
    let asideBox = document.createElement('div')
    asideBox.classList.add("aside-box");
    asideBox.textContent = `${this.name}`
    node.append(asideBox)
  }

}