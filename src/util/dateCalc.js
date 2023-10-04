export const calcDiffTime = function (createdTime) {
  let timeDiff = new Date() - new Date(createdTime)
  let hourDiff = Math.floor(timeDiff/(1000*60*60))
  if(0<hourDiff  && hourDiff<24) {
    return hourDiff + '시간 전'
  } else if(hourDiff<=0) {
    let minDiff = Math.floor(timeDiff/(1000*60))
    if(minDiff>0) {
      return minDiff + '분 전';
    } else {
      return '방금전'
    }
  } else {
    let dayDiff = Math.floor(timeDiff/(1000*60*60*24))
    return dayDiff + '일 전'
  }
}

export const reformatDate = function (ISO) {
  const date = new Date(ISO)
  const year = date.getFullYear()
  const month = String(date.getMonth()+1).padStart(2, "O")
  const day = String(date.getDate()).padStart(2, 'O')

  return `${year}. ${month}. ${day}`
}