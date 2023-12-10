jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる
  // トップページへスクロール
  $(document).ready(function () {
    $(".js-page-top").hide(); // 最初は非表示
  });
  
  // スクロールイベント
  $(window).on("scroll", function () {
    let scrollHeight = $(document).height();
    let scrollPosition = $(window).height() + $(window).scrollTop();
    let footHeight = $(".js-footer").innerHeight();
    let scrollPositionFromTop = $(window).scrollTop();
    // ボタン位置の調整
    let cssSettings =
      scrollHeight - scrollPosition <= footHeight
        ? {
            position: "absolute",
            bottom: footHeight + "px",
            top: "auto",
          }
        : {
            position: "fixed",
            bottom: "0px",
            top: "auto",
          };
    $(".js-page-top").css(cssSettings);
    // ボタンの表示・非表示
    if (scrollPositionFromTop > 200) {
      $(".js-page-top").fadeIn();
    } else {
      $(".js-page-top").fadeOut(); 
    }
  });
  
  // ハンバーガーメニュー
  $(function () {
    $(".js-hamburger,.js-drawer,.js-drawer a").click(function () {
      if ($(".js-drawer").hasClass("is-current")) {
        // クラスを削除
        $(".js-header").removeClass("is-current");
        $(".js-drawer").fadeOut(500, function () {
          $(this).removeClass("is-current");
        });
        $(".js-hamburger").removeClass("is-current");
        $("body").toggleClass("is-current");
      } else {
        // クラスを削除
        $(".js-header").addClass("is-current");
        $(".js-drawer").hide().addClass("is-current").fadeIn(500);
        $(".js-hamburger").addClass("is-current");
        $("body").addClass("is-current");
      }
    });
  });



   
  // ドロワーメニュー
  $(window).resize(function() {
    if ($(window).width() >= 768) {
      if ($(".js-drawer").hasClass("is-current")) {
          $(".js-drawer").fadeOut(500, function () {
             $(this).removeClass("is-current");
          });
          $(".js-hamburger").removeClass("is-current");
          $(".js-header").removeClass("is-current");        
      }
    }
  });

  // mvスライダー
  const mvSwiper = new Swiper(".js-mv-swiper", {
    loop: true,
    effect: "fade",
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 2000,
    allowTouchMove: false,
  });

  // 画面幅に応じたカード型レイアウトスライダー
  if (document.querySelector(".js-card-swiper")) {
    const cardSwiper = new Swiper(".js-card-swiper", {
      autoplay: true,
      speed: 2000,
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
    function updateSwiper() {
      let width = document.documentElement.clientWidth;
      let slidesPerView;
      let spaceBetween;
      if (width <= 375) {
        slidesPerView = 1.26;
        spaceBetween = 24;
      } else if (width >= 2000) {
        slidesPerView = 5;
        spaceBetween = 40;
      } else if (width >= 1280 && width < 2000) {
        slidesPerView = 3.49;
        spaceBetween = 40;
      } else {
        // 375~1280pxの範囲で線形
        const t = (width - 375) / (1280 - 375);
        slidesPerView = 1.26 + (3.49 - 1.26) * t;
        spaceBetween = 20 + (40- 20) * t;
      }
      cardSwiper.params.slidesPerView = slidesPerView;
      cardSwiper.params.spaceBetween = spaceBetween;
      cardSwiper.update();
    }

    // 最初に一度呼び出す
    updateSwiper();
    // 画面サイズが変わった時に再度呼び出す
    window.addEventListener("resize", updateSwiper);
  }


  // colorboxクラスのついた要素についてのアニメーション
  $(document).ready(function () {
    // 要素の取得とスピードの設定
    let box = $(".js-colorbox"),
        speed = 700;
    // .colorboxの付いた全ての要素に対して下記の処理を行う
    box.each(function () {
        $(this).append('<div class="is-color"></div>');
        var color = $(this).find($(".is-color")),
            image = $(this).find("img");
        var counter = 0;
        image.css("opacity", "0");
        color.css("width", "0%");
        // スクロールイベントで背景色が画面に現れたかどうかチェック
        $(window).on("scroll", function () {
            var windowBottom = $(window).scrollTop() + $(window).height();
            var colorTop = color.offset().top;
            if (windowBottom > colorTop && counter == 0) {
                color.delay(200).animate({ width: "100%" }, speed, function () {
                    image.css("opacity", "1");
                    $(this).css({ left: "0", right: "auto" });
                    $(this).animate({ width: "0%" }, speed);
                });
                counter = 1;
            }
        });
    });
  });


});