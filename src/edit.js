/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	RichText,
	PlainText,
	MediaUpload,
	useBlockProps,
} from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

import { CheckboxControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { CustomSelectControl } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( props ) {
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
		setAttributes,
	} = props;

	const options = [
		{ key: 'censor0', name: '0+' },
		{ key: 'censor6', name: '6+' },
		{ key: 'censor15', name: '15+' },
	];

	const blockProps = useBlockProps();
	const onChangeTitle = ( value ) => {
		setAttributes( { title: value } );
	};
	const onChangeBookingTitle = ( value ) => {
		setAttributes( { booking: value } );
	};
	const onChangeCensore = ( value ) => {
		setAttributes( { censore: value.selectedItem.key } );
	};

	const onChangeAddress = ( value ) => {
		setAttributes( { address: value } );
	};
	const onChangeLink = ( value ) => {
		setAttributes( { link: value } );
	};
	const onChangeActor = ( value ) => {
		setAttributes( { actor: value } );
		setChecked( value );
	};
	const onChangeMechanics = ( value ) => {
		setMechanics( value );
		setAttributes( { mechanics: value } );
	};
	const onSelectImage = ( media ) => {
		setAttributes( {
			thumbsID: media.id,
			thumbsURL: media.sizes.medium.url,
		} );
	};

	const [ isChecked, setChecked ] = useState( actor );
	const [ isMechanics, setMechanics ] = useState( mechanics );

	return (
		<div { ...blockProps }>
			<PlainText
				placeholder="Название"
				onChange={ onChangeTitle }
				value={ title }
			/>
			<PlainText
				placeholder="Записаться на ..."
				onChange={ onChangeBookingTitle }
				value={ booking }
			/>

			<CustomSelectControl
				__nextUnconstrainedWidth
				label="Возрастная категория"
				options={ options }
				onChange={ onChangeCensore }
			/>
			<PlainText
				placeholder="Адрес"
				onChange={ onChangeAddress }
				value={ address }
			/>
			<PlainText
				placeholder="Ссылка"
				onChange={ onChangeLink }
				value={ link }
			/>
			<CheckboxControl
				label="Актер"
				help="Будут ли актеры?"
				checked={ isChecked }
				onChange={ () => onChangeActor( ! isChecked ) }
			/>
			<CheckboxControl
				label="Механизмы"
				help="Будут ли механизмы?"
				checked={ isMechanics }
				onChange={ () => onChangeMechanics( ! isMechanics ) }
			/>
			<MediaUpload
				onSelect={ onSelectImage }
				allowedTypes="image"
				value={ thumbsID }
				render={ ( { open } ) => (
					<Button
						className={
							thumbsID ? 'image-button' : 'button button-large'
						}
						onClick={ open }
					>
						{ ! thumbsID ? (
							__( 'Загрузите фото', 'gutenberg-examples' )
						) : (
							<img
								src={ thumbsURL }
								alt={ __(
									'Upload photo',
									'gutenberg-examples'
								) }
							/>
						) }
					</Button>
				) }
			/>
		</div>
	);
}
