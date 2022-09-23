import Link from 'next/link'
import userStyles from '../../styles/User.module.css'

const UserItem = ({ user }) => {
  return (
    <Link href={`/user/${user.id}`}>
      <a className={userStyles.card}>
        <h3>{user.firstName} </h3>
        <p>{user.lastName}</p>
      </a>
    </Link>
  )
}

export default UserItem
