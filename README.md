# Ossi.dev front-end

I can't really write a description of this front-end app because it's so basic. This repository is nothing special.

### SSG

I decided to use SSG for speed. The contents of my portfolio are not that often changed. 
I've set up a webhook in Vercel and I'm gonna trigger that with Strapi each time content is changed.

### State container

I used Redux as the state container, and the Toolkit project to cut writing the boilerplate in half. 
While the application is relatively small, using a state container removes the need to pass data with props.

### Back-end

The back-end is [Strapi](https://strapi.io) which worked great for this project. 
I was able to set up multiple content types such as Blog posts, Showcases, Tags etc. for my needs. 
Strapi also contains webhooks which trigger a call to a designated endpoint triggering the build whenever content changes.

### Data

I did decide to hard code some things as that information is not very frequent to change. 
Dynamic data is ofcourse retrieved from the API. Some pieces, like the introduction, are too. 
I wanted to be able to update my intro and my current 'interest' in the landing area.

I didn't want to hard code the links, but as the top bar is a reusable component it would've meant 
I would've had to add fetching the links from the API into the getStaticProps function of each 
possible entry point (frontpage, showcase and post), and I didn't want to do that.

### Styles

I decided to use SCSS as the stylesheet option with some Bootstrap utility classes also added there. I considered using Tailwind CSS, but setting it up and using it takes a little bit more time. 
Either way, there are only a handful of views so loading up that small CSS file is not really an issue and I don't feel like it contains any major overhead.

### Icons

I always use Font Awesome (early backer) for my projects. I ended up having to add them as SVG's because I didn't want to embed the webfonts with the project and without them the deployment pipeline would break.
