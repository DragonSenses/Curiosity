# The Rust Programming Language

[Rust book](https://doc.rust-lang.org/book/)
[Rustlings course](https://github.com/rust-lang/rustlings/)
[Rust by Example](https://doc.rust-lang.org/rust-by-example/)

Note: This folder will contain reading notes and summarized sections from the Rust book to hone my learning.

# Foreword

1. **Empowerment**: Rust empowers programmers to reach farther and program with confidence across a wider variety of domains. Whether you're writing low-level systems code or high-level applications, Rust provides tools to help you succeed.

2. **Breaking Barriers**: Traditionally, low-level systems programming has been seen as arcane and accessible only to a select few. Rust eliminates old pitfalls, making it easier for programmers to work with memory management, data representation, and concurrency without the usual risks.

3. **Reliable Code**: Rust guides programmers toward writing reliable code that is efficient in terms of speed and memory usage. It eliminates common pitfalls and provides a polished set of tools.

4. **Ambitions and Optimizations**: Even experienced low-level programmers can use Rust to raise their ambitions. Introducing parallelism is relatively low-risk, and aggressive optimizations can be done confidently.

5. **Beyond Systems Programming**: Rust isn't limited to systems programming. It's expressive and ergonomic, suitable for CLI apps, web servers, and more. Skills learned in Rust can transfer across different domains.

6. **Friendly and Approachable**: The book embraces Rust's potential to empower users, helping them level up their knowledge and confidence as programmers.

# Introduction

Welcome to *The Rust Programming Language*, an introductory book about Rust.
The Rust programming language helps you write faster, more reliable software.
High-level ergonomics and low-level control are often at odds in programming
language design; Rust challenges that conflict. Through balancing powerful
technical capacity and a great developer experience, Rust gives you the option
to control low-level details (such as memory usage) without all the hassle
traditionally associated with such control.

## Who Rust Is For

Rust is ideal for many people for a variety of reasons. Let’s look at a few of
the most important groups.

### Teams of Developers

- **Collaboration in Large Teams:**
  - Rust is productive for collaborating among large teams with varying systems programming knowledge.
  - The compiler catches subtle bugs (including concurrency issues) that might otherwise require extensive testing and manual code review.
  - Low-level code is prone to various subtle bugs, which in most other languages can be caught only through extensive testing and careful code review by experienced developers
  - In Rust, the compiler plays a gatekeeper role by refusing to compile code with these elusive bugs, including concurrency bugs.
  - Developers can focus on program logic rather than debugging.

- **Contemporary Developer Tools:**
  - Rust introduces modern tools to the systems programming domain:
    - **Cargo**: A dependency manager and build tool that simplifies dependency management across the Rust ecosystem.
    - **Rustfmt**: Ensures consistent coding style among developers.
    - **rust-analyzer**: Powers IDE integration for code completion and error messages.

- **Productivity in Systems-Level Code:**
  - By leveraging these tools, developers can maintain productivity while writing systems-level code.

Rust is proving to be a productive tool for collaborating among large teams of
developers with varying levels of systems programming knowledge. Low-level code
is prone to various subtle bugs, which in most other languages can be caught
only through extensive testing and careful code review by experienced
developers. In Rust, the compiler plays a gatekeeper role by refusing to
compile code with these elusive bugs, including concurrency bugs. By working
alongside the compiler, the team can spend their time focusing on the program’s
logic rather than chasing down bugs.

Rust also brings contemporary developer tools to the systems programming world:

* Cargo, the included dependency manager and build tool, makes adding,
  compiling, and managing dependencies painless and consistent across the Rust
  ecosystem.
* The Rustfmt formatting tool ensures a consistent coding style across
  developers.
* The rust-analyzer powers Integrated Development Environment (IDE)
  integration for code completion and inline error messages.

By using these and other tools in the Rust ecosystem, developers can be
productive while writing systems-level code.

### Students

 - Rust is suitable for students and those interested in learning about systems concepts.
 - Many people have used Rust to explore topics like operating systems development.
 - The Rust community is welcoming and willing to assist students with their questions.
 - Efforts like this book aim to make systems concepts more accessible, especially for newcomers to programming.

### Companies

 - Hundreds of companies, both large and small, use Rust in production.
 - Rust serves various purposes, including command line tools, web services, DevOps, embedded devices, audio/video analysis, cryptocurrencies, bioinformatics, search engines, IoT applications, machine learning, and even parts of the Firefox web browser.

### Open Source Developers

Rust is for people who want to build the Rust programming language, community,
developer tools, and libraries. We’d love to have you contribute to the Rust
language.

### People Who Value Speed and Stability

- **Rust's Focus:**
  - Rust caters to those who value both speed and stability in a programming language.
  - Speed refers to runtime performance and development efficiency.
    - i.e., how quickly Rust code can run and the speed at which Rust lets you write programs
  - Rust's compiler checks ensure stability through feature additions and refactoring.
  - Unlike brittle legacy code in languages lacking such checks, Rust encourages modification without fear.

- **Zero-Cost Abstractions:**
  - Rust aims for zero-cost abstractions—high-level features that compile to efficient low-level code.
  - Safe code should also be fast code.

- **Broad User Base:**
  - Rust aims to support diverse users beyond the mentioned stakeholders.
  - Its ambition is to eliminate traditional trade-offs by providing safety, productivity, speed, and ergonomics.

Overall, Rust’s greatest ambition is to eliminate the trade-offs that programmers have accepted for decades by providing safety *and* productivity, speed *and* ergonomics.

## How to Use This Book

1. **Audience and Assumptions**:
   - The book assumes you've written code in another programming language but doesn't assume any specific language background.
   - It aims to be broadly accessible to programmers from various backgrounds.
   - If you're entirely new to programming, consider starting with an introductory programming book.

2. **Book Structure**:
   - Read the book sequentially from front to back.
   - Later chapters build on concepts introduced earlier.
   - Some earlier chapters provide high-level coverage, while later chapters delve into details.

3. **Chapter Types**:
   - **Concept Chapters**: Cover aspects of Rust.
   - **Project Chapters**: Build small programs using what you've learned.
   - Project chapters are labeled (e.g., Chapters 2, 12, and 20).

4. **Chapter Highlights**:
   - **Chapter 1**: Covers installing Rust, writing a "Hello, world!" program, and using Cargo (Rust's package manager).
   - **Chapter 2**: Hands-on introduction to writing a Rust program (number guessing game).
   - **Chapters 3 and 4**: Explore Rust features and ownership system.
   - **Chapters 5 and 6**: Discuss structs, enums, match expressions, and control flow.
   - **Chapters 7 to 9**: Cover modules, collection data structures, and error handling.
   - **Chapters 10 and 11**: Dive into generics, traits, lifetimes, and testing.
   - **Chapter 12**: Build functionality inspired by the grep command line tool.
   - **Chapters 13 to 15**: Explore closures, iterators, Cargo, and smart pointers.
   - **Chapter 16**: Concurrency models in Rust.
   - **Chapter 17**: Compare Rust idioms to object-oriented principles.
   - **Chapters 18 and 19**: Cover patterns, unsafe Rust, macros, and advanced topics.
   - **Chapter 20**: Implement a low-level multithreaded web server.

5. **Appendices**:
   - Appendices provide reference-like information about Rust.
   - Specific topics covered:
     - **Appendix A**: Rust's keywords
     - **Appendix B**: Rust's operators and symbols
     - **Appendix C**: Derivable traits from the standard library
     - **Appendix D**: Useful development tools
     - **Appendix E**: Explanation of Rust editions
     - **Appendix F**: Translations of the book
     - **Appendix G**: Details about Rust's development and nightly Rust

6. **Reading Approach**:
   - There's no wrong way to read the book.
   - Feel free to skip ahead if desired.
   - If you encounter confusion, you can jump back to earlier chapters.

7. **Learning from Error Messages**:
   - Learning to read compiler error messages is crucial.
   - Examples that don't compile will be provided, along with corresponding error messages.
   - Be aware that random examples may not compile; check the context.
   - Ferris icons indicate code behavior:
     - Ferris with a question mark: Code doesn't compile.
     - Ferris throwing up hands: Code panics.
     - Ferris shrugging: Code doesn't produce desired behavior.

8. **Guidance for Non-Compiling Code**:
   - In most situations, the correct version of non-compiling code will be provided.
