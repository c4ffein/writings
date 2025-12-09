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
