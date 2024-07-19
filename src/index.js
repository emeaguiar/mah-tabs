/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';
import './editor.scss';

/**
 * Internal dependencies
 */
import Edit from './js/edit';
import metadata from './block.json';
import tabMetadata from './tab/block.json';
import TabEdit from './tab/js/edit';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save: () => <InnerBlocks.Content />,
} );

/**
 * Single tab block
 * For the purposes of this tutorial,
 * we will add it along with its parent block.
 */
registerBlockType( tabMetadata.name, {
	/**
	 * @see ./tab/js/edit.js
	 */
	edit: TabEdit,

	/**
	 * @see ./tab/js/save.js
	 */
	save: () => <InnerBlocks.Content />,
} );
