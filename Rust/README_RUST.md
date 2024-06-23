# The Rust Programming Language

[Rust book](https://doc.rust-lang.org/book/)
[Rustlings course](https://github.com/rust-lang/rustlings/)
[Rust by Example](https://doc.rust-lang.org/rust-by-example/)

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

Rust is for students and those who are interested in learning about systems
concepts. Using Rust, many people have learned about topics like operating
systems development. The community is very welcoming and happy to answer
student questions. Through efforts such as this book, the Rust teams want to
make systems concepts more accessible to more people, especially those new to
programming.

### Companies

Hundreds of companies, large and small, use Rust in production for a variety of
tasks, including command line tools, web services, DevOps tooling, embedded
devices, audio and video analysis and transcoding, cryptocurrencies,
bioinformatics, search engines, Internet of Things applications, machine
learning, and even major parts of the Firefox web browser.

### Open Source Developers

Rust is for people who want to build the Rust programming language, community,
developer tools, and libraries. We’d love to have you contribute to the Rust
language.

### People Who Value Speed and Stability

Rust is for people who crave speed and stability in a language. By speed, we
mean both how quickly Rust code can run and the speed at which Rust lets you
write programs. The Rust compiler’s checks ensure stability through feature
additions and refactoring. This is in contrast to the brittle legacy code in
languages without these checks, which developers are often afraid to modify. By
striving for zero-cost abstractions, higher-level features that compile to
lower-level code as fast as code written manually, Rust endeavors to make safe
code be fast code as well.

The Rust language hopes to support many other users as well; those mentioned
here are merely some of the biggest stakeholders. Overall, Rust’s greatest
ambition is to eliminate the trade-offs that programmers have accepted for
decades by providing safety *and* productivity, speed *and* ergonomics. Give
Rust a try and see if its choices work for you.
