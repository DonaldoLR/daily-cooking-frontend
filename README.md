# Daily Cooking Helper

## Description

Daily Cooking Helper helps users view recipes and allows them to add all required ingredients to their cart.

## User Stories

- A visitor should be able to view the listed ingredients and tools needed, instructions and how long it will take

## MVP

- User can view a recipe
- User can skip recipes

## Stretch Feature

- User can filter for certain diets / lifestyles
- User can add a recipes' ingredients, tools to a cart
- Users can save recipes that they liked

## ERD

### Main

- recipe -< RecipeItems >- ingredients

### Stretch

- recipe -< RecipeTools >- tools
- User -< CartItems >- Items
