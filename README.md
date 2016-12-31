Tooltip Plugin for CKEDITOR 4
=============================
### Manual

Follow these steps:

 1. Download the latest version of the plugin from Github.
 2. Extract the downloaded file into the CKEditor's **plugins** folder.
 3. Enable the plugin by changing or adding the extraPlugins line in your configuration (config.js):

    ````
    config.extraPlugins = 'tooltip';
    ````

## Configuration
The default options can be overriden on config.js.


Balise used for the tooltip:

```
config.tooltip_tag = 'em';
```

Class container the tooltip:

```
config.tooltip_class = 'source-info';
```

Enable/disable Ckeditor in the textarea:

```
config.tooltip_html = true;
```

Configure Button Ckeditor for the textarea :

```
config.tooltip_toolbar = [
    { name: 'document', items: [ 'Source', '-', 'NewPage', 'Preview', '-', 'Templates' ] },
    [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ],
    '/',
    { name: 'basicstyles', items: [ 'Bold', 'Italic' ] }
];
```

## Enable Tooltip with Bootstrap

```
<script>
$(function() {
    //tooltip
    $('em.source-info').tooltip({ //balise.yourClass if you custom plugin
        effect: 'slide',
        trigger: "click", //This is fine if you have links into tooltip
        html: true, //Set false if you disable ckeditor textarea
    });
});
</script>
```
