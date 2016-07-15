CKEDITOR.dialog.add( 'tooltipDialog', function ( editor ) {

    
    if(editor.config.tooltip_html == null){
        editor.config.tooltip_html = true;
    }
    if(editor.config.tooltip_toolbar == null){
        editor.config.tooltip_toolbar = [
		                            { name: 'document', items: [ 'Source', '-', 'NewPage', 'Preview', '-', 'Templates' ] },
		                            [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ],
		                            '/',
		                            { name: 'basicstyles', items: [ 'Bold', 'Italic' ] }
	                            ];
    }
    
    
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
						validate: CKEDITOR.dialog.validate.notEmpty( editor.lang.tooltip.txtErrorEmpty ),
						setup: function( element ) {
							this.setValue( element.getText() );
						},
                        commit: function( element ) {
                            element.setText( this.getValue() );
                        }

					},
					{
						type: 'textarea',
						id: 'tooltip',
						label: editor.lang.tooltip.txtArea,
						validate: CKEDITOR.dialog.validate.notEmpty( editor.lang.tooltip.txtErrorEmpty ),
						//setup permet d'injecter une valeur par exemple au clique droit et edit
						setup: function( element ) {
							this.setValue( element.getAttribute( "title" ) );
						},
						commit: function( element ) {
						
						    if(editor.config.tooltip_html === true)
						    CKEDITOR.instances[this._.inputId].updateElement();
						    
							element.setAttribute( "title", this.getValue() );
							element.setAttribute( "data-cke-saved-title", this.getValue() );
							
						},
						onShow: function() {
						  if(editor.config.tooltip_html === true)
						  CKEDITOR.replace( this._.inputId, {
						    	toolbar: editor.config.tooltip_toolbar
						  });
						},
					    onHide: function() {
					       if(editor.config.tooltip_html === true)
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
			if ( element )
				element = element.getAscendant( 'em', true );
			
			if ( !element || element.getName() != 'em' ) {
				element = editor.document.createElement( 'em' );
				this.insertMode = true;
			}
			else
				this.insertMode = false;
			
			//injecte le contenu existant si c'est une édition
			this.element = element;
			if ( !this.insertMode )
				this.setupContent( this.element );
				
			if (this.insertMode )
				this.setValueOf( 'tab-basic', 'title', textSelected );
			
				
			
		},
		onOk: function() {
            var dialog = this;
            var tooltip = this.element;
			tooltip.setAttribute( 'class', 'source-info' );

            this.commitContent( tooltip );

            if ( this.insertMode )
                editor.insertElement( tooltip );
        }
		
    };
});

