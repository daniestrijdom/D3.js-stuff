$(document).ready(function () {

  // NB: constants
  outerWidth = 200
  outerHeight = 200
  margin = {left: 20,right: 40, top: 30, bottom: 40}
  innerWidth = outerWidth - margin.left - margin.right
  innerHeight = outerHeight - margin.top - margin.bottom


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

var svg = d3.select('body').append('svg')
            .attr('height',outerHeight)
            .attr('width',outerWidth)

$('svg').css('border','solid')

var g = svg.append('g')
          .attr('transform','translate('+margin.left+','+margin.top+')')

$('g').html('<text x=20 y=20>hello world!</text>')

});
