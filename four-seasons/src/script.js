;(function($) {
  var $seasons = $('.season');
  
  $seasons.on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    if($this.hasClass('active')) {
      $seasons.removeClass('active inactive');
    } else {
        $seasons.removeClass('active').addClass('inactive');
      $(this).removeClass('inactive').addClass('active');
    }
  });
  

})(jQuery);