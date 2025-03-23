# Python for Java Programmers

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

### Strong, dynamic typing
TODO VS CSharp VS JS

### Basic Data Types

```python
# Variables (no type declarations)
name = "Python"  # str
age = 30  # int
price = 19.99  # float
is_available = True  # bool (note the capitalization)

# Type checking
print(type(name))  # <class 'str'>
```

TODO isinstance

### Collections
TODO EXPLAIN

```python
# Lists (similar to ArrayList)
languages = ["Python", "Java", "JavaScript"]
languages.append("Go")
first_language = languages[0]  # Zero-indexed like Java

# Tuples (immutable)
coordinates = (10.5, 20.3)  # Can't be modified after creation

# Dictionaries (similar to HashMap)
user = {
    "name": "Alice",
    "age": 30,
    "languages": ["Python", "Java"]
}
print(user["name"])  # Access by key

# Sets
unique_numbers = {1, 2, 3, 3, 4}  # Will contain 1, 2, 3, 4
```

## Control Flow
TODO keys/values/items
TODO ternary
```python
# If statements
x = 10
if x > 5:
    print("x is greater than 5")
elif x == 5:
    print("x equals 5")
else:
    print("x is less than 5")
```
```python
# Same result with a ternary expression
x = 10
print("x", "is greater than" if x > 5 else "equals" if x == 5 else "is less than", "5")
```
```python
# For loops
for language in languages:
    print(language)
```
TODO MORE RANGES
```python
# Range-based loops
for i in range(5):  # 0 to 4
    print(i)
```
```python
# While loops
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
    # Class variable (shared by all instances)
    species = "Human"
    
    # Constructor
    def __init__(self, name, age):
        # Instance variables
        self.name = name
        self.age = age
    
    # Instance method (note 'self' parameter)
    def introduce(self):
        return f"Hi, I'm {self.name} and I'm {self.age} years old."
    
    # Static method
    @staticmethod
    def get_species_info():
        return "Humans are social beings."

# Creating objects
alice = Person("Alice", 30)
print(alice.introduce())
print(Person.get_species_info())
```

### TODO _value, __value__, __value, value_

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
TODO Explain inheritance
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

TODO import vs from, as

## Python-Specific Gems

### String Formatting
```python
name = "Alice"
age = 30
# f-strings (Python 3.6+)
print(f"{name} is {age} years old")

# format() method
print("{} is {} years old".format(name, age))
```

### Context Managers
```python
# File handling (automatically closes file)
with open("example.txt", "w") as file:
    file.write("Hello, Python!")
```

### Generators
```python
def count_up_to(max):
    count = 1
    while count <= max:
        yield count
        count += 1

for number in count_up_to(5):
    print(number)  # 1, 2, 3, 4, 5
```

## Python Ecosystem
TODO PIP, venv, but actually astral, explain: uv + 

TODO PEP8 / Pythonic (explain good with AI) / duck typing

## Using AI PREF TODO CLAUDE
Those are very good exemples of the quality of answers that Claude provides. This is far better than what the current enshittified web would give to you.
### What is the difference between a Python generator and iterator?"
#### Python Generator vs Iterator

Both generators and iterators in Python allow you to iterate through collections of data, but they have key differences:

##### Iterator
- An iterator is an object that implements the iterator protocol, requiring `__iter__()` and `__next__()` methods
- It's typically created for a collection (like a list) by calling `iter()` on it
- Once created, you retrieve values by calling `next()` until it raises `StopIteration`
- Iterators maintain their own internal state to track their position in the sequence

##### Generator
- A generator is a special type of iterator created with a function containing the `yield` keyword
- Generator functions automatically implement the iterator protocol
- They generate values on-the-fly rather than storing the entire sequence in memory
- They pause execution and maintain state between calls
- They're particularly useful for working with large data sets or infinite sequences

##### Key Differences
1. **Creation**: Iterators are created from existing collections; generators are created with functions using `yield`
2. **Memory usage**: Generators calculate values on demand, making them more memory-efficient
3. **Complexity**: Writing a generator is simpler than implementing a custom iterator class
4. **Reusability**: Generators are exhausted after one use, while iterator classes can be designed for reuse

##### Example
```python
# Iterator example
class CountUpTo:
    def __init__(self, max):
        self.max = max
        self.n = 0
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.n > self.max:
            raise StopIteration
        self.n += 1
        return self.n - 1

# Generator example
def count_up_to(max):
    n = 0
    while n <= max:
        yield n
        n += 1
```

### "What is a Python metaclass?"
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
```


## Resources for Further Learning

- [Official Python Documentation](https://docs.python.org/3/)
- [Effective Python by Brett Slatkin](https://effectivepython.com/)
- [Python Crash Course by Eric Matthes](https://nostarch.com/pythoncrashcourse2e)
- [Python for Java Developers (Real Python)](https://realpython.com/java-vs-python/)

TODO Exercism / Codesignal / Hackerrank explain why
TODO Link personal notes
