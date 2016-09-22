var arr1 = [2,3,5,7,8,4,1,5,4,2,3,5,4,2,1,6,8,5]

d3.selectAll('p')
  .data(arr1)
    .style("font-size", function (d) {
      return d*10+'px';
    })
