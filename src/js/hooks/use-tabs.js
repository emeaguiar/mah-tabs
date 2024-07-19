/**
 * WordPress dependencies
 */
import { store as blockEditorStore } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
import { useDispatch, select } from '@wordpress/data';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { TAB_BLOCK_NAME } from '../utils/constants';

/**
 * Tabs function
 * Add a new tab to the tabs array
 * and create a new tab block.
 *
 * @param {Object}   props                 Component properties
 * @param {Object}   props.attributes      Block attributes
 * @param {Array}    props.attributes.tabs Existing tabs array
 * @param {Function} props.setAttributes   Function to set attributes value
 *
 * @return {Function} New tab handling function
 */
export const useTabs = ( props ) => {
	const {
		attributes: { tabs = [] },
		clientId,
		setAttributes,
	} = props;

	const [ , setActiveTabIndex ] = useState( 0 );

	const { replaceInnerBlocks } = useDispatch( blockEditorStore );
	const { getBlocks } = select( blockEditorStore );

	const handleAddTab = () => {
		const tabCounter = tabs.length;
		const newTabAttributes = {
			index: tabCounter,
		};
		const innerBlocksArray = getBlocks( clientId );

		setAttributes( {
			tabs: [
				...tabs,
				{
					...newTabAttributes,
				},
			],
		} );

		const newTabBlock = createBlock( TAB_BLOCK_NAME, newTabAttributes );
		const blocks = [ ...innerBlocksArray, ...[ newTabBlock ] ];

		setActiveTab( tabs.length, blocks );
	};

	/**
	 * Set active tab.
	 * This function will set the active tab index and update the inner blocks attributes,
	 * to display the active tab only
	 *
	 * @param {number} tabIndex Active tab index
	 * @param {Array}  blocks   Existing inner blocks array
	 *
	 * @return {void}
	 */
	const setActiveTab = ( tabIndex, blocks = [] ) => {
		setActiveTabIndex( tabIndex );

		if ( 0 === blocks.length ) {
			blocks = getBlocks( clientId );
		}

		// Replace inner blocks attributes.
		const newInnerBlocks = blocks.map( ( innerBlock, index ) => {
			innerBlock.attributes.style = { display: 'none' };

			if ( tabIndex === index ) {
				innerBlock.attributes.style = { display: 'grid' };
			}

			return innerBlock;
		} );

		replaceInnerBlocks( clientId, newInnerBlocks, false );
	};

	/**
	 * Action to remove a tab
	 *
	 * @param {Object} tab Tab to remove.
	 *
	 * @return {void}
	 */
	const handleRemoveTab = ( tab ) => {
		/**
		 * Loop through the available tabs and find the tab passed as argument.
		 *
		 * @return Index in array from the tab to remove
		 */
		const newTabs = tabs
			.filter( ( item ) => item.index !== tab.index )
			.map( ( index ) => {
				if ( index.index > tab.index ) {
					index.index -= 1;
				}

				return index;
			} );

		setAttributes( {
			tabs: newTabs,
		} );

		/**
		 * By default, WordPress does not allow to update InnerBock component with new changes
		 * To delete all items under a tab we have to find client id of tab and remove it using
		 * dispatch method
		 */
		const blocks = getBlocks( clientId );
		blocks.splice( tab.index, 1 );

		// Reset block indexes.
		blocks.forEach( ( block, index ) => {
			block.attributes.index = index;
		} );

		/**
		 * Set active tab and update blocks
		 */
		const previousTabIndex =
			parseInt( tab.index, 10 ) > 0 ? parseInt( tab.index, 10 ) - 1 : 0;

		setActiveTab( previousTabIndex, blocks );
	};

	return {
		handleAddTab,
		setActiveTab,
		handleRemoveTab,
	};
};
