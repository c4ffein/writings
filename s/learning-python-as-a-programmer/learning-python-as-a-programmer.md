# Python for Programmers

## Introduction
### Why this guide
This is a summary of some of the notes I've taken as a software engineer mainly working with Python (although I also code with JavaScript and C, and worked with Java back at the university).
Why care about the languages I worked with? Because this guide is mainly intended for developers with experience in languages similar to Java and C#, and while I don't have extensive professional experience with those, I'll try to give you the advices I would like to receive if I wasn't a Python developer already.
I'll also try to be a little less straightforward than most guides would be, but rather help you see the bigger picture (while keeping it short), so that you can understand why most of the things I describe are the way they are, and I think those are actually worth to know in the long-term if you want to progress with the language.

This is the March 2025 version of this guide, I'll see if I keep this updated.

### What IS Python?
Python is a high-level, interpreted programming language known for its readability and simplicity. Created by Guido van Rossum and first released in 1991, it is now one of the most used programming language.

Its ease of learning made it the de-facto standard for most scientific fields, including AI, where the high-level Python usually controls performant lower-level code running on GPU and machine learning hardware accelerators.

It is also well-suited for short scripts, and one of its strength is to let you incrementally convert a small quick-and-dirty solution to a complete project following the best software-engineering practices.

It also means that there are many libs, frameworks and documentation available for anything you would like to do with Python.
The best example is web development, where frameworks like Django and FastAPI are quite popular.

While **Easy to Learn and Use**, with a syntax emphasizing readability, it's actually **challenging to truly master**: there are many advanced concepts that help you write short and beautiful code.

Python supports multiple programming paradigms, including procedural, object-oriented, and functional programming, making it flexible for most programming styles.

This guide won't teach you everything but will let you take a sneak peek at some of these features, so that you can learn them by yourself as fast as possible.

### The philosophy of Python

#### Zen of Python
You don't have to learn or think too much about this right now, but this is by Tim Peters, one of the main Python contributors, and this is even included in most Python distributions
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
This might be the most concrete example. No boilerplate, always straightforward.
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
Collections are container data types in Python that allow you to store multiple items together. Python offers several built-in collection types, each with different characteristics and use cases. These include lists, tuples, dictionaries, and sets, which provide various ways to organize and manipulate data.

#### Lists
Called lists but unrelated to linked lists, those are actual mutable arrays.
```python
l = ["a", "b", "c"]
l.append("d")  # Add one element
l.extend(["e", "f"])  # Add multiple elements
print(l)       # ['a', 'b', 'c', 'd', 'e', 'f']
print(l[0])    # 'a'
print(l[1:3])  # ['b', 'c'] - Range indexing
print(l[-1])   # 'f' - Negative indexing
```

#### Tuples
Like lists but are actually immutable.
```python
t = (1, 2, 3)  # Defines a 3 elements tuple
print(t)       # (1, 2, 3)
t = (1,)       # Defines a 1 element tuple
print(t)       # (1,)
t = 1, 2, 3    # Defines the same 3 elements tuple, unneeded parentheses in that case
print(t)       # (1, 2, 3)
t = 1,         # WARNING This means this is a valid 1 element tuple, that nearly all linters will accept
print(t)       # (1,)
```

#### Dictionaries
Similar to HashMap: here are the different complexities:
- Read: O(1) on average, O(n) worst case if there are many collisions
- Add: O(1) on average, O(n) worst case if the dictionary needs to be resized
- Modify: O(1) on average, O(n) worst case if there are many collisions

What that means is that we don't really have to think about performance when using those.
For example, it is possible to deal with huge dictionaries to implement local memory caching without a noticeable performance impact. It is also possible to store values of any type (not that you should).

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
languages = ["french", "english", "italian"]
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
print([k * 2 for k in the_dict.keys()])  # ["aa", "bb"]
print([v * 2 for v in the_dict.values()])  # [6, 8]
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

## Decorators
Decorators are a powerful feature in Python that allows you to modify the behavior of functions or classes without changing their source code. They're a form of metaprogramming that uses the `@decorator` syntax.

```python
# Basic decorator example
def my_decorator(func):
    def wrapper(*args, **kwargs):
        print("Something is happening before the function is called.")
        result = func(*args, **kwargs)
        print("Something is happening after the function is called.")
        return result
    return wrapper

@my_decorator
def say_hello(name):
    return f"Hello, {name}!"

# This is equivalent to:
# say_hello = my_decorator(say_hello)

print(say_hello("Python Developer"))  # The decorator will run before and after the function
```

Decorators can also accept arguments:

```python
def repeat(n=1):
    def decorator(func):
        def wrapper(*args, **kwargs):
            result = None
            for _ in range(n):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def greet(name):
    print(f"Hello, {name}!")

greet("World")  # Will print "Hello, World!" three times
```

You'll commonly see decorators used for:
- Authentication and authorization
- Logging and debugging
- Caching results
- Measuring execution time
- Input validation
- Rate limiting

Some people tend to prefer relying on decorators far more than classes inheritance to limit code duplication.

## Classes and Objects

```python
class Person:
    species = "Human" # Class variable (shared by all instances)
    
    def __init__(self, name, age):  # Constructor where you usually defines instance variables
        self.name = name
        self.age = age
    
    def introduce(self):  # Instance method (notice the 'self' parameter)
        return f"Hi, I'm {self.name} and I'm {self.age} years old."
    
    @staticmethod  # Notice this is not a keyword of the language but a standard decorator
    def get_species_info_hardcoded():
        return "Humans are social beings."

    @classmethod  # Once again not a keyword of the language but a standard decorator
    def get_species_info_from_class(cls):
        return f"{cls.species} are social beings."

# Creating objects
alice = Person("Alice", 30)
print(alice.introduce())
print(Person.get_species_info_hardcoded())
print(Person.get_species_info_from_class())
```

### Inheritance
```python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "Some sound"

class Dog(Animal):
    def speak(self):
        return "Woof!"

# Create an instance of the subclass
dog = Dog("Rex")
print(dog.name)    # Inherits attribute from parent
print(dog.speak()) # Overrides method from parent

# Multiple inheritance is possible but should be used with care
class Swimmer:
    def swim(self):
        return "Swimming"

class Duck(Animal, Swimmer):
    def speak(self):
        return "Quack!"
```

#### Private methods and attributes
Python does not provide "private" methods and attributes like Java does. See [this part of the documentation](#underscore-conventions) for the alternative.


### Abstract classes
Abstract classes in Python are implemented using the `abc` module (Abstract Base Classes). Unlike some languages with explicit `abstract` keywords, Python uses a more flexible approach:

```python
from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod  # This is not a keyword but a decorator
    def make_sound(self):  # With it, we ensure you can't instantiate classes that don't redefine it
        """This method must be implemented by subclasses"""
        pass

    def eat(self):
        print("Eating...")

class Dog(Animal):
    def make_sound(self):
        return "Woof!"

# This would raise TypeError: Can't instantiate abstract class Animal with abstract method make_sound
# animal = Animal()

# This works
dog = Dog()
print(dog.make_sound())  # Woof!

# This doesn't raise an exception
class Duck(Animal):
    pass

# This would raise TypeError: Can't instantiate abstract class Duck with abstract method make_sound
# animal = Duck()
```

Abstract classes cannot be instantiated directly and require subclasses to implement all abstract methods.

## Lambda Functions (Anonymous Functions)

```python
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
class SpecificKindOfValueError(ValueError):
    """
    This defines an Exception inheriting from ValueError
    We may inherit from the global Exception instead
    You should always inherit from the most adequate exception
    """
    pass

try:
    do_something()
except SpecificKindOfValueError:
    # Catches a SpecificKindOfValueError
    print("Here, we should actually handle SpecificKindOfValueError")
except ValueError:
    # Catches any other ValueError
    print("Not a valid number")
except (TypeError, KeyError):
    # Can catch multiple specific types
    print("Type or key error occurred")
except Exception as e:
    # Catches any exception that inherits from Exception
    # Put this last to catch any exceptions not caught above
    print(f"Other error: {e}")
else:
    print("No exceptions occurred")
finally:
    print("This always executes")
```
As Python's exception handling leverages class inheritance, allowing you to catch specific or broad categories of exceptions, it is recommended to manage a clear hierarchy of exceptions so that you can catch in a general or a fine-grained way depending on where you are in your project.

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
Example with file handling (automatically closes file):
```python
with open("example.txt", "w") as file:
    file.write("Hello, Python!")
```

## Asynchronicity
Python's asynchronous programming model uses `async`/`await` syntax to write concurrent code that's more maintainable than traditional callbacks or thread-based approaches. This allows you to handle many operations concurrently without the overhead of locking multiple threads.

Here are some of the concepts python handles through the standard `asyncio` lib (this code doesn't work, just listing concepts):
```
result = await some_coroutine()  # Pauses execution until completed

async def my_async_function():  # Defines an asynchronous function (coroutine)
    pass

asyncio.run(main_coroutine())  # Used to run the coroutine from a non-async context

coro = main_coroutine(a, b)  # If the async function took parameters
print(coro)  # <coroutine object coro at 0x7f1bcc2fb940>
asyncio.run(coro)  # Also possible to pass a coroutine between calls

results = await asyncio.gather(coro1(), coro2(), coro3())  # Waits for all of them

task = asyncio.create_task(some_coroutine())  # Allows more advanced features like scheduling and cancellation

async for item in async_iterable:  # Pauses execution waiting for each item
    process(item)
```

Contrarily to some other programming languages, most of those operations aren't available by default, as you need to use `asyncio.run` first to enter an async context and then be able to use them.

However, for a far better management of your asynchronous logic, the best solution may be to learn [Trio](https://trio.readthedocs.io/), of which the best advantage is to let you handle the whole arborescence of coroutines with the help of [context managers](#context-managers)

## Python downsides
### No tail call optimization
Python deliberately doesn't implement tail call optimization (TCO), which allows recursive functions to avoid stack overflow by converting tail recursion into iteration. Guido van Rossum (Python's creator) argued that TCO would hide the call stack information, making debugging more difficult. This means recursive functions in Python have a limited depth and must often be rewritten iteratively for deep recursion.

### Performance considerations
Python's performance is relatively slow compared to compiled languages like C++ or Java because:
- It's an interpreted language with runtime type checking
- It uses a Global Interpreter Lock (GIL) that limits true multithreading
- It has high-level abstractions that prioritize developer productivity over raw speed

However, this rarely matters because:
- Most applications are IO-bound rather than CPU-bound, so you can use [asynchronicity](#asynchronicity) for performance gains
- Performance-critical code can be written in C/C++/Rust and called from Python (NumPy, TensorFlow, etc.)
- Python's ecosystem includes optimized libraries and JIT compilers (like PyPy) for specific use cases

### Tabs vs. spaces
Python's syntax depends on consistent indentation, and mixing tabs and spaces can lead to subtle errors. PEP 8 (Python's style guide) strongly recommends using 4 spaces for indentation rather than tabs. Modern Python (3.x) will reject code with inconsistent indentation, but the historical possibility of mixing tabs and spaces has caused many headaches. Always configure your editor to use consistent indentation.


## Python Ecosystem
### Tooling
#### `pyproject.toml`
Currently the best way to define all settings for nearly every tool, as more and more will be compatible with this project configuration standard.

#### Package Management
Python's native package management tools are:
- **pip**: The Python Package Installer, used to install packages from PyPI, the more common Python packages repository.
- **venv**: Built-in module for creating virtual environments that isolate dependencies : it is a good practice to maintain a virtual environment per project, to always have the correct version of your dependencies running with them.

However, many developers now prefer the more modern solutions from [astral.sh](https://astral.sh), **uv**, which is both an extremely fast pip replacement with rust-based dependency resolution, and a virtual environment manager.

These newer tools significantly improve performance, dependency management, and developer experience while maintaining compatibility with the Python ecosystem.

#### Linting
`ruff`, also from [astral.sh](https://astral.sh), is the `ultra-fast Python linter and formatter`, and replaces nearly every existing tools all-at-once.

#### Typing
Enforcing type hints is the only thing that `ruff` won't do.
Type hints are annotations that indicate the expected data types of variables, function parameters, and return values.

```python
def greeting(name: str) -> str:
    return f"Hello, {name}"

age: int = 30
```
They can be used manually from your own code, in a metaprogramming way, but it is not how they will be the most useful to you for now, as they will allow:
- Better code documentation, readability, maintainability, and easier refactoring
- Enhanced IDE support (autocomplete, error detection)
- Static type checking via tools like `mypy`

Whit `mypy`, you will be able to gradually type your codebase; you don't have to type everything all at once.
The [astral.sh](https://astral.sh) team is currently working on a replacement for it, but we're far from the official release.

```
a: int = "0"  # Types aren't enforced by the Python interpreter, you HAVE to rely on mypy
print(type(a))  # <class 'str'>  This didn't raise any exception
```

## General conventions
Python emphasizes readability and consistency through conventions:

### PEP 8
The official style guide for Python code that covers naming, indentation, whitespace, etc. Most teams follow PEP 8 or a slightly modified version.

### Pythonic Code
This is how code that follows Python's idiomatic patterns and leverages the language's unique features is called. Examples include list comprehensions instead of loops, context managers for resource handling, and preferring built-in functions over reinventing the wheel. [It is now possible to use AI to refactor your code to make it more pythonic.](is-there-a-more-pythonic-way-to-write-this)

### Duck Typing
"If it walks like a duck and quacks like a duck, it's a duck." Python doesn't require explicit interface declarations—objects are defined by behavior rather than type. This encourages focusing on what an object can do rather than what it is, leading to more flexible designs.

### Underscore conventions
In Python, naming conventions carry significant meaning:

- `value`: Regular public attribute or method
- `_value`: Single underscore indicates "private by convention" - not enforced by the interpreter but signals "for internal use"
- `__value`: Double underscore triggers name mangling (becomes `_ClassName__value`) to avoid naming conflicts in inheritance
- `__value__`: Double underscore prefix and suffix indicates special methods controlled by Python (magic/dunder methods)
  - for example, the `__str__` method will control how the object will be casted to a str
- `value_`: Trailing underscore is often used to avoid conflicts with Python keywords (e.g., `class_`)


## Using AI is now one of the best ways to learn Python
Claude by Anthropic is currently the best model to learn Python (you may use another model if the guidelines of your company requires it).
These are very good examples of the quality of answers that Claude provides. This is far better than what the current enshittified web would give to you.
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

### `Is there a more pythonic way to write this?`
```python
def my_func(x):
    return x * 2 + 45

my_input = [1, 2, 3, 4]
my_list = []
for element in my_input:
    my_list.append(my_func(element))
```

Here's a more pythonic way to transform your code:

```python
def my_func(x):
    return x * 2 + 45

my_input = [1, 2, 3, 4]
my_list = [my_func(element) for element in my_input]
```

This uses a list comprehension, which is considered more pythonic because:

1. It's more concise
2. It expresses the intention clearly - "create a new list by applying my_func to each element of my_input"
3. It's typically faster than building a list through repeated append() calls

Alternatively, you could also use the built-in `map()` function:

```python
my_list = list(map(my_func, my_input))
```

Both approaches are idiomatic Python, with list comprehensions generally being preferred for their readability.

## Other resources for Further Learning

- [Official Python Documentation](https://docs.python.org/3/)
- [Automate The Boring Stuff with Python](https://inventwithpython.com/automate) as a base
  - everything from [inventwithpython.com](https://inventwithpython.com) may help you
- [Effective Python by Brett Slatkin](https://effectivepython.com/)
- [Python Crash Course by Eric Matthes](https://nostarch.com/pythoncrashcourse2e)
- [Python for Java Developers (Real Python)](https://realpython.com/java-vs-python/)
- [Exercism](https://exercism.org/tracks/python): Mentored coding challenges with real human feedback
- [CodeSignal](https://codesignal.com/): Coding challenges and assessments with Python support
- [HackerRank](https://www.hackerrank.com/domains/python): Python practice problems ranging from basic to advanced
- [Learn Python the Hard Way](https://learnpythonthehardway.org/): A rigorous introduction to Python programming
