# AppWars -

A side by side comparison of top apps from Google Play Store and Apple App Store

## MEAN stack

The application is implemented using MEAN stack with REST API server.

## Scraper Tool

Because Google doesn't provide Search API or RSS feeds for Play Store, information of Android apps is scraped from their web, processed and then saved to our database.
Information of iOS apps is retrieved using iTunes search API.

The scraper uses two Node.js modules, Request and Cheerio.
Request provides a single unified interface to handle both HTTP and HTTPS requests. In this project, the web page is downloaded directly into memory and then processed by Cheerio.
Cheerio enables processing the downloaded data in a way that is similar to jQuery selector.

## Demo

<a href="#">here</a>