$(document).ready(function() {

  var margin = {left: 80, right: 20, top: 30, bottom: 100}

  var circleRadius = 3
  var outerHeight = 500
  var outerWidth = 700
  var innerHeight = outerHeight - margin.top - margin.bottom
  var innerWidth = outerWidth - margin.left - margin.right

  var xColumn = 'chlorides'
  var yColumn = 'pH'
  var winetype = 'type'

  $('h2').html("Plot: " + xColumn + ' vs ' + yColumn)

  // Set up the svg space in the DOM
  var svg = d3.select('body').append('svg')
    .attr("height", outerHeight)
    .attr("width", outerWidth)

  var g = svg.append('g')
            .attr('transform','translate('+margin.left+','+margin.top+')')

  svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", outerWidth / 2)
    .attr("y", outerHeight - (margin.bottom / 2))
    .text(xColumn.toUpperCase());

  svg.append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("y", margin.top/2)
      .attr("x", -innerHeight /2)
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text(yColumn.toUpperCase());

  // create the range (pixel length attr) for the plot
  // NOTE: match with size of svg
  var xscale = d3.scale.linear().range([0,innerWidth])
  var yscale = d3.scale.linear().range([innerHeight, 0])
  var colorscale = d3.scale.linear().range(['rgba(0,255,155,0.3)','rgba(255,0,0,0.3)'])

  var yAxis = d3.svg.axis().scale(yscale).orient('left')
  var xAxis = d3.svg.axis().scale(xscale).orient('bottom')


  // main fn to build the plt
  function render(data) {

    // set the domain (range of inputs)
    xscale.domain(d3.extent(data, function (d) {return d[xColumn]}))
    yscale.domain(d3.extent(data, function (d) {return d[yColumn]}))

    var xAxisG = g.append('g')
                  .attr('transform', 'translate(0,'+innerHeight+')')
                  .attr('class','axis')
                  .call(xAxis)
    var yAxisG = g.append('g')
                  .attr('class','axis')
                  .call(yAxis)


    //Bind data points circle svg element
    var circles = g.selectAll('circle').data(data);

    //Enter phase:
    circles.enter().append('circle').attr("r",circleRadius);

    //Update phase:
    circles.attr('cx', function (d) { return xscale(d[xColumn])})
      .attr('cy', function (d) { return yscale(d[yColumn])})
      .attr('fill', function (d) { return colorscale(d[winetype])})

    //Exit phase:
    circles.exit().remove();
  }

  // takes data points from strings to floats
  function type (d) {
    d.quality = +d.quality
    d.alcohol = +d.alcohol
    d.pH = +d.pH
    d['citric acid'] = +d['citric acid']
    d.chlorides = +d.chlorides
    return d
  }

  // reads in data, converts to float, renders on svg space in DOM
  d3.csv('wine-all.csv', type, render)
});
