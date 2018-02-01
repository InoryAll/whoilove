Zepto(function ($) {
    var paginator = {
        isOn: true,
        currentPage: 0,
        items: {
            body: $('html'),
            scene: $('#scene'),
            sceneContainer: $('#scene-container'),
            loadingPage: $('#loading'),
            startBtn: $('#start'),
            canvasSeal: $('#canvas-seal'),
            sceneChange: $('#scene-change'),
            goDownBtn: $('#go-down'),
            doItBtn: $('#do-it'),
            mask: $('#mask'),
            music: $('#music'),
            musicContainer: $('#music-container'),
        },
        pages: [ $('#first'), $('#second'), $('#third'), $('#fourth'), $('#fifth'), $('#sixth'), $('#seventh'), $('#eighth') ],
        initPaginator: function () {
            this.validateScreen();
            this.bindEvent();
        },
        validateScreen: function () {
            var _this = this;
            $(window).on('resize', function () {
                var proportion = ($(window).width() / $(window).height()).toFixed(2);
                if (proportion >= 1) {
                    _this.items.loadingPage.removeClass('loading-hidden');
                    _this.items.sceneContainer.hide();
                    _this.items.body.attr('style', '');
                    _this.bindRowTouchEvent();
                } else {
                    _this.items.sceneContainer.show();
                    _this.items.loadingPage.removeClass('loading-hidden');
                    _this.items.body.css({
                        width: $(window).height(),
                        height: $(window).width(),
                        position: 'absolute',
                        top: 0,
                        left: $(window).width(),
                        transform: 'rotate(90deg)',
                        transformOrigin: '0 0',
                    });
                    _this.items.loadingPage.addClass('loading-hidden');
                    _this.bindColTouchEvent();
                }
            });
            $(window).trigger('resize');
        },
        bindEvent: function () {
            var _this = this;
            _this.bindMaskEvent();
            _this.bindMusicEvent();
        },
        bindMusicEvent: function () {
            var _this = this;
            _this.items.musicContainer.addClass('music-on');
            // 单独适配微信端的自动播放
            document.addEventListener("WeixinJSBridgeReady", function () {
                _this.items.music[0].play();
            }, false);
            _this.items.musicContainer.on('click', function () {
                if (_this.isOn === true) {
                    _this.items.music[0].pause();
                    _this.items.musicContainer.removeClass('music-on');
                } else {
                    _this.items.music[0].play();
                    _this.items.musicContainer.addClass('music-on');
                }
                _this.isOn = !_this.isOn;
            });
        },
        bindMaskEvent: function () {
            var _this = this;
            _this.items.goDownBtn.on('click', function () {
                _this.items.mask.addClass('mask-container-show');
            });
            _this.items.doItBtn.on('click', function () {
                _this.items.mask.addClass('mask-container-show');
            });
            _this.items.mask.on('click', function () {
                _this.items.mask.removeClass('mask-container-show');
            });
        },
        bindColTouchEvent: function () {
            var _this = this;
            var startPosition, endPosition, deltaX, deltaY, moveLength;
            _this.items.scene.bind('touchstart', function(e){
                deltaX = 0;
                deltaY = 0;
                var touch = e.touches[0];
                startPosition = {
                    x: touch.pageX,
                    y: touch.pageY
                }
            }) .bind('touchmove', function(e){
                var touch = e.touches[0];
                endPosition = {
                    x: touch.pageX,
                    y: touch.pageY
                };

                deltaX = endPosition.x - startPosition.x;
                deltaY = endPosition.y - startPosition.y;
                moveLength = Math.sqrt(Math.pow(Math.abs(deltaX), 2) + Math.pow(Math.abs(deltaY), 2));
            }).bind('touchend', function(e){
                if(deltaY < -100) {
                    _this.changeNextPage();
                } else if (deltaY > 100) {
                    _this.changePrevPage();
                }
            });
        },
        bindRowTouchEvent: function () {
            var _this = this;
            var startPosition, endPosition, deltaX, deltaY, moveLength;
            _this.items.scene.bind('touchstart', function(e){
                deltaX = 0;
                deltaY = 0;
                var touch = e.touches[0];
                startPosition = {
                    x: touch.pageX,
                    y: touch.pageY
                }
            }) .bind('touchmove', function(e){
                var touch = e.touches[0];
                endPosition = {
                    x: touch.pageX,
                    y: touch.pageY
                };

                deltaX = endPosition.x - startPosition.x;
                deltaY = endPosition.y - startPosition.y;
                moveLength = Math.sqrt(Math.pow(Math.abs(deltaX), 2) + Math.pow(Math.abs(deltaY), 2));
            }).bind('touchend', function(e){
                if(deltaX < -100) {
                    _this.changeNextPage();
                } else if (deltaX > 100) {
                    _this.changePrevPage();
                }
            });
        },
        initPage: function () {
            var _this = paginator;
            _this.items.sceneChange.removeClass('scene-do-change').hide();
            _this.items.canvasSeal.removeClass('canvas-seal-do-change').hide();
            _this.items.goDownBtn.hide();
            _this.items.doItBtn.hide();
        },
        changeAnimation: function () {
            var _this = paginator;
            _this.items.sceneChange.show().addClass('scene-do-change');
            _this.items.canvasSeal.show().addClass('canvas-seal-do-change');
        },
        changePrevPage: function () {
            var _this = paginator;
            if (_this.currentPage === 0) {
                return;
            }
            _this.initPage();
            if (_this.currentPage === 1) {
                _this.pages[_this.currentPage-1].removeClass('index-change').addClass('index-back');
                _this.changeAnimation();
                _this.items.scene.removeClass('scene-background-hidden');
            } else {
                _this.pages[_this.currentPage-1].removeClass('page-change').addClass('page-back');
                _this.changeAnimation();
            }
            _this.currentPage --;
            if (_this.currentPage === _this.pages.length-2) {
                _this.items.goDownBtn.removeClass('btn-show').hide();
                _this.items.doItBtn.removeClass('btn-show').hide();
            }
        },
        changeNextPage: function () {
            var _this = paginator;
            if (_this.currentPage === _this.pages.length - 1) {
                return;
            }
            _this.initPage();
            if (_this.currentPage === 0) {
                _this.pages[_this.currentPage].removeClass('index-back').addClass('index-change');
                _this.changeAnimation();
                _this.items.scene.addClass('scene-background-hidden');
            } else {
                _this.pages[_this.currentPage].removeClass('page-back').addClass('page-change');
                _this.changeAnimation();
            }
            _this.currentPage ++;
            if (_this.currentPage === _this.pages.length-1) {
                _this.items.sceneChange.removeClass('scene-do-change').hide();
                _this.items.goDownBtn.addClass('btn-show');
                _this.items.doItBtn.addClass('btn-show');
            }
        },
    };
    paginator.initPaginator();
});