import Link from 'next/link'

const UserItem = ({ user }) => {
  return (
    <>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>
        <Link href={`/users/${user.id}/articles`}>
          <a>
            {user.numberOfArticles}
          </a>
      </Link>
        </td>
    </>
  )
}

export default UserItem
