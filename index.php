<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../../favicon.ico">
    <title>Google eCommerce</title>

    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">

    <!-- Custom styles for this template -->
    <link rel="stylesheet" href="https://bootswatch.com/flatly/bootstrap.min.css">

    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    <!-- Google Analytics -->
    <script>
        (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date();
            a = s.createElement(o),
                    m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', 'http://www.google-analytics.com/analytics.js', 'ga');

        ga('create', 'UA-60911933-1', 'auto');
    </script>
    <!-- End Google Analytics -->
</head>

<body>

<div class="container" style="margin-top: 20px;">
    <div class="row">
        <?php $i = 0; ?>
        <?php for ($i=1; $i<=24; $i++) { ?>
            <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2">
                <div class="thumbnail" data-ec="true" data-ec-id="<?php echo $i?>" data-ec-name="NAME <?php echo $i?>" data-ec-price="<?php echo $i?>.00" data-ec-category="CATEGORY <?php echo $i?>" data-ec-brand="BRAND <?php echo $i?>" data-ec-variant="VARIANT <?php echo $i?>" data-ec-list="LIST" data-ec-position="<?php echo $i?>" data-ec-dimension="DIMENSION <?php echo $i?>">
                    <img src="http://lorempixel.com/400/400/" alt="" class="img-responsive"/>
                    <a href="#" class="btn btn-primary btn-block btn-xs" data-ec-click="addCard" data-ec-id="<?php echo $i?>"> Adicionar ao carrinho </a>
                </div>
            </div>
        <?php } ?>
    </div>
</div>

<script src="http://code.jquery.com/jquery-2.1.3.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
<script src="jquery.google.ecommerce.js"></script>
</body>
</html>
