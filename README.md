# google-ecommerce
jquery for google eCommerce


#Use


1.  If you already have a code implemented. Exclude the following lines:

    ```html
      ga('require', 'ec');
      ga('send', 'pageview');
    ```

2. After include a version of jquery in your code before this plugin. As this:

    ```html
        <body>
        ...
        <script src="http://code.jquery.com/jquery-2.1.3.min.js"></script>
        <script src="<your_public_path_to_plugins>/jquery.google.ecommerce.js"></script>
        </body>
    ```

3.   So, put _jquery.google.ecommerce.js_ in your _<your_public_path_to_plugins>_.

```html
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
 