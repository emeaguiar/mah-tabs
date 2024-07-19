/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * Edit function
 *
 * @param {Object} props                  Block properties.
 * @param {Object} props.attributes       Block attributes.
 * @param {Object} props.attributes.style Block style.
 *
 * @return {JSX.Element} 	 Rendered block edit component.
 */
export default function Edit( props ) {
	const {
		attributes: { style },
	} = props;
	const blockProps = useBlockProps( {
		style,
	} );
	const { children, ...innerBlocksProps } = useInnerBlocksProps( blockProps, {
		templateInsertUpdatesSelection: true,
		template: [
			[
				'core/paragraph',
				{
					placeholder: 'Tab content',
				},
			],
		],
	} );

	return <div { ...innerBlocksProps }>{ children }</div>;
}
