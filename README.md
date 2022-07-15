# Foreword
Sometimes, code doesn't speak at all, so it would be my pleasure to discuss about my work in case there are any concerns or somethings that need to be explained. Please don't hesitate to do so, your opinions will help me to improve my knowledge.

Thank you for your time to review my work.

# Simple Auto-suggestion search

This feature will help us to quickly build an smart search input with:
1. Suggestion terms based on user's input.
2. Collections that are related to what are being typed by user.
3. Products, which have the name match with user input.

Note: The search result will be changed every time user change the value in the search box
This one was built by using HTML, Javascript, jQuery and Bootstrap.

# Installation
Before you start, please follow these steps:
1. You'll need to add / install bootstrap to your project first.  [Please take this as your reference if needed](https://getbootstrap.com/docs/5.0/getting-started/introduction/).
2. Import 'search.js' to your html header.

# Expected Data structure from server
-   Suggestion term (with Term, URL)
-   Collection (with ID, Title, URL)
-   Product (with ID, Title, URL, Brand, Price, Image)

Data example:
```{ suggestions: [...], collections: [....], products: [....] }```

# Usage
1. Create an container div that have `id='search-input-container'` to wrap the search input.
2. Place your input#search-box inside the container in step #1.

And that's it, you're good to go now.
