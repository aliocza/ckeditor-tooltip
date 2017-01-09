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
config.tooltip_tag = 'span';
```

Class container the tooltip:

```
config.tooltip_class = 'source-info';
```

Enable/disable Ckeditor in the textarea:

```
config.tooltip_html = true;
```

Configure Toolbar Ckeditor for the textarea :

```
config.tooltip_toolbar = [
	{ name: 'document', groups: [ 'mode', 'document', 'doctools' ], items: [ 'Source', '-', 'Save', 'NewPage', 'Preview', 'Print', '-', 'Templates' ] },
	{ name: 'clipboard', groups: [ 'clipboard', 'undo' ], items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
	{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker' ], items: [ 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ] },
	{ name: 'forms', items: [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
	'/',
	{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat' ] },
	{ name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ], items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language' ] },
	{ name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
	{ name: 'insert', items: [ 'Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe' ] },
	'/',
	{ name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
	{ name: 'colors', items: [ 'TextColor', 'BGColor' ] },
	{ name: 'tools', items: [ 'Maximize', 'ShowBlocks' ] },
	{ name: 'others', items: [ '-' ] },
	{ name: 'about', items: [ 'About' ] }
];
```

StyleSet Ckeditor for the textarea :

```
config.tooltip_styleSet = 'default';
```

## Enable Tooltip with Bootstrap

```
<script>
$(function() {
    //tooltip
    $('span.source-info').tooltip({ //balise.yourClass if you custom plugin
        effect: 'slide',
        trigger: "click", //This is fine if you have links into tooltip
        html: true, //Set false if you disable ckeditor textarea
    });
});
</script>
```
