/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { plus } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import TabButton from './tab-button';

/**
 * TabList component
 * Renders the list of tabs for navigation.
 *
 * todo: Find a way of adding Blockprops to the buttons.
 *
 * @param {Object}   props                   Component properties
 * @param {Array}    props.tabs              Existing tabs.
 * @param {Function} props.handleAddTab      Function to add a new tab.
 * @param {Function} props.handleTitleChange Function to handle title change.
 * @param {Function} props.handleRemoveTab   Function to remove a tab.
 *
 * @return {JSX.Element}      Rendered component.
 */
export default function TabList( props ) {
	const {
		tabs,
		handleAddTab,
		handleTitleChange,
		handleRemoveTab,
		setActiveTab,
	} = props;

	return (
		<div role="tablist" className="wp-block-mah-mah-tabs__list">
			{ tabs.map( ( tab, index ) => {
				return (
					<TabButton
						key={ `tab-${ index }` }
						onChange={ ( value ) =>
							handleTitleChange( value, tab )
						}
						onClick={ () => setActiveTab( tab.index ) }
						onTabRemove={ () =>
							handleRemoveTab( tabs[ tab.index ] )
						}
						title={ tab.title }
					/>
				);
			} ) }

			<Button
				icon={ plus }
				iconPosition="right"
				onClick={ handleAddTab }
				variant="primary"
				className="wp-block-mah-mah-tabs__button-editor"
			>
				{ __( 'Add new Tab', 'mah-tabs' ) }
			</Button>
		</div>
	);
}
