# There Is No Stop Sign


The amount of both over-hype and denial AI first attracted when it reached the developer circles was astonishing.

In my opinion, this can be explained by two separate things:
- Some junior developers were very adamant about something that was still in its infancy, and angered more experienced engineers who saw basic flaws.
- Artificial neural networks, on which all the current AI wave is based, work counterintuitively with what most old school programmers are used to.

Which means, a lot of experienced developers are now reluctant to keep up with the current advances.

I'm not an expert, the only project I carried out that involved custom neural networks was a visual editor that was used for teaching freshmen. In other projects I only used existing models for inference, or AI tooling for writing code. Obviously I consider myself an engineer far more than a scientist, and I think basic engineering knowledge and scientific curiosity should still be enough to produce something worth sharing.

TL;DR: this is the connective tissue between all these things that I consider worth hearing about. Also, this is what I want to send to my computer-aware friends who hear about AI progress through X and LinkedIn.


## Defining AI


Not everyone defines "intelligence" the same way, which means even the researchers at the frontline don't all have the same definition of what AGI is (for example, see [this article](https://cacm.acm.org/blogcacm/two-concepts-of-intelligence/) for the generally American versus generally European view).

What is tangible, though, is that this thing can run on regular hardware. Without diving into the details: there is some level of high specialization for how the current hardware is running, but the bedrock is still a regular computer.

Which should put the focus on what separates the AIs everyone is talking about now, and previous attempts at generalizing "problem-solving", since they are based on the same kind of machinery that only performs basic computations.

There are two concepts unrelated to AI that actually explain a lot about the evolution of computers, and knowing them will still help infer about the development of the current-gen AI.

### Moore's Law

**Moore's Law** (1965): The observation that the number of transistors on a chip doubles roughly every two years, leading to exponential growth in computing power at similar cost.

It was predicted to hit physical limits (atoms are only so small), but it keeps finding ways to continue through [3D chip stacking](https://spectrum.ieee.org/3d-cmos), [chiplets](https://en.wikipedia.org/wiki/Chiplet), [specialized accelerators](https://en.wikipedia.org/wiki/Neural_processing_unit), and a lot of the remaining room for improvement.

To sum it up - computers can still become both more powerful and cheaper, no real stop in sight.

### Wirth's Law

**Wirth's Law** (1995): "Software is getting slower more rapidly than hardware is getting faster."

Companies are incentivized to develop inefficient software: they want efficient production processes, and prioritize short-term feature delivery through cheap developers, even if they are coded in a naive way.
The only barrier is being **tolerable** according to the average human standard.
This is why most software seems so slow.

This is still true for parts of the AI software stack (they can't ditch tens of years of software development), but they want maximum performance since there is a run to get the most powerful AI at the lowest cost, and are ready to invest for long-term gains.

We'll go back to how important this law is in relation to the current tech landscape.

## Neural Networks

You don't need the exact math to follow the rest, but I'll provide links if you want to actually understand what I could only sum up poorly.

A neural network doesn't follow rules a programmer wrote. It's loosely inspired by how neurons connect in a brain. You show it millions of examples, and it adjusts millions (now trillions) of little numbers until it gets the answers right. Matrix multiplications, gradual adjustment, and a few new techniques (that could only be discovered once there was enough compute to try them) turned out to be enough.

The historical proof of concept was [MNIST](https://en.wikipedia.org/wiki/MNIST_database), a dataset of 70,000 handwritten digits. Writing explicit rules to recognize everyone's handwriting was something people competed on for years, and then, a neural network learned to do it with more accuracy than any custom code could. That was the demonstration: neural networks can learn patterns that are too tiresome for humans to describe in code.

Modern LLMs are the same principle pushed absurdly far. The transformer architecture, introduced in 2017 in the [Attention Is All You Need](https://arxiv.org/abs/1706.03762) paper, changed everything through a single mechanism, attention.
Instead of processing text one word at a time, the model learns which parts of the input relate to which other parts.
Take "the human let the model pick an example because it was tired": current LLMs understand that "it" refers to the human - even though "it" is not even the right word for a human. Grammar doesn't help here, world knowledge does: models don't get tired, and a tired human is exactly the kind that delegates. Previous systems, from hand-written grammar rules to earlier statistical NLP, had no chance on a sentence this sloppy - and we produce sloppy sentences all day.
Betting that the emergent capabilities that started to appear, and seemed to scale through datasets and compute manageable through a few gaming GPUs, could actually scale through models hundreds, then thousands of times bigger, was what has been done at OpenAI prior to the release of ChatGPT.
Betting on this sounded almost naive, and I had conflicting feelings when I heard about it. I believed in [neurosymbolic AI](https://en.wikipedia.org/wiki/Neuro-symbolic_AI). Just scaling transformers felt like it would need an unavailable amount of power to reach actually decent capabilities. But insane amounts of compute have been thrown at training, and it did work well enough to justify more investments.
The release of ChatGPT seemed like a single break-through, but it was actually just a point on a curve, representing when the bullshit generator seemed to be somewhat useful to the average human, however full of hallucinations and missing actual reasoning the output seemed.

If you want to actually understand how all this works (worth it), [3Blue1Brown's neural networks series](https://www.3blue1brown.com/topics/neural-networks) is the best resource on the subject, available as articles or videos built from his custom visualization tools: from [what a neural network is](https://www.3blue1brown.com/lessons/neural-networks) and [how it learns](https://www.3blue1brown.com/lessons/gradient-descent), to [transformers](https://www.3blue1brown.com/lessons/gpt) and [attention, step by step](https://www.3blue1brown.com/lessons/attention).

In all cases: this is why scaling matters. You're potentially unlocking new capabilities just by giving the model more room and more data.

### The Bitter Lesson

Rich Sutton's ["The Bitter Lesson" (2019)](http://www.incompleteideas.net/IncIdeas/BitterLesson.html) is probably my favorite essay in AI.

The bitter lesson: **general methods that leverage computation scale better than clever domain-specific engineering.**

Every time AI researchers tried to hand-craft knowledge or build in human expertise, they eventually got beaten by simpler methods that just used more compute and data. Chess engines with elaborate position evaluation were at some point beaten by tree search + compute. Same for the carefully designed language rules beaten by statistical models trained on raw text.

The lesson is "bitter" because it means human cleverness matters less than we'd like. The winning strategy is almost always: simpler architecture + more data + more compute. Crafting this usually requires the smartest engineers though. Who are now quite accelerated by agentic AI.

Once again, this is why we have huge, costly models instead of cleverly engineered smaller ones, and there is currently no way to compete with what the latest frontier (i.e. pushing the intelligence frontier) models are able to provide.
And whenever people complain that "LLMs can't do X", I'm not surprised when the next version does X. The early criticisms (can't reason, can't code, can't follow instructions) were solved by slightly tweaking the architecture, including more quantitative and qualitative training data, but, more than anything, throwing more compute at the problem.

It may feel counterintuitive to most, as not everyone followed the curve from the start, but there is nothing that inherently puts a ceiling close to what is the current release.

### Is there still a place for smaller models

Sometimes, the model is just good enough for the current need of the user. We could also imagine having more specialized slightly smaller models that can compete decently on small specific tasks.
But here is the thing: the tokens are getting cheaper. Not only by price/token on simple tasks, needing simple models. But by price/task, where a seemingly more expensive smarter model outcompetes a smaller, seemingly cheaper one, as it can one-shot the complex tasks.
Wanting to feel smart by doing it yourself is most of the time not a viable option, except for the learning factor.
Some parts of the industry favor indie hackers, and some parts of the industry require billions in investment. LLMs still require billions in investment, and fine-tuning is **generally** not worth it.
It seems the capabilities of the LLMs reinforce each other: training in code can make a more logical english writer, and training in english text will make a programming model more versatile in its understanding of client needs.
Fine-tuning has a place, but is a really niche thing compared to "off-the-shelf" + custom context.

### Actual reasons for a stop to the scaling laws

Actually, there are arguments for this to stop: the data wall (we're running out of quality training data), energy costs (training runs consume as much power as small cities), diminishing returns on benchmarks, and regulatory risk. But there are also a lot of proposed solutions, and the brightest minds are working on them. Synthetic data generation, more efficient architectures, distillation, better data curation - each supposed wall has met a proposed ladder.

It's hard to quantify as an outsider to the field, but what we can witness is that the arguments the doubters recycle were raised and supposed to manifest years ago, and yet the models kept improving.

There are actual limitations to the transformer architecture, and additional limitations that could or could not materialize.

For these additional limitations, I have an engineer's gut feeling here. Non-engineers suppose our work is purely rational, but the gut feeling is formed after years of building stuff. Mine tells me that most of the remaining problems that should stall improvements are solvable. There are still countless ideas to try. And historically, the stats make "we'll find solutions for all of these" very plausible.

The data wall was supposed to stop GPT-4 from improving over GPT-3, compute costs were supposed to make scaling uneconomical, and attention was supposed to not scale past a certain context length. This is old news, that still gets repeated. Each time, someone found a way.


### More parameters introduce nuance

A more nuanced understanding from bigger models is, in my opinion, one of the things that best shows the introduction of new capabilities.

> Peux tu m'expliquer le sens de cette phrase: Pierre prend la boule et la lance.

For non-French speakers: this asks Claude to explain a sentence that can be read both as "Pierre takes the ball and throws it" ("lance" as a verb) and "Pierre takes the ball and the spear" ("lance" as a noun). Opus catches this ambiguity. Sonnet doesn't even consider it.

This isn't about generational improvements - Sonnet 4.5 vs Opus 4.5 were released months apart. I observed the same pattern with previous gen models: Sonnet never caught this nuance, Opus always did. Scale seems to be the main determining factor here, not training iterations or release dates. If Anthropic could make Sonnet - their volume product - catch this level of nuance cheaply, they would. The fact that it requires Opus suggests it's a capability that comes with scale.

This is just a singular example, but it is representative of something I observed through many different sentences, the bigger model generally has a far more nuanced view. I usually recognize Sonnet (the mid-sized model from Anthropic) as they get some of the meaning wrong.

More parameters → more nuance.

## How we used "AI" before

LLMs felt a lot like they were only good at spewing out known facts. Which also explains why it was so easy to form the wrong mental model, believing they were only like a database of some sort. While we've seen that they develop more and more emergent behavior, it is true that the "remembering and spewing out" part was quite strong compared to the rest. So these specific usages were already quite recognized:

### Replacing Google
Google went from user-acquisition to revenue maximization. Because of ads, sponsored links, and, more generally, a ranking that favors sites that maximize engagement over direct answers, Claude giving me a list of the most plausible answers has been a far better experience. I'd take the occasional (and increasingly rare) hallucination over Google every time - which I can still use as a backup.

### Replacing templates
It also explains why juniors had such a high opinion of the past models, and the experts, not so much. You see, models were very good at always generating the same default app corresponding to the same need from the user. A Flappy Bird, a calculator, a dashboard... What was curious was how consistent these answers were. Even raising the temperature (a parameter controlling output randomness) still produced a really close output. Juniors were amazed at the machine giving in 2 minutes what would have taken them 2 days, experts weren't convinced since any real change past that broke everything. But even to the experts, LLM soup replaced the templates that helped you bootstrap a project (that you previously bought online for $200).

### Autocomplete
When you are in your developer environment, some of the most obvious grunt work was automated by the LLM. If you had a *really obvious* pattern in your code, or code that actually looked like very common knowledge, your editor could suggest the next changes. It was excruciating - even as an AI revolution believer, I didn't use it - as it was at a specific threshold that was just annoying. Not fast and accurate enough to be a joy to work with, I'd rather type that line of code than be interrupted by the AI that may or may not be right.


These were real improvements to my workflow, but nothing that signaled what was coming - unless you understood why it was working.

## The agentic shift

### How does a human actually code

Think about what you actually do when you code:
1. Read existing code to understand context
2. Search for relevant files and patterns
3. Make a change
4. Run tests or the app to see if it works
5. Read error messages
6. Repeat

It's not "think of perfect code and type it out." It's an iterative loop of reading, searching, trying, failing, adjusting.

### AI has to be agentic

Early AI coding tools were "autocomplete on steroids" - you type, they suggest the next line. Useful, but limited.

The insight: if humans code through an iterative loop (read → search → edit → test → repeat), then AI should too.

This is the paradigm shift. Not "AI writes code" but "AI does the same loop a human developer does."

### Claude Code

There will be a full separate article about [Claude Code](https://docs.anthropic.com/en/docs/claude-code), and why I don't write code myself anymore. It still happens when I open a file, and the thing I want to change is right in front of me, or when I choose to do a code puzzle. But else, I don't need to anymore.

Here is the TL;DR.

This is the shift from AI in IDE (which was janky and frustrating, as it interrupts you every 10 seconds...) to a fully agentic process. [Claude Code](https://docs.anthropic.com/en/docs/claude-code) is Anthropic's terminal-based coding agent - it reads your files, searches your codebase, makes edits, runs your tests, sees the errors, and iterates until the task is done. It paved the way to a lot of other solutions like [Codex CLI](https://github.com/openai/codex), [Gemini CLI](https://github.com/google-gemini/gemini-cli), or the French [Mistral Vibe CLI](https://github.com/mistralai/vibe).

It's not autocomplete, but the automation of the full human software engineering loop. The model can generate text to the user. But the tools that harness the models also let them execute tools to make specific edits to specific files, write the tests and launch them, and, actually, execute anything through the cli like a real engineer would do in their feedback loop.

Even team collaboration is automated. Claude can now read issues, and sometimes generate the PRs as a separate entity. Claude is now one of the main contributors on some really serious open source projects (see [Bun](https://github.com/oven-sh/bun/graphs/contributors) for example). And that's only counting the visible contributions — many developers disable Claude's co-authorship.

Claude was able to [find vulnerabilities in Firefox](https://blog.mozilla.org/en/firefox/hardening-firefox-anthropic-red-team/). There is no way to be in denial anymore.

It works. Not perfectly - it still hallucinates, still needs nudging on complex tasks, still doesn't know what it doesn't know. But for most day-to-day coding, the bottleneck is no longer the AI, but everything else.

Using acronyms like KISS and DRY as shorthand, letting it manage git, discussing security tradeoffs, catching its mistakes when it confidently claims nothing was removed... I was able to pull out in days what would have taken me weeks before if I had to write every single line. I still can, but I don't want to.

A reason why it works so well is that modern software engineering is *very* repetitive. It is rare that a problem that makes you feel clever for solving it yourself didn't actually already exist in *many* different contexts. The previous generations were not as good at synthesizing contexts. But, as the models get better, they are able to generalize and naturally generate tokens to the right solution.

They are now able to work on new languages or frameworks, as most of the concepts themselves are present in some other form in the dataset. I was able to introduce good practices from an Angular version released past the model's knowledge cutoff, simply by pointing it at the most recent documentation.

Most of the engineers that don't see the AI doing their job fail to realise that most of our clever hacks already exist in nature. Even if the AI was far worse at "thinking", it could generalize from far more examples than what our human brains are able to consume.

There is still some nudging to do. Some thinking on really new problems. But overall, "software-engineering" with the humans fully in charge is nearing the end.

#### Sovereignty concerns

An argument I keep hearing is that there are air-gapped environments where we would never allow access to these models. Except the open source models you can self-host on a really powerful machine are now good enough to reach the "I'd rather let them type the code" threshold. For example, latest open models always seem to be closing the gap with frontier AI, and can be deployed in air-gapped environments. They're not quite as good, but good enough to be a drop-in replacement in environments where frontier closed models aren't an option.

The argument that some pockets of software engineering are off-limits to agentic coding is over, as you can bring the whole stack there.

### Agentic first

Even [Cursor redesigned their entire interface](https://cursor.com/blog/2-0) to be agent-centric rather than file-focused. The previous iteration was really close to what you would expect from a VSCode fork. Mostly the codebase + a chat window. The new version is centered around handling multiple parallel agents. The experiment phase is over. Agentic is the default.

## And what is the future now?

### No stopping in sight

The models still improve. But here's the twist: the bottleneck has shifted.

### Wirth's Law is now the problem

In my feedback loop as a developer, I'm now wasting more time waiting for tests than waiting for the model.

Wirth's Law explains this. Most tech stacks are slow because companies don't care - they optimize for developer velocity, not runtime performance. The software just needs to be tolerable to humans.

But agentic AI changes the equation. If your AI agent is bottlenecked by a 30-second test suite that could run in 3 seconds, that's wasted compute, wasted money, and worse results - fewer iterations means less refinement.

### Anthropic acquired Bun

This is in part why [Anthropic acquiring Bun](https://bun.sh/blog/anthropic-acquires-bun) is the smartest move.

Bun is a JavaScript/TypeScript runtime built from scratch in Zig, usually 3-10x faster than Node.js thanks to some smart trade-offs. It's a direct counter to Wirth's Law - instead of accepting that JS tooling is "just slow", they rewrote nearly everything with performance as the priority.

It already powers Claude Code. And yes, [Claude](https://github.com/claude) is already contributing to [Bun](https://github.com/oven-sh/bun)'s development - you can check the [top contributors](https://github.com/oven-sh/bun/graphs/contributors).

Now companies like Anthropic care about fast runtimes. Raw compute isn't enough if the software stack wastes it. The testing feedback loop gets faster, the agent iterates more, the results get better.


### Why were the good tools underused?

The best tools were underused because they're behind a paywall. Companies fight this by giving temporary access to the best models, sometimes through invite codes, but they also provide free models - which are subpar.

The regular models aren't that good. I hear a lot of complaints from people about the models failing to reason on a given problem, while working with mid-sized models. If you want to form an opinion, you need the best models, and the best environment for them to operate agentically. If you've tried *state of the art* more than 6 months ago, or an agentic environment that didn't manage the context well, or a cheap model - you're building your worldview on outdated information.

Everyone I know who tried state of the art agentic coding seriously - with decent expectations, not "build me X" and come back three days later - has been mind blown.
State of the art for me is Claude Code with Opus 4.6, personal choice. But once again, you don't want to form an opinion on anything that is not at least to this level, or the one of Google Antigravity.

### Why each session makes the next model better

Code has a structural advantage over other AI domains: there is usually quite a short feedback loop for correctness.
We had years pre-genAI to experiment with methodologies to get the previous stochastic parrots (us, the humans) to make better code.
Whether it's testing, stronger type systems, the introduction of pipelines and quality metrics - we have a history of trying to do better.

Every time someone uses Claude Code, there is an opportunity for the user to correct the output of the AI.
Maybe the model silently removed a useful test, maybe it hallucinated an API that doesn't exist.
The flock of users represent a massive, continuously generated dataset of "what the model got wrong and what could have been the right answer."

But you can even classify your users by competence - even roughly, using proxy signals. This is speculative, but there is nothing preventing the AI companies from doing this once you accept them training on your data.

It may or may not work depending on multiple factors leading to the final quality of the curation. But it's only one of the countless solutions to get more and more useful data to train the next generation of models on. The numbers of potential techniques make a compelling argument for at least some of them to work, and the models to keep improving.

### Does it stop with code

Thinking code is the end would be a misconception.
Between first drafting this article and releasing it, [Claude Design](https://www.anthropic.com/news/claude-design-anthropic-labs) and [Claude Science](https://www.anthropic.com/news/claude-science-ai-workbench) came out.

You can only imagine how applying the same loop (putting out products that let a profession accelerate through AI, gathering usage data, training the next gens of models) can do outside of code.

The transformer architecture may be the real inflection point. It doesn't matter that the learning is decoupled from the inference. The agentic AI now helps forming the next model. This is where the real loop happens.

Inventors tried to imitate birds when trying to fly. Airplanes are quite different.
The silicon stack is different than the biological one, and the transformers + auto research at the top labs will probably be the ASI unlock.

### Previous prediction for the workforce

Here's a quote:

> "I think we'll be there in three to six months—where AI is writing 90 percent of the code. And then in twelve months, we may be in a world where AI is writing essentially all of the code."
- Dario Amodei, Anthropic's CEO, [March 2025](https://www.cfr.org/event/ceo-speaker-series-dario-amodei-anthropic)

I'd recommend reading the whole transcript. He was quite precise with his words. I read this at the time and agreed with him. He has the same insight: machines still need to be nudged, even though it will be less and less. Most newspapers took this direct quote as a title, to sell fear by removing all the nuance and turning this measured point of view into quite an inaccurate opinion that he never pushed for. Also, having a voice that was extremely bullish yet nuanced was refreshing.

Personally, I now write nearly all of my code with Claude Code. Whether the industry-wide number is exactly where he predicted, the direction is undeniable. He may be late by months but for specific reasons.

He is more of a scientist than an engineer, and the barriers that appeared are not the ones he's used to. We're talking about adoption friction in big companies where things have to move slowly, and processes have to be validated by the management, not actual technical limitations.

Once again, in my experience, anyone that tried agentic coding seriously doesn't want to go back.

The argument that AI hype doesn't deliver since it comes from the AI labs isn't valid. We shouldn't consider them as authority figures, because they have their interest there, but it's just as wrong to infer the opposite.

The developers aren't dead yet - but the role is evolving fast. You still need a lot of knowledge outside "how to use an AI", but the need for "someone who just writes code" dropped sharply.

So, the honest question: what happens in the next 5 years?

The title "developer" as we knew it is fading. What remains:
- **Excellent engineers** - and I mean *really* excellent. R&D, novel problems, things that don't exist in the training data yet.
- **Product people** - understanding what to build matters more when building is cheap.
- **The one-person army** - someone who does everything with AI assistance in a small structure. Startups of one.
- **Ops and infrastructure** - humans will be in charge there for a bit longer. Someone still has to keep the lights on.

### So should I worry?

I'm still unsure about the transformer architecture being the most important key to reaching AGI. But anything that is the frontier of the current model capabilities, where it fails in the real world, is more data for AI companies to make a next model providing solutions. Unless there is a global market crash, or another black swan, the models will keep getting more capable — each generation's failures become the next generation's training signal, and the investment shows no sign of slowing.

Here's my honest take:

I still write code. When the thing I want to change is right in front of me. For learning and training, also, which will even make you a way better nudger. And fun, if you're a fellow nerd.

But typing out code fast, it may be fun, but not if it's the plan for 40 hours a week through most of my life. Knowing the libs by heart, grinding through the transpilation of business rules from Jira tickets into decent code... I'm so glad this is over.
I dump a slangish train of thoughts into one of the most complex machinery mankind ever built, and I get the codebase I want.
The train of thought is even more compatible with the machine because I started coding in C at 13, and I walked through the whole software stack, and every slangish term I use conveys implicit nudges.
But typing all this code, for one more project? No.

The real value is, was, and will continue to be for a long time: understanding fast, and easily pinpointing logical flaws. We're already past the point where you can materialize what was a 2-week project out of thin air in something like 4 hours - and I expect the first number to keep going up, and the second to keep going down. It's just that this project will contain some bugs that need human investigation.

So, here's the thing: if you managed to learn how to code pre-AI, you'll learn whatever needs to be learned for what's to come. The skill was never "writing code." It was problem-solving, system thinking, translating messy human needs into structured solutions.

I think there is only one thing that could put you in danger, it's the thought that "writing code" was what made you special.

Because while doing what you did, and what I did, proved our cognitive capabilities, and helped form our minds, the machine is already better at converting my slangish train of thought into a beautiful and structured codebase.

We keep pouring data, compute and research into the next generations of models. There is no stop sign.
