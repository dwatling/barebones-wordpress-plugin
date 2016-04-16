BareBones WordPress Plugin
---

I've recently started down the path of writing my own WordPress plugins. Instead of creating the same thing over and over again, I wanted to create a boilerplate template using tools I'm most familiar with.

I have no doubt that PHP programmers will cringe when they see this project uses Maven. But, I come from a Java background and wanted to get going quickly.

All you have to do is run "mvn clean install" at the command prompt and it will generate your release build under the target folder as a zip file ready to be uploaded to WordPress.

The basic template will create a new menu under the Admin > Tools section. If you want it to do something else, that's up to you.

Tips
----

When you change the name of the plugin, you'll have to change "wordpress-plugin" to whatever name you want in the following files:
- pom.xml
- package.json
- Gruntfile.js

You'll also have to rename the "wordpress-plugin.php" file to match your new name.