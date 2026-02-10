This project has been realised with these technologies:
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Welcome to my TechProductsAPI! This API is 100% made by me using NestJS with pure Typescript. In order to use my API Software on a local device with Windows, you need to read carefully to these steps (WARNING: The images are on Windows in Spanish language, if you aren't Spanish follow the instructions in English):

## Downloads and First Steps

The first thing to do is downloading the whole project:

<img width="462" height="348" alt="image" src="https://github.com/user-attachments/assets/c6403eb0-51f1-44e5-8525-31e41b1e83d6" />


After this, extract the project on a suitable folder on your pc hard drive by making right click and "Extract Here" (preferably on C:/):

<img width="627" height="153" alt="image" src="https://github.com/user-attachments/assets/9081ae8e-3bdd-485f-8d05-a49316105bfe" />


Once extracted, open the extracted folder on VSCode by making right click and "Open on VSCode" (if you don't have this software, here is the download link: https://code.visualstudio.com/)

<img width="471" height="157" alt="image" src="https://github.com/user-attachments/assets/4a327fb0-dc92-4ea6-9861-4e1776fe2918" />


If you now have the folder on VSCode, you must install NodeJS (https://nodejs.org/es/download): 

<img width="864" height="670" alt="image" src="https://github.com/user-attachments/assets/ca52cc87-0dd4-4a0a-9994-3d0f11f0f09b" />

When the installation of NodeJS finish, if you had opened VSCode BEFORE the installation, you now MUST CLOSE VSCODE after doing anything else, because you can not use the VSCode Terminal until it has been restarted to refresh the environment variables. Then open the extracted folder with VSCode again. Now, we move on to the database configuration

## Database Configuration

This API with Nest works entirely with Datastax AstraDB (Cassandra) and in order to use this API in a local device you MUST create an account on AstraDB to have your own free database. So firstly, you need to go to AstraDB oficial website and create an account: https://astra.datastax.com/

Once finished, you should click on the "Create database" button and create the database with the name you seem more suitable and use the SAME CONFIGURATION as the image shows:

<img width="926" height="535" alt="image" src="https://github.com/user-attachments/assets/d3608654-c509-495f-97ed-d9135802bd18" />


You know need to wait for a few minutes as the database creates and activates. You need to take into account that this free version is limited on monthly credits of around 25 dollars, a storage cap of 40GB, and a limited number of read and write operations. Also, you might experience cold starts with slower responses after inactivity, you can only use one region, and there is a limit of 8192 dimensions for vector searches.

When the database finally activates, go to "Data Explorer" and create two new collections with the EXACT name of "products" and "users" and keep the other parameters the SAME as the image shows:

<img width="929" height="719" alt="image" src="https://github.com/user-attachments/assets/283b4d84-ff7e-4a9e-b01f-a3aa862f449d" />


After this step, we go back to VSCode and create on the root folder an .env file:

<img width="303" height="391" alt="image" src="https://github.com/user-attachments/assets/72d7da5b-2c84-473a-8141-e1009fa41da1" />


Inside this .env file, you must introduce this two keys:

<img width="667" height="209" alt="image" src="https://github.com/user-attachments/assets/74543453-929b-4774-ae9a-8b9e4fdd1346" />


Finally, you need to find the URL of the database and the AstraCS token and put on the key of the .env file

You can find the URL up on the title of the database created, click on it and copy it:

<img width="965" height="786" alt="image" src="https://github.com/user-attachments/assets/1790a870-88e4-4b78-89b2-c578a531a087" />


The AstraCS token is located on the "Overview" of your database, click on "Generate a token" button and introduce the name of your token and generate it:

<img width="1383" height="807" alt="image" src="https://github.com/user-attachments/assets/6360f9a8-7b52-4102-af94-68af34af46da" />

<img width="847" height="334" alt="image" src="https://github.com/user-attachments/assets/eafa7634-1fdd-470e-9097-3811f9aa24b3" />


It will generate the token instantly, you know need to copy it using the button at the far right:

<img width="850" height="134" alt="image" src="https://github.com/user-attachments/assets/456cae64-f8f8-4c98-8931-d89e7d28d2c9" />


After copying both URL and AstraCS token, you only need to paste it on the .env file in the corresponding key:

<img width="1138" height="215" alt="image" src="https://github.com/user-attachments/assets/276b2292-329f-4fb3-a032-bf43da9a17dd" />


We have finished the database configuration, now we move on to the Project Setup by using the VSCode Terminal


## Project setup

Now, open the terminal as the image shows:

<img width="831" height="385" alt="image" src="https://github.com/user-attachments/assets/e4ff7011-8ec4-4de3-a965-29bc34060c81" />


Then, open the Windows CMD on the VSCode Terminal:

<img width="433" height="367" alt="image" src="https://github.com/user-attachments/assets/c76154ab-e2dc-47a3-9574-2f0cd30aa8b8" />


After this step, you know must put the next command and click enter:

```bash
$ npm install
```

This command will install the essential dependencies to execute the app. Finally, we move on to Compilation a running

## Compile and run the project

Now the final step, initiate the API. You can do it with whichever of this commands:

This command will start directly de API and no changes will be saved until you execute this again:
```bash
# development
$ npm run start
```

This command will start directly de API and the changes will be saved without executing:
```bash
# watch mode
$ npm run start:dev
```

This will start the api using your database. However, when you try to use it, you will need to signup according to the initial error message:

<img width="494" height="600" alt="image" src="https://github.com/user-attachments/assets/33a7ade9-b687-43ec-bdd4-fb1d7fcaa7c3" />

You will need to login first in order to use this api. The software is configured so that the first person to register (you) becomes the administrator. Once there is at least one administrator, any subsequent users will not have admin privileges. This ensures that you can use your API key to manage products and users, while other users cannot.


## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
