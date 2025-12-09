# Dev with AI in Late 2025

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
> ai model=opus "Peux tu m'expliquer le sens de cette phrase: Pierre prend la boule et la lance."
# Explication de la phrase

**« Pierre prend la boule et la lance. »**

Cette phrase décrit **deux actions successives** réalisées par Pierre :

1. **Pierre prend la boule** → il saisit une boule (probablement avec sa main)
2. **et la lance** → puis il la jette/projette

---

## Point intéressant : une ambiguïté potentielle

À l'écrit, cette phrase peut théoriquement avoir **deux sens** à cause du mot **« lance »** :

| Interprétation | Signification |
|----------------|---------------|
| **Verbe « lancer »** ✅ | Pierre jette la boule *(sens le plus naturel)* |
| **Nom « la lance »** | Pierre prend la boule et prend aussi la lance (l'arme) |

À l'oral, l'intonation lèverait l'ambiguïté. À l'écrit, le **contexte** (jeu de pétanque, bowling...) indique clairement qu'il s'agit du verbe *lancer*.

---

Tu voulais une analyse grammaticale plus détaillée, ou c'était plutôt le sens général qui t'intéressait ?
```

```
> ai model=sonnet "Peux tu m'expliquer le sens de cette phrase: Pierre prend la boule et la lance."
# Explication de la phrase

Cette phrase décrit **deux actions successives** accomplies par Pierre :

## Les actions

1. **"Pierre prend la boule"** = Pierre saisit/attrape une boule avec sa(ses) main(s)
2. **"et la lance"** = ensuite, il projette cette boule (il la jette)

## Structure grammaticale

- **"la"** (pronom) remplace "la boule" pour éviter la répétition
- La phrase complète serait : "Pierre prend la boule et **lance la boule**"

## Sens global

Pierre effectue un mouvement complet : il attrape d'abord un objet sphérique (une boule), puis il la projette dans une direction (peut-être vers quelqu'un ou quelque chose, ou simplement en l'air).

## Contextes possibles

Cela pourrait se passer dans différentes situations :
- Un jeu de pétanque
- Un jeu de bowling
- Un jeu de balle entre amis
- Une activité sportive

La phrase est simple et décrit une **séquence d'actions concrètes et physiques**.
```

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

TODO - bridge to Claude Code specifically
- imo so good because they actually built it for themselves, it's not bs
- "We actually weren't even sure if we wanted to launch Claude Code publicly because we were thinking it could be a competitive advantage for us, like our 'secret sauce': if it gives us an advantage, why launch it?"
- "I started hacking around using Claude in the terminal. The first version was barebones: it couldn't read files, nor could it use bash, and couldn't do any engineering stuff at all."
- "I hooked up this prototype to AppleScript: it could tell me what music I was listening to while working. And then it could also change the music playing, based on my input."
Boris Cherny
Source: https://newsletter.pragmaticengineer.com/p/how-claude-code-is-built

They then iterated on something that could do more and more

### What is Claude Code?
- Terminal + VSCode + in the cloud + ...

### Current state
- OpenAI stalls (can't be surprised but I'm not really bullish on them)
- Claude and Gemini lead, for different reasons - Claude is bad at vision, bad at math, link article about claudyness
- Only guy I know that preferred Gemini to Claude Opus 4.5 works on computer vision and physics simulation
- Other than that I explain the Claude Code underuse because it's behind a paywall
- We gonna focus on Claude Code cause the best imo, but other alternatives for agentic coding exist
  - list some?

## How a beginner would use this
TODO This part should actually be a demo
put a slide to be sure to show thinking vs no thinking, and modes
should do a video instead, because talking while doing is risky
### TODO just prompt
### TODO try to fix mistakes
### TODO good vs bad - asking questions and learning vs stuck

## How having some experience can still help on a more advanced project
Example of me coding with Claude on the "average" project I work on
This is not just a CRUD backend with a frontend that I could have downloaded from the internet

### Ask to bootstrap the project
TODO show still doesn't work with React + Vite, but you can just link the doc

### Point at the TODO instead of doing yourself

```
> Can you read path/to/my/file.py - line 111 ?

● Read(path/to/my/file.py)
  ⎿  Read 20 lines

● Ah, there's a TODO: Use context instead of global state - and [ ... ]

  Let me check if this function is actually used:

● Search(pattern: "_a_method", path: [ path ])
  ⎿  Found 1 file (ctrl+o to expand)

● Search(pattern: "_a_method|A_CONSTANT, path: "a/subpath",
        output_mode: "content")
  ⎿  Found 4 lines (ctrl+o to expand)
```


### Auto runs tests, show me the architecture after I ask for a refactor
```
● All 99 tests pass! Here's the summary of this refactor:

Removed hidden global state for safety:

- chatbot.py: Now creates _cli_context = Context() explicitly at the top, uses it directly in do_something()
- state.py: Reduced to just re-exports for backwards compatibility (83 lines → 23 lines)
- something/__init__.py: Simplified exports (no more wrapper functions)

Architecture is now explicit:
CLI (chatbot.py)        Backend ([ commons/file.py ])
       │                            │
       ▼                            ▼
_cli_context = Context()    context from Django
       │                            │
       └──────────┬─────────────────┘
                  ▼
         context.do_another_thing()
         context.do_another_thing_again()
         etc.

Benefit: If someone forgets to set up context properly, they'll get an error instead of silently using wrong/shared state.
```






### I enjoy using acronyms

#### What is KISS ?
[KISS](https://en.wikipedia.org/wiki/KISS_principle) - `Keep it simple, stupid`

```
KISS ("Keep it simple, stupid")[1] is a design principle first noted by the U.S. Navy in 1960.[2][3] First seen partly in American English by at least 1938, KISS implies that simplicity should be a design goal.
```

#### Another example, YAGNI
[YAGNI](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it) - `You aren't gonna need it`

```
"You aren't gonna need it"[1][2] (YAGNI)[3] is a principle which arose from extreme programming (XP) that states a programmer should not add functionality until deemed necessary.[4]
```

#### A good software engineer knows these acronyms and can use them with Claude

```
> Could both directly import then? To stay KISS? Or is it against your good practices?

● Good point! Let's check if there's a conftest.py that could set up the path once for all tests:

● Search(pattern: "backend/**/conftest.py")
  ⎿  Found 0 files

∴ Thinking…

  No conftest.py exists. But we could:
  1. Create one for tests
  2. Have service.py set up the path itself

  Or even simpler - Django settings or some init file could set up the path once for the whole backend.

  Actually, let me check if there's already somewhere in Django where the path is set up.

● Search([ the constant in the path ])
  ⎿  Found 10 lines
     XXX

∴ Thinking…

  Interesting! The path setup is already duplicated in backend/core/models.py (for [ Context ] import).
  So we already have it in two places.

  We could:
  1. Put the path setup in Django settings (runs once at startup)
  2. Or put it in backend/__init__.py
  3. Or put it in a shared utility

  The cleanest would be to put it in Django settings since that's guaranteed to run before anything else. Let me check if there's
  an appropriate place.

● The path setup is already duplicated - both [ path ] and [ another path ] do it.

  We could put it in Django settings (runs once at startup) and then import directly.
  Let me check:

● Read([ settings.py ] · lines 1-30)
  ⎿  Read 30 lines

∴ Thinking…

  We could add the path setup at the top of settings.py. Then:
  1. Delete [ path ] entirely
  2. Have service.py import directly from commons.[ module ]
  3. Have tests import directly from commons.[ module ]
  4. Remove the path setup from core/models.py (it'll already be set up)
  This is cleaner and KISS. Let me propose this.

● We could add the path setup once in settings.py, then:
  1. Delete [ path ] entirely
  2. service.py imports directly from commons.[ module ]
  3. Tests import directly from commons.[ module ]
  4. Remove duplicate path setup from [ another path ]

  This is KISS - one path setup, direct imports. Want me to do it?
```

#### Don't repeat yourself

```
Can you write a file_a.py and a file_b.py for a Kata about refactoring ?
There should be some functions to extract in a helper.py
```

Then we clean the files of anything that looks like an instruction.

Then in a clean context:

##### What could be a too long prompt

```
There is some code duplication between these 2 files:
- path/to/file_a.py
- path/to/file_b.py
Could you please refactor to create a helper file that could mutualize the common logic?
```

##### Short prompts now work

With thinking mode enabled
```
> file_a.py and file_b.py => DRY

∴ Thinking…

  The user wants me to apply the DRY (Don't Repeat Yourself) principle to file_a.py and file_b.py. I need to first read both
  files to understand what code they contain and identify any duplication that can be refactored.

● I'll read both files to identify duplicated code that can be consolidated.          01:04 PM  claude-opus-4-5-20251101

● Read(file_a.py)
  ⎿  Read 79 lines

● Read(file_b.py)
  ⎿  Read 77 lines

∴ Thinking…

  Looking at both files, I can see significant code duplication:

  1. Name validation (identical in both):
    - Clean name, check length >= 2, check only letters, capitalize each word
  2. Email validation (identical in both):
    - Clean email, check for @, check domain endings
  3. Report formatting (nearly identical structure):
    - Same pattern: header with "=" chars, centered title, "=" chars
    - Same loop structure with items
    - Same footer pattern
  4. Stats calculation (same pattern):
    - Same structure for calculating count, average, min, max

  I should create a shared utilities module with:
  1. validate_name(name: str) -> str - returns formatted name
  2. validate_email(email: str) -> str - returns cleaned email
  3. format_report(items: list[dict], title: str, item_label: str) -> str - generic report formatter
  4. calculate_stats(items: list[dict], value_key: str, label_prefix: str) -> dict - generic stats calculator

  Let me create a common.py file with shared utilities, then update both files to use it.

● I can see significant duplication between these files:
  1. Name validation - identical logic
  2. Email validation - identical logic
  3. Report formatting - same structure, different title/label
  4. Stats calculation - same pattern, different field names

  I'll extract shared utilities into a common module.
```



### Claude still sometimes make mistakes
There, I have to show that something actually got removed

claude_can_still_make_mistakes

#### I really had to pinpoint the exact problem

claude_can_still_make_mistakes_i_had_to_really_pinpoint


### Better architecture for my data structures based on SE principles

#### First, what is a tree?

claude_can_show_ascii_to_explain_datastructures

#### Can they work with my datastructures

claude_can_work_with_my_datastructures


### Can follow my architectures ideas

claude_can_follow_my_architecture_ideas


#### And still improve robustness
We also added tests to ensure there can't be dirs with missing configurations



### Can take ops problems into account

claude_can_take_ops_problems_into_account

### Can take security into account, and discuss the tradeoffs

*Note: we only use .env.template and .env for limited api keys used for testing*
*`.env` is gitignored*

claude_can_take_security_into_account_and_discuss_the_tradeoffs


### can manage git
claude_can_manage_git

#### Still have to nudge them
claude_can_manage_git_still_have_to_nudge_them


### Actually, when I talked about killing the template industry...
TODO here is a dashboard

## Example of me coding with Claude on a not average project
Writing an alternate wrapper - TODO


### Opus 4.5 now finds bugs?
Showing first examples - TODO

### Why did I want to write a wrapper? hypothesis.
- What is hypothesis?
- How can Claude use it? lol markdown

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
