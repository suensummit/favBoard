var dataItems = data;

var card = d3.select('#board-list')
            .selectAll('div')
            .data(dataItems)
            .enter()
            .append('div')
            .classed('board-item', true);

    card.append('img')
        .attr('src', function(d) {return d.item_photo;})
        .classed('card-image', true);

    card.append('div')
        .classed('bottom-right', true)
        .append('div')
        .classed('card-hover-text', true)
        .text(function(d) { return d.item_name +'/\n '+ d.item_city;});

    card.append('div')
        .classed('top-right', true)
        .append('div')
        .classed('glyphicon', true)
        .classed('glyphicon-heart', true);

    card.append('div')
        .classed('top-right-2', true)
        .append('div')
        .classed('glyphicon', true)
        .classed('glyphicon-search', true)
        .on('click', function() {
            console.log('clicked');
        });

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
