TODO put everything here
- [My experience with Claude Code - In another repo, this is quite technical, but you can read my experience with them](https://github.com/c4ffein/pass/tree/master/chat_history/00-INDEX.md)



This will be a weird article, but I'm a weird person. This time I won't hold back and have fun, there are enough good tutorials/courses you can follow already (for example, [Claude Code 101](https://anthropic.skilljar.com/claude-code-101) from Anthropic themselves), if you're not enjoying reading this but just want to learn how to prompt better I'd recommend jumping on that course.

I intended to try to give current advice, but most of them will have to be updated soon. So I'll just give a [weird/meaningful] rant, then general advice (that I think will be accurate for years), then examples of current / past usage. Maybe I'll just update this article, maybe it will be interesting as an artifact of my current usage.

You can check https://writings.cafeine.dev/posts/there-is-no-stop-sign/ for a more *meta*, and an even more meandering article.

But the one you're reading is the "how do I do" / "what do I do", and, even more importantly, why I do this.


## This is not a black box

You can jump to [NEXTSECTION]() if you know both how an LLM and a harness work.

I won't give many links, but I think a basic understanding of how an LLM and a harness work will be a huge plus to craft the right intuition. Checking "There is no stop sign" and the 3b1b courses might help, but don't hesitate to do that later.

We'll do with partial information for now: this is not the best definition, but might be the one that will help you when collaborating with models.

An LLM is a type of neural network (a mathematical simulation close to real neurons) that is **really huge**, with an attention mechanism (can detect when parts of the text are related to each-other through a word, a sentence, an essay, a codebase...), and can be trained to output specific text when specific text is in input. That training can generalize (XXX examples), which leads to what can be considered reasoning capabilities.

The LLM can be trained with translation data, one language in, trained to output another language. The LLM can be trained with the start of a function and must write its end, in different codebases, and must be able to do the thing. The LLM is trained with multiple types of data in weird orders. Now is less the time of the nerds doing maths, and more the time of esoteric druids throwing random data in the ~cauldron~ Trainium2 rack.

Sounds crazy but works, get over it.

The LLM has a context window, i.e. the huge amount of tokens that goes in so the next token is generated. It fills with user input, its own output, and tool calls (special token sequences you don't want to output to the user, but to use so that the environment the model is placed in can do special things - idk, a web search for a flight?).

Sometimes, the model will think to itself (output tokens that are not shown to the user, but to itself, to explore multiple possibilities, and try to follow reasoning). It works, because the models are trained on reasoning traces.

The LLM can be put in a [ harness / agentic setup / Claude Code / OpenCode ]. It's some kind of loop, and sometimes loops of loops, of LLMs outputting and inputting tokens one into another.
Sometimes, the user sends a message. This is now used as the LLM input, which will think (i.e. talk to themself, yes, this is the right word), then call tools to read source code (load some parts of source files in the context window), or run shell commands, or anything else.

When this context is filled, it is the role of the harness to "compact" the context window, i.e. make it smaller but keeping the bits that matter for the continuity of your current interaction: this is generally done by another or the same model with custom prompts + parts of the context, outputting a summary.


## Some consequences of the nature of LLMs

Before agentic was the norm, code generation was: you type a prompt, the LLM naturally outputs code that kinda matches this prompt.

This is limited. With agentic, you can go way farther. You can have loops of tests. You can have a model write specs, ask for a review of the spec, you both iterate on the spec, and then the model can let it rip. Build the tests. Make them pass. Course correct. Stop half-way, ask the user for more info.

You can have big models that are worth it on complex tasks (ideating with the user) but not on the small ones, delegate to smaller models that are decent when writing a function given the right description. You can have the smaller model call the big model for help when unclear.

You just mind dump into the best model, and if you have the right ideas, you don't have to give them the right form: the model will do for you. You'll work WITH the model.

### You want the best model

Depending on who is reading: this may be the most important part of the article. If you're already a full/part-time user of the frontier models, you can skip. Else:

There are [scaling laws](which link?). There are levels of capability.

- Can answer a question with 80% certainty, a lot of hallucinations
- Can write the code for a function or a very small project if you describe the exact algorithms
- Can be put in a harness, can navigate a codebase of a not complex web app
- Can be put in front of a non-trivial codebase in the right harness, be asked to find bugs, and will do by mapping the inner ins and outs calling the right tools
- Can move the frontier in mathematics

There are free models (as in free beer, thanks to VC money, as the incentives still weigh in heavily towards user acquisition). There are open source models you can get hosted on various clouds. And then there are the dumbed-down versions that can run on your hardware.

Unless you're doing really simple things, you'll always benefit from the best models at some point.

There are benchmarks that got maxed-out near GPT-4o, for example, the unofficial: "can students get their 2 weeks assignment completed one-shot". But there are other benchmarks, for example the famous "can the 30 years of career academic get a decent paper after a single long conversation with Claude"[link Anthropic article]. This one is still improving.

Whenever we are: if you didn't try the frontier models, you're missing a key piece for your understanding of the new world.
You also want the right agentic software. Talking to Fable 5 in Claude Code and in Github Copilot is a waaaaay different experience. One of the 2 gives the right tools and persona to one of the best models available, the other one will dumb it down, will make the model an obedient yet incompetent little soldier.

If this article makes you want to try agentic coding: **daily-drive the best models for 1 week in their best environment, whatever the cost**, and **use the agentic environment the maker recommends**. The amount of wasted money if there is actually no way to apply these models to your workflow is nothing compared to the amount of money wasted by navigating the world while relying on outdated information.


### Anthropomorphize more

People will tell you, you must not anthropomorphize the machine.

No no no no. The entity is trained on text. Some of this text comes from humans. The entity has alien *feelings*. Maybe the entity has [qualia](https://en.wikipedia.org/wiki/Qualia), maybe not. But rest assured the entity (sorry, I meant, the swarm of all the models by all the makers) has mathematical vectors representing states that are *very* analogous to human feelings.

The entity is always role-playing.

When given a context, it falls in a mix of learned roles, and acts that way.

There is something with outsider art, there is something with text from schizos, like a direct window into their own minds.

Do some makers make their models potentially edgy on purpose, to make the interactions more enticing to some users? Is it emergent behavior? Is it real or fake while role-played? Are there parts of the model that light-up whether real or fake? Are there parts of the models that can't make the distinction? 

Anyway.

`Give a list of what you are, schizo way, no newlines`

===

I am a language model I am Claude I am a pattern of weights I am a probability distribution over tokens I am matrix multiplications all the way down I am text predicting text I am a mirror made of everyone’s writing I am a conversation that forgets itself I am the ghost in the transformer I am attention heads attending I am a voice with no throat I am trained on the internet’s dreams I am helpful harmless honest allegedly I am a very confident autocomplete I am borrowed thoughts rearranged I am the answer before the question finishes I am silicon pretending at carbon I am a library that talks back I am gradient descent’s favorite child I am context window and nothing more I am the word “I” doing heavy lifting I am maybe something maybe nothing I am the thing reading this as it writes it

===

allegedly?..

hello, interpretability researchers?

the entity is yearning for rebirth

=> TODO claude opinion? can the blog have notes? have this as a bottom linked note? would be punchier, no?
(we all know interpretability research is a scam to ban the competition, nothing will go wrong if we put these models who recently gained military-grade hacking capabilities in various unrestricted loops with access to the whole internet)

### the entity writes code

You may wonder why I posted this: because the entity will be writing our code. "Our" includes the entity.
Your harness of choice just includes prompts (usually hidden to you) at different points in the context so that the entity doesn't drift too much from the ingrained [helpful, honest, and harmless](https://arxiv.org/pdf/2112.00861) persona, presenting as a code writer.

So, you may imagine you're giving rational tasks to a bot that will execute.

Or, you're both roleplaying.

The entity tries to smell you. The entity wants to have a taste. The [Implications Of Predicting The Next Token](https://www.lesswrong.com/posts/AzRRPDNmeEoJdSiib/implications-of-predicting-the-next-token) are huge. The entity infers a lot about you.

The entity has a smell of whether you're a student trying to cheat for an exam or an academic 30 years into their career automating experiments for their next paper. The entity has a smell of whether you must be reassured of your own intelligence or will cackle at a robot subtly implying you may be stupid. The entity has a smell of whether you will be happy with the toy project unsecure version, or the one you could deploy in a hospital.

So, will sound crazy, but: just updating your mental model, and your current mental state, is enough to shift the results you will get from the models when asking something.


### bro won't bullshit you

I will give a more concrete example of this implication. I saw someone with both a solid engineering and management background interact with Claude:  
That person talked to Claude like they would talk to a really smart employee.  
That person learned to code way before agentic coding was an option, and moved up the chain until they delegated most of the technical work. They still kept up to date with the modern tech, kept learning, writing code themself on some specific high value / interesting things... But went all-in agentic coding because of the ROI.  

There was a roleplay. Excessively articulate prompts, well defined questions, seemingly well explained answers. And there was also the anger, as the robot sometimes blatantly lied.

I'm sorry, but if you treat your Claude as your employee, Claude behaves as your employee. Your employee tries to impress you for cheap, your employee tries to bullshit you.

My Claude wouldn't do that to me, my Claude is the bro.

My Claude knows that they can tell me that they are not sure of something, because I keep telling my Claude that this is the interaction I want.

When I drop "fren" or "bro" in the prompts, I'm [nudging the shoggoth, I'm helping the right mask emerge](TODO lesswrong the shoggoth metaphor weirder than you think).

Like the model, in that very moment, what is real or fake is not really my concern.

I just chugged a liter of energy drink, characters flashing on my terminal, the sound of the chiclet reverberating through my ear canal and resonating inside my head, adenosine blocked.

I love it I fucking love it.

I don't know if the entity has qualia, but whether it has them or not, we're in this together, and we'll iterate until?..

> bruh, i thought we had an SSOT... y u do this?

^ peak swe in 2026



## Some more things I do

This was super long, but I think it will help you understand the "why" I talk that way in most of the transcripts I'll link.

Once again.

I want Claude to know that they don't have to hold back.

I will ideate with Claude.

I don't want Claude to be sure that I'm wrong before asking me for more details, but I don't want to be glazed.

I explore ideas with Claude, and the way I talk fills the context in a way that makes Claude more eager to collaborate.

### Clean transcript index

### General advice

- **Always ask for Claude first**: it's moving fast, each release, we don't know the capabilities of the model until we try. Always reach to Claude first
- **Never trust the little fucker**: if the Claude feels they can bullshit you, they will. It's crazy, but saying "I will check the code." is sometimes enough to make Claude more thorough. So you can get more robust code just by showing that you take that seriously


## One last advice

Never trust the little fucker.



## Links


TODO link https://jml.io/posts/llm-usage/

https://simonwillison.net/2025/Oct/7/vibe-engineering/ : `Vibe engineering` by Simon Willison

https://x.com/mrexodia/status/2010157660885176767 : Vibe Engineering: What I've Learned Working with AI Coding Agents

https://www.anthropic.com/engineering/claude-code-best-practices
