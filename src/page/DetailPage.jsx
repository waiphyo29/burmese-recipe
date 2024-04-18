import React from 'react'
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux'
import { Row, Col, Image } from 'react-bootstrap'
import { Container } from 'react-bootstrap'
import { getRecipeById } from '../slices/RecipeSlice';
import DEFAULT from '../defaultImg/not found.png'

const DetailPage = () => {
  const { recipeId } = useParams()
  const recipe = useSelector((state)=>getRecipeById(state, recipeId))
  
  return (
    <Container fluid style={{marginTop: '100px'}}>
      <Row sm={1} md={2} className='w-100 d-flex justify-content-evenly px-5'>
        <Col sm='12' md='4'>
          <Image 
          src={`${process.env.PUBLIC_URL}/img/${recipe?.Name}.jpg`} 
          fluid
          onError={(e) => e.target.src = DEFAULT}
          alt='' 
          rounded 
          />
        </Col>
        <Col sm='12' md='5' className='mt-sm-5 mt-md-0'>
          <Row xs={1} className='mb-3'>
            <h4>*Name*</h4>
            <p>{recipe?.Name}</p>
          </Row>
          <Row xs={1} className='mb-3'>
            <h4>*Ingredients*</h4>
            {
              recipe?.Ingredients.split("\n").map((ingredient,i) => 
                <p key={i}>- {ingredient}</p>
              )
            }
          </Row>
          <Row xs={1} className='mb-3'>
            <h4>*CookingInstructions*</h4>
            <ol>
            {
              recipe?.CookingInstructions.split("\n").map((instruction,i) => 
              instruction.length > 1 && (
                <li key={i} className='mt-2'>{instruction}</li>
              )
              )
            }
            </ol>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default DetailPage