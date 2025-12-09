# There is no stop sign

TODO move this file

Why this?
have to give a talk
had to clear my head
hesitated on how to orient my talk
infodumped everything before cleaning
nothing new here, not trying to compete with the existant but still can get all the things I think people should know in a single place, and they can form their own opinion
nothing to learn for an expert, but still think my take could be interesting to the average non-ai engineer once refined
just the article I'll link when discussing with someone having opposite views to mine, they can form their own opinion but all the "have you taken this into consideration" stuff is there

## Do they know what an AI is

I am more and more disappointed by people having takes on where this AI thing is going without having any basic understanding of it whatsoever. I won't pretend to be an expert, I consider myself a competent engineer with an interest for AI, and I think basic engineering knowledge and scientific curiosity should still be enough to provide interesting takes - so anyway, hope you have fun reading this!

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

It's just a random fact for now but it will makes sense later.

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

There's no reason to believe this stops.

### more parameters introduce nuance

```
> ai model=sonnet "Peux tu m'expliquer le sens de cette phrase: Pierre prend la boule et la lance."
```

claude_explaining_french_sonnet_lacks_nuance

```
> ai model=opus "Peux tu m'expliquer le sens de cette phrase: Pierre prend la boule et la lance."
```

claude_explaining_french_opus_introduces_nuance

For non-French speakers: the sentence "Pierre prend la boule et la lance" is ambiguous. Does Pierre throw the ball ("lance" as verb), or does he grab the ball and the spear ("lance" as noun)? Opus catches this ambiguity. Sonnet doesn't even consider it.

This isn't about generational improvements - Sonnet 4 vs Opus 4.5 were released months apart. I observed the same pattern with previous gen models: Sonnet never caught this nuance, Opus always did. Parameter size is the determining factor here, not training iterations or release dates.

More parameters → more nuance. Same bitter lesson, same scaling principle.

### How we used "AI" before

- google on steroid
- very good for bootstraping, kinda killed the template industry TODO link numbers
- autocomplete - a bit painful actually

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

An "agentic" AI doesn't just generate text - it takes actions, observes results, and adjusts. It can:
- Read files to understand your codebase
- Search for patterns across thousands of files
- Make edits and run tests
- See the errors and fix them
- Repeat until the task is done

This is the paradigm shift. Not "AI writes code" but "AI does the same loop a human developer does."

### Claude Code

TODO - bridge to Claude Code specifically - the article


## And what is the future now?
- No stopping in sight
- Machines are limited by Wirth's law
  - in my feedback loop, as a developer, I'm now wasting more time waiting for tests than waiting for the model
  - Wirth's law explains this: the average tech stack is slow. Most companies don't care. But it makes your tests slow
- Anthropic acquires Bun - smartest move
```
Bun is a JavaScript/TypeScript runtime built from scratch in Zig, designed as a faster alternative to Node.js.
It's an all-in-one toolkit: runtime, bundler, package manager, and test runner - all optimized for speed.
Key point for your article: Bun is often 3-10x faster than Node.js for common operations.
It's a direct counter to Wirth's law - instead of accepting that JS tooling is "just slow",
they rewrote everything with performance as the priority.
```
  - Link - TL;DR powers Claude Code, and is already developed by Claude
  - Now, companies like Anthropic care about fast runtimes. Raw compute isn't enough if the software stack wastes it.
  - side effect: the testing feedback loop gets faster

  If your AI agent is bottlenecked by a 30-second test suite that could run in 3
  seconds, that's wasted compute, wasted user time, and worse results (fewer
  iterations = less refinement).


### Pricing + Education
- Only Claude weakness pricing, describe pricing, should do discounts for students
- 1B in revenue though lol - they could reach rentability if they wanted, Anthropic can't die
- TODO place somewhere AoC depressing

### And the workforce?
- Dario accurate for the last 5 years - 90% of the code - developers not dead, stay consistent with his promise actually
- But in the next 5 years? Can only go better: "developer" is dead, either be
  - an excellent engineer - like, **really**
    - R&D should be somehow safer
  - good with product
  - actually the guy that does everything with Claude in a small structure
  - an ops: humans will be in charge there for a bit longer
  - get a PhD or do something else idk

#### So should I worry?
- there is no value for writing the code yourself anymore
- if you managed to learn how to code pre-ai, you'll learn whatever needs to be learned for what's to come
