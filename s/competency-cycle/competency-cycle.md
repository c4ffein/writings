# Competency Cycle

There is this pattern in tech that I ended up noticing.

A new tech or methodology appears. The original creators and early users are usually quite close — working at the same org, or at least part of the same ecosystem. There's a novelty appeal: it comes from bright minds, it's shiny, it's trending. Highly motivated people who follow the latest trends pick it up and do something with it, which leads to this tech actually becoming a marker of skill. Maybe people don't actually need it to solve their problems, but they use it anyway since they learned how to. Then less motivated people join the trend — not because they perceive value in it, but because it helps them belong to the group that deserves to be paid more. More and more projects use this tech in a broken way. To most people, there seems to be a problem to be fixed.

It happened many times and will happen again.
It may happen years apart, for the same tech or methodology,
in different countries or even cities, or even across different industries.

At some point, the trend has to go in the opposite direction. In part, to flee the people who pretend to care and are actually making everything so terrible.

## Some specific examples

### Microservices, then wanting to go back to a monolithic architecture.

Maybe at first it helped to force people to split their logic, but then some people started splitting it in the most absurd way.
At some point we end up with each microservice being far more bloated than one unique monolith should be. And even so, I think it will be even worse when they go back to that so glorious monolith after reading I don't know what blog post.

### SPA, then going back to SSR.

I do think HTMX is great, but if you currently think HTMX is the solution to most of the problems that most of the frontend developers encounter today, you may have overlooked what caused those issues in the first place.

I do think the overall HTMX experience could be terrible too, although not for the same reasons. The problems people blame on SPAs — 8MB bundles for basic components, request waterfalls slowing everything down — are usually symptoms of:
- poor architectural decisions
- the management of the development team that didn't let room for implementing it the correct way
- or just lack of skill/care from the developers.

If any of these was the root cause for a bloated, sluggish react app, then you would also end up with a bloated, sluggish HTMX app.

There are indeed interesting tradeoffs when choosing between HTMX and React, and both are beautiful tech and valid choices.

### Redis, Mongo, Celery... Instead of a relational database with a well thought data model.

For scalability reasons, specific teams had to rely on databases that diverged from the ACID / relational database paradigms, and ended up with the whole suite of NoSQL solutions.

There is also this whole trend of needing a big infra to be taken seriously as an engineer, somehow saying "we have so much traffic that we need Mongo + Redis + Celery + ..." rather than "we optimized our backend to run fully async and handling X millions of requests per day on a single server, even though we could scale to hundreds of workers without any change to the codebase" brings you more clout in the wrong circles.

Nothing is inherently bad with either route, but what you saved in development you always pay back later in maintenance. Not that building cloud-based infrastructure isn't worth it from a scalability point of view.

TL;DR - Many people think they can't do with just a Postgres database. [Most of them actually could](https://www.amazingcto.com/postgres-for-everything/). Not that you should, but in most cases it is an option.

I also won't go into details because there are so many of them, but Postgres forks that solve the scalability problem are probably (one of) the next big thing though.

To avoid my own accusations applying to me: experiment with these, but submitting to your environment's zeitgeist is often the most adequate move in contexts too complex for any of us to fully grasp.

### Any methodology that got traction

This is the most general example. Anything like Clean Code, Scrum, Extreme programming, came from quite good intentions, and did have a positive impact on early adoption, but seeing how far they strayed from their original purpose now fills me with a mix of sadness and anger whenever a new debate starts. I acknowledge there are still healthy discussions to have, but most end up as tribal battles.

## Stuff that actually becomes better

That said, these cycles do let developers experiment with multiple solutions, and sometimes real progress comes out of it. npm ended up focusing on performance because yarn gained traction. React is getting a compiler because other frameworks made it a selling point. The npm → yarn → pnpm → bun progression actually solved real problems iteratively. There are more examples, but that's a different post.

## Is there someone to blame

The thing is, most of these techs and methodologies are decent choices when picked and applied wisely.

I do think we can blame the people who think something is utterly good or bad. In a way, these people thrive — they found their safe space and don't have to care about contexts where the rules differ. Maybe it's easier to advance when you just want to belong to tribe X and never question the mantra.

Maybe we can also blame the people who oversell or overblame in their personal interest, sometimes not even consciously?

Well, like most problems, in the end, it's mostly structural, pointing fingers is useless, human nature is what it is.

Personally, the only type of person that I'm actually angry at are the ones that pretend to care and actually don't, just want to belong and secure their access to good money and status. While I'm angry at those who made the whole field worse by pursuing status, I'm also sad for those that had to show submission to the mantras as they didn't have much choice if they wanted to jump on the tech wagon. I hope mentalities change, actual problem solvers win on the long term, and the way posturing is currently rewarded comes to a halt.

---

In all honesty, this started as a rant (and some people liked the vibe), but as I realized it might reach a broader audience, I toned it down. If you're curious about the original, you can find it [at this specific version in the git history](https://github.com/c4ffein/writings/blob/bbe21c5c50a96aa553ea43af993c62602a8e2240/s/competency-cycle/competency-cycle.md).
