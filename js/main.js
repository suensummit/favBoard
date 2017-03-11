var dataItems = data;
d3.select('#board-list')
    .selectAll('div')
    .data(dataItems)
    .enter()
    .append('div')
    .classed('board-item', true)
    .append('img')
    .attr('src', function(d) {return d.item_photo;})
    .style('width', '100%');
