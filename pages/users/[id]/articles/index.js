import { server } from '../../../../config'
import ArticleList from '../../../../components/Articles/ArticleList'
import AuthCheck from '../../../../components/AuthCheck';
import React, { useEffect, useState  } from 'react';
import { useRouter
 } from 'next/router';

 export default function Articles() {
  const router = useRouter();
  const userID = router.query.id;

  const [articles, setArticles] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true);
    let url = `${server}/api/articles`;
    if(userID){
      url += `?owner=${userID}`;
    }
    console.log("my url::", url)
    const res =  fetch(url, {
      method: 'Get',
      headers: {
        Authorization : `bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(resObj => {
      setArticles(resObj ? resObj.data.articles: null);
      setIsLoading(false)
    });
}, [])

  if (isLoading) {
    return <p>Loading....</p>
  }  
  if (!articles) {
    return <p>No List to show</p>
  } 
  return (
        <ArticleList key={1} articles={articles} />
  )
}

/* export const getStaticProps = async () => {
  const res = await fetch(`${server}/api/articles`)
  const articles = (await res.json()).data.articles;
  console.log("articles\n----------------------\n", articles)

  return {
    props: {
      articles,
    },
  }
} */




