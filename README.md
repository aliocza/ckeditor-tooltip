Tooltip Plugin for CKEDITOR 4
=============================


## Configuration
The default options can be overriden on config.js.


Ckeditor textare:

```
config.tooltip_html = true;
```

Ckeditor Button:

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
$(function() {
    //tooltip
    $('em.source-info').tooltip({
        effect: 'slide',
        trigger: "click", //This is fine if you have links into tooltip
        html: true, //Set false if you disable ckeditor textarea
    });
});
```
