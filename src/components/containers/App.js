import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
	EmptyPage,
	SearchInput,
	MediaCard,
	WikiSection,
	GithubSection,
	GithubRepoItem
} from '../simple';
import { withStyles } from '@material-ui/core/styles';
import * as CONSTS from '../../constants/ReducerConstants';
import * as ACTIONS from '../../action_creators/Main';
import styles from './App.styles';

class App extends Component {
	static defaultProps = {
		loading: false,
		companyData: {},
		MainActions: {}
	};

	static propTypes = {
		loading: PropTypes.bool,
		companyData: PropTypes.object,
		MainActions: PropTypes.object
	};

	constructor(props) {
		super(props);

		this.state = {
			initialLoad: true,
			activeTab: 0,
			searchValue: '',
			inputTouched: false
		}
	}

	componentDidMount() {
		document.addEventListener('keyup', this.attachKeyBoardListener, true);
	}

	componentWillMount() {
		document.removeEventListener('keyup', this.attachKeyBoardListener, true);
	}

	/**
	 * Handles search input change
	 * @param {String} value event target value
	 * @returns {Obejct} new state
	 */
	handleInputChange = ({ target: { value } }) => {
		this.setState({
			searchValue: value.replace(/^\s+/g, ''),
			inputTouched: true
		});
	}

	/**
	 * Attches Enter key listener which executes search
	 * @param {String} key event key value
	 * @returns {Function} callback
	 */
	attachKeyBoardListener = ({ key }) => {
		if (key === 'Enter') {
			this.handleSearch();
		}
	}

	/**
	 * Handles search action
	 * @returns {Function} callback to Main@fetch action creator
	 */
	handleSearch = () => {
		const {
			state: { searchValue },
			props: { MainActions }
		} = this;

		this.setState({ inputTouched: true });

		if (!searchValue.length) {
			return false;
		}

		MainActions.fetch(searchValue)
			.then(() => this.setState({
				initialLoad: false,
				inputTouched: false,
				searchValue: '',
				activeTab: 0
			})
		);
	}

	/**
	 * Handles switching between tabs
	 * @param {Object} event
	 * @param {String} value new input value
	 * @returns {Object} new state
	 */
	handleTabChange = (event, value) => {
		this.setState({
			activeTab: value
		});
	}

	/**
	 * Renders company content sections
	 * @returns {Node} React view
	 */
	renderContentSections = () => {
		const {
			classes,
			companyData
		} = this.props;

		return (
			companyData.get('list').size ?
				<Fragment>
					<Paper className={classes.mediaCard} elevation={1}>
						<MediaCard
							src={companyData.getIn(['data', 'source']) || ''}
							title={companyData.getIn(['data', 'title'])}
							description={companyData.getIn(['data', 'description'])}
						/>
					</Paper>
					<Paper elevation={0}>{this.renderTabs()}</Paper>
				</Fragment>
			: null
		)
	}

	/**
	 * Render Wikipedia section for a given company
	 * @param {Object} tabData section data
	 * @returns {Node} React view
	 */
	renderWikiSection = (tabData = {}) => {
		return (
			<WikiSection
				key={tabData.get('pageid')}
				html={tabData.get('extract_html')}
			/>
		)
	}

	/**
	 * Render Github section for a given company
	 * @param {Object} tabData section data
	 * @returns {Node} React view
	 */
	renderGithubSection = (tabData = {}) => {
		return (
			<GithubSection
				key={tabData.get('id')}
				src={tabData.get('avatar_url') || ''}
				description={tabData.get('description')}
				email={tabData.get('email')}
				htmlUrl={tabData.get('html_url')}
			/>
		);
	}

	/**
	 * Render Github Repository list item
	 * @param {Array} data list of repositories
	 * @param {String} src repository image source
	 * @returns {Node} React view
	 */
	renderGithubRepoListItem = (data = [], src = '') => {
		return data.map(item => (
			<GithubRepoItem
				key={item.get('id')}
				src={src || ''}
				htmlUrl={item.get('html_url')}
				watchers={item.get('watchers_count')}
				stargazers={item.get('stargazers_count')}
				open_issues_count={item.get('open_issues_count')}
			/>
		))
	}

	/**
	 * Render Github Repository section for a given company
	 * @param {Map} tabData section data
	 * @param {String} tab current tab
	 * @returns {Node} React view
	 */
	renderGithubRepoSection = (tabData = {}, tab = 'githubRepos') => {
		const { classes, companyData } = this.props;
		const src = companyData.getIn(['data', 'githubData', 'avatar_url']);

		return (
			<section className={classes.tabSection} key={tab}>
				<List className={classes.root}>
					{this.renderGithubRepoListItem(tabData, src)}
				</List>
			</section>
		)
	}

	/**
	 * Render content for all tabs associated with a given search
	 * @param {Array} list list of tabs
	 * @param {Map} companyData search result object
	 * @returns {Node|Null} React view or null
	 */
	renderTabsContent = (list = [], companyData = {}) => {
		const { activeTab } = this.state;

		return list.map((tab, key) => {
			const tabData = companyData.getIn(['data', tab]);

			if (activeTab === key && tab === 'wikiData') {
				return this.renderWikiSection(tabData)
			} else if (activeTab === key && tab === 'githubData') {
				return this.renderGithubSection(tabData);
			} else if (activeTab === key && tab === 'githubRepos') {
				return this.renderGithubRepoSection(tabData, tab);
			}
			return null;
		})
	}

	/**
	 * Render tabs
	 * @returns {Node} React view
	 */
	renderTabs = () => {
		const {
			state: { activeTab },
			props: { classes, companyData },
		} = this;
		const list = companyData.get('list');

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
					>
						{list.map(tab => <Tab key={tab} label={tab} />)}
					</Tabs>
				</AppBar>
				{this.renderTabsContent(list, companyData)}
			</div>
		)
	}

	/**
	 * Renders empty page/initial state view
	 * @returns {Node} React view
	 */
	renderEmptyPage = () => {
		const { initialLoad } = this.state;
		const text = initialLoad ? 'Let\'s find a company!' : 'No results :( Please try again.';
		return (
			<Paper elevation={0}>
				<EmptyPage text={text} type={initialLoad} />
			</Paper>
		);
	}

	/**
	 * Renders spinner
	 * @returns {Node} React node
	 */
	renderSpinner = () => {
		const { classes } = this.props;
		return (
			<div className={classes.progressCircle}>
				<CircularProgress classes={{ colorPrimary: classes.progressCircleColor }} />
			</div>
		);
	}

	render() {
		const {
			props: { classes, loading, companyData },
			state: { searchValue, inputTouched }
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
				<SearchInput
					error={inputTouched && !searchValue.length}
					handleInputChange={this.handleInputChange}
					handleSearchClick={this.handleSearch}
					value={searchValue}
				/>
				{/* Initial state */}
				{!loading && !companyData.get('list').size && this.renderEmptyPage()}

				{/* Content loading/searching */}
				{loading && this.renderSpinner()}

				{/* Render content sections */}
				{!loading && this.renderContentSections()}
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
