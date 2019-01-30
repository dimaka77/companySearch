import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { ImageEmptyState, ImageNoResults } from './';

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
	const { text, initialLoad, classes } = props;
	const components = {
		empty: ImageEmptyState,
		noResults: ImageNoResults
	};
	const View = initialLoad ? components.empty : components.noResults;

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
	initialLoad: true
};

EmptyPage.propTypes = {
	classes: PropTypes.object,
	text: PropTypes.string,
	initialLoad: PropTypes.bool
};

export default withStyles(style)(EmptyPage);
