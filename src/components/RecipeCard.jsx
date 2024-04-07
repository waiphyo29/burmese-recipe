import React, { useState } from "react";
import DEFAULT from '../defaultImg/not found.png'
import { Card, Col } from "react-bootstrap";
import classes from "./RecipeCard.module.css";
import { BookmarkCheckFill, BookmarkPlusFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorite,
  getfavoriteRecipeIds,
  removeFromFavorite,
} from "../slices/RecipeSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipeName, recipeId }) => {
  const favIds = useSelector(getfavoriteRecipeIds);
  const [fav, setFav] = useState(favIds.includes(recipeId));

  const dispatch = useDispatch();

  const handleAddToFavorite = () => {
    dispatch(addToFavorite({ recipeId }));
    setFav(true);
    toast.success("Added to favorite list.");
  };
  const handleRemoveFromFavorite = () => {
    dispatch(removeFromFavorite({ recipeId }));
    setFav(false);
    toast.warn("Removed from favorite list.");
  };

  return (
    <Col>
      <Card className={classes.card}>
        <Link 
        to={`/${recipeId}`}>
        <Card.Img
          variant="top"
          src={`${process.env.PUBLIC_URL}/img/${recipeName}.jpg`}
          onError={(e) => (e.target.src = DEFAULT)}
          className={classes.img}
        />
        </Link>
        <Card.Body className={classes.body}>
          <Card.Text>{recipeName}</Card.Text>
          {!fav ? (
            <BookmarkPlusFill
              className={classes.bookmark}
              color="#ccaf9c"
              onClick={handleAddToFavorite}
            />
          ) : (
            <BookmarkCheckFill
              className={classes.bookmark}
              color="#6B240C"
              onClick={handleRemoveFromFavorite}
            />
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default RecipeCard;
