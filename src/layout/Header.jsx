import React, { useEffect, useState } from 'react'
import Logo from './burmese-recipe-logo.png'
import { Container, Navbar, Button, Badge, Image } from 'react-bootstrap'
import { BookmarksFill } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import classes from './Header.module.css'
import { getfavoriteRecipes } from '../slices/RecipeSlice'

const Header = () => {
  const favorites = useSelector(getfavoriteRecipes)
  const [ favCount, setFavCount ] = useState(0)

  useEffect(() => {
    setFavCount([...favorites].length)
  },[favorites])
  const navigate = useNavigate()

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY || document.documentElement.scrollTop;
      setScrollPosition(currentPosition);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Navbar fixed='top' 
      className={classes.nav} 
      style={{ 
        padding: scrollPosition > 80 ? "10px 10px" : "80px 10px" ,
        backgroundColor: scrollPosition > 80 ? "white" : "transparent"
      }}
    >
      <Container>
        <Navbar.Brand onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
          <Image src={Logo} className={classes.logo} />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text style={{position: 'relative'}}>
            <BookmarksFill 
              as={Button}
              color='#6B240C' 
              size={30}
              onClick={() => navigate('/favorite')}
              style={{cursor:'pointer'}} />
              {favCount > 0 &&
                <><Badge bg="secondary" style={{position: 'absolute',top: '-5%',left: '50%'}}>{favCount}</Badge>
                <span className="visually-hidden">unread messages</span></>
              }
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header