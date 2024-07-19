/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal dependencies
*/
import './style.scss';
import './editor.scss';
import Edit from './js/edit';
import metadata from './block.json';
import tabMetadata from './tab/block.json';
import TabEdit from './tab/js/edit';

/**
 * Register tabs block
 */
registerBlockType( metadata.name, {
	edit: Edit,
	save: () => <InnerBlocks.Content />,
} );

/**
 * Register single tab block
 * For the purposes of this tutorial,
 * we will add it along with its parent block.
 */
registerBlockType( tabMetadata.name, {
	edit: TabEdit,
	save: () => <InnerBlocks.Content />,
} );
