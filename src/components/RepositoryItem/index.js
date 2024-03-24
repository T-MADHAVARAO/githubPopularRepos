// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {eachItem} = props
  const {name, avatarUrl, starsCount, forksCount, issuesCount} = eachItem
  return (
    <li className="repos-item">
      <img src={avatarUrl} alt={name} className="avatar" />
      <h1 className="name">{name}</h1>
      <div className="data-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="icon"
        />
        <p>{starsCount}</p>
      </div>
      <div className="data-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="icon"
        />
        <p>{forksCount}</p>
      </div>
      <div className="data-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="icon"
        />

        <p>{issuesCount}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
