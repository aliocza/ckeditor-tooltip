/*
* Tooltip Plugin
*
* @author Aliocha Mazurkiewicz <contact@renska.be>
* @version 0.1.0
*/
CKEDITOR.plugins.add( 'tooltip', {
    lang: [ 'en', 'fr'],
    init: function( editor ) {
		// crée le button
		editor.ui.addButton( 'Tooltip', {
			label: editor.lang.tooltip.button,
			command: 'tooltip',
			toolbar: 'insert',
			icon: this.path + 'icons/tooltip.png'
		});
		editor.ui.addButton( 'RemoveTooltip', {
					label: editor.lang.link.unlink,
					command: 'removeTooltip',
					toolbar: 'insert',
					icon: this.path + 'icons/tooltip.png'
        } );
		
		// quand on clique sur le button, il appelle après le dialog
        editor.addCommand( 'tooltip', new CKEDITOR.dialogCommand( 'tooltipDialog' ) );
        editor.addCommand( 'removeTooltip', new CKEDITOR.removeTooltipCommand() );
		CKEDITOR.dialog.add( 'tooltipDialog', this.path + 'dialogs/tooltip.js' );
		
		
		// crée un button clique droit
		if ( editor.contextMenu ) {
			editor.addMenuGroup( 'tooltipGroup' );
			editor.addMenuItem( 'tooltipItem', {
				label: 'Editer l\'information',
				icon: this.path + 'icons/tooltip-remove.png',
				command: 'tooltip',
				group: 'tooltipGroup'
			});
		
		
		// identifie au clique droit de l'element si c'est bien un type tooltip
	
			editor.contextMenu.addListener( function( element ) {
				if ( element.getAscendant( 'em', true )) {
					if(element.hasClass('source-info')){
						return { tooltipItem: CKEDITOR.TRISTATE_OFF };
					}
				}
			});
		}
		
		// affiche l'edition au double clique
		editor.on( 'doubleclick', function( evt )
        {
				var element = evt.data.element;

				if ( element.is( 'em' ) && element.hasClass('source-info') )
					evt.data.dialog = 'tooltipDialog';

		});

    }
});

	CKEDITOR.removeTooltipCommand = function() {};
	CKEDITOR.removeTooltipCommand.prototype = {
		exec: function( editor ) {
			var style = new CKEDITOR.style( { element: 'em', type: CKEDITOR.STYLE_INLINE, alwaysRemoveElement: 1 } );
			editor.removeStyle( style );
		},

		refresh: function( editor, path ) {
			// Despite our initial hope, document.queryCommandEnabled() does not work
			// for this in Firefox. So we must detect the state by element paths.

			var element = path.lastElement && path.lastElement.getAscendant( 'em', true );

			if ( element && element.getName() == 'em' && element.getAttribute( 'title' ) && element.getChildCount() )
				this.setState( CKEDITOR.TRISTATE_OFF );
			else
				this.setState( CKEDITOR.TRISTATE_DISABLED );
		},

		contextSensitive: 1,
		startDisabled: 1,
		requiredContent: 'em[title]'
    };
