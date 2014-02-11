(function($) {
	var // Our variables
		vlcnrfied       = false,
		is_paused       = false,
		vlcnrfy_timeout = '',
		venista_el      = $('.info_container.venista')[0],
		$body           = $('body'),
		isTargetVisible = function(target) {
			var rect = target.getBoundingClientRect();

			return (
				rect.top >= 0 &&
				rect.left >= 0 &&
				rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
				rect.right <= (window.innerWidth || document.documentElement.clientWidth)
			);
		},
		vlcnrfy = function(is_click) {
			if (!is_paused || is_click) {
				vlcnrfied = true;
				$body.toggleClass('vlcnrfy');
			}
			vlcnrfy_timeout = window.setTimeout(vlcnrfy, 7000);
		};

	$(window).on('scroll', function() {
		if (!vlcnrfied) {
			if (isTargetVisible(venista_el)) {
				window.setTimeout(vlcnrfy, 1000);
				$(window).off('scroll');
				$('.img_container.vlcnr').on('mouseenter', function() {
					if (vlcnrfied) {
						is_paused = true;
					}
				}).on('mouseleave', function() {
					is_paused = false;
				}).on('click', function() {
					window.clearTimeout(vlcnrfy_timeout);
					vlcnrfy(true);
				});
			}
		}
	});

})(jQuery);