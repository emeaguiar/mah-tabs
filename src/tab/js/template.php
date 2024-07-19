<?php
/**
 * Block template.
 *
 * @var array $attributes Block attributes.
 * @var string $content Block default content.
 * @var \WP_Block $block Block instance.
 *
 * @package CreateBlock
 */

// Block level classes and styles.
$wrapper_attributes = get_block_wrapper_attributes(
	[
		'id'              => sprintf( 'tab-%d', $attributes['index'] ?? 0 ),
		'role'            => 'tabpanel',
		'aria-labelledby' => sprintf( 'tab-%d-tab', $attributes['index'] ?? 0 ),
		'class'           => 'tabs--active', // Tabs are visible if no js is available.
	]
);


?>

<div <?php echo wp_kses( $wrapper_attributes, [] ); ?>>
	<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Already sanitized. ?>
</div>
