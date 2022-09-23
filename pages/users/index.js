import { server } from '../../config';
import UserList from '../../components/Users/UserList';
import React, { useEffect, useState  } from 'react';
import { useRouter } from 'next/router'

 function Users() {

  const [users, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    const res =  fetch(`${server}/api/users`, {
      method: 'Get',
      headers: {
        Authorization : `bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(resObj => {
      setData(resObj ? resObj.data.users: null);
      setIsLoading(false);
    });
}, [])


  if (isLoading) {
    return <p>Loading....</p>
  }
  if (!users) {
    return <p>No List to show</p>
  }
    return (
        <UserList key={1} users={users} />
  )
  
  
}


export default Users;
/* export const getServerSideProps = async () => {
  const res = await fetch(`${server}/api/users`, {
    method: 'Get',
    headers: {
      Authorization : `bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMmNjMzljN2ZiNDZkMzQ3MmNlM2E4NCIsImlhdCI6MTY2Mzg4OTI3MSwiZXhwIjoxNjYzODkyODcxfQ.WQd79Fwk_Uck4FCC4z47AmqaKywp5giHy4SInJgkpW4'}`
    }
  });
  const users = (await res.json()).data?.users;
  console.log("users\n----------------------\n", users)

  return {
    props: {
      users,
    },
  }
} */


