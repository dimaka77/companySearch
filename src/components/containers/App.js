import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Autosuggest from '../smart/Autosuggest';
import { withStyles } from '@material-ui/core/styles';
import * as CONSTS from '../../constants/ReducerConstants';

const styles = theme => ({
	root: theme.mixins.gutters({
		paddingTop: 16,
		paddingBottom: 16,
		marginTop: theme.spacing.unit * 3
	}),
});

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {}
	}
	
	render() {
		const { classes, suggestions } = this.props;

		return (
			<div className="App">
				<Paper className={classes.root} elevation={4}>
					<Typography variant="headline" component="h3">
						Company search
					</Typography>
					<Autosuggest suggestions={suggestions.toJS()} />
				</Paper>
			</div>
		);
	}
}
function mapStateToProps(state) {
	const { main } = state;

	return {
		suggestions: main.get(CONSTS.SUGGESTIONS)
	};
}

function mapDispatchToProps(dispatch) {
	return {};
}
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(App));

