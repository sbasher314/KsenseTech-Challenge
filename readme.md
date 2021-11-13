# Readme
This is a repository developed as part of a coding challenge for Ksense Techonology Group LLC

# Project Specifications
> Develop a single page web application that receives JSON data and renders the data into the DOM using the following API:
> https://jsonplaceholder.typicode.com/
>
> Using jQuery or vanilla JS, display each 'USER' in a table.
> * When the user selects a 'USER' in the table, it will display all of the 'POSTS' that were created by that 'USER'.
>
> You have full freedom in how you accomplish the above objectives. You also have full freedom as far as design is concerned.


# Usage / Setup instructions

Clone repository down to local machine.

There is no build process or explicit server that needs to be run, therefore as long as all files are present the app should work as expected.

Open index.html from within this repository directory that you cloned.


# Notes

Due to the table design I used, it is not very responsive or mobile friendly, however it could definitely be reworked fairly easily for different views.

This code also has basic support for displaying errors to the end user -- such as if the server can not be reached, or a user's posts can not be found.

I was undecided for a while whether I wanted to download each user's posts on each click or to preload either one-by-one calls or the entire set of data. In the end, I decided to download all of the user's posts the first time any user was clicked on, and stored that into an object that could be referenced later with no additional network requests needed (tradeoff of a longer initial load on click vs preloading, but also doesn't waste an unneccessary network request if the user wasn't going to view any posts). I'm not sure that there is really a best option here as that is highly dependant on what the end usage may be for this application.