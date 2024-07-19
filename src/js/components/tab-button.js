/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { Icon, close, arrowRight } from '@wordpress/icons';
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * TabButton component
 * Allow updating the single tab title
 *
 * @param {Object}   props          Component properties
 * @param {Function} props.onChange Function to update the tab title
 * @param {string}   props.title    Button title
 *
 * @return {JSX.Element} Rendered component.
 */
export default function TabButton( props ) {
	const { onChange, onClick, onTabRemove, title = '' } = props;

	return (
		<div className="tab__button">
			<Button
				icon={ arrowRight }
				iconPosition="right"
				variant="secondary"
				onClick={ onClick }
				className="wp-block-mah-mah-tabs__button-editor"
			>
				<span
					tabIndex={ 0 }
					role="button"
					onKeyUp={ ( event ) => {
						if ( 'Enter' === event.key ) {
							onTabRemove();
						}
					} }
					onClick={ onTabRemove }
					className="tab__button_link-remove"
				>
					<Icon icon={ close } />
				</span>

				<RichText
					tagName="span"
					value={ title }
					onChange={ onChange }
					placeholder={ __( 'Tab Title', 'mah-tabs' ) }
					className="tab__button_link-text"
				/>
			</Button>
		</div>
	);
}
