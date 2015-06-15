(function ($) {
    
      
          $(window).on('load',function(){
			 if ($(window).width() <= 960) {
                    
                    $('html').addClass('mobi-processed');
                    
                    $('.menu').Mobi({
                        side: 'top',
                        destination: 'l-page'
                    });
                } 
		  })
                
          

            ///Implementing Resize functionality

            $(window).resize(function () {
                if ($(this).width() < 960) {
                    if (!$('html').hasClass('mobi-processed')) {
                        $('.menu').Mobi({
                            side: 'top',
                            destination: 'l-page'
                        });
                        $('html').addClass('mobi-processed');
                    }      
                }
                else {

                }
       


})(jQuery);


