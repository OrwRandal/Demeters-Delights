const User = require('../models/user');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  //user seeds
  await User.deleteAll();
  await User.create('cool_cat', '1234');
  await User.create('l33t-guy', '1234');
  await User.create('wowow', '1234');
  //posts seeds
  await knex('posts').del();
await knex('posts').insert([
  {
    user_id: '1',
    ingredients: 'ingredients for post 1',
    instructions: 'instructions for post 1',
    youtube: 'https://youtu.be/wEUjZmWO2Nw',
    image: 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg',
    category: 'breakfast',
  },
  {
    user_id: '2',
    ingredients: 'ingredients for post 2',
    instructions: 'instructions for post 2',
    youtube: 'https://youtu.be/wEUjZmWO2Nw',
    image: 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg',
    category: 'breakfast',
  },
  {
    user_id: '3',
    ingredients: 'ingredients for post 3',
    instructions: 'instructions for post 3',
    youtube: 'https://youtu.be/wEUjZmWO2Nw',
    image: 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg',
    category: 'lunch',
  },
  {
    user_id: '1',
    ingredients: 'ingredients for post 4',
    instructions: 'instructions for post 4',
    youtube: 'https://youtu.be/wEUjZmWO2Nw',
    image: 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg',
    category: 'dinner',
  },
  {
    user_id: '2',
    ingredients: 'ingredients for post 5',
    instructions: 'instructions for post 5',
    youtube: 'https://youtu.be/wEUjZmWO2Nw',
    image: 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg',
    category: 'snacks',
  },
  {
    user_id: '3',
    ingredients: 'ingredients for post 6',
    instructions: 'instructions for post 6',
    youtube: 'https://youtu.be/wEUjZmWO2Nw',
    image: 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg',
    category: 'dessert',
  },
]);

  //likes seeds
  await knex('likes').del();
  await knex('likes').insert([
    {user_id: 1, post_id: 2},
    {user_id: 2, post_id: 1}
  ])
  //comments seeds
  await knex('comments').del()
  await knex('comments').insert([
    {user_id: 1, post_id: 2, comment: 'hi user 2!'},
    {user_id: 2, post_id: 1, comment: 'hi user 1! This is my comment!'}
  ])
  //saved seeds
  await knex('saved').del();
  await knex('saved').insert([
    {user_id: 1, post_id: 2},
    {user_id: 2, post_id: 1}
  ])
};
