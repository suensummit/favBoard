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

$('.card-hover-text').on('click', function() {
	openCard();
})

$('html').on('click', function() {
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
		}, 500);
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
	}, 500);

	return deferred.promise;
}
