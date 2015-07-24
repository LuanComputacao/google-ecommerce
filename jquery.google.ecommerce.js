dadosEcomerceAvancado = {};
(function ($) {
    jQuery.fn.googleEcommerce = function (settings) {
        this.click(function () {
            console.log('clicked');
        });
        var config = {};
        var data = [];

        if (settings) {
            $.extend(config, settings);
        }

        /**
         * Métodos adicionais para automação do plugin
         */
        var utils = {
            selectActionByTypePage: function(ecElement){
                console.log(ecElement.data('ec-type'));
                switch (ecElement.data('ec-type')) {
                    case 'viewProduct':
                        console.log('viewProduct');
                        utils.addActionClick(ecElement);
                        methodsEC.sendPageView();
                        break;
                    case 'list':
                        console.log('list');
                        utils.addActionClick(ecElement);
                        utils.createImpressions(ecElement);
                        methodsEC.impression(datecElementa);
                        methodsEC.sendPageView();
                        break;
                    case 'cart':
                        console.log('cart');
                        break;
                    default :
                        console.log('default');
                        utils.addActionClick(ecElement);
                        utils.createImpressions(ecElement);
                        methodsEC.impression(data);
                        methodsEC.sendPageView();
                        break;
                }
            },
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
            addActionClick: function (element) {
                //Cria um objeto a partir da busca pelo elemento para funcionar o
                // on('click',func(){})
                oElement = $('[data-ec-click][data-ec-id=' + element.data('ec-id') + ']');

                oElement.on('click', function (e) {
                    e.stopPropagation();

                    switch ($(this).data('ec-click')) {
                        case 'viewDetails':
                            methodsEC.click(element);
                            break;

                        case 'addCard':
                            methodsEC.addCart(element);
                            break;

                        case 'removeCard':
                            methodsEC.removeCart(element);
                            break;
                    }

                    $('[data-ec-click]').attr('disabled', false);
                });
            },
            createImpressions: function (element) {
                element.each(function () {
                    var element = $(this);

                    utils.getImpression(element);
                    element.on('click', function (e) {
                        e.stopPropagation();
                    });
                });
            },
            getImpression: function (element) {
                //captura todas as impresssões da página e armazena para futuro envio.
                if (utils.checkTipeOf(element)) {
                    data.push({
                        'id': element.data('ec-id') + '',
                        'name': element.data('ec-name') + '',
                        'brand': element.data('ec-brand') + '',
                        'variant': element.data('ec-variant') + '',
                        'list': element.data('ec-list') + '',
                        'position': element.data('ec-position')
                    })
                }
            }
        };

        /**
         * Métodos do Google Enhanced Ecommerce
         * @type {{impression: Function, click: Function, addCart: Function, removeCart: Function, sendPageView: Function}}
         */
        var methodsEC = {

            impression: function (jsonDataImpression) {

                maxSize = 8000;
                sizeJsonDataImpression = utils.sizeOf(jsonDataImpression);

                /*  Cada pageview pode ser enviado com o tamanho máximo de 8KB. Aqui faz a checagem do tamanho máximo,
                 caso seja maior que o limite, divide os itens em conjuntos aceitaveis e os envia como pageviews
                 separados.
                 */
                try {
                    if (sizeJsonDataImpression > maxSize) {
                        throw "Ooops! You have a lot of data on this page!";
                    } else {
                        for (i = 0; i < jsonDataImpression.length; i++) {
                            ga('ec:addImpression', jsonDataImpression[i]);
                        }
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
                ga("send", "event", "Ecommerce", "click", element.data('ec-name'));
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

                if(element.data('ec-list') != "") {
                    ga("ec:setAction", "add", {"list": element.data('ec-list')});
                } else {
                    ga("ec:setAction", "add", {"list": element.data('ec-list')});
                }
                ga("send", "event", "Ecommerce", "addToCart", element.data('ec-name'));
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
                ga("send", "event", "Ecommerce", "RemoveFromCart", element.data('ec-name'));
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

        /**
         * Casos de aplicação do plugin
         */
        switch (settings) {
            case "click": //alternativa para elementos criados após o carregamento da página. Ex: carregados por Ajax
                utils.addActionClick(this);
                break;
            default :
                utils.selectActionByTypePage(this);
                break;
        }
    };

    ga('require', 'ec');

    $('[data-ec=true]').googleEcommerce();

}(jQuery));
