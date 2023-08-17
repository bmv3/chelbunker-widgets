/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save( props ) {
	const {
		attributes: {
			title,
			thumbsID,
			thumbsURL,
			link,
			address,
			actor,
			mechanics,
			booking,
			censore,
		},
	} = props;

	const censorePart = ( censore ) => {
		let censorePart = <div class={ `item ${ censore }w` }></div>;
	};
	console.log(props)

	return (
		<p { ...useBlockProps.save() }>
			<h2>{ title }</h2>
			<div class="thumbs">
				<img decoding="async" src={ thumbsURL } alt={ title } />
				<p></p>
				<div class="box">
					<div class="action new"></div>
					<div class="items">
						<censorePart censore={ censore } />
						{ actor ? (
							<div class="item acter">Актеры</div>
						) : (
							<div class="item"></div>
						) }
						{ mechanics ? (
							<div class="item item meh">Механизмы</div>
						) : (
							<div class="item"></div>
						) }
						<div class="item address">{ address }</div>
					</div>
				</div>
			</div>
			<p>
				<a href={ link } class="btn  btn-large btn-danger btn-order">
					<i class="fa fa-calendar"></i>
					{ booking }
				</a>
			</p>
		</p>
	);
}
