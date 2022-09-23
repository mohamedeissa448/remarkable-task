import UserItem from './UserItem'
import tableStyles from '../../styles/Table.module.css'

const UserList = ({ users }) => {
 /* return  (
    <div className={tableStyles.grid}>
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  ) */
  
    return (
      <div className={tableStyles.wrapper}>
    <div className={tableStyles.title}>
      Users Table
      <div className={tableStyles.line}></div>
    </div>
    <div className={tableStyles.container}>
      <div className={tableStyles.table}>
        <table cellSpacing="0" cellPadding="0">
          <thead>
            <tr>
              <td>first name</td>
              <td>last name</td>
              <td>No. of articles</td>
            </tr>
          </thead>
          <tbody>           
            {users.map((user) => (
              <tr>
                <UserItem key={user.id} user={user} />
              </tr>
            ))}
            
          </tbody>
  
        </table>
      </div>
    </div>
  </div>
    
  )
}

export default UserList
