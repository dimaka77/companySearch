import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { EmptyPage } from '../dumb';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';

import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
	mainContainer: {
		height: '100vh',
		width: '100vw',
		maxWidth: '80vw',
		margin: '20px auto'
	},
	card: {
		display: 'flex'
	},
	chip: {
		margin: theme.spacing.unit
	},
	details: {
		display: 'flex',
		flexDirection: 'column'
	},
	avatar: {
		display: 'inline-block',
		margin: 10,
		width: 60,
		height: 60,
	},
	avatarImg: {
		objectFit: 'fill'
	},
	cardTextBlock: {
		display: 'inline-block',
		height: '75px',
		verticalAlign: 'top',
		padding: '10px 15px'
	},
	mediaCard: {
		width: '100%',
		margin: '20px 0'
	},
	progressCircle: {
		margin: theme.spacing.unit * 2,
		textAlign: 'center'
	},
	progressCircleColor: {
		color: '#000'
	},
	inputRoot: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: 400,
		margin: '0 auto'
	},
	infoSection: {
		position: 'relative'
	},
	tabBar: {
		backgroundColor: '#fff'
	},
	tabSection: {
		padding: '0 15px',
		position: 'relative',
		top: '60px'
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
			initialLoad: true,
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

		MainActions.fetch(searchValue)
			.then(() => this.setState({
				initialLoad: false,
				searchValue: '',
				activeTab: 0
			})
		);
	}

	handleTabChange = (event, value) => {
		this.setState({
			activeTab: value
		});
	}

	renderMediaCard = () => {
		const {
			classes,
			companyData
		} = this.props;

		return (
			companyData.get('list').size ?
				<Card className={classes.card}>
					<div className={classes.details}>
						<CardContent className={classes.content}>
							<Avatar
								alt="company-image"
								classes={{ root: classes.avatar, img: classes.avatarImg }}
								src={companyData.getIn(['data', 'source']) || ''}
							/>
							<div className={classes.cardTextBlock}>
								<Typography component="h5" variant="h5">
									{companyData.getIn(['data', 'title'])}
								</Typography>
								<Typography variant="subtitle1" color="textSecondary">
									{companyData.getIn(['data', 'description'])}
								</Typography>
							</div>
						</CardContent>
					</div>
				</Card>
			: null
		)
	}

	renderWikiSection = (tabData = {}) => {
		const { classes } = this.props;

		return (
			<section
				className={classes.tabSection}
				key={tabData.get('pageid')}
			>
				<div dangerouslySetInnerHTML={{
					__html: tabData.get('extract_html')
				}} />
			</section>
		)
	}

	renderGithubSection = (tabData = {}) => {
		const { classes } = this.props;

		return (
			<section
				className={classes.tabSection}
				key={tabData.get('id')}
			>
				<div>
					<Avatar
						alt="github-image"
						classes={{ root: classes.avatar, img: classes.avatarImg }}
						src={tabData.get('avatar_url') || ''}
					/>
				</div>
				<div>{`Description: ${tabData.get('description')}`}</div>
				<div>{`Email: ${tabData.get('email')}`}</div>
				<div>URL:&nbsp;
					<a
						href={tabData.get('html_url')}
						target="_blank"
						rel="noopener noreferrer"
					>
					{tabData.get('url')}
					</a>
				</div>
			</section>
		);
	}

	renderGithubRepoSection = (tabData = {}, tab = 'githubRepos') => {
		const { classes, companyData } = this.props;

		return (
			<section
				className={classes.tabSection}
				key={tab}
			>
				<List className={classes.root}>
					{tabData.map(item => {
						return (
							<ListItem key={item.get('id')}>
								<Avatar
									alt="github-image"
									classes={{ root: classes.avatar, img: classes.avatarImg }}
									src={companyData.getIn(['data', 'githubData', 'avatar_url']) || ''}
								/>
								<ListItemText>
									<div><a href={item.get('html_url')} target="_blank" rel="noopener noreferrer">{item.get('url')}</a></div>
									<Fragment>
										<Chip
											label={`watchers: ${item.get('watchers_count')}`}
											className={classes.chip}
										/>
										<Chip
											label={`stargazers: ${item.get('stargazers_count')}`}
											className={classes.chip}
										/>
										<Chip
											label={`open issues: ${item.get('open_issues_count')}`}
											className={classes.chip}
										/>
									</Fragment>
								</ListItemText>
							</ListItem>
						)
					})
					}
				</List>
			</section>
		)
	}

	renderTabs = () => {
		const {
			state: { activeTab },
			props: { classes, companyData },
		} = this;

		return (
			<div className={classes.infoSection}>
				<AppBar
					classes={{ colorPrimary: classes.tabBar }}
					position="absolute"
				>
					<Tabs
						value={activeTab}
						onChange={this.handleTabChange}
						indicatorColor="primary"
						textColor="primary"
					>{companyData.get('list').map(tab => (
						<Tab key={tab} label={tab} />
					))}
					</Tabs>
				</AppBar>
				{
					companyData.get('list').map((tab, key) => {
						const tabData = companyData.getIn(['data', tab]);

						if (activeTab === key && tab === 'wikiData') {
							return this.renderWikiSection(tabData)
						} else if (activeTab === key && tab === 'githubData') {
							return this.renderGithubSection(tabData);
						} else if (activeTab === key && tab === 'githubRepos') {
							return this.renderGithubRepoSection(tabData, tab);
						}
					})
				}
			</div>
		)
	}

	renderEmptyPage = () => {
		const { initialLoad } = this.state;
		const text = initialLoad ? 'Let\'s find a company!' : 'No results :( Please try again.';
		return (
			<EmptyPage text={text} type={initialLoad} />
		);
	}

	render() {
		const {
			renderTabs,
			renderMediaCard,
			props: { classes, loading, companyData },
			state: { searchValue }
		} = this;

		return (
			<div className={classes.mainContainer}>
				<Typography
					align="center"
					gutterBottom
					variant="headline"
					component="h3"
				>
					Company search
				</Typography>
				<Paper className={classes.inputRoot} elevation={4}>
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
				{loading && <div className={classes.progressCircle}>
					<CircularProgress classes={{ colorPrimary: classes.progressCircleColor }}/>
				</div>}
				{!loading && <Paper className={classes.mediaCard} elevation={1}>
					{renderMediaCard()}
				</Paper>}
				{!loading && <Paper elevation={0}>
					{companyData.get('list').size ? renderTabs() : null}
				</Paper>}
				{!loading && !companyData.get('list').size &&
					<Paper elevation={0}>
						{this.renderEmptyPage()}
					</Paper>
				}
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
