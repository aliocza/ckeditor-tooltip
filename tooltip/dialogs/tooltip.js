/*
* Tooltip Plugin
*
* @author Aliocha Mazurkiewicz <contact@renska.be>
* @version 0.5.0
*/
CKEDITOR.dialog.add('tooltipDialog', function(editor) {

  return {
    title: editor.lang.tooltip.title,
    minWidth: 600,
    minHeight: 150,

    contents: [
      {
        //crée une tab avec des élèments
        id: 'tab-basic',
        label: editor.lang.tooltip.tab,
        elements: [
          {
            type: 'text',
            id: 'title',
            label: editor.lang.tooltip.txtTitle,
            validate: CKEDITOR.dialog.validate.notEmpty(editor.lang.tooltip.txtErrorEmpty),
            setup: function(element) {
              this.setValue(element.getText());
            },
            commit: function(element) {
              element.setText(this.getValue());
            }

          }, {
            type: 'textarea',
            id: 'tooltip',
            label: editor.lang.tooltip.txtArea,
            validate: function() {
              if (editor.config.tooltip_html === true)
                CKEDITOR.instances[this._.inputId].updateElement();

              if (this.getValue().length < 1) {
                alert(editor.lang.tooltip.txtErrorEmpty);
                return false;
              };
            },
            //setup permet d'injecter une valeur par exemple au clique droit et edit
            setup: function(element) {
              this.setValue(element.getAttribute("title"));
            },
            commit: function(element) {

              if (editor.config.tooltip_html === true)
                CKEDITOR.instances[this._.inputId].updateElement();

              element.setAttribute("title", this.getValue());
              element.setAttribute("data-cke-saved-title", this.getValue());

            },
            onShow: function() {
              if (editor.config.tooltip_html === true)
                CKEDITOR.replace(this._.inputId, {toolbar: editor.config.tooltip_toolbar, stylesSet: editor.config.tooltip_styleSet, baseFloatZIndex: 10010});
              }
            ,
            onHide: function() {
              if (editor.config.tooltip_html === true)
                CKEDITOR.instances[this._.inputId].destroy();
              }

          }
        ]
      }
    ],

    onShow: function() {
      //récupere la sélection et l'élèment
      var selection = editor.getSelection();
      var element = selection.getStartElement();

      var textSelected = selection.getSelectedText();

      //vérifie que l'élèment est bien un type em
      if (element)
        element = element.getAscendant(editor.config.tooltip_tag, true);

      if (!element || element.getName() != editor.config.tooltip_tag) {
        element = editor.document.createElement(editor.config.tooltip_tag);
        this.insertMode = true;
      } else
        this.insertMode = false;

      //injecte le contenu existant si c'est une édition
      this.element = element;
      if (!this.insertMode)
        this.setupContent(this.element);

      if (this.insertMode)
        this.setValueOf('tab-basic', 'title', textSelected);

      }
    ,
    onOk: function() {
      var dialog = this;
      var tooltip = this.element;
      tooltip.setAttribute('class', editor.config.tooltip_class);

      this.commitContent(tooltip);

      if (this.insertMode)
        editor.insertElement(tooltip);
      }

  };
});
