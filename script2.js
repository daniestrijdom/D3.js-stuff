$(document).ready(function () {

  // NB: constants
  outerWidth = 200
  innerWidth = 200
  margin = {left: 20,right: 40, top: 40, bottom: 40}

  mock_data = [
    {'x':40,'y':60},
    {'x':30,'y':60},
    {'x':40,'y':80},
    {'x':60,'y':30},
    {'x':100,'y':120},
    {'x':90,'y':110},
    {'x':120,'y':80},
    {'x':110,'y':60},
  ]

for (i in mock_data) {
  console.log(typeof(mock_data[i].x))
}
})
