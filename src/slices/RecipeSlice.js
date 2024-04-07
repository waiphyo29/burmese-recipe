import { createSlice } from "@reduxjs/toolkit";
import REIPES from '../json/BurmeseRecipes.json'

const ITEMS_PER_PAGE = 8;

const initialState = {
    allRecipes: [...REIPES],
    favRecipes: [],
    favRecipeIds: [],
    currentPage: 1,
    totalPages: Math.ceil(REIPES.length / ITEMS_PER_PAGE),
    currentRecipes: [],
};

const RecipeSlice = createSlice({
    name : 'RecipeSlice',
    initialState,
    reducers : {
        setCurrentRecipes: (state) => {
            const currentPage = state.currentPage;
            const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
            const endIndex = startIndex + ITEMS_PER_PAGE;
            state.currentRecipes = state.allRecipes.slice(startIndex, endIndex);
        },
        addToFavorite: (state, action) => {
            const { recipeId } = action.payload;
            const recipeToAdd = state.allRecipes.find(recipe => recipe.Guid === recipeId);
            if (recipeToAdd) {
                state.favRecipes.push(recipeToAdd);
                state.favRecipeIds.push(recipeId);
            }
        },
        removeFromFavorite: (state, action) => {
            const { recipeId } = action.payload;
            const recipeToRemove = state.favRecipes.find(recipe => recipe.Guid === recipeId);
            if (recipeToRemove) {
                state.favRecipes = state.favRecipes.filter(_ => _.Guid !== recipeId)
                state.favRecipeIds = state.favRecipeIds.filter(_ => _ !== recipeId)
            }
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        filterByMeat: (state) => {
            state.allRecipes = [...REIPES].filter(recipe => recipe.UserType === '001');
            state.totalPages = Math.ceil(state.allRecipes.length / ITEMS_PER_PAGE);
            state.currentPage = 1;
        },
        filterByVege: (state) => {
            state.allRecipes = [...REIPES].filter(recipe => recipe.UserType === '002');
            state.totalPages = Math.ceil(state.allRecipes.length / ITEMS_PER_PAGE);
            state.currentPage = 1;
        },
        filterOff: (state) => {
            state.allRecipes = [...REIPES];
            state.totalPages = Math.ceil(REIPES.length / ITEMS_PER_PAGE);
            state.currentPage = 1;
        },
        searchRecipes: (state, action) => {
            const search = action.payload;
            state.allRecipes = [...REIPES].filter(recipe => recipe.Name.includes(search))
            state.totalPages = Math.ceil(state.allRecipes.length / ITEMS_PER_PAGE);
            state.currentPage = 1;
        }
    }
})


export default RecipeSlice.reducer;
export const { addToFavorite, removeFromFavorite, setCurrentPage, filterByMeat, filterByVege, filterOff, setCurrentRecipes, searchRecipes } = RecipeSlice.actions;
export const getfavoriteRecipes = state => state.recipe.favRecipes;
export const getfavoriteRecipeIds = state => state.recipe.favRecipeIds;
export const getCurrentPage = state => state.recipe.currentPage;
export const getTotalPages = state => state.recipe.totalPages;
export const getRecipeById = (state, recipeId) => state.recipe.allRecipes.find(recipe => recipe.Guid === recipeId)
export const getCurrentRecipes = state => state.recipe.currentRecipes;