// 打乱数组
function shuffle(arr) {
  let newArr = [...arr]
  return newArr.sort(() => {
    let rand = Math.random()
    if (rand < 0.5) return -1
    else return 1
  })
}

// 模拟榜单排名变动 (num 有多少首歌)
function rk_simulation(num) {
  let newRank = new Array(num)
  for (let i = 0; i < num; i++) {
    newRank[i] = i + 1;
  }

  let oldRank = shuffle(newRank)

  let change = new Array(num)
  for (let i = 0; i < num; i++) {
    let rand = Math.random()
    if (rand > 0.5) change[i] = oldRank[i] - newRank[i]
    else change[i] = num
  }
  return change
}

export { rk_simulation }