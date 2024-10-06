## To `panic!` or Not to `panic!`

So how do you decide when you should call `panic!` and when you should return
`Result`? When code panics, there's no way to recover. You could call `panic!`
for any error situation, whether there's a possible way to recover or not, but
then you're making the decision that a situation is unrecoverable on behalf of
the calling code. When you choose to return a `Result` value, you give the
calling code options. The calling code could choose to attempt to recover in a
way that's appropriate for its situation, or it could decide that an `Err`
value in this case is unrecoverable, so it can call `panic!` and turn your
recoverable error into an unrecoverable one. Therefore, returning `Result` is a
good default choice when you're defining a function that might fail.

In situations such as examples, prototype code, and tests, it's more
appropriate to write code that panics instead of returning a `Result`. Let's
explore why, then discuss situations in which the compiler can't tell that
failure is impossible, but you as a human can. The chapter will conclude with
some general guidelines on how to decide whether to panic in library code.
