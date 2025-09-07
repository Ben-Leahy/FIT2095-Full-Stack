# Notes

## General

- Writing in Javascript, use Google JavaScript Style
- Use gitlab for code, GCP to deploy

## Assessments

We also have labs starting Week 4, which will support the assignments
Start with A1, developing a backend server. Then with A2 we store that data in a database deployed on the cloud. Then A3 we include UI and interactions.

Labs: start with code demonstrations, then there are tasks to teach you the assignments. The tasks are designed to take 45 minutes. Unsure if we can search things up or not

AI: Officially, don't use it. Recommendation is just to use it responsibility.

## MongoDB

There is information on the page for required software, linked installation of MongoDB on how to run it

## Practical:

To run a javascript file, use "node app.js"
To run online:https://onecompiler.com/javascript
Bootstrap resources:
- https://getbootstrap.com/docs/4.1/components/forms/ 
- https://getbootstrap.com/docs/4.0/components/input-group/
- https://getbootstrap.com/docs/4.0/components/card/

HTML resources:
- https://medium.com/@sergimarquez/8-best-practices-to-write-clean-html-code-1cd407e2a7ec

JQuery filtering:
- https://www.w3schools.com/jquery/jquery_traversing_filtering.asp

## Full- stack take home reflections:
The most important thing is the actual hard skills. These are improved by the problem solving and the creating. 
AI: first step being getting ai to fix is problematic -> it has low success rate, and we are not developing our skills while we do this: we are copying code in, writing an instruction, and reading the ouput, only to take time to interpret the instructions, realise it's wrong and start again. Much better approach is to
1. Study my existing code as if I am explaining it to smomeone who doesn't understand it or a teacher. 
2. See if I can find any errors from studying it, and ALL RELATED COMPONENTS. This includes reading documentation (which helps actually build our understanding.)
Make sure we start small, from what we know rather than starting from a template and altering it. 

HTML code:
- Limit the use of divs and styling in the html document by leaning on the css file -> 
- <h1>Headline</h1> beats <div class="headline">Headline</div>



## Shortcuts

Chrome: option, command, arrows.
See preview of notes: command, shift, v

## Coding

let, const are block scope. const is function scope

`npm i` This command will install everything listed in your package.json file which will automatically track all the modules you install.

`npm init` sets up the package.json file or `npm init -y`

## Week 1

### Mean stack

MongoDB, a NoSQL database
Express.js is a web application framework that runs on Node.js. MVC architecture
Angular, JavaScript MVC frameworks that run in-browser JavaScript engines
Node.js, an execution environment for event-driven server-side and networking applications

Node JS is single-threaded, non-blocking, asynchonrous. If it was synchronous, if you lcicked a download button, the screen would freeze until the download was finished (this is blocking). Instread, the download event is added tot eh queue, then the main loop finishes, then it goes and enacts the next thing on the queue. In this way, the user can still itneract with the main website. I'm guessing we would also do the queue and the main loop concurrently?? Becuase otherwise it would just sort of delay download freezing the screen -> when we start downloading, and the user clicks two more buttons, what do we do?

HTTP status codes
1xx - Informational: The server has received the request and is continuing the process
2xx - Successful: The request was successful and the browser has received the expected information
3xx (Redirection): You have been redirected and the completion of the request requires further action
4xx (Client Error): The website or the page could not be reached, either the page is unavailable or the request contains bad syntax
5xx (Server Error): While the request appears to be valid, the server could not complete the request
