(function ($) {
    jQuery.fn.googleEcommerce = function (settings) {
        var config = {};

        if (settings) {
            $.extend(config, settings);
        }

        var methods = {
            impression: function (element) {
                ga('ec:addImpression', {
                    'id': element.data('ec-id'),
                    'name': element.data('ec-name'),
                    'category': element.data('ec-category'),
                    'brand': element.data('ec-brand'),
                    'variant': element.data('ec-variant'),
                    'list': element.data('ec-list'),
                    'position': element.data('ec-position'),
                    'dimension1': element.data('ec-dimension')
                });
            },
            click: function (element) {
                ga('ec:addProduct', {
                    'id': element.data('ec-id'),
                    'name': element.data('ec-name'),
                    'category': element.data('ec-category'),
                    'brand': element.data('ec-brand'),
                    'variant': element.data('ec-variant'),
                    'list': element.data('ec-list'),
                    'position': element.data('ec-position'),
                    'dimension1': element.data('ec-dimension')
                });

                ga("ec:setAction", "click", {"list": element.data('ec-list')});
                ga("send", "event", "homepage", "click", "");
            },
            addCart: function (element) {
                ga("ec:addProduct", {
                    "id": element.data('ec-id'),
                    "name": element.data('ec-name'),
                    "price": element.data('ec-price'),
                    "brand": element.data('ec-brand'),
                    "category": element.data('ec-category'),
                    "variant": element.data('ec-variant'),
                    "dimension1": element.data('ec-dimension'),
                    "list": element.data('ec-list'),
                    "position": element.data('ec-position'),
                    "quantity": element.data('ec-quantity')
                });

                ga("ec:setAction", "add", {"list": element.data('ec-list')});
                ga("send", "event", "detail view", "click", "addToCart");
            },
            removeCart: function (element) {
                ga("ec:addProduct", {
                    "id": element.data('ec-id'),
                    "name": element.data('ec-name'),
                    "price": element.data('ec-price'),
                    "brand": element.data('ec-brand'),
                    "category": element.data('ec-category'),
                    "variant": element.data('ec-variant'),
                    "dimension1": element.data('ec-dimension'),
                    "position": element.data('ec-position'),
                    "quantity": element.data('ec-quantity')
                });

                ga("ec:setAction", "remove");
                ga("send", "event", "detail view", "click", "removeFromCart");
            }
        };

        $('[data-ec-click]').on('click', function (e) {
            var element = $('[data-ec-id="' + $(this).data('ec-id') + '"]')
            e.stopPropagation();

            switch ($(this).data('ec-click')) {
                case 'addCard':
                    methods.addCart(element);
                    break;

                case 'removeCard':
                    methods.removeCart(element);
                    break;
            }

            $('[data-ec-click]').attr('disabled', false);
        });

        return this.each(function () {
            var element = $(this);

            methods.impression(element);

            element.on('click', function (e) {
                methods.click(element);
                e.stopPropagation();
            });
        });
    };

    ga('require', 'ec');

    $('[data-ec=true]').googleEcommerce();

    if (dataECPageView || dataECPageView != "") {
        ga('send', 'pageview', dataECPageView);
    } else {
        ga('send', 'pageview');
    }
}(jQuery));
