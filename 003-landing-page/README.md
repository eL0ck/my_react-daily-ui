This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

This is a copy of the app blogged about [here](https://react.rocks/example/Movies_landing_page)

## Basic Tasks
tasks to replicate functionality

### 1
Project setup

### 2
Create first basic Menupage components. No functionality

### 3
Impliment a Title Component.  This will display all the info for a single movie..  Note, this was called an 'Item' in the original implimentation so some css changes might be required later

Impliment a TitleList Component.  This will be used to display a number of movie titles and will be reused for different categories

### 4 - Header Bar
Get the search bar in with a logo.  Leave the links for later

### 5
Add user profile and Navigation features to header bar.  Hope the the formatting works out (Title list still undernead the header bar)

### 6 - Hero featur
  Put this hero feature in and see if it fixes up the formatting issues

### 7 - Organise CSS
  Put css into component specific files

### 8 - Add more TitleLists
Added a couple of Movie genres and top tv picks

### 9 - Add a search TitleList
Good example of how to bind event listeners in React

The key point here is that this is a 'Controlled input'.  This means its has a `value` property and is therefore controlled by React.  You need an `onChange` handler to change the `value`.

`handleKeyUp` method is used to actually fire the search

This is also a good example of **inheriting state through props**.  The `url` prop is set to a state variable of the `App` (`MenuPage` in the new version) component.

**Why doesn't the request fire everytime a letter is typed?**

The `TitleList` component has a method `componentWillReceiveProps` which compares only the `url` property.  If it finds no changes in this then the `TitleList` state never changes and the component doesn't re-render.

(**!!** I wonder if we can do this with `shouldComponentUpdate()` it would be clearer to me)

The usage of `componentDidMount` seems redundant to me.  Wonder if this is nessesary??

## Extension Tasks
  Features that add to the original

  ### Easy
  - Do an initial query for movie genres and store in a redux store.  Use this to allow the TitleList to query off its name not the hardcoded id
  - Make Username a global state variable to. So that 'Top picks for Jack' is updated

### Harder
  - Have the Hero image change to the item selected
  - Make a scroll accross feature so that more than just the first 5 can be displayed
  - Make a 'My List' page using state
  - Allow entire TV series to be displayed in a 'Title' component
