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
