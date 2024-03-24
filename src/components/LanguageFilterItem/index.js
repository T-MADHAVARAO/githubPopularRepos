// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {eachItem, changeCategory, category} = props
  const {language, id} = eachItem
  const changeLanguage = () => {
    changeCategory(id)
  }
  const btnStyle = category === id && 'btn-color'
  return (
    <li>
      <button
        type="button"
        onClick={changeLanguage}
        className={`tabBtn ${btnStyle}`}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
