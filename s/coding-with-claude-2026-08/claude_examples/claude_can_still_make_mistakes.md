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
