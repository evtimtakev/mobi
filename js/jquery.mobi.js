(function ($, wondow, document, undefined) {
    window.onload = function () {
        ///TODO: Implement once logick
        var settings,
                thath = this,
                pluginName = 'Mobi';

        ////Seting up some default values
        settings = {
            side: 'left',
            triger: document.querySelectorAll('.mobi-button'), ///TODO: Implement pasing jquery object 
            speed: 500,
            easyClose: true,
            destination: 'body',
            extras: {}
        };

        function Mobi(elemnt, options) {
            ///Counstructor of our jquey plugin
            this.thath = elemnt;
            this.options = $.extend({}, settings, options);
            this.init();
        }

        Mobi.prototype.init = function () {
            ////Main logick goes here
            var element = this.thath,
                    options = this.options;

            //wrapping targeted menu in custom wrapper
            var wrapper = document.createElement("div");




            wrapper.className = 'mobi-wrapper';

//            Clone elemnt
            var clone = element.cloneNode(true);
            console.log(clone);
            wrapper.appendChild(clone);

            apendElemnt(wrapper);
            addBodyClass(options.side);
            ////Alaighning the nav
            determenDirection(options);

            addEventListener();



            function addBodyClass(direction) {
                document.body.className += 'mobi-' + direction.toString();
            }
            function apendElemnt(elem) {
                if (options.destination === 'body') {
                    if (options.side === 'top') {
                        var parentElem = document.body;
                        var firstChild = parentElem.firstChild;

                        parentElem.insertBefore(elem, firstChild);
                    }
                    else {
                        document.body.appendChild(elem);
                    }

                }
                else {
                    if (options.side === 'top') {
                        var parentElem = document.getElementsByClassName(options.destination)[0];
                        var firstChild = parentElem.firstChild;

                        parentElem.insertBefore(elem, firstChild);
                    }
                    else{
                        document.getElementsByClassName(options.destination)[0].appendChild(elem);
                    }
                    
                }

            }
            function determenDirection(direction) {
                switch (direction.side) {
                    case 'left':
                        var width = document.getElementsByClassName('mobi-wrapper')[0].offsetWidth;
                        wrapper.style.left = '-' + width.toString + 'px';

                        break;
                    case 'right':
                        var width = document.getElementsByClassName('mobi-wrapper')[0].offsetWidth;
                        wrapper.style.right = '-' + width.toString() + 'px';
                        break;
                }
            }
            function addEaseyClose(boolean) {
                if (boolean) {
                    var close = document.createElement('div');
                    close.className = 'mobi-easy-close';
                    apendElemnt(close);
                }
            }

            function removeEasyClose(boolean) {
                if (boolean) {
                    var elem = document.getElementsByClassName('mobi-easy-close');
                    elem[0].parentElement.removeChild(elem[0]);
                }
            }
            function addEventListener() {

                if (options.triger.length <= 0) {
                    console.log("Mobi can't find the open button");
                }
                else {
                    ///Determen directions to see where to animate

                    var obj = {},
                            closeObj = {},
                            doubleClick = false,
                            width = document.getElementsByClassName('mobi-wrapper')[0].offsetWidth,
                            height = document.getElementsByClassName('mobi-wrapper')[0].firstChild.offsetHeight;
                    console.log(height);
                    if (options.side === 'left') {
                        obj = {
                            'left': '0px'
                        };
                        closeObj = {
                            'left': '-' + width.toString() + 'px'
                        };
                    }
                    else if (options.side === 'right') {
                        obj = {
                            'right': '0px'
                        };
                        closeObj = {
                            'right': '-' + width.toString() + 'px'
                        };
                    }
                    if (options.side === 'top') {
                        obj = {
                            'height': height
                        };
                        closeObj = {
                            'height': '0px'
                        };
                    }

                    options.triger[0].addEventListener("click", function (e) {
                        if (doubleClick) {
                            ///animate back
                            $('.mobi-wrapper').stop().animate(closeObj, options.speed);
                            removeEasyClose(options.easyClose);
                            doubleClick = false;
                        }
                        else {
                            addEaseyClose(options.easyClose);
                            $('.mobi-wrapper').stop().animate(obj, options.speed);
                            doubleClick = true;
                            var close = document.getElementsByClassName('mobi-easy-close');

                            ///Add event lostener for the easy close elemnt
                            close[0].addEventListener('click', function () {
                                $('.mobi-wrapper').stop().animate(closeObj, options.speed);
                                removeEasyClose(options.easyClose);
                                doubleClick = false;
                            });

                        }


                    });

                }

            }

        };


        $.fn[pluginName] = function (options) {

            return this.each(function () {
                if (!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName,
                            new Mobi(this, options));
                }
            });
        };
    };
})(jQuery, window, document);

