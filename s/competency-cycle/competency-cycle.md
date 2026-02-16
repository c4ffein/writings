# Competency Cycle

There is this noticeable pattern in tech: adoption follows a hype cycle driven more by competency signaling than real problem-solving capabilities.

Recognizing this pattern helped me be less prone to hype, [choose boring tech](https://mcfunley.com/choose-boring-technology), reduce the FOMO fatigue, and in the end ship more.

## Some specific examples

### Microservices, then wanting to go back to a monolithic architecture.

Maybe at first it helped to force people to split their logic, but then some people started splitting it in the most absurd way.
At some point we may end up with specific microservices being far more bloated than one single monolith could be.
And even so, I think it will be even worse when they go back to that so glorious monolith after reading I don't know what blog post.

I've seen countless people argue over monolith vs microservices, sometimes shifting the whole architecture across years and circling back.
Maybe both have tradeoffs, both can work, and overall success depends far more on the how than on this specific dichotomy.

Suboptimal solutions can always work with a lot of duct tape. I've seen architects gain confidence in their future choices by having other engineers duct-tape their design.
I would be very cautious of anyone telling me my problems would go away in case of a monolith/microservices switch (in both directions). The fact that their past architectures shipped isn't as strong a signal as it seems.

### SPA, then going back to SSR.

I do think HTMX is great, but if you currently think HTMX is the solution to most of the problems that most of the frontend developers encounter today, you may have overlooked what caused those issues in the first place.

I do think the overall HTMX experience could be terrible too, although not for the same reasons. The problems people blame on SPAs — 8MB bundles for basic components, request waterfalls slowing everything down — are usually symptoms of:
- poor architectural decisions
- the management of the development team that didn't leave room for implementing it the correct way
- or just lack of skill/care from the developers.

If any of these was the root cause for a bloated, sluggish react app, then you would also end up with a bloated, sluggish HTMX app.

There are indeed interesting tradeoffs when choosing between HTMX and React, and both are beautiful tech and valid choices.

### Redis, Mongo, Celery... Instead of a relational database with a well thought data model.

For scalability reasons, specific teams had to rely on databases that diverged from the ACID / relational database paradigms, and ended up with the whole suite of NoSQL solutions.

There is also this whole trend of needing a big infra to be taken seriously as an engineer.
```
We have so much traffic that we need Mongo + Redis + Celery + ...
```
Usually brings a lot of clout. Maybe this one should bring you more.
```
We optimized our backend to run fully async and handle X millions of requests per day on a single server. Scales if needed.
```

Nothing is inherently bad with either route, building cloud-based infrastructure is worth it from a scalability point of view, and there are downsides to using [Postgres for Everything](https://www.amazingcto.com/postgres-for-everything/).
But whatever your choice, what you saved in development you usually pay back later in maintenance.

### Any methodology that got traction

This is the most general example. Anything like Clean Code, Scrum, Extreme programming, came from quite good intentions, and did have a positive impact on early adoption, but seeing how far they strayed from their original purpose now fills me with a mix of sadness and anger whenever a new debate starts. I acknowledge there are still healthy discussions to have, but most end up as tribal battles.

## The overall cycle

It seems that each of these examples followed this exact pattern, regarding their adoption:

- A new tech or methodology appears.
- The original creators and early users of the shiny new thing are usually quite close.
- Highly motivated people who follow the latest trends pick it up and build with it.
- Using it actually becomes a marker of skill, whether adequate to the problem or not - it helps you belong in the group that is better paid.
- This is now one of the standards, independently of the perceived value in it.
- More and more projects use this tech in a broken way.
- To most people, there seems to be a problem to be fixed. Maybe by a new language, framework, or methodology?

Sometimes, across everything we built or adopted, we can be at different points at the same time. And this can feel endless, the ecosystem never stops spewing out new stuff to try, that take time that could be used by building with suboptimal tools you already master.

## Stuff that actually becomes better

That said, these cycles do let developers experiment with multiple solutions, and sometimes real progress comes out of it. npm ended up focusing on performance because yarn gained traction. React is getting a compiler because other frameworks made it a selling point. The npm → yarn → pnpm → bun progression actually solved real problems iteratively. There are more examples, but that's a different post.

Regarding Postgres, in addition to all the recent features and performance improvements, there are forks that bring even more in specific domains.
These things probably wouldn't exist in the current form without the wave of other solutions. Once again, there was a general improvement, independently of the tech you choose.

To avoid falling into the same trap myself: experiment with these, but submitting to your environment's zeitgeist is often the most pragmatic move in contexts too complex for any of us to fully grasp.


## Is there someone to blame?

I do think we can blame the people who think something is utterly good or bad, and then oversell or overblame - most of the time in their personal interest, sometimes not even consciously.
In a way, these people thrive — they found their safe space and don't have to care about contexts where the rules differ. Maybe it's easier to advance when you just want to belong to tribe X and never question the mantra.
It's all tradeoffs, and most of these techs and methodologies are decent choices when picked and applied wisely. More than that, they are usually still decent even when suboptimal, and the clout reward from the herd mentality seems to outweigh the cost of picking suboptimal techs.

I have nothing against anyone that had to show submission to the mantras, as they didn't have much choice if they wanted to jump on the tech wagon - my main target is the people that actively make the field worse by enforcing a false sense of modernity bringing fake solutions.

But, even with this taken into account: in the end, like most problems, it's mostly structural, pointing fingers is useless, human nature is what it is.

I still think spreading recognition of this pattern will help actual problem solvers win in the long term, and make posturing way less rewarded in the future.

---

In all honesty, this started as a rant (and some people liked the vibe), but as I realized it might reach a broader audience, I toned it down. If you're curious about the original, you can find it [at this specific version in the git history](https://github.com/c4ffein/writings/blob/bbe21c5c50a96aa553ea43af993c62602a8e2240/s/competency-cycle/competency-cycle.md).
