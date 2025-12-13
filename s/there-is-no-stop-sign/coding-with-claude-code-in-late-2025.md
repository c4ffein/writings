# Coding with Claude Code in late 2025

I wanted this as a separate article to be more comprehensive, and this is probably indigest to anyone that didn't come to the talk I mention in this article (TODO link).

I'd recommend also reading this because it would provide a more "meta" analysis, but both could be read independently.

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

claude_can_take_the_tasks


### Auto runs tests, show me the architecture after I ask for a refactor

claude_auto_runs_tests_and_shows_the_architecture


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

claude_acronym_kiss

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

claude_acronym_dry_can_understand_short_prompts_with_thinking_mode



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

## Conclusion
TODO link again to main article
