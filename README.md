# Ossi.dev front-end

I can't really write a description of this front-end app because it's so basic. 
This repository is nothing special.

I used Next.js due to my earlier experience with it. It took me about a day to code this because the framework takes away the boring stuff.

### State container

I used Redux as the state container, and the Toolkit project to cut writing the boilerplate in half. While the application is relatively small, storing some data
in the container removes the need for repeated API calls when that data is already available.

I also installed Redux Thunk and used it on two calls which populate the state: Showcase and Blog posts. These are both used as a list of entries on single showcase and post pages, 
so I didn't want to duplicate code with the HTTP call and dispatching to state.

### Back-end

The back-end is [Strapi](https://strapi.io) which worked great for this project. I was able to set up multiple content types such as Blog posts, Showcases, Tags etc. for my needs.

### Data

I did decide to hard code some things as that information is not very frequent to change. Dynamic data is ofcourse retrieved from the API. Some pieces, like the introduction, are too. 
I wanted to be able to update my intro and my current 'interest' in the landing area.

### Styles

I decided to use SCSS as the stylesheet option with some Bootstrap utility classes also added there. I considered using Tailwind CSS, but setting it up and using it takes a little bit more time. 
Either way, there are only a handful of views so loading up that small CSS file is not really an issue and I don't feel like it contains any major overhead.

### Icons

I always use Font Awesome (early backer) for my projects. I had to (for licensing reasons) drop the webfonts from the repo, so if you wanna get them working drop your fonts at `/src/assets/fontawesome/webfonts`. 

If you wanna extend the icons, adjust the `icons.scss` file to add more. I didn't want to add the entire library as I only use about 10 icons here.

### Some libraries used

- [Next.js](https://nextjs.org/)
- [Font Awesome](https://fontawesome.com)
- [Redux](https://redux.js.org/)
- [Redux toolkit](https://redux-toolkit.js.org/)

