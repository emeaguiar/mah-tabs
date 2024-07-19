
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
		'class' => 'alignwide',
	]
);

$block_tabs  = $attributes['tabs'] ?? [];
$block_title = $attributes['title'] ?? '';
$description = $attributes['description'] ?? '';
?>

<div <?php echo wp_kses( $wrapper_attributes, [] ); ?>>
	<ul class="wp-block-mah-mah-tabs__list" role="tablist">
		<?php foreach ( $block_tabs as $index => $block_tab ) : ?>
			<li role="presentation" class="wp-block-mah-mah-tabs__item">
				<button
					class="wp-block-mah-mah-tabs__button"
					role="tab"
					aria-controls="tab-<?php echo esc_attr( $index ); ?>"
					aria-selected="<?php echo 0 === $index ? 'true' : 'false'; ?>"
					id="tab-<?php echo esc_attr( $index ); ?>-tab"
				>
					<?php echo esc_html( $block_tab['title'] ); ?>
				</button>
			</li>
		<?php endforeach; ?>
	</ul>

	<?php if ( ! empty( $block_tabs ) ) : ?>
		<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Already escaped. ?>
	<?php endif; ?>
</div>
