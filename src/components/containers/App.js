import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import * as CONSTS from '../../constants/ReducerConstants';
import * as ACTIONS from '../../action_creators/Main';

const styles = theme => ({
	input: {
		marginLeft: 8,
		flex: 1,
	},
	margin: {
		margin: theme.spacing.unit
	}
});

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {}
	}
	
	render() {
		const { classes, suggestions, MainActions } = this.props;

		MainActions.fetch();
		return (
			<div className="App">
				<Typography variant="headline" component="h3">
					Company search
				</Typography>
				<Paper className={classes.root} elevation={4}>
					<InputBase className={classes.input} placeholder="Search Company" />
					<Divider className={classes.divider} />
					<IconButton className={classes.iconButton} aria-label="Search">
						<SearchIcon />
					</IconButton>
				</Paper>
				<Button variant="contained" size="large" color="primary" className={classes.margin}>
					Search
				</Button>
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
	return {
		MainActions: bindActionCreators(ACTIONS, dispatch)
	};
}
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(App));
