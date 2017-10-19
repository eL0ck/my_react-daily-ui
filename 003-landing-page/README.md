**CURRENT PROBLEM**
- make search TitleList only fire if enter is pressed
- Why does it fire on every key press?



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

**Q: Why doesn't the request fire everytime a letter is typed?**

**A:**  We have a tmp state variable that only effects the property of the search results TitleList when the 'Enter' keys is pressed.  We need both the event handlers to do this.  At first it seems like only one is required but (speculation start here!) a react controlled input requires an `onChange` handler to update the value in accordance with the users typing.  We need the `onKeyUp` handler to read the actual key (ignorant to say this ?).

The `TitleList` component has a method `componentWillReceiveProps` which compares only the `url` property.  If it finds no changes in this then the `TitleList` state never changes and the component doesn't re-render.

**Q: I wonder if we can do this with `shouldComponentUpdate()` it would be clearer to me**

**A:** `shouldComponentUpdate` is a frequently misinterpretted thing apparently.  I tried using it to return false when props don't change but what ended up happening was that none of the other components were not rendered in the browser.  This is what I think was happening:
- As the page loads, React renders each component multiple times.
- Everytime the state changes in the parent (a letter typed into the search input for example) all children are re-rendered
- Because props didn't change, the second time it renders (for whatever reason) the TitleList is un-rendered because `shouldComponentUpdate` returned false.

**What I learned from all this was that apparently even if components `render` method is called, the page is ONLY CHANGED IF THE HTML ITSELF IS NEW** ... so in theory, you can render the component as much as you want and the browser wont refresh unless the DOM is different

... doesn't seem like the proper way to understand this but the way to get it working was as follows:
- Left `shouldComponentUpdate` to the super class (always returning true apparently)
- Used `componentWillReceiveProps` to check if new props are search worthy

When the query IS search worthy we call `loadContent` to:
- fire the search
- Save the results
- Show the hidden component (setting `mounted` to true)

It `loadContent` is called as a callback to `setState` rather than by itself because without the state change, `loadContent` uses the old `this.props.query` rather than the new one.

**Q: The usage of `componentDidMount` seems redundant to me.  Wonder if this is nessesary??**
**A:** Yep,  not used now

### 10: Fix some anoying CSS stuff
- TitleLists still take up room when not displayed.  Change this.
- Search bar overlaps other menu items when screen shrunk - NOT FIXING

This is how it is in the original.  Maybe later I'll have alook at this but CSS is not really the point now



### 11: Lint everything

### 12: Look into Tests

### 13: Impliment Redux
Initially just store movie genre list from query and username store

... think about storing users list of picks

#### Tasks
a) - impliment a prop for the search Query
b) - Fill the prop from the search bar
c) - Change the `TitleList` component to use the query string

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
