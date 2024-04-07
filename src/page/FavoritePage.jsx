import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { getfavoriteRecipes } from '../slices/RecipeSlice'
import { BeatLoader } from 'react-spinners'
import RecipeCard from '../components/RecipeCard'

const FavoritePage = () => {
  const favorites = useSelector(getfavoriteRecipes)
  const [ loading, setLoading ] = useState(false)

  useEffect(()=>{
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500);
  },[favorites])
  
  return (
    <Container fluid className='px-5' style={{marginTop: '100px'}}>
      <Row className='p-0 m-0'>
        <h5 className='text-center p-0 m-0'>Your Favorite Foods</h5>
      </Row>
      {
        loading && 
        <div className='w-100 py-5 my-5 d-flex justify-content-center align-items-center'>
          <BeatLoader color='#994D1C' />
        </div>
      }
      { !loading &&
        favorites.length === 0 &&
        <Row className='w-100 py-5 my-5 d-flex justify-content-center align-items-center'>
          <h1 style={{maxWidth:'500px'}}>Yor Favorite List is Empty.</h1>
        </Row>
      }
      { !loading &&
        favorites &&
        <Row xs={1} sm={2} md={3} lg={4} className='g-5 p-5 w-100'>
          {
            favorites.map((recipe,index) => {
              return <RecipeCard key={index} recipeName={recipe.Name} recipeId={recipe.Guid} />
            }
            )
          }
        </Row>
      }
      
    </Container>
  )
}

export default FavoritePage