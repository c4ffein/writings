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
