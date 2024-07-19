/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { TAB_BLOCK_NAME } from './utils/constants';
import { useTabs } from './hooks/use-tabs';
import { useHandleTitleChange } from './hooks/use-handle-title-change';
import TabList from './components/tab-list';

/**
 * Edit function
 *
 * @param {Object}   props                 Component properties
 * @param {Object}   props.attributes      Block attributes
 * @param {Array}    props.attributes.tabs Tabs
 * @param {string}   props.clientId        Block client ID
 * @param {Function} props.setAttributes   Block attributes setter
 *
 * @return {JSX.Element} Component JSX
 */
export default function Edit( props ) {
	const {
		attributes: { tabs = [] },
		setAttributes,
	} = props;
	const blockProps = useBlockProps( {
		className: 'alignwide',
	} );
	const { handleRemoveTab, handleAddTab, setActiveTab } = useTabs( props );
	const handleTitleChange = useHandleTitleChange( { setAttributes, tabs } );

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: [ TAB_BLOCK_NAME ],
		templateInsertUpdatesSelection: true,
		template: [ [ TAB_BLOCK_NAME ] ],
		renderAppender: false,
	} );

	useEffect( () => {
		setActiveTab( 0 );
	}, [] ); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			<div { ...blockProps }>
				<TabList
					tabs={ tabs }
					handleAddTab={ handleAddTab }
					handleTitleChange={ handleTitleChange }
					handleRemoveTab={ handleRemoveTab }
					setActiveTab={ setActiveTab }
				/>

				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}
