# Python for Programmers

## Introduction
### Why this guide
This is a summary of some of the notes I've taken as a software engineer mainly working with Python (although I also codes with JavaScript and C, and worked with Java back at the university).
Why care about the languages I worked with? Because this guide is mainly intended for developers with experience in languages similar to Java and C#, and why I don't have extensive professional experience with those, I'll try to give you the advices I would like to receive if I wasn't a Python developer already.
I'll also try to be a little less straightforward than most guides would be, but rather help you see the bigger picture (while keeping it short), so that you can understand why most of the things I describe are the way they are, and I think those informations are actually worth to know in the long-term if you want to progress with the language.

This is the March 2025 version of this guide, I'll see if I keep this updated.

### What IS Python?
Python is a high-level, interpreted programming language known for its readability and simplicity. Created by Guido van Rossum and first released in 1991, it is now one of the most used programming language.

Its ease of learning made it the de-facto standard for most scientific fields, including AI, where the high-level Python usually controls performant lower-level code code running on GPU and machine learning hardware accelerators.

It is also well-suited for short scripts, and one of its strength is to let you incrementally convert a small quick-and-dirty solution to a complete project following the best software-engineering practices.

It also means that there are many libs, frameworks and documentation available for anything you would like to do with Python.
The best example is web development, where frameworks like Django and FastAPI are quite popular.

While **Easy to Learn and Use**, with a syntax emphasizing readability, it's actually **challenging to truly master**: there are many advanced concepts that help you write short and beautiful code.

Python supports multiple programming paradigms, including procedural, object-oriented, and functional programming, making it flexible for most programming styles.

This guide won't teach you everything but will let you take a sneak peek at some of these features, so that you can learn them by yourself as fast as possible.

### The philosophy of Python

#### Zen of Python
You don't have to learn or think to much about this right now, but this is by Tim Peters, one of the main Python contributors, and this is even included in most Python distributions
```
Type "help", "copyright", "credits" or "license" for more information.
>>> import this
The Zen of Python, by Tim Peters

Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
Flat is better than nested.
Sparse is better than dense.
Readability counts.
Special cases aren't special enough to break the rules.
Although practicality beats purity.
Errors should never pass silently.
Unless explicitly silenced.
In the face of ambiguity, refuse the temptation to guess.
There should be one-- and preferably only one --obvious way to do it.
Although that way may not be obvious at first unless you're Dutch.
Now is better than never.
Although never is often better than *right* now.
If the implementation is hard to explain, it's a bad idea.
If the implementation is easy to explain, it may be a good idea.
Namespaces are one honking great idea -- let's do more of those!
```

It shows how much the Python contributors actually cared about defining good practices from the start, even if those good practices might seem confusing at first for software engineers coming from other tech stacks.

You don't necessarily have to follow those, but it helps to understand why most Python codebases are the way they are. Python developers tend to build without too many levels of abstraction (contrary to what seems to be the expected good practice in some other languages), preferring instead to write concise, highly expressive code that takes full advantage of Python's syntax and built-ins.

### A quick Hello World?
This might be the most concrete exemple.
```csharp
using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Hello, World!");
    }
}
```

```python
print("Hello, World!")
```

### Basic Data Types

```python
# Variables (no type declarations)
name = "Python"  # str
age = 30  # int
price = 19.99  # float
is_available = True  # bool (note the capitalization)

# Type checking
print(type(name))  # <class 'str'>
print(isinstance(name, str))  # True => Safer as this also returns True for inherited classes
```


### Strong, dynamic typing
Python is dynamically typed but strongly typed. Unlike with TypeScript/Java/C# etc, it is common to rely on type inference when defining variables. But unlike with JavaScript, a lot of operations that would just implicitly cast would raise exceptions in Python, like it is expected in other strongly typed languages.

For example
```python
>>> a = 42
>>> b = "answer"
>>> a + b
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: unsupported operand type(s) for +: 'int' and 'str'
```

Unlike with JavaScript
```javascript
Welcome to Node.js v23.9.0.
Type ".help" for more information.
> a = 42
42
> b = 'answer'
'answer'
> a + b
'42answer'
```


### Collections
TODO explain what are collections

#### Lists
Called lists but unrelated to linked lists, those are actual mutable arrays.
```python
>>> l = ["a", "b", "c"]
>>> l.append("d")  # Add one element
>>> l.extend(["e", "f"])  # Add multiple elements
>>> l
['a', 'b', 'c', 'd', 'e', 'f']
>>> l[0]
'a'
>>> l[1:3]  # Range indexing
['b', 'c']
>>> l[-1]  # Negative indexing
'f'
```

#### Tuples
Like lists but are actually immutable.
```python
>>> t = (1, 2, 3)  # Defines a 3 elements tuple
>>> t
(1, 2, 3)
>>> t = (1,)  # Defines a 1 element tuple
>>> t
(1,)
>>> t = 1, 2, 3  # Defines the same 3 elements tuple, unneeded parentheses in that case
>>> t
(1, 2, 3)
>>> t = 1,  # WARNING This means this is a valid 1 element tuple, that nearly all linters will accept
>>> t
(1,)
```

#### Dictionaries
Similar to HashMap: here are the different complexities:
- Read: O(1) on average, O(n) worst case if there are many collisions
- Add: O(1) on average, O(n) worst case if the dictionary needs to be resized
- Modify: O(1) on average, O(n) worst case if there are many collisions

What that means is that we don't really have to think about performance when using those.
For exemple, it is possible to deal with huge dictionnaries to implement local memory caching without a noticeable performance impact. It is also possible to store values of any type (not that you should).

```python
AGE = "age"
user = {
    "name": "Alice",
    AGE: 30,  # You can set a key/value pair with a variable as a name instead
    "languages": ["Python", "Java"],
}
print(user["name"])  # prints: Alice
```

#### Sets
Implements a hash table like a dictionnary, but without associated values to the keys
```python
unique_numbers = {1, 2, 3, 3, 4}  # Will contain 1, 2, 3, 4
print(1 in unique_numbers)  # True in nearly constant time
```

#### Additional collections
[The Python documentation about collections](https://docs.python.org/3/library/collections.html) includes many more powerful tools.

## Control Flow
### If statements
```python
x = 10
if x > 5:
    print("x is greater than 5")
elif x == 5:
    print("x equals 5")
else:
    print("x is less than 5")
```
### Same result with a ternary expression
```python
x = 10
print("x", "is greater than" if x > 5 else "equals" if x == 5 else "is less than", "5")
```
### For loops
```python
for language in languages:
    print(language)
```
The for loop in python can take any [iterable](#iterable) (more on that later).
#### Range-based loops
```python
for i in range(5):  # 0 to 4, but range allow many more options, check the documentation
    print(i)
```
#### Inline for
- **List comprehension**: `[x for x in range(10)]` creates a list
- **Dictionary comprehension**: `{k: v for k, v in pairs}` creates a dictionary
- **Set comprehension**: `{x for x in items}` creates a [set](#sets)
- **Generator expression**: `(x for x in range(10))` creates a [generator](#generator)

Protip: you can use `keys`/`values`/`items` of `dict` to iterate on specific parts
```python
the_dict = {"a": 3, "b": 4}
print([k * 2 for k in the_dict.keys()])  # [6, 8]
print([v * 2 for v in the_dict.values()])  # {'a': 3, 'b': 4}
print({k * 2: v * 2 for k, v in the_dict.items()})  # {'aa': 6, 'bb': 8}
```

### While loops
The regular while loops are still available
```python
count = 0
while count < 5:
    print(count)
    count += 1
```

## Functions
```python
# Defining functions
def greet(name, greeting="Hello"):
    """Greet a person with a custom greeting."""  # Docstring
    return f"{greeting}, {name}!"

# Calling functions
print(greet("Java Developer"))  # Default greeting
print(greet("Python Novice", "Welcome"))  # Custom greeting

# Variable arguments
def sum_all(*numbers):
    return sum(numbers)

print(sum_all(1, 2, 3, 4))  # 10
```

## Classes and Objects

```python
class Person:
    species = "Human" # Class variable (shared by all instances)
    
    def __init__(self, name, age):  # Constructor where you usually defines instance variables
        self.name = name
        self.age = age
    
    def introduce(self):  # Instance method (note 'self' parameter)
        return f"Hi, I'm {self.name} and I'm {self.age} years old."
    
    @staticmethod
    def get_species_info_hardcoded():
        return "Humans are social beings."

    @classmethod
    def get_species_info_from_class(cls):
        return f"{cls.species} are social beings."

# Creating objects
alice = Person("Alice", 30)
print(alice.introduce())
print(Person.get_species_info_hardcoded())
print(Person.get_species_info_from_class())
```

### Abstract classes
TODO Make an explanation about abstract classes in Python
### Generally, everything is a convention
TODO Explain what is the difference between `_value`, `__value__`, `__value`, `value_`
### Inheritance
TODO Show a vey short inheritance exemple, tell that multiple inheritance is is possible but not recommended (don't write too much about that)

## Lambda Functions (Anonymous Functions)

```python
# Java: (a, b) -> a + b
add = lambda a, b: a + b
print(add(5, 3))  # 8

# Useful with higher-order functions
numbers = [1, 2, 3, 4, 5]
squares = list(map(lambda x: x**2, numbers))
print(squares)  # [1, 4, 9, 16, 25]
```

## List Comprehensions

```python
# Creating lists with loop logic
squares = [x**2 for x in range(10)]
# Equivalent to:
# squares = []
# for x in range(10):
#     squares.append(x**2)

# With conditions
even_squares = [x**2 for x in range(10) if x % 2 == 0]
print(even_squares)  # [0, 4, 16, 36, 64]
```

## Exception Handling
```python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero")
except Exception as e:
    print(f"Other error: {e}")
else:
    print("No exceptions occurred")
finally:
    print("This always executes")
```
### Inheritance of exceptions
TODO Explain how inheritance of exceptions works and help you catch as wide as possible at last

## Modules and Imports

```python
# Single import
import math
print(math.sqrt(16))  # 4.0

# Import specific functions
from datetime import datetime
print(datetime.now())

# Import with alias
import numpy as np
arr = np.array([1, 2, 3])
```

## Context Managers
A context manager let you ensure that specific logic is executed before and after your code,
gracefully handling exceptions.
Exemple with file handling (automatically closes file):
```python
with open("example.txt", "w") as file:
    file.write("Hello, Python!")
```

## Python downsides
TODO write a short subsection about why tail call optimizations aren't implemented
TODO write a short subsection about why performance is low, but it doesn't matter as:
- most of your performance bottlenecks will probaby IO based and should be solved with tools like asyncio
- when you want to improve CPU performance you just write binded code in a lower level language
TODO write a short subsection about mixed tabs and spaces, and what PEP encourages

## Python Ecosystem
### Tooling
TODO make a short explanation about PIP and venv, but how they are actually best replaced by the astral.sh tools

### General conventions
TODO Explain convention PEP8 / Pythonic (explain good with AI) / duck typing

## Using AI is now one of the best ways to learn Python
Claude by Anthropic is currently the best model to learn Python (you may use another model if the guidelines of your company requires it).
These are very good exemples of the quality of answers that Claude provides. This is far better than what the current enshittified web would give to you.
### `What is the difference between a Python iterator, iterable, and generator?`
#### Python Iterators, Iterables, and Generators

These three concepts are closely related but serve different roles in Python:

##### Iterable
- An object that can be "iterated over" - meaning you can go through its elements one by one
- Implements the `__iter__()` method that returns an iterator
- Examples: lists, tuples, dictionaries, sets, strings
- Usage: `for item in iterable:`

##### Iterator
- An object that keeps track of state during iteration
- Implements both `__iter__()` (returns itself) and `__next__()` (returns the next value or raises StopIteration)
- Stateful - remembers where it is during iteration
- Created by calling `iter()` on an iterable
- Usage: `next(iterator)` to get values one at a time

##### Generator
- A special type of iterator created using a function with `yield` statements
- Generated values are computed on-demand (lazy evaluation)
- Maintains state automatically between yields
- Memory efficient - only holds one value in memory at a time
- Can be created via generator functions or generator expressions
- Usage: either as a function with `yield` or with syntax like `(x for x in range(10))`

The key relationship: All generators are iterators, and all iterators are iterables, but not vice versa.

### `What is a Python metaclass?`
#### Python Metaclasses

A metaclass in Python is a class of a class - it defines how a class behaves. While classes define how instances behave, metaclasses define how classes behave.

##### Key Concepts:

1. **Class Creation Process**: In Python, classes are themselves objects, and metaclasses are the "factories" that create these class objects.

2. **Default Metaclass**: By default, Python uses `type` as the metaclass for all classes. When you define a class, `type` is called behind the scenes to create it.

3. **Custom Metaclasses**: You can create custom metaclasses by subclassing `type` and overriding methods like `__new__` or `__init__`.

##### Example of a Custom Metaclass:

```python
class Meta(type):
    def __new__(cls, name, bases, attrs):
        # Add an attribute to the class being created
        attrs['added_by_metaclass'] = True
        return super().__new__(cls, name, bases, attrs)

class MyClass(metaclass=Meta):
    pass

print(MyClass.added_by_metaclass)  # True
```

##### Common Use Cases:

- Automatically registering classes in a registry
- Adding methods or attributes to classes
- Enforcing coding standards or design patterns
- Implementing singletons, interfaces or abstract base classes
- Creating domain-specific languages

Metaclasses are considered advanced Python functionality and aren't needed for most programming tasks, but they're powerful for framework developers and certain design patterns.


### `Tell me about an advanced Python concept I may not know.`
#### Python's Context Managers Beyond "with open()"

While many Python developers are familiar with using context managers through the `with` statement for file handling, the concept goes much deeper and offers powerful patterns for resource management.

##### Contextlib.suppress

Instead of writing try/except blocks that simply pass on specific exceptions, you can use:

```python
from contextlib import suppress

# Instead of:
# try:
#     os.remove('file.txt')
# except FileNotFoundError:
#     pass

with suppress(FileNotFoundError):
    os.remove('file.txt')
```

##### ExitStack for Dynamic Context Management

The `ExitStack` class lets you dynamically build up and tear down multiple context managers:

```python
from contextlib import ExitStack

def process_files(filenames):
    with ExitStack() as stack:
        files = [stack.enter_context(open(fname)) for fname in filenames]
        # All files will be properly closed when the with block exits
        for line in zip(*files):
            process_line(line)
```

##### Creating Your Own Context Managers

Beyond the decorator approach with `@contextmanager`, you can implement the context management protocol directly:

```python
class Timer:
    def __enter__(self):
        self.start = time.time()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.end = time.time()
        self.elapsed = self.end - self.start
        print(f"Execution took {self.elapsed:.2f} seconds")

# Usage
with Timer():
    do_expensive_operation()
```

This pattern is particularly useful for resource acquisition/release, transaction management, temporary state changes, and measuring performance.


## Other resources for Further Learning

- [Official Python Documentation](https://docs.python.org/3/)
- [Automate The Boring Stuff with Python](https://inventwithpython.com/automate) as a base
  - everything from [inventwithpython.com](inventwithpython.com) may help you
- [Effective Python by Brett Slatkin](https://effectivepython.com/)
- [Python Crash Course by Eric Matthes](https://nostarch.com/pythoncrashcourse2e)
- [Python for Java Developers (Real Python)](https://realpython.com/java-vs-python/)
TODO list Exercism / Codesignal / Hackerrank
TODO link: learn python the hard way
