dadosEcomerceAvancado = {};
(function ($) {
    jQuery.fn.googleEcommerce = function (settings) {
        var config = {};
        var data = [];

        if (settings) {
            $.extend(config, settings);
        }

        var methods = {
            checkTipeOf: function (element) {
                try {
                    if ((typeof element.data('ec-position')) != 'number') throw "Ooops! Look at this. This is a number? " + element.data('ec-position') + " tipe: " + (typeof element.data('ec-position'));
                    return true
                } catch (err) {
                    console.error(err);
                    return false
                }
            },
            sizeOf: function (object) { // Calcula o tamanho do objeto de dados para ser enviado junto com o pageview

                // initialise the list of objects and size
                var objects = [object];
                var size = 0;

                // loop over the objects
                for (var index = 0; index < objects.length; index++) {

                    // determine the type of the object
                    switch (typeof objects[index]) {

                        // the object is a boolean
                        case 'boolean':
                            size += 4;
                            break;

                        // the object is a number
                        case 'number':
                            size += 8;
                            break;

                        // the object is a string
                        case 'string':
                            size += 2 * objects[index].length;
                            break;

                        // the object is a generic object
                        case 'object':

                            // if the object is not an array, add the sizes of the keys
                            if (Object.prototype.toString.call(objects[index]) != '[object Array]') {
                                for (var key in objects[index]) size += 2 * key.length;
                            }

                            // loop over the keys
                            for (var key in objects[index]) {

                                // determine whether the value has already been processed
                                var processed = false;
                                for (var search = 0; search < objects.length; search++) {
                                    if (objects[search] === objects[index][key]) {
                                        processed = true;
                                        break;
                                    }
                                }

                                // queue the value to be processed if appropriate
                                if (!processed) objects.push(objects[index][key]);

                            }

                    }

                }

                // return the calculated size
                return size;

            },
            getImpression: function (element) {
                //captura todas as impresssões da página e armazena para futuro envio.
                if (methods.checkTipeOf(element)) {
                    data.push({
                        'id': element.data('ec-id') + '',
                        'name': element.data('ec-name') + '',
                        'category': element.data('ec-category') + '',
                        'brand': element.data('ec-brand') + '',
                        'variant': element.data('ec-variant') + '',
                        'list': element.data('ec-list') + '',
                        'position': element.data('ec-position'),
                        'dimension1': element.data('ec-dimension') + ''
                    })
                } else {

                }


            },
            impression: function (jsonDataImpression) {

                maxSize = 8000;
                sizeJsonDataImpression = methods.sizeOf(jsonDataImpression);

                /*  Cada pageview pode ser enviado com o tamanho máximo de 8KB. Aqui faz a checagem do tamanho máximo,
                 caso seja maior que o limite, divide os itens em conjuntos aceitaveis e os envia como pageviews
                 separados.
                 */
                try {

                    if (sizeJsonDataImpression > maxSize) {
                        throw "Ooops! You have a lot of data on this page";
                    } else {
                        for (i = 0; i < jsonDataImpression.length; i++) {
                            ga('ec:addImpression', jsonDataImpression[i]);
                        }
                        methods.sendPageView();
                    }
                } catch (err) {
                    console.error(err);
                }
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
            },
            sendPageView: function () {
                if (typeof dataECPageView !== 'undefined') {
                    if (dataECPageView != "") {
                        ga('send', 'pageview', dataECPageView);
                    } else {
                        ga('send', 'pageview');
                    }
                } else {
                    ga('send', 'pageview');
                }
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

        this.each(function () {
            var element = $(this);

            methods.getImpression(element);
            element.on('click', function (e) {
                methods.click(element);
                e.stopPropagation();
            });
        });
        methods.impression(data);
    };

    ga('require', 'ec');

    $('[data-ec=true]').googleEcommerce();

}(jQuery));
