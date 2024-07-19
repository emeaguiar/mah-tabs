/**
 * Handle title change
 * Update the tab title
 *
 * @param {Object}   props                 Component properties
 * @param {Object}   props.attributes      Block attributes
 * @param {Array}    props.attributes.tabs Existing tabs array
 * @param {Function} props.setAttributes   Function to set attributes value
 *
 * @return {Function} Title update handling function
 */
export const useHandleTitleChange = ( props ) => {
	const { tabs = [], setAttributes } = props;

	return ( newTitle, tab ) => {
		const newObject = Object.assign( {}, tab, {
			title: newTitle,
		} );

		const updatedTabs = tabs.map( ( item ) => {
			if ( item.index === tab.index ) {
				return newObject;
			}

			return item;
		} );

		setAttributes( {
			tabs: [ ...updatedTabs ],
		} );
	};
};
