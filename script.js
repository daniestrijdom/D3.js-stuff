$(document).ready(function() {

  var circleRadius = 1
  var outerHeight = 400
  var outerWidth = 400
  var innerHeight = outerHeight - 30
  var innerWidth = outerWidth - 30
  var xColumn = 'alcohol'
  var yColumn = 'pH'
  var type = 'type'

  // Set up the svg space in the DOM
  var svg = d3.select('body').append('svg')
    .attr("height",outerHeight)
    .attr("width",outerWidth);

  // create the range (pixel length attr) for the plot
  // NOTE: match with size of svg
  var xscale = d3.scale.linear().range([0,innerWidth])
  var yscale = d3.scale.linear().range([innerHeight,0])
  //var colorscale = d3.scale.linear().range(['red', 'blue']);
  var colorscale = d3.scale.category10()

    // main fn to build the plt
  function render(data) {
    // set the domain (range of inputs)
    xscale.domain(d3.extent(data, function (d) {return d[xColumn]}))
    yscale.domain(d3.extent(data, function (d) {return d[yColumn]}))
    //colorscale.domain([0,1])
    //Bind data points circle svg element
    var circles = svg.selectAll('circle').data(data);

    //Enter phase:
    circles.enter().append('circle').attr("r",circleRadius);

    //Update phase:
    circles.attr('cx', function (d) { return xscale(d[xColumn])})
      .attr('cy', function (d) { return yscale(d[yColumn])})
      .attr('fill', function (d) { return colorscale(d[type])})

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
    return d;
  }

  // reads in data, converts to float, renders on svg space in DOM
  d3.csv('wine-all.csv', type, render)
});
