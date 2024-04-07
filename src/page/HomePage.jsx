import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Image, InputGroup, Pagination, Row } from 'react-bootstrap'
import classes from './HomePage.module.css'
import RecipeCard from '../components/RecipeCard'
import { BeatLoader } from 'react-spinners'
import { useDispatch, useSelector } from 'react-redux'
import { filterByMeat, filterByVege, filterOff, getCurrentPage, getCurrentRecipes, getTotalPages, searchRecipes, setCurrentPage, setCurrentRecipes } from '../slices/RecipeSlice'

const HomePage = () => {
    const dispatch = useDispatch();
    const currentRecipes = useSelector(getCurrentRecipes);
    const currentPage = useSelector(getCurrentPage);
    const totalPages = useSelector(getTotalPages);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');

  useEffect(()=>{
    setLoading(true)
    dispatch(setCurrentRecipes())
    setTimeout(() => {
      setLoading(false)
    }, 500);
  },[dispatch])

  const handleInputChange = (e) => {
    setSearch(e.target.value)
  }

  const handleSelectTypeChange = (e) => {
    const userType = e.target.value
    setLoading(true)
    switch (userType) {
      case 'meat':
        dispatch(filterByMeat())
        dispatch(setCurrentRecipes());
        break;
      case 'vege':
        dispatch(filterByVege())
        dispatch(setCurrentRecipes());
        break;
    
      default:
        dispatch(filterOff())
        dispatch(setCurrentRecipes());
        break;
    }
    setTimeout(() => {
      setLoading(false)
    }, 500);
  }

  const handleSearch = () => {
    setLoading(true)
    if(search){
      dispatch(searchRecipes(search))
      dispatch(setCurrentRecipes());
    }else{
      dispatch(filterOff())
      dispatch(setCurrentRecipes());
    }
    setTimeout(() => {
      setLoading(false)
      setSearch('')
    }, 500)
  }

  const handlePageChange = (pageNumber) => {
    setLoading(true)
    dispatch(setCurrentPage(pageNumber));
    dispatch(setCurrentRecipes());
    setTimeout(() => {
      setLoading(false)
    }, 500);
  };

  return (
    <Container fluid className='p-0'>
      <Row className={classes.img}>
        <Image  className={classes.image} src={`${process.env.PUBLIC_URL}/images/burmesefood.jpg`}/>
        <div className={classes.searchbox}>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Food Name"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2" 
            value={search}
            onChange={handleInputChange}
          />
          <Button 
          className={classes.button} 
          id="button-addon2" 
          onClick={handleSearch}>
            Search
          </Button>
        </InputGroup>
        </div>
      </Row>

      <Row className='d-flex justify-content-end px-5 py-3 w-100'>
        <Form.Select onChange={handleSelectTypeChange} className={classes.select}>
          <option value="all">All</option>
          <option value="meat">Meat</option>
          <option value="vege">Vege</option>
        </Form.Select>
      </Row>

      {
        loading && 
        <div className='w-100 d-flex justify-content-center py-5' style={{minHeight: '50vh'}}>
          <BeatLoader color='#994D1C' />
        </div>
      }

      {
        !loading && currentRecipes && currentRecipes.length > 0 &&
        <Row xs={1} sm={2} md={3} lg={4} className='g-5 p-5 w-100'>
          {
            currentRecipes.map((recipe,index) => {
              return <RecipeCard key={index} recipeName={recipe.Name} recipeId={recipe.Guid} />
            }
            )
          }
        </Row>
      }

    {
      totalPages > 1 &&
      <Row className='px-5 w-100'>
        <Col className='d-flex justify-content-center'>
        <Pagination>
            <Pagination.First onClick={() => handlePageChange(1)} />
            <Pagination.Prev disabled={(currentPage <= 1)} onClick={() => handlePageChange(currentPage - 1)} />
            {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </Pagination.Item>
            ))}
            <Pagination.Next disabled={totalPages <= currentPage} onClick={() => handlePageChange(currentPage + 1)} />
            <Pagination.Last onClick={() => handlePageChange(totalPages)} />
        </Pagination>
        </Col>
      </Row>
    }

    </Container>
  )
}

export default HomePage