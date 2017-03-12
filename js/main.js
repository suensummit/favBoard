var colorTagMap = data.reduce(function(accu, cur){
    if (!!cur.item_fgcolor && 
        !cur.hasOwnProperty(cur.item_fgcolor)) {
        accu[cur.item_fgcolor] = cur.item_photo;
    }
    return accu;
}, {});

// city tag cards
var cityTagMap = data.reduce(function(accu, cur){
    if(!!cur.item_city && 
    !cur.hasOwnProperty(cur.item_city)) {
        accu[cur.item_city] = cur.item_photo
    }
    return accu;
}, {});
console.log(cityTagMap);

var panelTagData = Object.keys(colorTagMap).map(function(tagLabel) {
    return {
        label: tagLabel, 
        imgUrl: colorTagMap[tagLabel], 
        filterFunc: function(item){
            return item.item_fgcolor === tagLabel;
        }};
});

var cityTagData = Object.keys(cityTagMap).map(function(tagLabel){
    return {
        label: tagLabel,
        imgUrl: cityTagMap[tagLabel],
        filterFunc: function(item) {
            return item.item_city === tagLabel;
        }
    };
});

panelTagData = panelTagData.concat(cityTagData);

var panelTags = d3.select('#tags-panel')
            .selectAll('div')
            .data(panelTagData)
            .enter()
            .append('div')
            .classed('cover-item', true)
            .on('click', function(d) {
        drawBoard(d.filterFunc);
    });

panelTags.append('img')
    .attr('src', function(d) {
        return d.imgUrl;
    });

panelTags.append('h5').text(function(d) {
    return d.label;
})

function drawBoard(filterFunc) {

    d3.select('#board-list').selectAll('div').remove();

    var cardData = data.filter(filterFunc);

    var card = d3.select('#board-list')
                .selectAll('div')
                .data(cardData)
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
            	openCard();
                console.log('clicked');
            });

}

drawBoard(function() {
    return true;
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

// $('.card-hover-text').on('click', function() {
// 	openCard();
// })

$('#slide-in-card .close').on('click', function() {
	closeCard();
})

function openCard() {
	var deferred = $.Deferred();

	$('html').css('overflow-y', 'hidden');
	$('#slide-in-card').removeClass('hidden');
	$('#slide-in-card .content').scrollTop(0);
	setTimeout(function() {
		$('#slide-in-card').addClass('active');
		// Trigger the open event to execute other function
		$('#slide-in-card').trigger('open');
		// After the animation, the close button will show
		setTimeout(function() {
			$('#slide-in-card .close').show();
		}, 0);
		deferred.resolve();
	// Delay a little time to start the animate
	}, 20);

	return deferred.promise;
}

function closeCard() {
	var deferred = $.Deferred();

	$('#slide-in-card .close').hide();
	$('#slide-in-card').removeClass('active');
	setTimeout(function() {
		$('#slide-in-card').addClass('hidden');
		$('html').css('overflow-y', 'auto');
		// After the animation finished.
		$('#slide-in-card').trigger('close');
		deferred.resolve();
	}, 0);

	return deferred.promise;
}
