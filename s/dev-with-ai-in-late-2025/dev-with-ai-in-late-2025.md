# Dev with AI in Late 2025

## First, what is an AI?

Honestly, I really think this is the first question we should openly ask ourselves there.

And there is a reason why I think this is worth asking ourselves.

Defining these concepts will allow us to get a more profounding understanding,
and to make more accurate predictions about where all of this is going.

So, what is "AI"?

```
Artificial intelligence is machines or software that can do tasks which normally require human thinking—like recognizing images, understanding language, making decisions, or solving problems.
```
(thanks Claude)

### Well, actually, what is a computer?

Interestingly enough, this runs on hardware that is close to a regular computer. We won't go into details, there is some level of high specialization for how the current hardware is running, but we should understand a thing or two about "computers".

So this should be even more important to actually define.

```
A computer is a machine that takes in information, processes it by following instructions, and gives you results.
```
(thanks Claude again)

But now we must be asking, what separates what the AIs everyone is talking about and previous attempt at generalize "problem-solving", since they are based on the same machines that only perform basic computations?

There are 2 concepts that I consider quite important here.

#### Moore's law

**Moore's Law** (1965): The observation that the number of transistors on a chip doubles roughly every two years, leading to exponential growth in computing power at similar cost.

It was predicted to hit physical limits (atoms are only so small), but it keeps finding ways to continue through:
- **3D chip stacking** - building up instead of shrinking down
- **Chiplets** - multiple smaller chips working together instead of one monolithic die
- **Specialized accelerators** - GPUs, TPUs, NPUs: purpose-built silicon for specific workloads

TL;DR - no real stop in sight

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

TODO can you try this one?

### my "whoa moment" happened before chatgpt, so I'm not surprised anymore, we scalin

TODO

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

```
> It seems we removed some logic. Can you explain this?
  [ a git diff ]

● No logic was removed -
  it was refactored from a nested dict structure to a flat dataclass structure.

  Old structure (nested dict):
  [ nested dict ]

  New structure (flat dataclass in context.py):
  @dataclass
  class TheDataclass:
      [ dataclass content ]

  The logic is equivalent:
  | Old                | New                   |
  |--------------------|-----------------------|
  | nested[dict][aaa]  | nested.dataclass.aaa  |
  | nested[dict][bbb]  | nested.dataclass.bbb  |
  | nested[dict][ccc]  | nested.dataclass.ccc  |

  The substep [ a substep ] logic ( [ another substep ] ) is now in [ a method ] at state.py:97-111.
```

#### I really had to pinpoint the exact problem

```
> Ok, what about this especially?
  [ a subpart of the git diff ]

● Good catch! Two changes:

  1. Error handling changed:
    - Old: return [ sad path - there is a reason for not using exceptions ]
    - New: return (silent)
  2. Return value removed:
    - Old: return [ call to update the state somehow ]
    - New: nothing (caller must call [ the helper ] separately)

  The second is intentional - separates mutation from presentation. The callers do:
  [ something ]

  But the first is a regression - we lost the error message.
  The callers do validate before calling:
  [ changes ]

  So it works, but the function itself is now less defensive.
  Want me to restore the error return for [ sad path ]?
```






### Better architecture for my data structures based on SE principles

#### First, what is a tree?

```
> Can you output the ascii of a tree and nodes?

● root
          /  \
         /    \
        A      B
       / \      \
      C   D      E
     /          / \
    F          G   H

  Or a more detailed style:

  root
  ├── A
  │   ├── C
  │   │   └── F
  │   └── D
  └── B
      └── E
          ├── G
          └── H

  Would you like a different structure or style?
```

#### Can they work with my datastructures

```
> [ code ]   ============>   Could we stop with the "status": "something" ?
  If either this is a leaf, and we direcly put the status,
  or the status of a node is a computed property

● Good point! Computed values shouldn't be serialized. Let me fix to_dict()/from_dict():

  - [ other nodes ] → only serialize [ leafs ], status computed on read
  - [ leafs ]       → directly serialize the status string

● Read([ path ])
  ⎿  Read 60 lines

● Update([ path ])
  [ showing me a diff ]

### Can follow my "smart" architectures ideas easily

```
> I have another idea. Could we not use a function called in each [ item ],
  but instead, commons/registry.py scans for every dir in [ container ],
  for a CONFIG in [ subfile in each dir ]
  WDYT? That way we KNOW if we forgot to define/link this config!

∴ Thinking…

  The user wants to change the approach:

  Instead of:
  1. Each [ item ] calls [ registration helper ]
  2. Registry imports and runs the modules

  To:
  1. Registry scans [ path/*/file.py ]
  2. Registry imports each module and looks for a CONFIG attribute
  3. Uses CONFIG.[ named_id ] to register it

  This is cleaner because:
  - No need for explicit [ registration helper ] call in each [ item ]
  - If CONFIG is missing, we get a clear error
  - The convention is: have a CONFIG in [ path/*/file.py ] with a [ named_id ]

  Let me update the registry.py to do this:
  [ file update ]

  This way:
  - Convention: each [ iteam ] has [ file.py ] with a CONFIG: [ Configuration ]
  - Registry scans and imports, looks for CONFIG, uses CONFIG.[ named_id ] to register

  I'll implement robust warning mechanisms to catch configuration issues early.
  This involves adding informative error messages
  that help developers quickly identify and resolve problems with configurations.
  The goal is to provide clear, actionable feedback during the discovery process.

● Yes! That's cleaner - convention over configuration.
  The registry scans for CONFIG in each [ file.py ] and uses CONFIG.[ named_id ] to register.
  If CONFIG is missing → clear error.
```

#### And still improve robustness
We also added tests to ensure there can't be dirs with missing configurations



### Can take ops problems into account


```
> We're on a cheap sevalla, I think it's safer to do the ml inference on a dedicated infra.
  WDYT? Is it super lightweight? I doubt it

∴ Thinking…

  The user is asking about whether [ the model ] is lightweight enough to
  run on their cheap Sevalla (a hosting provider) infrastructure.
  They're concerned about resource usage and are suggesting
  maybe they should use a dedicated ML inference service instead.

  Let me check what [ the model ] requires - it's an [ XM ] parameter model,
  which is relatively small for a [ specific kind of model ].
  But even so, on a cheap VPS it might be too heavy.

  Let me look at the dependencies and think about this:
  - [ the model ] is a relatively small model ([ XM ] parameters)
  - But it still requires loading the model into memory
  - Plus [ another model ] for [ another use case Claude knows about ] is much heavier

  The user is right to be concerned. For a production deployment on a cheap server, using a cloud API like:
  - HuggingFace Inference API
  - ElevenLabs
  - Google Cloud TTS
  - Amazon Polly

  Would be much safer than running inference locally.

  Let me check the pyproject.toml to see the dependencies and give them a realistic assessment.

● Good point. Let me check the model size and dependencies:

● [ analyzing my pyproject.toml ]

∴ Thinking…

  So [ the dependencies ] include:
  [ dependencies ]

  For a cheap Sevalla VPS, this is definitely risky:
  [ too much memory usage, too slow ]

  The user is right - for production, using a cloud inference API would be much safer:
  [ inference providers recommendation ]

  Let me give them a realistic assessment and suggest the HuggingFace Inference API approach.

● You're right to be concerned. Here's the reality:

  Local inference is heavy:
  [ justifications ]

  On a cheap VPS, this would be slow and could OOM.

  Better options for production:

  1. HuggingFace Inference API (free tier available)
    [ justifications ]
  2. Dedicated options:
    [ justifications ]

  Want me to create a HuggingFace class that uses their Inference API instead of
  local [ model ]? It would be a simple swap - same speak() interface but calls the API
  instead of running inference locally.

  The free HF tier has rate limits but should work fine for [ our ] use case.
```


### Can take security into account, and discuss the tradeoffs

*Note: we only use .env.template and .env for limited api keys used for testing*
*`.env` is gitignored*

```
● All 92 tests pass. Here's what was updated:

  Files changed:

  1. [ file changed ]
  2. [ file changed ]
  3. .env.template - Added:
  [ env variables ]
  Reminder: Please rotate your API keys since they were exposed:
  - Anthropic: https://console.anthropic.com/
  - HuggingFace: https://huggingface.co/settings/tokens

> What do you mean they were exposed?

∴ Thinking…

  The user is asking what I mean by their API keys being exposed.
  I saw their actual API keys in the .env file when they asked me to read it
  - the Anthropic key starting with sk-ant-api03-
  - and the HuggingFace token starting with hf_
  These are real keys, not placeholders.

  However, I should clarify - they were exposed to ME in this conversation,
  but that doesn't mean they're exposed publicly.
  The .env file is likely gitignored and not committed to the repo.
  The exposure is only within our conversation context.

  I should clarify this - the keys are visible in this chat session,
  but if this chat history isn't shared publicly, it's not a major concern.
  I may have overreacted.

● When I read your .env file, I saw your actual API keys in the chat:
  - Your Anthropic key: sk-ant-...
  - Your HuggingFace token: hf_...

  They're visible in this conversation. If this chat stays private, it's not a big
  deal. But if you ever share this conversation or if chat logs are stored somewhere,
  those keys would be exposed.

  Up to you whether to rotate them - just wanted to flag it in case you weren't aware
  they were shown here.

> Oh that was taken into account,
  the anthropic api key is rate limited with $5 on purpose,
  and this hugging face account is kind of empty,
  will split between a burner account for local and a prod account when it matters,
  but thanks for caring!

∴ Thinking…

  Good to know! The user has thought this through
  - they're using a rate-limited Anthropic key with a $5 cap
  - and a burner HuggingFace account for development.
  Smart approach for dev work. I'll acknowledge this and move on.

● Smart approach! Rate-limited dev keys and burner accounts for local work is the way
  to go. Ready when you want to continue with something else.
```


### Can manage git

```
> I want to clean the repo before securing the prod.
  - Here is my plan: create a [ data repo ] (is it a good name?)
    containing the hard resources that should be put elsewhere
  - move these resources here
  - rewrite history to not include these files and get a cleaner log
    (will a clean git clone be faster then?)
  - lock down main
  - make a dev - staging - main flow
  WDYT?

● Good plan overall! Some thoughts:

  Repo name:
  - [ name ] is fine, but [ bettern-name ] or [ even-better-name ] might be clearer about its purpose

  On history rewriting:
  - Yes, git clone will be faster after removing large files from history
  - Use git filter-repo (modern) not git filter-branch (slow/deprecated)
  - Everyone will need to re-clone after the force push

  Alternative to consider:
  - Git LFS - keeps large files in same repo but stores them separately
  - S3/cloud storage - if assets are truly static, might be simpler than a second repo

  On dev → staging → main:
  - Solid for a team, maybe overkill for solo dev?
  - Simpler alternative: main (protected) + feature branches, deploy previews for staging
  - But if you want proper staging environment, the 3-branch flow works

  Quick questions:
  1. How big are these assets? (worth the effort?)
  2. How often do they change?
  3. Solo or team?

  If assets are huge and rarely change → separate repo or S3
  If moderate and you want version control → Git LFS might be simpler

> 1 - will have [ lots of resources ]
  2 - never change but not the place to be I guess
  3 - 2 dev for now, also 2 UX
      should access these resources through a dashboard
      linked to S3 or something I guess

● Yeah, skip the git repo for assets. Git is wrong tool for [ our assets ].

  Recommended setup:

  1. S3 (or Cloudflare R2 / Backblaze B2) - cheap, scales to thousands of files
    - R2 is nice: no egress fees, S3-compatible API
  2. Dashboard options for UX team:
    - Simple: Cloudflare/AWS console directly
    - Better: https://www.filestash.app/ or similar S3 browser
    - Custom: Build a simple upload UI in [ admin ] later
  3. For your code repo:
    - Rewrite history with git filter-repo to remove the [ static assets ]
    - Store just a reference/URL to S3 assets in [ the config ]

  Quick cleanup plan:
  # Install filter-repo
  pip install git-filter-repo

  # Remove large files from history (dry run first)
  git filter-repo --path path/to/assets --invert-paths --dry-run

  # Then for real
  git filter-repo --path path/to/assets --invert-paths

  # Force push (coordinate with other dev)
  git push --force-with-lease

  Want me to check what large files are in the repo and help with the cleanup?

> Yeah but we don't have an Amazon account for the team.
  We'll keep this repo clean, manage assets in another repo in a dirty way,
  it will just be easier when we want to move the assets to S3:
  just delete the temp assets repo, what is supposed to be our monorepo is clean.
  Again, WDYT?

● Makes total sense. Pragmatic approach:

  1. Main repo → clean, code only
  2. Temp assets repo → dirty, holds [ assets ] until S3 is ready
  3. Later → delete assets repo, point to S3, done

  No over-engineering, easy migration path. I like it.

  Want me to:
  1. Find the large files in this repo that should move?
  2. Help with the history rewrite once you've moved them?
```



#### Still have to nudge them


```
> .git is 105M ... Is it too much? Did we miss something?
  Or is it consistent for a project in this current state?

● Let me check what's taking up space:

● [ bash command to find the files ]

● The blobs are still there under [ old paths ] - there was a rename at some point!
  We only filtered the new paths.

● [ starts trying stuff, didn't work, I had to nudge though ]
```

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
