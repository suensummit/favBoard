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

var SCROLL_UNIT = 240;
var scrollStop = null;

$('.scroll_left').on('click', function() {
	var target = $('div:first-child', $(this).parent());
	var current = $(target).scrollLeft();
	var step = SCROLL_UNIT;
	$(target).scrollLeft(current - step);
});
$('.scroll_right').on('click', function() {
	var target = $('div:first-child', $(this).parent());
	var current = $(target).scrollLeft();
	var step = SCROLL_UNIT;
	$(target).scrollLeft(current + step);
});
