# Frontend Mentor - IP address tracker solution

This is a solution to the [IP address tracker challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Frontend Mentor - IP address tracker solution](#frontend-mentor---ip-address-tracker-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Screenshot](#screenshot)
    - [Links](#links)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
    - [Continued development](#continued-development)
    - [Useful resources](#useful-resources)
  - [Author](#author)
  - [Acknowledgments](#acknowledgments)


## Overview

### The challenge

Users should be able to:

- View the optimal layout for each page depending on their device's screen size
- See hover states for all interactive elements on the page
- See their own IP address on the map on the initial page load
- Search for any IP addresses or domains and see the key information and location

### Screenshot

![image](https://github.com/franclobo/ip-address-tracker/assets/58642949/478a3364-e4b7-4fcf-86d5-1ac18844e317)

### Links

- Solution URL: [ip-address-tracker](https://github.com/franclobo/ip-address-tracker)
- Live Site URL: [ip-address-tracker](https://ip-address-tracker-psi-eight.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [Redux Toolkit](https://redux-toolkit.js.org/usage/usage-with-typescript) - For state management
- [TailwindCSS](hhttps://tailwindui.com/) - For styles

### What I learned

I have to use dynamic imports to load the map component only when the user clicks the search button. This way, I can reduce the initial load time of the page.

```js
import dynamic from 'next/dynamic';

const MapaComponent = dynamic(() => import('./_components/Mapa'), { ssr: false });
```

### Continued development

I will continue to develop this project by adding more features and improving the user experience.

### Useful resources

- [Declare enviroment variables](https://vercel.com/docs/projects/environment-variables?utm_medium=docs&utm_source=next-site&utm_campaign=next-website#declare-an-environment-variable) - This helped me to declare environment variables in Next.js.
- [Creating de .env.local file](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#environment-variables-on-vercel) - This helped me to create the .env.local file to store the environment variables.

## Author

- Website - [WebMinds Studio](https://www.webmindsstudio.com/)
- Frontend Mentor - [@franclobo](https://www.frontendmentor.io/profile/franclobo)
- Twitter - [@Pancho2788](https://twitter.com/Pancho2788)

## Acknowledgments

I would like to thank Frontend Mentor for providing me with this challenge and everyone who helped me with this project.
```
