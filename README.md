# google-ecommerce
jquery for google eCommerce


#Use

1. Include jquery a version of jquery in your code and after include. As this:

```html
    <script src="http://code.jquery.com/jquery-2.1.3.min.js"></script>
```

2. If you already have a code implemented. Exclude the following lines:

```javascript  
  ga('require', 'ec');
  ga('send', 'pageview');
```

3. After that Include this code. Where "<your_public_path_to>" is your public path.

```html
    <script src="<your_public_path_to>/jquery.google.ecommerce.js"></script>
```

#Optional
When you want send a specific route to pageview search this code

```javascript
    ga('create', 'UA-6########-#', 'auto');
```

and include this variable after with your route

```javascript
    dataECPageView = "route_to_my_product_list;
```

as example

```javascript
    ga('create', 'UA-########-#', 'auto');
    dataECPageView = window.location.pathname;
```
 