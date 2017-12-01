Is it necessary to seed db in two separate scripts in package.json? Could you combine them to just be a script called seedDb?

A lot of formatting changes are just my preference so take as you will.

commit msg and PR specific notes:

I have been recommended to name commit messages in present tense describing what it solves. Example:   Abstract authorization from routes into separate 'checkRoles' middlew… 

would be 

Abtracts …

Questions:
Did each commit finish a spec that is observable as completed?
This is what I ask if it should be a new commit / branch

For a PR, did this bundle of commits finish a feature or solve a whole bug?

I see you only had two total branches and a LOT of commits were to master which I would not recommend.

I also see a commit “merge branch ‘master’ in to auth and I wonder why you would do that?

Separate commits for individual dependencies seems overkill, use `git commit —amend` to add new content to existing commit.
