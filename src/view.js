/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';

/**
 * Tabs block class
 * Manages hiding / showing tabs
 */
class Tabs {
	/**
	 * Constructor
	 * @param {HTMLElement} block The tabs block
	 */
	constructor( block ) {
		this.block = block;
		this.tabList = block.querySelector( '[role="tablist"]' );
		this.tabFocus = 0;
	}

	/**
	 * Initialize the tabs block
	 */
	init() {
		if ( ! this.tabList ) {
			return;
		}

		this.tabButtons = this.block.querySelectorAll( '[role="tab"]' );
		this.tabs = this.block.querySelectorAll( '[role="tabpanel"]' );

		// Only focus first tab on load.
		this.changeTo( this.tabs[ 0 ].getAttribute( 'id' ) );

		this.attachTabButtonsEvents();

		this.enableArrowNavigation();
	}

	/**
	 * Attach events to tab buttons
	 */
	attachTabButtonsEvents() {
		this.tabButtons.forEach( ( tabButton ) => {
			tabButton.addEventListener( 'click', ( event ) => {
				const clickedButton = event.target.closest( '[role="tab"]' );
				const tabTarget = clickedButton.getAttribute( 'aria-controls' );

				this.changeTo( tabTarget );
			} );
		} );
	}

	/**
	 * Enable arrow navigation between tabs in the tab list
	 */
	enableArrowNavigation() {
		this.tabList.addEventListener( 'keydown', ( event ) => {
			const { key } = event;
			// Move right
			if ( key !== 'ArrowDown' && key !== 'ArrowUp' ) {
				return;
			}

			this.tabButtons[ this.tabFocus ].setAttribute( 'tabindex', '-1' );

			if ( key === 'ArrowDown' ) {
				this.tabFocus++;
				// If we're at the end, go to the start
				if ( this.tabFocus >= this.tabButtons.length ) {
					this.tabFocus = 0;
				}
				// Move left
			} else if ( key === 'ArrowUp' ) {
				this.tabFocus--;
				// If we're at the start, move to the end
				if ( this.tabFocus < 0 ) {
					this.tabFocus = this.tabButtons.length - 1;
				}
			}

			this.tabButtons[ this.tabFocus ].setAttribute( 'tabindex', '0' );
			this.tabButtons[ this.tabFocus ].focus();
		} );
	}

	/**
	 * Change the active tab
	 *
	 * @param {string} target Tab to display.
	 */
	changeTo( target ) {
		this.resetTabs();

		// Add the active class to the clicked tab
		this.block
			.querySelector( `#${ target }` )
			.classList.add( 'wp-block-mah-mah-tab--active' );
		this.block
			.querySelector( `[aria-controls="${ target }"]` )
			.setAttribute( 'aria-selected', 'true' );
	}

	/**
	 * Remove the active class from all tabs
	 * and remove the aria-selected attribute
	 */
	resetTabs() {
		this.block
			.querySelectorAll( '[aria-selected="true"]' )
			.forEach( ( tabButton ) => {
				tabButton.removeAttribute( 'aria-selected' );
			} );

		this.tabs.forEach( ( tab ) => {
			tab.classList.remove( 'wp-block-mah-mah-tab--active' );
		} );
	}
}

domReady( () => {
	const tabBlocks = document.querySelectorAll( '.wp-block-mah-mah-tabs' );

	if ( ! tabBlocks ) {
		return;
	}

	tabBlocks.forEach( ( singleBlock ) => {
		const tabsInstance = new Tabs( singleBlock );

		tabsInstance.init();
	} );
} );
