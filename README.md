# Horror Login Form
It is a login page with an eye that follows your cursor while writing the email and closes when you are writing the password. If the user wishes to see the password, then three little eyes open. 
## Work In Progress
Having successfully done this I wanted to add a blinking animation. It crashed my web page entirely. Searching online and asking chatGPT I was able to resolve part of the problem and right now the animation is pre-loaded so that it doesn't weight down on the page. 
However, there are still some problems I would like to resolve, but I can't find solutions or errors in my code.
- Since the animation is pre-loaded when the eye is closed and when it follows your writing, it blinks one more time before stopping. Those two states should stop the blinking immediately.
- There seems to be a problem with the little three eyes that are always present and don't hide even if the "See password" is checked out. I think this is also caused by the pre-loading of the animation.
- Login button is still a work in progress
