import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { ImageEmptyState, ImageNoResults } from '../dumb';

const style = {
	container: {
		textAlign: 'center',
		width: '100%'
	},
	image: {
		marginLeft: '45px',
		width: '320px'
	},
	text: {
		color: 'rgba(74,74,74,.22)',
		fontFamily: 'montserrat_light, sans-serif',
		fontSize: '32px',
		margin: '30px 0 40px'
	}
};

const EmptyPage = (props) => {
	const { text, type, classes } = props;
	const components = { empty: ImageEmptyState, noResults: ImageNoResults };
	const View = type === 'new' ? components.empty : components.noResults;

	return (
		<div style={style.container}>
			<Typography align="center" classes={{ root: classes.text }}>{text}</Typography>
			<View style={style.image} />
		</div>
	);
};

EmptyPage.defaultProps = {
	classes: {},
	text: '',
	type: ''
};

EmptyPage.propTypes = {
	classes: PropTypes.object,
	text: PropTypes.string,
	type: PropTypes.string
};

export default withStyles(style)(EmptyPage);
