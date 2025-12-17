# There Is No Stop Sign

There is something I'm bitter about, it's the way information spreads both on social media and regular newspaper. The current landscape and incentives don't push the voices of measured people to the ones that are just curious and could benefit from it.

From this, there is this whole industry of individuals that mastered looking like experts, while the actual experts stay underexposed. In particular, in my field (programming), the general opinion seems tainted with the fact that artificial neural networks, on which all the current AI wave is based on, work counterintuitively with what most old school programmers are used to. Which also explains the amount of scepticism AI first obtained when it reached the developer circles. While it was over-hyped by casual programmers, maybe there was some actual value, and the old-school programmers were too dismissive.

I won't pretend to be an expert, the only project I carried out that involved custom neural networks was a visual editor that was used for teaching freshmen, in other projects I only used existing models for inference, or AI tooling for writing code. I consider myself an engineer far more than a scientist, and I think basic engineering knowledge and scientific curiosity should still be enough to produce something worth sharing.

Really, I wrote nothing new here, I'm not trying to compete with all the content already out there produced by actual experts, but to produce the connective tissue between all these things I would have liked to know if I didn't already, so they are available in a single place to the people that sometimes actually ask my opinion.

Well, that way you can form your own opinion about where this whole thing is going.

## Disclaimer about why I wrote this

I couldn't recommend Claude Code enough to some of my friends, and one of them that ended up trying (and that organizes some of the tech meetups where I live) actually enjoyed it enough for them to propose me to give a talk about coding with AI.

My way to go is usually to mind dump everything then refine, get some slides out of it, and then give a talk from what I remembered from what I wrote.

Obviously the whole "meta" part wouldn't fit in a 20-minutes talk, as I still have to give many examples about the actual "coding with Claude" part, so, if you were at my talk, here is the companion article I talked about, and if you weren't, I hope this doesn't read too much like a mind-dump!


## Do people actually know what an AI is


I have my own definition of "intelligence", but it is not something everyone agrees upon. Well, even the researchers at the frontline don't all have the same definition of what AGI will be.

What we can agree upon is the definition of "artificial", and how that thing, whether we want to call it "intelligent", "thinking", or "just a stochastic parrot", comes from.

### Well, actually, what is a computer?

Interestingly enough, this runs on hardware that is close to a regular computer. We won't go into details, there is some level of high specialization for how the current hardware is running, but we should understand a thing or two about "computers".

So this should be even more important to actually define.

```
A computer is a machine that takes in information, processes it by following instructions, and gives you results.
```

But now we must be asking, what separates what the AIs everyone is talking about and previous attempt at generalize "problem-solving", since they are based on the same machines that only perform basic computations?

Before we dive in, there are 2 concepts that I consider quite important here.

#### Moore's law

**Moore's Law** (1965): The observation that the number of transistors on a chip doubles roughly every two years, leading to exponential growth in computing power at similar cost.

It was predicted to hit physical limits (atoms are only so small), but it keeps finding ways to continue through:
- **3D chip stacking** - building up instead of shrinking down
- **Chiplets** - multiple smaller chips working together instead of one monolithic die
- **Specialized accelerators** - GPUs, TPUs, NPUs: purpose-built silicon for specific workloads

TL;DR - computers can still become more powerful, no real stop in sight

#### Wirth's law

**Wirth's Law** (1995): "Software is getting slower more rapidly than hardware is getting faster."

Companies are incentivized to develop inefficient software: they want efficient production processes, and are incentivized to maximize short-term feature delivery, even if they are coded in a naive way, and don't require costly developers.
The only barrier is being **tolerable** according to the average human standard.
This is why most software seems so slow.

This is not real for AI software - they want maximum performance since there is a run to get the most powerful AI at the lowest cost.

It's just a random fact for now but it will make sense later.

### What is a neural network

A neural network is a program structured as layers of connected nodes, loosely inspired by how neurons in the brain connect to each other.

The key difference from traditional programming:
- **Traditional**: you write explicit rules ("if pixel pattern looks like X, it's a 7")
- **Neural network**: you show it thousands of examples and it *learns* the patterns

Each connection between nodes has a "weight" - a number that gets adjusted during training. When you feed data through the network, these weights determine what signal passes through. Training is just: show it examples, check if it got the answer right, adjust the weights slightly, repeat millions of times.

That's it. No magic. Just matrix multiplication and gradual weight adjustment.

### MNIST

MNIST is the "hello world" of machine learning - a dataset of 70,000 handwritten digits (0-9) that became the standard benchmark for testing neural networks.

Why does it matter? In the 1990s, getting a computer to recognize handwritten digits was genuinely hard. You couldn't write rules for it - everyone's handwriting is different. MNIST proved that neural networks could learn to do it with ~99% accuracy.

It sounds trivial now, but this was the proof of concept: neural networks can learn to recognize patterns that humans can't explicitly describe in code.

### emergent properties

Here's where it gets interesting. When you scale neural networks up - more parameters, more training data, more compute - they start doing things nobody explicitly trained them to do.

MNIST networks recognize digits. But at some point, larger networks started:
- Reasoning through multi-step problems
- Writing code
- Translating between languages they weren't specifically trained on
- Explaining their reasoning

These are "emergent properties" - capabilities that appear at scale without being directly programmed. Nobody wrote "if user asks for code, generate syntax." The network learned it from patterns in the training data.

This is why scaling matters. You're not just making the same thing faster - you're potentially unlocking entirely new capabilities.

### the bitter lesson

Rich Sutton's "The Bitter Lesson" (2019) is one of the most important essays in AI.

The bitter lesson: **general methods that leverage computation scale better than clever domain-specific engineering.**

Every time AI researchers tried to hand-craft knowledge or build in human expertise, they eventually got beaten by simpler methods that just used more compute and data. Chess engines with elaborate position evaluation? Beaten by tree search + compute. Carefully designed language rules? Beaten by statistical models trained on raw text.

The lesson is "bitter" because it means human cleverness matters less than we'd like. The winning strategy is almost always: simpler architecture + more data + more compute.

This is why we have trillion-parameter models instead of cleverly engineered smaller ones.

### how does a transformer work

The transformer (2017) is the architecture behind modern LLMs. The key innovation: **attention**.

Previous neural networks processed sequences one step at a time (word by word). Transformers can look at the entire input at once and learn which parts are relevant to which other parts.

When processing "The cat sat on the mat because **it** was tired", attention lets the model learn that "it" relates to "cat", not "mat" - by learning patterns across millions of examples of how words relate to each other.

The "magic" of modern LLMs:
1. Stack many transformer layers (GPT-4 has ~120, Claude is similar scale)
2. Train on massive text datasets
3. The attention patterns become increasingly sophisticated at each layer
4. Emergent capabilities appear at scale

That's the architecture. Everything else - the chat interface, the coding ability, the reasoning - emerges from scaling this basic pattern up.

If you want to actually understand this visually, 3Blue1Brown's series is the best resource:
1. [But what is a Neural Network?](https://www.3blue1brown.com/lessons/neural-networks)
2. [Gradient descent, how neural networks learn](https://www.3blue1brown.com/lessons/gradient-descent)
3. [What is backpropagation really doing?](https://www.3blue1brown.com/lessons/backpropagation)
4. [Backpropagation calculus](https://www.3blue1brown.com/lessons/backpropagation-calculus)
5. [Transformers, the tech behind LLMs](https://www.3blue1brown.com/lessons/gpt)
6. [Attention in transformers, step-by-step](https://www.3blue1brown.com/lessons/attention)

Full playlist: [3blue1brown.com/topics/neural-networks](https://www.3blue1brown.com/topics/neural-networks)

### my "whoa moment" happened before ChatGPT

I heard about transformers, GPT-2, and OpenAI's bet on "just scale it up" back when it sounded almost naive. I didn't believe this was the path to general intelligence.

Then I actually tried ChatGPT when it launched, and even with all the criticism that was already there, I saw the potential.

But here's the thing: the ChatGPT moment didn't come from nowhere. It came from GPT-2, which came from GPT, which came from scaling transformers. Each step was "just" more compute, more data, more parameters - and each step unlocked capabilities the previous one didn't have.

So now when people say "but LLMs can't do X" - I'm not surprised when the next version does X. The early criticisms (can't reason, can't code, can't follow instructions) got solved by throwing more compute at the problem. That's the bitter lesson playing out in real time.

There's no reason for these improvements to plateau, even though there could be diminishing returns in sight.

### more parameters introduce nuance

One of the things that best shows the introduction of new capabilities, is how nuance is introduced with the model scaling. When asking what can be read both as "Can you explain to me the meaning of this sentence: Pierre takes the ball and throws it", but also "Pierre takes the ball and the spear":

> Peux tu m'expliquer le sens de cette phrase: Pierre prend la boule et la lance.

For non-French speakers: the sentence "Pierre prend la boule et la lance" is ambiguous. Does Pierre throw the ball ("lance" as verb), or does he grab the ball and the spear ("lance" as noun)? Opus catches this ambiguity. Sonnet doesn't even consider it.

This isn't about generational improvements - Sonnet 4 vs Opus 4.5 were released months apart. I observed the same pattern with previous gen models: Sonnet never caught this nuance, Opus always did. Parameter size is the determining factor here, not training iterations or release dates.

You may argue that this is just a singular example, but it is something I observed through many different sentences, the bigger model generally has a far more nuanced view.

More parameters → more nuance. Same bitter lesson, same scaling principle.

### How we used "AI" before

LLMs worked a lot like "memory machines" before. Which also explains why some media experts actually have the whole mental model wrong, believing they were only like a database of some sort. While we've seen that they develop more and more emergent behavior, it is true that the "remembering and spewing out" part was quite strong compared to the rest. So you may have thought about these specific usages:

#### Replacing Google
It is true it was a far better experience asking my question to Claude than to the enshittified Google. Google gave me ads, then a bunch of links that may or may not contain my answer, that I had to check one by one, hoping for a decent answer through a thread filled with useless comments. Claude giving me a list of the most plausible answers has been a joy, maybe if there was some occasional hallucination, I'd take it over Google every time (and I can still use it as a backup).

#### Replacing templates
It also explains why juniors had such a high opinion of the past models, and the experts, not so much. You see, models were very good at always spewing out the same default app corresponding to the same need from the user. A Flappy Bird, a calculator, a dashboard... What was curious was how consistent these answers were. Even raising the temperature (a parameter controlling output randomness) still produced a really close output. Juniors were amazed at the machine giving in 2 minutes what would have taken them 2 days, experts weren't convinced since any real change past that broke everything. But even to the experts, LLM soup replaced the templates that you could buy online for $200, that helped you bootstrap a project.

#### Autocomplete
When you are in your developer environment, some of the most obvious grunt work was automated by the LLM. If you had a *really obvious* pattern in your code, or code that actually looked like very common knowledge, your editor could suggest the next changes. It was excruciating - even as an AI revolution believer, I didn't use it - as it was at a specific threshold that was just annoying. Not fast and accurate enough to be a joy to work with, I'd rather type that line of code than be interrupted by the AI that may or may not be right.


These were real improvements to my workflow, but nothing that signaled what was coming - unless you understood why it was working.

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

There will be a full separate article about Claude Code, and why it's a revolution.

But here is the TL;DR.

This is where agentic AI becomes concrete. [Claude Code](https://docs.anthropic.com/en/docs/claude-code) is Anthropic's terminal-based coding agent - it reads your files, searches your codebase, makes edits, runs your tests, sees the errors, and iterates until the task is done.

It's not autocomplete, but the full human software engineering loop, automated.

Even team collaboration is automated. Claude can now read issues, and generate the PRs as a separate entity. Claude is now one of the main contributors on some really serious open source projects, there is no way to be in denial anymore.

It works. Not perfectly - it still hallucinates, still needs nudging on complex tasks, still doesn't know what it doesn't know. But for most day-to-day coding, the bottleneck is no longer the AI. It's everything else.

Using acronyms like KISS and DRY as shorthand, letting it manage git, discussing security tradeoffs, catching its mistakes when it confidently claims nothing was removed... I was able to pull out in days what would have taken me weeks before.

A reason why it works so well is that modern software engineering is *very* repetitive. It is rare that a problem that you feel smart by solving yourself didn't actually already exist in *many* different contexts, but, as the models get better, they are able to generalize and instinctively generate tokens to the right solution.

Most of the engineers that don't see the AI doing their job don't fail to realise that most of our clever hacks already exist in nature. Even if the AI was far worse at "thinking", it could generalize from far more examples than what our human brains are able to consume.

There is still some nudging to do. Some thinking on really new problems. But overall, "software-engineering" with the humans fully in charge is nearing the end.

#### Sovereignty concerns

And if you can't use Claude? There's [Codex CLI](https://github.com/openai/codex), [Gemini CLI](https://github.com/google-gemini/gemini-cli), and more recently [Mistral Vibe CLI](https://github.com/mistralai/vibe). Mistral's latest models are closing the gap with Sonnet 4.5 for this kind of usage. They're not quite as good, but good enough to be a drop-in replacement in environments where Claude isn't an option - air-gapped networks, on-premise requirements, regulatory constraints.

The argument that some pockets of software engineering are off-limits to agentic coding is over. You can bring the whole stack there.

Even [Cursor redesigned their entire interface](https://cursor.com/blog/2-0) to be agent-centric rather than file-focused. The experiment phase is over. Agentic is the default.

## And what is the future now?

### No stopping in sight

Moore's Law still holds. The Bitter Lesson still applies. Each generation unlocks new capabilities.

But here's the twist: the bottleneck has shifted.

### Wirth's Law is now the problem

In my feedback loop as a developer, I'm now wasting more time waiting for tests than waiting for the model.

Wirth's Law explains this. Most tech stacks are slow because companies don't care - they optimize for developer velocity, not runtime performance. The software just needs to be tolerable to humans.

But agentic AI changes the equation. If your AI agent is bottlenecked by a 30-second test suite that could run in 3 seconds, that's wasted compute, wasted money, and worse results - fewer iterations means less refinement.

### Anthropic acquires Bun

This is why [Anthropic acquiring Bun](https://bun.sh/blog/anthropic-acquires-bun) is the smartest move.

Bun is a JavaScript/TypeScript runtime built from scratch in Zig, usually 3-10x faster than Node.js thanks to some smart trade-offs. It's a direct counter to Wirth's Law - instead of accepting that JS tooling is "just slow", they rewrote nearly everything with performance as the priority.

It already powers Claude Code. And yes, [Claude](https://github.com/claude) is already contributing to [Bun](https://github.com/oven-sh/bun)'s development - check the top contributors.

Now companies like Anthropic care about fast runtimes. Raw compute isn't enough if the software stack wastes it. The testing feedback loop gets faster, the agent iterates more, the results get better.


### Why is Claude Code underused?

Claude Code is underused because it's behind a paywall. But Anthropic knows this - recently, as a regular user, I got tickets to let friends try it free for a week. It just popped up in my terminal while the model was thinking.

Even without the brand awareness of the competition, I think they'll win. Everyone I know who tried Claude Code seriously - with decent expectations, not "build me X" and come back three days later - has been mind blown.

### And the workforce?

Here's a quote:

> "I think we'll be there in three to six months—where AI is writing 90 percent of the code. And then in twelve months, we may be in a world where AI is writing essentially all of the code."
- Dario Amodei, Anthropic's CEO, [March 2025](https://www.cfr.org/event/ceo-speaker-series-dario-amodei-anthropic)

I'd recommend reading the whole transcript. He was accurate enough. And he was quite precise with his words. I read this at the time and agreed with him, even before time made him correct. He has the same insight: machines still need to be nudged, even though it will be less and less. Most newspapers took this direct quote as a title, to sell fear by removing all the nuance and turning this nuanced point of view into quite an inaccurate opinion, that he never pushed for. Also, having a voice that was extremely bullish yet nuanced was refreshing - I wouldn't have trusted an announcement by itself, well, since it's his own company, but from a purely technical standpoint this seemed accurate. The argument that AI hype doesn't deliver since it comes from the AI labs isn't valid.

The Developers aren't dead yet - but the role is evolving fast. You still need a lot of knowledge outside "how to use an AI", but the need for "someone who just writes code" dropped sharply

So, the honest question: what happens in the next 5 years?

The title "developer" as we knew it is fading. What remains:
- **Excellent engineers** - and I mean *really* excellent. R&D, novel problems, things that don't exist in the training data yet.
- **Product people** - understanding what to build matters more when building is cheap.
- **The one-person army** - someone who does everything with Claude in a small structure. Startups of one.
- **Ops and infrastructure** - humans will be in charge there for a bit longer. Someone still has to keep the lights on.

### So should I worry?

Here's my honest take:

There is no value in writing the code yourself anymore. Typing out code fast, knowing the libs by heart, transpiling business rules into decent code - that's done.

But here's the thing: if you managed to learn how to code pre-AI, you'll learn whatever needs to be learned for what's to come. The skill was never "writing code." It was problem-solving, system thinking, translating messy human needs into structured solutions. That translates.

The people who should worry are those who thought the job was typing.
