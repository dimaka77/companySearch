import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';
import * as CONSTS from '../../constants/ReducerConstants';
import * as ACTIONS from '../../action_creators/Main';

const styles = theme => ({
	card: {
		display: 'flex'
	},
	details: {
		display: 'flex',
		flexDirection: 'column'
	},
	cover: {
		width: 151
	},
	progress: {
		margin: theme.spacing.unit * 2
	},
	root: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: 400,
		margin: '0 auto'
	},
	input: {
		marginLeft: 8,
		flex: 1,
	},
	margin: {
		margin: theme.spacing.unit
	},
	iconButton: {
		padding: 10
	},
	divider: {
		width: 1,
		height: 28,
		margin: 4
	}
});

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeTab: 0,
			searchValue: ''
		}
	}

	handleInputChange = ({ target: { value } }) => {
		this.setState({
			searchValue: value
		});
	}

	handleSearch = () => {
		const {
			state: { searchValue },
			props: { MainActions }
		} = this;

		MainActions.fetch(searchValue);
	}

	handleTabChange = (event, value) => {
		this.setState({
			activeTab: value
		});
	}

	TabContainer = ({ children, dir }) => {
		return (
			<Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
				{children}
			</Typography>
		);
	}

	renderMediaCard = () => {
		const { classes } = this.props;
		return (
			<Card className={classes.card}>
				<div className={classes.details}>
					<CardContent className={classes.content}>
						<CardMedia
							className={classes.cover}
							image="/static/images/cards/live-from-space.jpg"
							title="Live from space album cover"
						/>
						<Typography component="h5" variant="h5">
							Live From Space
						</Typography>
						<Typography variant="subtitle1" color="textSecondary">
							Mac Miller
						</Typography>
					</CardContent>
				</div>
			</Card>
		)
	}

	renderTabs = () => {
		const {
			TabContainer,
			state: { activeTab },
			props: { classes },
		} = this;
		
		console.log('TCL: renderTabs -> props', this.props.companyData.toJS())
		return (
			<div className={classes.root}>
				<AppBar position="static" color="default">
					<Tabs
						value={activeTab}
						onChange={this.handleTabChange}
						indicatorColor="primary"
						textColor="primary"
					>
						<Tab label="Item One" />
						<Tab label="Item Two" />
						<Tab label="Item Three" />
					</Tabs>
				</AppBar>
				{activeTab === 0 && <TabContainer>Item One</TabContainer>}
				{activeTab === 1 && <TabContainer>Item Two</TabContainer>}
				{activeTab === 2 && <TabContainer>Item Three</TabContainer>}
			</div>
		)
	}

	render() {
		const {
			renderTabs,
			renderMediaCard,
			props: { classes, loading },
			state: { searchValue }
		} = this;

		return (
			<div className="App">
				<Typography variant="headline" component="h3">
					Company search
				</Typography>
				<Paper className={classes.root} elevation={4}>
					<InputBase
						autoFocus
						className={classes.input}
						onChange={this.handleInputChange}
						value={searchValue}
						placeholder="Search Company"
					/>
					<Divider className={classes.divider} />
					<IconButton
						className={classes.iconButton}
						aria-label="Search"
						onClick={this.handleSearch}
					>
						<SearchIcon />
					</IconButton>
				</Paper>
				<Paper elevation={1}>
					{loading && <div>
						<CircularProgress className={classes.progress} />
					</div>}
					{renderMediaCard()}
					{renderTabs()}
				</Paper>
			</div>
		);
	}
}
function mapStateToProps(state) {
	const { main } = state;

	return {
		loading: main.get(CONSTS.LOADING),
		companyData: main.get(CONSTS.COMPANY_DATA)
	};
}

function mapDispatchToProps(dispatch) {
	return {
		MainActions: bindActionCreators(ACTIONS, dispatch)
	};
}
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(App));
