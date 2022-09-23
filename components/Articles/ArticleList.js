import ArticleItem from './ArticleItem'
import tableStyles from '../../styles/Table.module.css'

const ArticleList = ({ articles }) => {

  return (
    <div className={tableStyles.wrapper}>
  <div className={tableStyles.title}>
    Articles Table
    <div className={tableStyles.line}></div>
  </div>
  <div className={tableStyles.container}>
    <div className={tableStyles.table}>
      <table cellSpacing="0" cellPadding="0">
        <thead>
          <tr>
            <td>title</td>
            <td>content</td>
          </tr>
        </thead>
        <tbody>
          
          {articles.map((article) => (
            <tr>
              <ArticleItem key={article.id} article={article} />
              </tr>
            ))}
          
        </tbody>

      </table>
    </div>
  </div>
</div>
  )
}

export default ArticleList
