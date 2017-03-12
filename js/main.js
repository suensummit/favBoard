var tagMap = data.reduce(function(accu, cur){
    if (!!cur.item_fgcolor && 
        !cur.hasOwnProperty(cur.item_fgcolor)) {
        accu[cur.item_fgcolor] = cur.item_photo;
    }
    return accu;
}, {});

var tagData = Object.keys(tagMap).map(function(tagLabel) {
    return {label: tagLabel, imgUrl: tagMap[tagLabel]};
})


var tags = d3.select('#tags-panel')
            .selectAll('div')
            .data(tagData)
            .enter()
            .append('div')
            .classed('cover-item', true);

tags.append('img')
    .attr('src', function(d) {
        return d.imgUrl;
    });

tags .append('h2').text(function(d) {
    return d.label;
})



var dataItems = data.filter(function(d) {
    return (d.item_fgcolor === 'Black');
});

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
