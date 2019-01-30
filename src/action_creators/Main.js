import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';
import * as ACTIONTYPES from '../constants/ActionConstants';

// Create `axios-cache-adapter` instance
const cache = setupCache({
    maxAge: 15 * 60 * 1000
});

// Create `axios` instance passing the newly created `cache.adapter`
const api = axios.create({
    adapter: cache.adapter
})

/**
 * Search organization data in Github
 * @param {String} companyName comapny name
 */
export function getCompanyGithubData(companyName = '') {
    const request = api.get(`https://api.github.com/orgs/${companyName}`);

    return dispatch => request
        .then(({ data })=> data)
        .catch(err => {
            dispatch({
                type: ACTIONTYPES.FETCH_COMPANY_GITHUB_DATA_FAIL,
                payload: err
            });
            return null;
        });
}

export function getCompanyWikiData(companyName = '') {
    const request = api.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${companyName}`);

    return dispatch => request
        .then(({ data }) => data)
        .catch(err => {
            dispatch({
                type: ACTIONTYPES.FETCH_COMPANY_WIKI_DATA_FAIL,
                payload: err
            });
            return null;
        });
}

/**
 * Search organization repositories
 * "organization_repositories_url": "https://api.github.com/orgs/{org}/repos{?type,page,per_page,sort}",
 * @param {String} companyName comapny name
 */
export function getCompanyRepositories(companyName = '') {
    const request = api.get(`https://api.github.com/orgs/${companyName}/repos`);

    return dispatch => request
        .then(({ data }) => data)
        .catch(err => {
            dispatch({
                type: ACTIONTYPES.FETCH_COMPANY_REPO_DATA_FAIL,
                payload: err
            });
            return null;
        })
}

function processPayload(data = {}) {
    const { wikiData } = data;

    const newData = {
        source: (wikiData && wikiData.thumbnail && wikiData.thumbnail.source) || '',
        title: (wikiData && wikiData.title) || '',
        description: (wikiData && wikiData.description) || '',
        ...data
    }
    return {
        list: Object.keys(data).filter(i => data[i] !== null),
        data: newData
    }
}

function setLoading(loading = true) {
    return {
        type: ACTIONTYPES.SET_LOADING,
        params: loading
    };
}

export function fetch(companyName = '') {
    return (dispatch) => {
        dispatch(setLoading(true));

        const requests = [
            dispatch(getCompanyWikiData(companyName)),
            dispatch(getCompanyGithubData(companyName)),
            dispatch(getCompanyRepositories(companyName))
        ];
        return Promise.all(requests)
            .then(([wikiData, githubData, githubRepos]) => {
                const payload = processPayload({wikiData, githubData, githubRepos});

                dispatch({
                    type: ACTIONTYPES.FETCH_COMPANY_DATA,
                    payload
                });
                dispatch(setLoading(false));
            })
            .catch(err => {
                dispatch({
                    payload: err,
                    type: ACTIONTYPES.FETCH_COMPANY_DATA_FAIL
                });
                dispatch(setLoading(false));
            });
    }
}
