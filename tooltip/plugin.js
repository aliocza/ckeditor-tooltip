/*
* Tooltip Plugin
*
* @author Aliocha Mazurkiewicz <contact@renska.be>
* @version 0.5.0
*/
CKEDITOR.plugins.add('tooltip', {
  lang: [
    'en', 'fr'
  ],
  afterInit: function(editor) {
    CKEDITOR.addCss('.cke_editable .' + editor.config.tooltip_class + '{' + 'cursor:pointer' + '}');
  },
  init: function(editor) {

    // crée le button
    editor.ui.addButton('Tooltip', {
      label: editor.lang.tooltip.button,
      command: 'tooltip',
      toolbar: 'insert',
      icon: this.path + 'icons/tooltip.png'
    });
    editor.ui.addButton('RemoveTooltip', {
      label: editor.lang.tooltip.remove,
      command: 'removeTooltip',
      toolbar: 'insert',
      icon: this.path + 'icons/tooltip-remove.png'
    });

    // quand on clique sur le button, il appelle après le dialog
    editor.addCommand('tooltip', new CKEDITOR.dialogCommand('tooltipDialog'));
    editor.addCommand('removeTooltip', new CKEDITOR.removeTooltipCommand());
    CKEDITOR.dialog.add('tooltipDialog', this.path + 'dialogs/tooltip.js');

    // crée un button clique droit
    if (editor.contextMenu) {
      editor.addMenuGroup('tooltipGroup');
      // If the "menu" plugin is loaded, register the menu items.
      if (editor.addMenuItems) {
        editor.addMenuItems({
          tooltipItem: {
            label: 'Editer l\'information',
            command: 'tooltip',
            group: 'tooltipGroup',
            icon: this.path + 'icons/tooltip.png',
            order: 1
          },

          removeTooltipItem: {
            label: 'Supprimer l\'information',
            command: 'removeTooltip',
            icon: this.path + 'icons/tooltip-remove.png',
            group: 'tooltipGroup',
            order: 2
          }
        });
      }

      // identifie au clique droit de l'element si c'est bien un type tooltip

      editor.contextMenu.addListener(function(element) {
        if (element.getAscendant(editor.config.tooltip_tag, true)) {
          var menu = {};
          if (element.hasClass(editor.config.tooltip_class)) {
            menu = {
              'tooltipItem': CKEDITOR.TRISTATE_OFF,
              'removeTooltipItem': CKEDITOR.TRISTATE_OFF
            };
            return menu;
          }
        }
      });
    }

    // affiche l'edition au double clique
    editor.on('doubleclick', function(evt) {
      var element = evt.data.element;

      if (element.is(editor.config.tooltip_tag) && element.hasClass(editor.config.tooltip_class))
        evt.data.dialog = 'tooltipDialog';

      }
    );

  }
});

CKEDITOR.removeTooltipCommand = function() {};
CKEDITOR.removeTooltipCommand.prototype = {

  exec: function(editor) {
    var style = new CKEDITOR.style({element: editor.config.tooltip_tag, type: CKEDITOR.STYLE_INLINE, alwaysRemoveElement: 1});
    editor.removeStyle(style);
  },

  refresh: function(editor, path) {
    // Despite our initial hope, document.queryCommandEnabled() does not work
    // for this in Firefox. So we must detect the state by element paths.

    var element = path.lastElement && path.lastElement.getAscendant(editor.config.tooltip_tag, true);

    if (element && element.getName() == editor.config.tooltip_tag && element.getAttribute('title') && element.getChildCount())
      this.setState(CKEDITOR.TRISTATE_OFF);
    else
      this.setState(CKEDITOR.TRISTATE_DISABLED);
    }
  ,

  contextSensitive: 1,
  startDisabled: 1,
  requiredContent: CKEDITOR.config.tooltip_tag + "[title]"
};

CKEDITOR.config.tooltip_tag = 'span';
CKEDITOR.config.tooltip_class = 'source-info';
CKEDITOR.config.tooltip_html = true;
CKEDITOR.tooltip_toolbar = [
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
CKEDITOR.config.tooltip_styleSet = 'default';
