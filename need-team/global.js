(function($, w, doc_el) {
	var // State variables
		vlcnrfied       = false,
		is_paused       = false,
		vlcnrfy_timeout = '',
		// Element cache
		$logo           = $('.img_container.vlcnr'),
		$body           = $('body'),
		$win            = $(w),
		// Functions
		isTargetVisible = function(target) {
			var rect = target.getBoundingClientRect();

			return (
				rect.top >= 0 &&
				rect.left >= 0 &&
				rect.bottom <= (w.innerHeight || doc_el.clientHeight) &&
				rect.right <= (w.innerWidth || doc_el.clientWidth)
			);
		},
		vlcnrfy = function(is_click) {
			if (!is_paused || is_click) {
				vlcnrfied = true;
				$body.toggleClass('vlcnrfy');
			}
			vlcnrfy_timeout = w.setTimeout(vlcnrfy, 7000);
		};

	$win.on('scroll', function() {
		if (!vlcnrfied) {
			if (isTargetVisible($logo[0])) {
				w.setTimeout(vlcnrfy, 1000);
				$win.off('scroll');
				$logo.on('mouseenter', function() {
					if (vlcnrfied) {
						is_paused = true;
					}
				}).on('mouseleave', function() {
					is_paused = false;
				}).on('click', function() {
					w.clearTimeout(vlcnrfy_timeout);
					vlcnrfy(true);
				});
			}
		}
	});

})(jQuery, window, document.documentElement);