$(document).ready(function() {

  // CONSTANTS
  var margin = {
    left: 80,
    right: 20,
    top: 30,
    bottom: 100,
    legendx : 500,
    legendy : 20
  }
  var circleRadius = 2
  var outerHeight = 500
  var outerWidth = 700
  var innerHeight = outerHeight - margin.bottom - margin.top // 420
  var innerWidth = outerWidth - margin.right - margin.left // 620

  // Values at load
  var xColumn = 'alcohol'
  var yColumn = 'pH'
  var winetype = 'type'

  // RENDER APPROPRIATE HEADER
  $('h2').html("Select feature & click 'Render' to begin")

  // APPEND SVG CANVAS, G, TO BODY
  var svg = d3.select('body').append('svg')
    .attr("height", outerHeight)
    .attr("width", outerWidth)

  var g = svg.append('g')
            .attr('transform','translate('+margin.left+','+margin.top+')')

  // set the range (pixel length attr) for the plot
  // NOTE: match with size of svg
  var xscale = d3.scale.linear().range([0,innerWidth])
  var yscale = d3.scale.linear().range([innerHeight, 0])

  // Chart legend
  var colorscale = d3.scale.linear().range(['rgba(0,255,155,0.1)','rgba(255,0,0,0.1)'])
  var legend = g.append('g')
                .attr('transform','translate('+margin.legendx+','+margin.legendy+')')
                .attr('class','legend')

  legend.append('text')
    .attr('x',20)
    .attr('y',20)
    .attr("text-anchor", "start")
    .text('RED')

  legend.append('rect')
    .attr('x',0)
    .attr('y',8)
    .attr('width',15)
    .attr('height',15)
    .attr('fill','rgba(255,0,0,0.4)')

  legend.append('text')
    .attr('x',20)
    .attr('y',40)
    .attr("text-anchor", "start")
    .text('WHITE')

  legend.append('rect')
    .attr('x',0)
    .attr('y',28)
    .attr('width',15)
    .attr('height',15)
    .attr('fill','rgba(0,255,155,0.4)')


  // AXIS LABELS
  svg.append("text")
    .attr("class", "x-label")
    .attr("text-anchor", "end")
    .attr("x", outerWidth / 2)
    .attr("y", outerHeight - (margin.bottom / 2))
    .text(xColumn.toUpperCase());

  svg.append("text")
      .attr("class", "y-label")
      .attr("text-anchor", "end")
      .attr("y", margin.top/2)
      .attr("x", -innerHeight /2)
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text(yColumn.toUpperCase());

  // CREATE SCALE OBJECTS
  var yAxis = d3.svg.axis().scale(yscale).orient('left')
  var xAxis = d3.svg.axis().scale(xscale).orient('bottom')

  function getColumns(data) {
    var result = d3.keys(data[0]).slice(1,- 2)
    var xAxisMenu = 'X-axis: <select id="xAxisValue">'
    var yAxisMenu = 'Y-axis: <select id="yAxisValue">'
    for (var i in result) {
      xAxisMenu += "<option value='"+result[i]+"'>"+result[i]+"</option>"
      yAxisMenu += "<option value='"+result[i]+"'>"+result[i]+"</option>"
    }

    xAxisMenu += "</select>"
    yAxisMenu += "</select>"
    str = xAxisMenu +'<br>'+ yAxisMenu + $('#settings').html()
    $('#settings').html(str)


    $('#renderButton').on('click', function() {
      d3.selectAll('.axis').remove()
      xColumn = $('#xAxisValue').val()
      yColumn = $('#yAxisValue').val()
      $('.x-label').html(xColumn.toUpperCase())
      $('.y-label').html(yColumn.toUpperCase())
      d3.csv('wine-all.csv', type, render)
      $('h2').html("Plot: " + xColumn + ' vs ' + yColumn)

    })
  }



  // CHART RENDERING FUNCTION (KEEP GENERIC AS POSSIBLE)
  function render(data) {

    // set the domains
    xscale.domain(d3.extent(data, function (d) {return d[xColumn]}))
    yscale.domain(d3.extent(data, function (d) {return d[yColumn]}))

    // CREATE AXIS GROUPS AND APPEND AXIS OBJECTS
    // THIS IS INSIDE THE RENDERING FN BC DATA NEEDS TO BE AVAILABLE
    // FOR US TO CALL AXIS OBJECTS ON GROUPS
    var xAxisG = g.append('g')
                  .attr('transform', 'translate(0,'+innerHeight+')')
                  .attr('class','axis')
                  .call(xAxis)
    var yAxisG = g.append('g')
                  .attr('class','axis')
                  .call(yAxis)

    // NB: BIND DATA POINTS TO CIRCLE OBJECTS
    var circles = g.selectAll('circle').data(data);

    // NB: Enter phase:
    circles.enter().append('circle').attr("r",circleRadius);

    // NB: Update phase:
    circles.attr('cx', function (d) { return xscale(d[xColumn])})
      .attr('cy', function (d) { return yscale(d[yColumn])})
      .attr('fill', function (d) { return colorscale(d[winetype])})

    // NB: Exit phase:
    circles.exit().remove();

    }

  // TODO: loop though all headers
  // takes data points from strings to floats

  function type (d) {

    var features = d3.keys(d);
    //this doesnt make sense
    d.alcohol = +d.alcohol
    for (feature in features) {
      d[feature] = +d[feature]
    }

    return d
  }

  // reads in data, converts to float, renders on svg space in DOM
  d3.csv('wine-all.csv', getColumns)
  d3.csv('wine-all.csv', type, render)
});
