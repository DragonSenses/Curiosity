## Hello, World!

# Creating a Project Directory

You’ll start by making a directory to store your Rust code. It doesn’t matter
to Rust where your code lives, but for the exercises and projects in this book,
we suggest making a *projects* directory in your home directory and keeping all
your projects there.

Open a terminal and enter the following commands to make a *projects* directory
and a directory for the “Hello, world!” project within the *projects* directory.

For Linux, macOS, and PowerShell on Windows, enter this:

```console
$ mkdir ~/projects
$ cd ~/projects
$ mkdir hello_world
$ cd hello_world
```

For Windows CMD, enter this:

```cmd
> mkdir "%USERPROFILE%\projects"
> cd /d "%USERPROFILE%\projects"
> mkdir hello_world
> cd hello_world
```

### Writing and Running a Rust Program

Next, make a new source file and call it *main.rs*. Rust files always end with
the *.rs* extension. If you’re using more than one word in your filename, the
convention is to use an underscore to separate them. For example, use
*hello_world.rs* rather than *helloworld.rs*.

Now open the *main.rs* file you just created and enter the code in Listing 1-1.

<Listing number="1-1" file-name="main.rs" caption="A program that prints `Hello, world!`">

```rust
fn main() {
    println!("Hello, world!");
}
```

</Listing>

Save the file and go back to your terminal window in the
*~/projects/hello_world* directory. On Linux or macOS, enter the following
commands to compile and run the file:

```console
$ rustc main.rs
$ ./main
Hello, world!
```

On Windows, enter the command `.\main.exe` instead of `./main`:

```powershell
> rustc main.rs
> .\main.exe
Hello, world!
```

Regardless of your operating system, the string `Hello, world!` should print to
the terminal.

# Anatomy of a Rust Program

Let's break down the details of the "Hello, world!" program in Rust:

```rust
fn main() {

}
```

1. **Function Definition**:
   - The program defines a function named `main`.
   - The `main` function is special because it always runs first in every executable Rust program.

2. **Function Signature**:
   - The first line declares the `main` function: `fn main()`.
   - It has no parameters (the parentheses are empty).
   - It doesn't return any value (no return type specified).

3. **Function Body**:
   - The function body is enclosed in curly braces `{}`.
   - Rust requires these curly brackets around all function bodies.
   - Good style suggests placing the opening curly bracket on the same line as the function declaration, with one space in between.

Let's break down the key details of the `main` function in the "Hello, world!" program:

   ```rust
   println!("Hello, world!");
   ```

1. **Function Body**:
   - The `main` function contains the following code:
     ```rust
     println!("Hello, world!");
     ```
   - This line prints the text "Hello, world!" to the screen.

2. **Indentation Style**:
   - Rust style convention is to use four spaces for indentation, not tabs.

3. **Rust Macros**:
   - `println!` is a Rust macro (not a regular function).
   - Macros are denoted by the `!` at the end.
   - We'll explore macros further in Chapter 19.

4. **String Argument**:
   - The `"Hello, world!"` string is passed as an argument to `println!`.

5. **Semicolon**:
   - The line ends with a semicolon (`;`), indicating the completion of the expression.
   - Most Rust code lines terminate with a semicolon.

> Note: If you want to stick to a standard style across Rust projects, you can
> use an automatic formatter tool called `rustfmt` to format your code in a
> particular style (more on `rustfmt` in
> [Appendix D][devtools]<!-- ignore -->). The Rust team has included this tool
> with the standard Rust distribution, as `rustc` is, so it should already be
> installed on your computer!

### Compiling and Running Are Separate Steps

You’ve just run a newly created program, so let’s examine each step in the
process.

Before running a Rust program, you must compile it using the Rust compiler by
entering the `rustc` command and passing it the name of your source file, like
this:

```console
$ rustc main.rs
```

If you have a C or C++ background, you’ll notice that this is similar to `gcc`
or `clang`. After compiling successfully, Rust outputs a binary executable.

On Linux, macOS, and PowerShell on Windows, you can see the executable by
entering the `ls` command in your shell:

```console
$ ls
main  main.rs
```

On Linux and macOS, you’ll see two files. With PowerShell on Windows, you’ll
see the same three files that you would see using CMD. With CMD on Windows, you
would enter the following:

```cmd
> dir /B %= the /B option says to only show the file names =%
main.exe
main.pdb
main.rs
```

This shows the source code file with the *.rs* extension, the executable file
(*main.exe* on Windows, but *main* on all other platforms), and, when using
Windows, a file containing debugging information with the *.pdb* extension.
From here, you run the *main* or *main.exe* file, like this:

```console
$ ./main # or .\main.exe on Windows
```

If your *main.rs* is your “Hello, world!” program, this line prints `Hello,
world!` to your terminal.

If you’re more familiar with a dynamic language, such as Ruby, Python, or
JavaScript, you might not be used to compiling and running a program as
separate steps. Rust is an *ahead-of-time compiled* language, meaning you can
compile a program and give the executable to someone else, and they can run it
even without having Rust installed. If you give someone a *.rb*, *.py*, or
*.js* file, they need to have a Ruby, Python, or JavaScript implementation
installed (respectively). But in those languages, you only need one command to
compile and run your program. Everything is a trade-off in language design.

Just compiling with `rustc` is fine for simple programs, but as your project
grows, you’ll want to manage all the options and make it easy to share your
code. Next, we’ll introduce you to the Cargo tool, which will help you write
real-world Rust programs.
