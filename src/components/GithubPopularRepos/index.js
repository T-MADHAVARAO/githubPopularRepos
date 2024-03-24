import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const isStatusList = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    isStatus: isStatusList.loading,
    category: languageFiltersData[0].id,
    repositoryList: [],
  }

  componentDidMount = () => {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({isStatus: isStatusList.loading})
    const {category} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${category}`

    const response = await fetch(apiUrl)

    if (response.ok) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(each => ({
        name: each.name,
        id: each.id,
        avatarUrl: each.avatar_url,
        starsCount: each.stars_count,
        forksCount: each.forks_count,
        issuesCount: each.issues_count,
      }))
      this.setState({
        repositoryList: updatedData,
        isStatus: isStatusList.success,
      })
    } else {
      this.setState({isStatus: isStatusList.failure})
    }
  }

  renderRepos = () => {
    const {repositoryList} = this.state
    return (
      <ul className="repos-cont">
        {repositoryList.map(eachItem => (
          <RepositoryItem eachItem={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  changeCategory = id => {
    this.setState({category: id}, this.getProducts)
  }

  onFailure = () => (
    <div className="failure-bg">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1>Something Went Wrong</h1>
    </div>
  )

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" />
    </div>
  )

  finalViewRender = () => {
    const {isStatus} = this.state
    switch (isStatus) {
      case isStatusList.success:
        return this.renderRepos()
      case isStatusList.failure:
        return this.onFailure()
      case isStatusList.loading:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {category} = this.state
    return (
      <div className="bg">
        <h1>Popular</h1>
        <ul className="category-cont">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              eachItem={each}
              key={each.id}
              category={category}
              changeCategory={this.changeCategory}
            />
          ))}
        </ul>
        {this.finalViewRender()}
      </div>
    )
  }
}

export default GithubPopularRepos
